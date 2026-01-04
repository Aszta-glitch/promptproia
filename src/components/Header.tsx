import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface HeaderProps {
  showBackButton?: boolean;
  onBack?: () => void;
}

export const Header = ({ showBackButton, onBack }: HeaderProps) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center glow-primary">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg hidden sm:block">Prompt Mestre</span>
        </button>

        {showBackButton && (
          <button
            onClick={onBack}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Voltar ao início
          </button>
        )}
      </div>
    </motion.header>
  );
};
