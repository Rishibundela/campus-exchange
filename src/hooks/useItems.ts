import { useQuery } from "@tanstack/react-query";
import { getItems } from "@/lib/items";
import type { ItemFilters } from "@/lib/items";

export function useItems(filters: ItemFilters = {}) {
  return useQuery({
    queryKey: ["items", filters],
    queryFn: () => getItems(filters),
  });
}
