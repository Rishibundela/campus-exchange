import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
} from "@/lib/wishlist";
import { useAuth } from "@/contexts/AuthContext";

export function useWishlistQuery() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["wishlist", user?.id],
    queryFn: () => getWishlist(user!.id),
    enabled: !!user,
  });
}

export function useIsInWishlist(itemId: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["wishlist-check", user?.id, itemId],
    queryFn: () => isInWishlist(user!.id, itemId),
    enabled: !!user && !!itemId,
  });
}

export function useToggleWishlist(itemId: string) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const add = useMutation({
    mutationFn: () => addToWishlist(user!.id, itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["wishlist-check"] });
    },
  });

  const remove = useMutation({
    mutationFn: () => removeFromWishlist(user!.id, itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["wishlist-check"] });
    },
  });

  return { add, remove };
}
