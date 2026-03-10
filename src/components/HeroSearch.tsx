import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HeroSearch = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/browse?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-xl items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books, notes, gadgets..."
          className="h-12 rounded-xl border-border bg-card pl-10 font-body text-sm shadow-card focus-visible:ring-primary"
        />
      </div>
      <Button type="submit" className="h-12 rounded-xl bg-hero-gradient px-6 font-display text-sm font-semibold text-primary-foreground shadow-md hover:opacity-90">
        Search
      </Button>
    </form>
  );
};

export default HeroSearch;
