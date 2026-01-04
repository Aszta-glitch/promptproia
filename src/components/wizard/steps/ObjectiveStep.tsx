import { useState } from 'react';
import { motion } from 'framer-motion';
import { WizardStep } from '../WizardStep';
import { useWizardStore } from '@/store/wizardStore';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const placeholders: Record<string, string> = {
  crud: 'Ex: Gerenciar cadastro de clientes e pedidos de uma loja',
  dashboard: 'Ex: Visualizar métricas de vendas e desempenho do time',
  saas: 'Ex: Plataforma para agendamento de serviços online',
  landing: 'Ex: Apresentar meu produto e capturar leads',
  tool: 'Ex: Converter arquivos de um formato para outro',
};

export const ObjectiveStep = () => {
  const { objective, setObjective, projectType, nextStep, prevStep } = useWizardStore();
  const [localValue, setLocalValue] = useState(objective);

  const handleContinue = () => {
    if (localValue.trim()) {
      setObjective(localValue.trim());
      nextStep();
    }
  };

  return (
    <WizardStep
      stepKey="objective"
      title="Qual o objetivo principal?"
      subtitle="Descreva em uma frase o que seu projeto deve fazer"
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
            placeholder={placeholders[projectType || 'saas']}
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
