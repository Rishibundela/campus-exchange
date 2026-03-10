import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getReviewsForSeller,
  createReview,
  getAverageRating,
} from "@/lib/reviews";
import { useAuth } from "@/contexts/AuthContext";

export function useReviews(sellerId: string | undefined) {
  return useQuery({
    queryKey: ["reviews", sellerId],
    queryFn: () => getReviewsForSeller(sellerId!),
    enabled: !!sellerId,
  });
}

export function useAverageRating(sellerId: string | undefined) {
  return useQuery({
    queryKey: ["rating", sellerId],
    queryFn: () => getAverageRating(sellerId!),
    enabled: !!sellerId,
  });
}

export function useCreateReview(sellerId: string) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      itemId,
      rating,
      comment,
    }: {
      itemId: string | null;
      rating: number;
      comment: string;
    }) => createReview(user!.id, sellerId, itemId, rating, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", sellerId] });
      queryClient.invalidateQueries({ queryKey: ["rating", sellerId] });
    },
  });
}
