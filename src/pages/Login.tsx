import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(isSignup ? "Account created! Check your college email to verify." : "Welcome back! 🎉");
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-hero-gradient">
            <ShoppingBag className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="mt-1 font-body text-sm text-muted-foreground">
            {isSignup ? "Sign up with your college email" : "Log in to your YouthMart account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-card">
          {isSignup && (
            <>
              <div>
                <Label htmlFor="name" className="font-display text-sm font-semibold">Full Name</Label>
                <Input id="name" placeholder="Arjun Mehta" className="mt-1.5 font-body text-sm" required />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="course" className="font-display text-sm font-semibold">Course</Label>
                  <Input id="course" placeholder="B.Tech CSE" className="mt-1.5 font-body text-sm" required />
                </div>
                <div>
                  <Label htmlFor="year" className="font-display text-sm font-semibold">Year</Label>
                  <Input id="year" placeholder="3rd Year" className="mt-1.5 font-body text-sm" required />
                </div>
              </div>
            </>
          )}
          <div>
            <Label htmlFor="email" className="font-display text-sm font-semibold">College Email</Label>
            <Input id="email" type="email" placeholder="you@college.edu" className="mt-1.5 font-body text-sm" required />
          </div>
          <div>
            <Label htmlFor="password" className="font-display text-sm font-semibold">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" className="mt-1.5 font-body text-sm" required />
          </div>
          <Button type="submit" className="w-full bg-hero-gradient font-display text-sm font-semibold text-primary-foreground hover:opacity-90">
            {isSignup ? "Create Account" : "Log In"}
          </Button>
        </form>

        <p className="mt-4 text-center font-body text-sm text-muted-foreground">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={() => setIsSignup(!isSignup)} className="font-medium text-primary hover:underline">
            {isSignup ? "Log in" : "Sign up"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
