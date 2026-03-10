import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface CategoryCardProps {
  name: string;
  icon: string;
  count: number;
  index?: number;
}

const CategoryCard = ({ name, icon, count, index = 0 }: CategoryCardProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
  >
    <Link
      to={`/browse?category=${encodeURIComponent(name)}`}
      className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 hover:border-primary/30"
    >
      <span className="text-3xl transition-transform duration-300 group-hover:scale-110">{icon}</span>
      <span className="font-display text-sm font-semibold text-card-foreground">{name}</span>
      <span className="font-body text-xs text-muted-foreground">{count} items</span>
    </Link>
  </motion.div>
);

export default CategoryCard;
