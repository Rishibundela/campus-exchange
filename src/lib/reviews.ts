import { supabase } from "./supabase";
import type { Review } from "./types";

export async function getReviewsForSeller(sellerId: string): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("*, reviewer:profiles!reviewer_id(*)")
    .eq("seller_id", sellerId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as Review[]) ?? [];
}

export async function createReview(
  reviewerId: string,
  sellerId: string,
  itemId: string | null,
  rating: number,
  comment: string
): Promise<Review> {
  const { data, error } = await supabase
    .from("reviews")
    .insert({ reviewer_id: reviewerId, seller_id: sellerId, item_id: itemId, rating, comment })
    .select("*, reviewer:profiles!reviewer_id(*)")
    .single();
  if (error) throw error;
  return data as Review;
}

export async function getAverageRating(
  sellerId: string
): Promise<number | null> {
  const { data, error } = await supabase
    .from("reviews")
    .select("rating")
    .eq("seller_id", sellerId);
  if (error) throw error;
  if (!data || data.length === 0) return null;
  const sum = data.reduce((acc, r) => acc + (r.rating as number), 0);
  return Math.round((sum / data.length) * 10) / 10;
}
