import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface WizardStepProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  stepKey: string;
}

export const WizardStep = ({ children, title, subtitle, stepKey }: WizardStepProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepKey}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-2xl mx-auto"
      >
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-3"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
