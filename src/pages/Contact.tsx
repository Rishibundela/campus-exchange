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
    // Expanded the max-width to accommodate a side-by-side layout
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="mb-2 font-display text-3xl font-bold text-foreground">Contact Us</h1>
        <p className="mb-8 font-body text-sm text-muted-foreground">
          Have questions, feedback, or partnership ideas? We'd love to hear from you.
        </p>

        <div className="grid gap-8 lg:grid-cols-5">
          
          {/* Form Section (Takes up 3 columns on large screens) */}
          <div className="lg:col-span-3">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 shadow-card">
                <Mail className="h-4 w-4 text-primary" />
                <span className="font-body text-sm text-muted-foreground">hello@youthmart.in</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 shadow-card">
                <MapPin className="h-4 w-4 text-primary" />
                {/* Updated location to match LNCT */}
                <span className="font-body text-sm text-muted-foreground">Bhopal, M.P.</span>
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
                  <Input id="email" type="email" placeholder="you@gmail.com" className="mt-1.5 font-body text-sm" required />
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
          </div>

          {/* LNCT Contact Info Section (Takes up 2 columns on large screens) */}
          <div className="lg:col-span-2">
            <div className="h-full rounded-xl border border-border bg-card p-6 shadow-card">
              <h2 className="mb-6 font-display text-xl font-bold text-foreground border-b border-border pb-4">
                LNCT Contact Info
              </h2>
              <div className="space-y-5 font-body text-sm text-muted-foreground">
                <div>
                  <p className="mb-1 font-semibold text-foreground flex items-center gap-2">
                    📍 Address
                  </p>
                  <p className="leading-relaxed pl-6">LNCT Campus, Kalchuri Nagar, (P.O. Kolua) Raisen Road, Bhopal-462022 (M.P.)</p>
                </div>
                
                <div>
                  <p className="mb-1 font-semibold text-foreground flex items-center gap-2">
                    📞 Reception
                  </p>
                  <p className="pl-6">0755-6185300 / 1 / 2 / 3 / 4 / 5</p>
                </div>
                
                <div>
                  <p className="mb-1 font-semibold text-foreground flex items-center gap-2">
                    🎓 Admission Cell
                  </p>
                  <p className="pl-6">7440777111, 0755-6185350, 0755-6685400</p>
                </div>
                
                <div>
                  <p className="mb-1 font-semibold text-foreground flex items-center gap-2">
                    💼 Training & Placement Cell
                  </p>
                  <p className="pl-6">9826062730, 0755-6185341</p>
                </div>
                
                <div>
                  <p className="mb-1 font-semibold text-foreground flex items-center gap-2">
                    ✉️ Emails
                  </p>
                  <div className="pl-6 space-y-1">
                    <p><a href="mailto:info@lnct.ac.in" className="text-primary hover:underline transition-colors">info@lnct.ac.in</a></p>
                    <p><a href="mailto:admission@lnct.ac.in" className="text-primary hover:underline transition-colors">admission@lnct.ac.in</a></p>
                    <p><a href="mailto:Jobs@lnct.ac.in" className="text-primary hover:underline transition-colors">Jobs@lnct.ac.in</a></p>
                    <p><a href="mailto:Verification@lnct.ac.in" className="text-primary hover:underline transition-colors">Verification@lnct.ac.in</a> <span className="text-xs opacity-75">(Docs: 0755-6185326)</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
