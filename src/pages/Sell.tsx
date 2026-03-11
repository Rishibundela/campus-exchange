import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { categories } from "@/lib/data";
import { toast } from "sonner";
import { createItem } from "@/lib/items";
import { uploadImage } from "@/lib/storage";
import { useAuth } from "@/contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";

const Sell = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState<"New" | "Like New" | "Good" | "Fair" | "">("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to list an item");
      return;
    }
    if (!category || !condition) {
      toast.error("Please select a category and condition");
      return;
    }
    setLoading(true);
    try {
      let image_url: string | null = null;
      if (imageFile) {
        image_url = await uploadImage(imageFile);
      }
      const item = await createItem({
        title,
        description,
        price: parseFloat(price),
        category,
        condition,
        status: "available",
        image_url,
        location: location || null,
        seller_id: user.id,
      });
      queryClient.invalidateQueries({ queryKey: ["items"] });
      toast.success("Item listed successfully! 🎉");
      navigate(`/item/${item.id}`);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to list item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="mb-2 font-display text-3xl font-bold text-foreground">List an Item</h1>
        <p className="mb-8 font-body text-sm text-muted-foreground">Share your study materials with fellow students</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <Label className="font-display text-sm font-semibold">Item Photo</Label>
            <label className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/50 p-8 transition-colors hover:border-primary/50">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="h-48 w-full rounded-lg object-cover" />
              ) : (
                <>
                  <Camera className="mb-2 h-8 w-8 text-muted-foreground" />
                  <span className="font-body text-sm text-muted-foreground">Click to upload a photo</span>
                </>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          </div>

          <div>
            <Label htmlFor="title" className="font-display text-sm font-semibold">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Engineering Mathematics Textbook" className="mt-1.5 font-body text-sm" required />
          </div>

          <div>
            <Label htmlFor="description" className="font-display text-sm font-semibold">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the item, its condition, and any other details..." className="mt-1.5 min-h-[100px] font-body text-sm" required />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="price" className="font-display text-sm font-semibold">Price (₹)</Label>
              <Input id="price" type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="350" className="mt-1.5 font-body text-sm" required />
            </div>
            <div>
              <Label className="font-display text-sm font-semibold">Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger className="mt-1.5 font-body text-sm">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.name} value={c.name}>{c.icon} {c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="font-display text-sm font-semibold">Condition</Label>
              <Select value={condition} onValueChange={(v) => setCondition(v as typeof condition)} required>
                <SelectTrigger className="mt-1.5 font-body text-sm">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Like New">Like New</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Fair">Fair</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="location" className="font-display text-sm font-semibold">Location</Label>
              <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., North Campus" className="mt-1.5 font-body text-sm" />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full gap-2 bg-hero-gradient py-3 font-display text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            {loading ? "Listing…" : "List Item"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default Sell;
