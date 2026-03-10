import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Recycle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroSearch from "@/components/HeroSearch";
import CategoryCard from "@/components/CategoryCard";
import ItemCard from "@/components/ItemCard";
import { categories, mockItems } from "@/lib/data";
import { useItems } from "@/hooks/useItems";

const Index = () => {
  const { data: items, isLoading, isError } = useItems();
  const displayItems = items ?? mockItems;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="container relative mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 inline-block rounded-full bg-primary-foreground/20 px-4 py-1.5 font-body text-sm font-medium text-primary-foreground backdrop-blur-sm">
              🎓 Your Campus Marketplace
            </span>
            <h1 className="mb-4 font-display text-4xl font-extrabold leading-tight text-primary-foreground md:text-6xl">
              Buy, Sell & Exchange
              <br />
              Campus Essentials
            </h1>
            <p className="mx-auto mb-8 max-w-lg font-body text-lg text-primary-foreground/80">
              Save money, reduce waste, and connect with fellow students. Find textbooks, notes, gadgets and more.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <HeroSearch />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex items-center justify-center gap-6 font-body text-sm text-primary-foreground/70"
          >
            <span>📚 500+ Items</span>
            <span>👥 1,200+ Students</span>
            <span>🏫 15+ Campuses</span>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">Browse Categories</h2>
            <p className="mt-1 font-body text-sm text-muted-foreground">Find exactly what you need</p>
          </div>
          <Link to="/browse" className="font-body text-sm font-medium text-primary hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.name} {...cat} index={i} />
          ))}
        </div>
      </section>

      {/* Recent Listings */}
      <section className="container mx-auto px-4 pb-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">Recently Added</h2>
            <p className="mt-1 font-body text-sm text-muted-foreground">Fresh listings from your campus</p>
          </div>
          <Link to="/browse" className="font-body text-sm font-medium text-primary hover:underline">
            Browse all →
          </Link>
        </div>
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : isError ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockItems.map((item, i) => (
              <ItemCard key={item.id} item={item} index={i} />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayItems.slice(0, 6).map((item, i) => (
              <ItemCard key={item.id} item={item} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Value Props */}
      <section className="border-t border-border bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center font-display text-2xl font-bold text-foreground">Why YouthMart?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: BookOpen, title: "Save Money", desc: "Get textbooks and materials at a fraction of the retail price from fellow students." },
              { icon: Recycle, title: "Promote Sustainability", desc: "Give your study materials a second life instead of throwing them away." },
              { icon: Users, title: "Campus Community", desc: "Connect with peers, share resources, and help each other succeed." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border bg-card p-6 text-center shadow-card"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-card-foreground">{item.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="mb-3 font-display text-2xl font-bold text-foreground">Ready to start?</h2>
        <p className="mb-6 font-body text-muted-foreground">Join thousands of students already saving on campus.</p>
        <div className="flex justify-center gap-3">
          <Link to="/browse">
            <Button variant="outline" className="gap-2 font-display text-sm font-semibold">
              Browse Items <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/sell">
            <Button className="gap-2 bg-hero-gradient font-display text-sm font-semibold text-primary-foreground hover:opacity-90">
              Start Selling
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
