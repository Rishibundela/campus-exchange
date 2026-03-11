import { Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Item as SupabaseItem } from "@/lib/types";
import type { Item as MockItem } from "@/lib/data";
import { useAuth } from "@/contexts/AuthContext";
import { useIsInWishlist, useToggleWishlist } from "@/hooks/useWishlistQuery";
import { useWishlist } from "@/hooks/useWishlist";

// Unified display item that supports both mock and Supabase items
export type DisplayItem = {
  id: string;
  title: string;
  price: number;
  category: string;
  condition: string;
  status: string;
  image?: string | null;
  location?: string | null;
  seller: {
    name: string;
    avatar?: string | null;
  };
};

function toDisplayItem(item: MockItem | SupabaseItem): DisplayItem {
  if ("image" in item) {
    // MockItem
    return {
      id: item.id,
      title: item.title,
      price: item.price,
      category: item.category,
      condition: item.condition,
      status: item.status,
      image: item.image,
      location: item.location,
      seller: { name: item.seller.name, avatar: item.seller.avatar },
    };
  }
  // SupabaseItem
  return {
    id: item.id,
    title: item.title,
    price: item.price,
    category: item.category,
    condition: item.condition,
    status: item.status,
    image: item.image_url,
    location: item.location,
    seller: { name: item.seller?.name ?? "Unknown", avatar: item.seller?.avatar_url },
  };
}

interface ItemCardProps {
  item: MockItem | SupabaseItem;
  index?: number;
}

function WishlistButton({ itemId }: { itemId: string }) {
  const { user } = useAuth();
  const { data: wishlisted } = useIsInWishlist(itemId);
  const { add, remove } = useToggleWishlist(itemId);

  // Fallback to in-memory wishlist when not authenticated
  const { isInWishlist: isInMemory, toggleWishlist: toggleMemory } = useWishlist();

  if (!user) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card"
        onClick={(e) => {
          e.preventDefault();
          toggleMemory(itemId);
        }}
      >
        <Heart className={`h-4 w-4 ${isInMemory(itemId) ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card"
      onClick={(e) => {
        e.preventDefault();
        if (wishlisted) {
          remove.mutate();
        } else {
          add.mutate();
        }
      }}
    >
      <Heart className={`h-4 w-4 ${wishlisted ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
    </Button>
  );
}

const ItemCard = ({ item, index = 0 }: ItemCardProps) => {
  const display = toDisplayItem(item);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={`/item/${display.id}`} className="group block">
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
          <div className="relative aspect-[4/3] overflow-hidden">
            {display.image ? (
              <img
                src={display.image}
                alt={display.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground text-sm">
                No image
              </div>
            )}
            <div className="absolute right-3 top-3">
              <WishlistButton itemId={display.id} />
            </div>
            {display.status === "sold" && (
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/50">
                <Badge className="bg-destructive font-display text-destructive-foreground">SOLD</Badge>
              </div>
            )}
          </div>
          <div className="p-4">
            <div className="mb-2 flex items-center gap-2">
              <Badge variant="secondary" className="font-body text-xs">{display.category}</Badge>
              <Badge variant="outline" className="font-body text-xs">{display.condition}</Badge>
            </div>
            <h3 className="mb-1 line-clamp-1 font-display text-sm font-semibold text-card-foreground">
              {display.title}
            </h3>
            <p className="mb-3 font-display text-lg font-bold text-primary">₹{display.price}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {display.seller.avatar ? (
                  <img src={display.seller.avatar} alt={display.seller.name} className="h-6 w-6 rounded-full object-cover" />
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-medium text-primary">
                    {display.seller.name[0]}
                  </div>
                )}
                <span className="font-body text-xs text-muted-foreground">{display.seller.name}</span>
              </div>
              {display.location && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span className="font-body text-xs">{display.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ItemCard;
