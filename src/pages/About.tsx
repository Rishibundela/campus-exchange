import { motion } from "framer-motion";
import { BookOpen, Heart, Recycle, Target, Users, Zap } from "lucide-react";

const About = () => (
  <div>
    <section className="bg-hero-gradient py-16">
      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-4 font-display text-4xl font-extrabold text-primary-foreground">About YouthMart</h1>
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
      </div>
    </section>
  </div>
);

export default About;
