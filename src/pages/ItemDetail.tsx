import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, MapPin, MessageCircle, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockItems } from "@/lib/data";
import { useWishlist } from "@/hooks/useWishlist";
import { toast } from "sonner";

const ItemDetail = () => {
  const { id } = useParams();
  const item = mockItems.find((i) => i.id === id);
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!item) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="font-display text-xl font-semibold text-foreground">Item not found</p>
        <Link to="/browse" className="mt-4 inline-block font-body text-sm text-primary hover:underline">← Back to browse</Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(item.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/browse" className="mb-6 inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to listings
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="overflow-hidden rounded-xl border border-border"
        >
          <img src={item.image} alt={item.title} className="h-full max-h-[500px] w-full object-cover" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="mb-3 flex items-center gap-2">
            <Badge variant="secondary" className="font-body">{item.category}</Badge>
            <Badge variant="outline" className="font-body">{item.condition}</Badge>
            {item.status === "sold" && <Badge className="bg-destructive text-destructive-foreground">Sold</Badge>}
          </div>

          <h1 className="mb-2 font-display text-2xl font-bold text-foreground md:text-3xl">{item.title}</h1>
          <p className="mb-4 font-display text-3xl font-extrabold text-primary">₹{item.price}</p>

          <p className="mb-6 font-body text-sm leading-relaxed text-muted-foreground">{item.description}</p>

          <div className="mb-6 flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="font-body text-sm">{item.location}</span>
            <span className="font-body text-xs">• Listed {item.createdAt}</span>
          </div>

          {/* Seller */}
          <div className="mb-6 rounded-xl border border-border bg-muted/50 p-4">
            <div className="flex items-center gap-3">
              <img src={item.seller.avatar} alt={item.seller.name} className="h-12 w-12 rounded-full object-cover" />
              <div>
                <p className="font-display text-sm font-semibold text-foreground">{item.seller.name}</p>
                <p className="font-body text-xs text-muted-foreground">{item.seller.college} • {item.seller.year}</p>
                <div className="mt-1 flex items-center gap-1">
                  <Star className="h-3 w-3 fill-warning text-warning" />
                  <span className="font-body text-xs font-medium text-foreground">{item.seller.rating}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              className="flex-1 gap-2 bg-hero-gradient font-display text-sm font-semibold text-primary-foreground hover:opacity-90"
              onClick={() => toast.success("Message sent! The seller will contact you soon.")}
            >
              <MessageCircle className="h-4 w-4" /> Contact Seller
            </Button>
            <Button
              variant="outline"
              className="gap-2 font-display text-sm font-semibold"
              onClick={() => toggleWishlist(item.id)}
            >
              <Heart className={`h-4 w-4 ${wishlisted ? "fill-destructive text-destructive" : ""}`} />
              {wishlisted ? "Saved" : "Save"}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ItemDetail;
