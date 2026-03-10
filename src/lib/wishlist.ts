import { supabase } from "./supabase";
import type { WishlistEntry } from "./types";

export async function getWishlist(userId: string): Promise<WishlistEntry[]> {
  const { data, error } = await supabase
    .from("wishlist")
    .select("*, item:items(*, seller:profiles(*))")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as WishlistEntry[]) ?? [];
}

const PG_UNIQUE_VIOLATION = "23505";

export async function addToWishlist(
  userId: string,
  itemId: string
): Promise<void> {
  const { error } = await supabase
    .from("wishlist")
    .insert({ user_id: userId, item_id: itemId });
  if (error && error.code !== PG_UNIQUE_VIOLATION) throw error;
}

export async function removeFromWishlist(
  userId: string,
  itemId: string
): Promise<void> {
  const { error } = await supabase
    .from("wishlist")
    .delete()
    .eq("user_id", userId)
    .eq("item_id", itemId);
  if (error) throw error;
}

export async function isInWishlist(
  userId: string,
  itemId: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from("wishlist")
    .select("id")
    .eq("user_id", userId)
    .eq("item_id", itemId)
    .maybeSingle();
  if (error) throw error;
  return data !== null;
}
