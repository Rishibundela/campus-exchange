import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="mb-2 font-display text-3xl font-bold text-foreground">Contact Us</h1>
        <p className="mb-8 font-body text-sm text-muted-foreground">
          Have questions, feedback, or partnership ideas? We'd love to hear from you.
        </p>

        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 shadow-card">
            <Mail className="h-4 w-4 text-primary" />
            <span className="font-body text-sm text-muted-foreground">hello@youthmart.in</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 shadow-card">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="font-body text-sm text-muted-foreground">New Delhi, India</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="name" className="font-display text-sm font-semibold">Name</Label>
              <Input id="name" placeholder="Your name" className="mt-1.5 font-body text-sm" required />
            </div>
            <div>
              <Label htmlFor="email" className="font-display text-sm font-semibold">Email</Label>
              <Input id="email" type="email" placeholder="you@college.edu" className="mt-1.5 font-body text-sm" required />
            </div>
          </div>
          <div>
            <Label htmlFor="subject" className="font-display text-sm font-semibold">Subject</Label>
            <Input id="subject" placeholder="What's this about?" className="mt-1.5 font-body text-sm" required />
          </div>
          <div>
            <Label htmlFor="message" className="font-display text-sm font-semibold">Message</Label>
            <Textarea id="message" placeholder="Tell us more..." className="mt-1.5 min-h-[120px] font-body text-sm" required />
          </div>
          <Button type="submit" className="gap-2 bg-hero-gradient font-display text-sm font-semibold text-primary-foreground hover:opacity-90">
            <Send className="h-4 w-4" /> Send Message
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
