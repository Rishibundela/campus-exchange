import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "@/lib/messages";
import { useAuth } from "@/contexts/AuthContext";

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
