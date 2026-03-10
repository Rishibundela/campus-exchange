import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { categories } from "@/lib/data";
import { toast } from "sonner";

const Sell = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Item listed successfully! 🎉");
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
            <Input id="title" placeholder="e.g., Engineering Mathematics Textbook" className="mt-1.5 font-body text-sm" required />
          </div>

          <div>
            <Label htmlFor="description" className="font-display text-sm font-semibold">Description</Label>
            <Textarea id="description" placeholder="Describe the item, its condition, and any other details..." className="mt-1.5 min-h-[100px] font-body text-sm" required />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="price" className="font-display text-sm font-semibold">Price (₹)</Label>
              <Input id="price" type="number" min="0" placeholder="350" className="mt-1.5 font-body text-sm" required />
            </div>
            <div>
              <Label className="font-display text-sm font-semibold">Category</Label>
              <Select required>
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
              <Select required>
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
              <Input id="location" placeholder="e.g., North Campus" className="mt-1.5 font-body text-sm" required />
            </div>
          </div>

          <Button type="submit" className="w-full gap-2 bg-hero-gradient py-3 font-display text-sm font-semibold text-primary-foreground hover:opacity-90">
            <Plus className="h-4 w-4" /> List Item
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default Sell;
