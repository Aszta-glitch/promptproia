import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Hero } from '@/components/landing/Hero';
import { Wizard } from '@/components/wizard/Wizard';
import { Header } from '@/components/Header';
import { useWizardStore } from '@/store/wizardStore';

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showWizard, setShowWizard] = useState(false);
  const { reset } = useWizardStore();

  // Check URL param on mount to start wizard directly
  useEffect(() => {
    if (searchParams.get('create') === 'true') {
      reset();
      setShowWizard(true);
      // Clean up the URL param
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, reset, setSearchParams]);

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
