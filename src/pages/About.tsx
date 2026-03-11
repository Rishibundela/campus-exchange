import { motion } from "framer-motion";
import { BookOpen, Heart, Recycle, Target, Users, Zap } from "lucide-react";

const About = () => (
  <div>
    <section className="bg-hero-gradient py-16">
      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-4 font-display text-4xl font-extrabold text-primary-foreground">
            About YouthMart
          </h1>
          <p className="mx-auto max-w-lg font-body text-lg text-primary-foreground/80">
            Helping students share and save resources within their campus community.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-4 font-display text-2xl font-bold text-foreground">Our Mission</h2>
        <p className="mb-8 font-body text-muted-foreground leading-relaxed">
          YouthMart was born from a simple idea: why should students buy brand-new textbooks every semester when last year's
          students have them sitting on their shelves? We're building a trusted marketplace where students can easily
          buy, sell, and exchange study materials — saving money, reducing waste, and building campus connections.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {[
            { icon: Target, title: "Affordable Access", desc: "Get materials at student-friendly prices." },
            { icon: Recycle, title: "Sustainability", desc: "Reduce waste by reusing study materials." },
            { icon: Users, title: "Community", desc: "Connect with peers who share your courses." },
            { icon: Zap, title: "Convenience", desc: "Buy and sell right on your campus." },
          ].map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-border bg-card p-5 shadow-card"
            >
              <v.icon className="mb-3 h-6 w-6 text-primary" />
              <h3 className="mb-1 font-display text-sm font-semibold text-card-foreground">{v.title}</h3>
              <p className="font-body text-sm text-muted-foreground">{v.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* College Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-xl border border-border bg-card p-6 shadow-card"
        >
          <h2 className="mb-4 font-display text-xl font-bold text-foreground">Our College Project</h2>
          <p className="mb-6 font-body text-sm leading-relaxed text-muted-foreground">
            <strong>YouthMart</strong> was proudly developed as a student project for <strong>Lakshmi Narain College of Technology (LNCT)</strong>. As one of the premier engineering institutions in Madhya Pradesh, located on Raisen Road, Bhopal, LNCT fosters a vibrant student community built on innovation, collaboration, and growth.
          </p>
          
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 font-display text-sm font-semibold text-foreground">📍 Address</h3>
              <p className="font-body text-xs text-muted-foreground">
                LNCT Campus, Kalchuri Nagar, (P.O. Kolua) Raisen Road, Bhopal-462022 (M.P.)
              </p>
            </div>
            
            <div>
              <h3 className="mb-2 font-display text-sm font-semibold text-foreground">📞 Contact</h3>
              <div className="space-y-1 font-body text-xs text-muted-foreground">
                <p>Reception: 0755-6185300</p>
                <p>Admissions: 7440777111, 0755-6185350</p>
                <p>Training & Placement: 9826062730</p>
              </div>
            </div>
            
            <div>
              <h3 className="mb-2 font-display text-sm font-semibold text-foreground">✉️ Email</h3>
              <div className="space-y-1 font-body text-xs text-muted-foreground">
                <p><a href="mailto:info@lnct.ac.in" className="text-primary hover:underline transition-colors">info@lnct.ac.in</a></p>
                <p><a href="mailto:admission@lnct.ac.in" className="text-primary hover:underline transition-colors">admission@lnct.ac.in</a></p>
                <p><a href="mailto:Jobs@lnct.ac.in" className="text-primary hover:underline transition-colors">Jobs@lnct.ac.in</a></p>
                <p><a href="mailto:Verification@lnct.ac.in" className="text-primary hover:underline transition-colors">Verification@lnct.ac.in</a> (Docs)</p>
              </div>
            </div>
            
            <div>
              <h3 className="mb-2 font-display text-sm font-semibold text-foreground">🌐 Website</h3>
              <p className="font-body text-xs">
                <a href="https://lnct.ac.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline transition-colors">
                  lnct.ac.in
                </a>
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  </div>
);

export default About;
