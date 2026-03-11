import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { sendMessage } from "@/lib/messages";
import { useAuth } from "@/contexts/AuthContext";

// 1. Existing: Send Message
export function useSendMessage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      receiverId,
      itemId,
      content,
    }: {
      receiverId: string;
      itemId: string | null;
      content: string;
    }) => sendMessage(user!.id, receiverId, itemId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
}

// 2. NEW: Hook to fetch real messages meant for the logged-in user
export const useMyMessages = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["messages", user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from("messages")
        .select(`
          id,
          content,
          created_at,
          read,
          sender_id,
          receiver_id,
          item_id,
          profiles!messages_sender_id_fkey(name),
          items(title)
        `)
        .eq("receiver_id", user.id) // Only get messages sent TO me
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching messages:", error);
        throw error;
      }
      return data;
    },
    enabled: !!user,
  });
};

// 3. NEW: Hook to mark a message as read when opened
export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (messageId: string) => {
      const { error } = await supabase
        .from("messages")
        .update({ read: true })
        .eq("id", messageId);
      if (error) throw error;
    },
    onSuccess: () => {
      // Refresh the message list to remove the "unread" dot
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    }
  });
};
