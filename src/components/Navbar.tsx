import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Heart, LogOut, Menu, Plus, Search, ShoppingBag, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const links = [
    { to: "/", label: "Home" },
    { to: "/browse", label: "Browse" },
    { to: "/sell", label: "Sell" },
    { to: "/about", label: "About" },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      navigate("/");
    } catch {
      toast.error("Failed to sign out");
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-hero-gradient">
            <ShoppingBag className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            Youth<span className="text-gradient">Mart</span> <span className="hidden text-xs font-normal text-muted-foreground sm:inline">| LNCT Bhopal</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-lg px-4 py-2 font-body text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link to="/browse">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/wishlist">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Heart className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/sell">
            <Button className="gap-2 bg-hero-gradient font-display text-sm font-semibold text-primary-foreground shadow-md hover:opacity-90">
              <Plus className="h-4 w-4" />
              List Item
            </Button>
          </Link>
          {user ? (
            <Button
              variant="outline"
              size="icon"
              title="Sign out"
              className="border-border text-muted-foreground hover:text-foreground"
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="icon" className="border-border text-muted-foreground hover:text-foreground">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-card md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-4 py-3 font-body text-sm font-medium ${
                    location.pathname === link.to
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 flex gap-2">
                <Link to="/wishlist" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full gap-2">
                    <Heart className="h-4 w-4" /> Wishlist
                  </Button>
                </Link>
                {user ? (
                  <Button variant="outline" className="flex-1 gap-2" onClick={() => { setMobileOpen(false); handleSignOut(); }}>
                    <LogOut className="h-4 w-4" /> Sign Out
                  </Button>
                ) : (
                  <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full gap-2">
                      <User className="h-4 w-4" /> Login
                    </Button>
                  </Link>
                )}
              </div>
              <Link to="/sell" className="mt-1" onClick={() => setMobileOpen(false)}>
                <Button className="w-full gap-2 bg-hero-gradient font-display text-sm font-semibold text-primary-foreground">
                  <Plus className="h-4 w-4" /> List Item
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;