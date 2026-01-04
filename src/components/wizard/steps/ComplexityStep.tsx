import { OptionCard } from '../OptionCard';
import { WizardStep } from '../WizardStep';
import { useWizardStore, ComplexityLevel } from '@/store/wizardStore';
import { Button } from '@/components/ui/button';
import { Zap, Layers, Crown } from 'lucide-react';

const complexityOptions: { level: ComplexityLevel; title: string; description: string; icon: typeof Zap }[] = [
  {
    level: 'mvp',
    title: 'MVP (Mínimo Viável)',
    description: 'Funcionalidades essenciais para validar a ideia rapidamente',
    icon: Zap,
  },
  {
    level: 'intermediate',
    title: 'Intermediário',
    description: 'Funcionalidades completas com boa experiência de usuário',
    icon: Layers,
  },
  {
    level: 'advanced',
    title: 'Avançado',
    description: 'Todas as funcionalidades + integrações e features premium',
    icon: Crown,
  },
];

export const ComplexityStep = () => {
  const { complexity, setComplexity, nextStep, prevStep } = useWizardStore();

  const handleSelect = (level: ComplexityLevel) => {
    setComplexity(level);
    setTimeout(() => nextStep(), 300);
  };

  return (
    <WizardStep
      stepKey="complexity"
      title="Qual o nível de complexidade?"
      subtitle="Defina o escopo inicial do seu projeto"
    >
      <div className="space-y-6">
        <div className="grid gap-4">
          {complexityOptions.map((option, index) => (
            <OptionCard
              key={option.level}
              title={option.title}
              description={option.description}
              icon={option.icon}
              selected={complexity === option.level}
              onClick={() => handleSelect(option.level)}
              delay={index * 0.1}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="lg"
          onClick={prevStep}
          className="w-full"
        >
          Voltar
        </Button>
      </div>
    </WizardStep>
  );
};
