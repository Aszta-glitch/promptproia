import { OptionCard } from '../OptionCard';
import { WizardStep } from '../WizardStep';
import { useWizardStore, VisualStyle } from '@/store/wizardStore';
import { Button } from '@/components/ui/button';
import { generatePrompt } from '@/lib/promptGenerator';
import { Minus, Sparkles, Flame } from 'lucide-react';

const styleOptions: { style: VisualStyle; title: string; description: string; icon: typeof Minus }[] = [
  {
    style: 'minimalist',
    title: 'Minimalista',
    description: 'Clean, muito espaço em branco, foco na funcionalidade',
    icon: Minus,
  },
  {
    style: 'modern',
    title: 'Moderno',
    description: 'Gradientes sutis, sombras suaves, animações fluidas',
    icon: Sparkles,
  },
  {
    style: 'bold',
    title: 'Ousado / Impactante',
    description: 'Cores vibrantes, tipografia expressiva, elementos marcantes',
    icon: Flame,
  },
];

export const VisualStyleStep = () => {
  const { 
    visualStyle, 
    setVisualStyle, 
    projectType, 
    objective,
    contextAnswers,
    targetAudience, 
    complexity,
    referenceImages,
    setGeneratedPrompt,
    nextStep,
    prevStep 
  } = useWizardStore();

  const handleSelect = (style: VisualStyle) => {
    setVisualStyle(style);
    
    // Generate the prompt
    if (projectType && complexity) {
      const prompt = generatePrompt(
        projectType,
        objective,
        contextAnswers,
        targetAudience,
        complexity,
        style,
        referenceImages
      );
      setGeneratedPrompt(prompt);
      setTimeout(() => nextStep(), 300);
    }
  };

  return (
    <WizardStep
      stepKey="visual-style"
      title="Qual estilo visual você prefere?"
      subtitle="Escolha a estética que combina com seu projeto"
    >
      <div className="space-y-6">
        <div className="grid gap-4">
          {styleOptions.map((option, index) => (
            <OptionCard
              key={option.style}
              title={option.title}
              description={option.description}
              icon={option.icon}
              selected={visualStyle === option.style}
              onClick={() => handleSelect(option.style)}
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
