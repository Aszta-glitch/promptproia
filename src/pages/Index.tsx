import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hero } from '@/components/landing/Hero';
import { Wizard } from '@/components/wizard/Wizard';
import { Header } from '@/components/Header';
import { useWizardStore } from '@/store/wizardStore';

const Index = () => {
  const [showWizard, setShowWizard] = useState(false);
  const { reset } = useWizardStore();

  const handleStart = () => {
    reset();
    setShowWizard(true);
  };

  const handleBack = () => {
    reset();
    setShowWizard(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header showBackButton={showWizard} onBack={handleBack} />
      
      <AnimatePresence mode="wait">
        {!showWizard ? (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Hero onStart={handleStart} />
          </motion.div>
        ) : (
          <motion.div
            key="wizard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen pt-24 pb-12 flex items-center"
          >
            <Wizard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
