import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OptionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  selected?: boolean;
  onClick: () => void;
  delay?: number;
  image?: string;
}

export const OptionCard = ({
  title,
  description,
  icon: Icon,
  selected,
  onClick,
  delay = 0,
  image,
}: OptionCardProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "w-full rounded-2xl text-left transition-all duration-300 gradient-border overflow-hidden",
        selected
          ? "bg-secondary/80 glow-soft"
          : "bg-card hover:bg-secondary/50"
      )}
    >
      {image && (
        <div className="relative h-28 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        </div>
      )}
      <div className={cn("p-4", image ? "pt-3" : "p-6")}>
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "p-3 rounded-xl transition-all duration-300 shrink-0",
              selected ? "gradient-primary" : "bg-secondary"
            )}
          >
            <Icon
              className={cn(
                "w-5 h-5 transition-colors",
                selected ? "text-primary-foreground" : "text-muted-foreground"
              )}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold mb-1">{title}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
          </div>
          <div
            className={cn(
              "w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center shrink-0",
              selected
                ? "border-primary bg-primary"
                : "border-muted-foreground"
            )}
          >
            {selected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-2 h-2 bg-primary-foreground rounded-full"
              />
            )}
          </div>
        </div>
      </div>
    </motion.button>
  );
};
