import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ItemCard from "@/components/ItemCard";
import { categories, mockItems } from "@/lib/data";

const Browse = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [priceSort, setPriceSort] = useState("");
  const [condition, setCondition] = useState("");

  const filtered = useMemo(() => {
    let items = [...mockItems];
    if (query) items = items.filter((i) => i.title.toLowerCase().includes(query.toLowerCase()) || i.description.toLowerCase().includes(query.toLowerCase()));
    if (category) items = items.filter((i) => i.category === category);
    if (condition) items = items.filter((i) => i.condition === condition);
    if (priceSort === "low") items.sort((a, b) => a.price - b.price);
    if (priceSort === "high") items.sort((a, b) => b.price - a.price);
    return items;
  }, [query, category, priceSort, condition]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 font-display text-3xl font-bold text-foreground">Browse Listings</h1>

      {/* Filters */}
      <div className="mb-8 flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-card sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search items..."
            className="pl-9 font-body text-sm"
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full font-body text-sm sm:w-40">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c.name} value={c.name}>{c.icon} {c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={condition} onValueChange={setCondition}>
          <SelectTrigger className="w-full font-body text-sm sm:w-36">
            <SelectValue placeholder="Condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Condition</SelectItem>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Like New">Like New</SelectItem>
            <SelectItem value="Good">Good</SelectItem>
            <SelectItem value="Fair">Fair</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priceSort} onValueChange={setPriceSort}>
          <SelectTrigger className="w-full font-body text-sm sm:w-36">
            <SelectValue placeholder="Sort Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Default</SelectItem>
            <SelectItem value="low">Price: Low → High</SelectItem>
            <SelectItem value="high">Price: High → Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="mb-4 font-body text-sm text-muted-foreground">{filtered.length} items found</p>

      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <ItemCard key={item.id} item={item} index={i} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="font-display text-xl font-semibold text-foreground">No items found</p>
          <p className="mt-2 font-body text-sm text-muted-foreground">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};

export default Browse;
