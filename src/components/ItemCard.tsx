import { Heart, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Item } from "@/lib/data";
import { useWishlist } from "@/hooks/useWishlist";

interface ItemCardProps {
  item: Item;
  index?: number;
}

const ItemCard = ({ item, index = 0 }: ItemCardProps) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(item.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={`/item/${item.id}`} className="group block">
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute right-3 top-3">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card"
                onClick={(e) => {
                  e.preventDefault();
                  toggleWishlist(item.id);
                }}
              >
                <Heart className={`h-4 w-4 ${wishlisted ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
              </Button>
            </div>
            {item.status === "sold" && (
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/50">
                <Badge className="bg-destructive font-display text-destructive-foreground">SOLD</Badge>
              </div>
            )}
          </div>
          <div className="p-4">
            <div className="mb-2 flex items-center gap-2">
              <Badge variant="secondary" className="font-body text-xs">{item.category}</Badge>
              <Badge variant="outline" className="font-body text-xs">{item.condition}</Badge>
            </div>
            <h3 className="mb-1 line-clamp-1 font-display text-sm font-semibold text-card-foreground">
              {item.title}
            </h3>
            <p className="mb-3 font-display text-lg font-bold text-primary">₹{item.price}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={item.seller.avatar} alt={item.seller.name} className="h-6 w-6 rounded-full object-cover" />
                <span className="font-body text-xs text-muted-foreground">{item.seller.name}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span className="font-body text-xs">{item.location}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ItemCard;
