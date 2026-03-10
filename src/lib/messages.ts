import { supabase } from "./supabase";
import type { Message } from "./types";

export async function sendMessage(
  senderId: string,
  receiverId: string,
  itemId: string | null,
  content: string
): Promise<Message> {
  const { data, error } = await supabase
    .from("messages")
    .insert({ sender_id: senderId, receiver_id: receiverId, item_id: itemId, content })
    .select()
    .single();
  if (error) throw error;
  return data as Message;
}

export async function getConversations(userId: string): Promise<Message[]> {
  const { data, error } = await supabase
    .from("messages")
    .select("*, sender:profiles!sender_id(*), receiver:profiles!receiver_id(*), item:items(*)")
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as Message[]) ?? [];
}

export async function getMessages(
  userId1: string,
  userId2: string,
  itemId: string | null
): Promise<Message[]> {
  let q = supabase
    .from("messages")
    .select("*, sender:profiles!sender_id(*), receiver:profiles!receiver_id(*)")
    .or(
      `and(sender_id.eq.${userId1},receiver_id.eq.${userId2}),and(sender_id.eq.${userId2},receiver_id.eq.${userId1})`
    )
    .order("created_at", { ascending: true });

  if (itemId) q = q.eq("item_id", itemId);

  const { data, error } = await q;
  if (error) throw error;
  return (data as Message[]) ?? [];
}
