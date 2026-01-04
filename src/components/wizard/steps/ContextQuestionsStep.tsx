import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { WizardStep } from '../WizardStep';
import { useWizardStore } from '@/store/wizardStore';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: string;
  question: string;
  placeholder: string;
}

export const ContextQuestionsStep = () => {
  const { objective, projectType, contextAnswers, setContextAnswers, nextStep, prevStep } = useWizardStore();
  const [localAnswers, setLocalAnswers] = useState<Record<string, string>>(contextAnswers);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.functions.invoke('generate-questions', {
          body: { objective, projectType }
        });

        if (error) throw error;

        if (data?.questions && Array.isArray(data.questions)) {
          setQuestions(data.questions);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
        toast({
          title: "Erro ao gerar perguntas",
          description: "Usando perguntas padrão.",
          variant: "destructive",
        });
        // Fallback questions
        setQuestions([
          {
            id: 'main_features',
            question: 'Quais são as 3 funcionalidades mais importantes?',
            placeholder: 'Ex: Login social, filtros avançados, exportar PDF...',
          },
          {
            id: 'target_user',
            question: 'Quem é o usuário principal do sistema?',
            placeholder: 'Ex: Pequenas empresas, freelancers, estudantes...',
          },
          {
            id: 'differentiator',
            question: 'O que diferencia seu projeto dos concorrentes?',
            placeholder: 'Ex: Mais simples, mais rápido, melhor design...',
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    if (objective && projectType) {
      fetchQuestions();
    }
  }, [objective, projectType, toast]);

  const handleChange = (id: string, value: string) => {
    setLocalAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleContinue = () => {
    setContextAnswers(localAnswers);
    nextStep();
  };

  const isValid = questions.some((q) => localAnswers[q.id]?.trim());

  return (
    <WizardStep
      stepKey="context"
      title="Detalhes do projeto"
      subtitle="Perguntas geradas pela IA baseadas no seu objetivo"
    >
      <div className="space-y-5">
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 gap-4"
          >
            <div className="relative">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <Sparkles className="w-4 h-4 text-primary absolute -top-1 -right-1" />
            </div>
            <p className="text-muted-foreground text-sm">
              Gemini está gerando perguntas personalizadas...
            </p>
          </motion.div>
        ) : (
          <>
            {questions.map((question, index) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <label className="block text-sm font-medium text-foreground mb-2">
                  {question.question}
                </label>
                <input
                  type="text"
                  value={localAnswers[question.id] || ''}
                  onChange={(e) => handleChange(question.id, e.target.value)}
                  placeholder={question.placeholder}
                  className="w-full p-4 bg-card border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-foreground placeholder:text-muted-foreground"
                />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-4 pt-2"
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
                disabled={!isValid}
                className="flex-1"
              >
                Continuar
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </WizardStep>
  );
};
