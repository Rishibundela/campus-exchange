import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import type { Item } from "@/lib/types";

export function useMyItems() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["my-items", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("items")
        .select("*, seller:profiles(*)")
        .eq("seller_id", user.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data as Item[]) ?? [];
    },
    enabled: !!user,
  });
}