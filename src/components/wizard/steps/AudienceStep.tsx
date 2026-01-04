import { useState } from 'react';
import { motion } from 'framer-motion';
import { WizardStep } from '../WizardStep';
import { useWizardStore } from '@/store/wizardStore';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const AudienceStep = () => {
  const { targetAudience, setTargetAudience, nextStep, prevStep } = useWizardStore();
  const [localValue, setLocalValue] = useState(targetAudience);

  const handleContinue = () => {
    if (localValue.trim()) {
      setTargetAudience(localValue.trim());
      nextStep();
    }
  };

  return (
    <WizardStep
      stepKey="audience"
      title="Quem vai usar seu projeto?"
      subtitle="Defina seu público-alvo principal"
    >
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <textarea
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            placeholder="Ex: Empreendedores e pequenas empresas que precisam organizar seus processos"
            className="w-full h-32 p-4 bg-card border border-border rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-foreground placeholder:text-muted-foreground"
            autoFocus
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-4"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={prevStep}
            className="flex-1"
          >
            Voltar
          </Button>
          <Button
            variant="gradient"
            size="lg"
            onClick={handleContinue}
            disabled={!localValue.trim()}
            className="flex-1"
          >
            Continuar
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </WizardStep>
  );
};
