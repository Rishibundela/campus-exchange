import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <Link to="/" className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-hero-gradient">
              <ShoppingBag className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold text-foreground">
              Youth<span className="text-gradient">Mart</span>
            </span>
          </Link>
          <p className="font-body text-sm text-muted-foreground">
            Helping students share resources, save money, and connect with peers on campus.
          </p>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold text-foreground">Explore</h4>
          <div className="flex flex-col gap-2">
            <Link to="/browse" className="font-body text-sm text-muted-foreground hover:text-primary">Browse Items</Link>
            <Link to="/sell" className="font-body text-sm text-muted-foreground hover:text-primary">Sell an Item</Link>
            <Link to="/browse?category=Books" className="font-body text-sm text-muted-foreground hover:text-primary">Books</Link>
            <Link to="/browse?category=Electronics" className="font-body text-sm text-muted-foreground hover:text-primary">Electronics</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold text-foreground">Company</h4>
          <div className="flex flex-col gap-2">
            <Link to="/about" className="font-body text-sm text-muted-foreground hover:text-primary">About Us</Link>
            <Link to="/contact" className="font-body text-sm text-muted-foreground hover:text-primary">Contact</Link>
            <Link to="/terms" className="font-body text-sm text-muted-foreground hover:text-primary">Terms</Link>
            <Link to="/privacy" className="font-body text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold text-foreground">Connect</h4>
          <p className="font-body text-sm text-muted-foreground">
            Have feedback? We'd love to hear from you.
          </p>
          <Link to="/contact" className="mt-2 inline-block font-body text-sm font-medium text-primary hover:underline">
            Get in touch →
          </Link>
        </div>
      </div>
      <div className="mt-8 border-t border-border pt-6 text-center">
        <p className="font-body text-xs text-muted-foreground">
          © 2026 YouthMart. Built for students, by students. 🎓
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
