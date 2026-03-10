import { useQuery } from "@tanstack/react-query";
import { getItemById } from "@/lib/items";

export function useItem(id: string | undefined) {
  return useQuery({
    queryKey: ["item", id],
    queryFn: () => getItemById(id!),
    enabled: !!id,
  });
}
