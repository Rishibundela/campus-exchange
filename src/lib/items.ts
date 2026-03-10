import { supabase } from "./supabase";
import type { Item } from "./types";

export interface ItemFilters {
  query?: string;
  category?: string;
  condition?: string;
  priceSort?: "low" | "high";
}

export async function getItems(filters: ItemFilters = {}): Promise<Item[]> {
  let q = supabase
    .from("items")
    .select("*, seller:profiles(*)")
    .eq("status", "available");

  if (filters.query) {
    q = q.or(
      `title.ilike.%${filters.query}%,description.ilike.%${filters.query}%`
    );
  }
  if (filters.category && filters.category !== "all") {
    q = q.eq("category", filters.category);
  }
  if (filters.condition && filters.condition !== "all") {
    q = q.eq("condition", filters.condition);
  }
  if (filters.priceSort === "low") {
    q = q.order("price", { ascending: true });
  } else if (filters.priceSort === "high") {
    q = q.order("price", { ascending: false });
  } else {
    q = q.order("created_at", { ascending: false });
  }

  const { data, error } = await q;
  if (error) throw error;
  return (data as Item[]) ?? [];
}

export async function getItemById(id: string): Promise<Item | null> {
  const { data, error } = await supabase
    .from("items")
    .select("*, seller:profiles(*)")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data as Item | null;
}

export async function createItem(
  data: Omit<Item, "id" | "created_at" | "updated_at" | "seller">
): Promise<Item> {
  const { data: item, error } = await supabase
    .from("items")
    .insert(data)
    .select("*, seller:profiles(*)")
    .single();
  if (error) throw error;
  return item as Item;
}

export async function updateItemStatus(
  id: string,
  status: "available" | "sold"
): Promise<void> {
  const { error } = await supabase
    .from("items")
    .update({ status })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteItem(id: string): Promise<void> {
  const { error } = await supabase.from("items").delete().eq("id", id);
  if (error) throw error;
}
