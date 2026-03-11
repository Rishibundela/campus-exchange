import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form states
  const [name, setName] = useState("");
  const [college, setCollege] = useState("LNCT"); // Default to LNCT
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
    if (isSignup) {
      await signUp(email, password, name, college, course, year);
      toast.success("Account created! Check your email to verify.");
      // ❌ No navigate() here — user stays on login page
    } else {
      await signIn(email, password);
      toast.success("Welcome back! 🎉");
      navigate("/"); // ✅ Only login redirects
    }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
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
            {isSignup ? "Sign up to start buying & selling" : "Log in to your YouthMart account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-card">
          {isSignup && (
            <>
              <div>
                <Label htmlFor="name" className="font-display text-sm font-semibold">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Arjun Mehta" className="mt-1.5 font-body text-sm" required />
              </div>
              
              <div>
                <Label htmlFor="college" className="font-display text-sm font-semibold">College</Label>
                <Select value={college} onValueChange={setCollege} required>
                  <SelectTrigger className="mt-1.5 font-body text-sm">
                    <SelectValue placeholder="Select college" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LNCT">LNCT</SelectItem>
                    <SelectItem value="LNCTS">LNCTS</SelectItem>
                    <SelectItem value="LNCTE">LNCTE</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="course" className="font-display text-sm font-semibold">Course</Label>
                  <Input id="course" value={course} onChange={(e) => setCourse(e.target.value)} placeholder="B.Tech CSE" className="mt-1.5 font-body text-sm" required />
                </div>
                <div>
                  <Label htmlFor="year" className="font-display text-sm font-semibold">Year</Label>
                  <Input id="year" value={year} onChange={(e) => setYear(e.target.value)} placeholder="3rd Year" className="mt-1.5 font-body text-sm" required />
                </div>
              </div>
            </>
          )}
          <div>
            <Label htmlFor="email" className="font-display text-sm font-semibold">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@gmail.com" className="mt-1.5 font-body text-sm" required />
          </div>
          <div>
            <Label htmlFor="password" className="font-display text-sm font-semibold">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="mt-1.5 font-body text-sm" required />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-hero-gradient font-display text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            {loading ? "Please wait…" : isSignup ? "Create Account" : "Log In"}
          </Button>
        </form>

        <p className="mt-4 text-center font-body text-sm text-muted-foreground">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button type="button" onClick={() => setIsSignup(!isSignup)} className="font-medium text-primary hover:underline">
            {isSignup ? "Log in" : "Sign up"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;