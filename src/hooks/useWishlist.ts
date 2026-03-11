import { useState, useCallback } from "react";

// Simple local wishlist (no persistence for now)
const globalWishlist: Set<string> = new Set();
const listeners: Set<() => void> = new Set();

function notify() {
  listeners.forEach((l) => l());
}

export function useWishlist() {
  const [, setTick] = useState(0);

  const subscribe = useCallback(() => {
    const listener = () => setTick((t) => t + 1);
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, []);

  // Force re-render on changes
  useState(() => {
    const unsub = subscribe();
    return unsub;
  });

  return {
    isInWishlist: (id: string) => globalWishlist.has(id),
    toggleWishlist: (id: string) => {
      if (globalWishlist.has(id)) {
        globalWishlist.delete(id);
      } else {
        globalWishlist.add(id);
      }
      notify();
    },
    wishlistIds: Array.from(globalWishlist),
    count: globalWishlist.size,
  };
}
