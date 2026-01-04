import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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
        <div /> {/* Spacer */}

        <div className="flex items-center gap-4">
          {showBackButton && (
            <button
              onClick={onBack}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Voltar ao início
            </button>
          )}
          
          <Link to="/login">
            <Button variant="outline" size="sm" className="gap-2">
              <LogIn className="h-4 w-4" />
              Entrar
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
};
