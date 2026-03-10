import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlistQuery } from "@/hooks/useWishlistQuery";
import ItemCard from "@/components/ItemCard";

const Wishlist = () => {
  const { data: wishlistEntries = [], isLoading } = useWishlistQuery();
  const items = wishlistEntries.map((e) => e.item).filter(Boolean);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-2 font-display text-3xl font-bold text-foreground">Your Wishlist</h1>
      <p className="mb-8 font-body text-sm text-muted-foreground">Items you've saved for later</p>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : items.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <ItemCard key={item!.id} item={item!} index={i} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <Heart className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <p className="font-display text-xl font-semibold text-foreground">No saved items yet</p>
          <p className="mt-2 font-body text-sm text-muted-foreground">Browse listings and tap the heart to save items here.</p>
          <Link to="/browse" className="mt-4 inline-block font-body text-sm font-medium text-primary hover:underline">
            Browse Items →
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
