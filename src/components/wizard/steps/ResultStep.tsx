import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { WizardStep } from '../WizardStep';
import { useWizardStore } from '@/store/wizardStore';
import { Button } from '@/components/ui/button';
import { Copy, Download, Check, RotateCcw, Image as ImageIcon, Save } from 'lucide-react';
import { toast } from 'sonner';
import { platformLabels } from '@/lib/promptGenerator';
import { usePrompts } from '@/hooks/usePrompts';
import { useAuth } from '@/hooks/useAuth';

export const ResultStep = () => {
  const { generatedPrompt, referenceImages, aiPlatform, projectType, objective, targetAudience, complexity, visualStyle, contextAnswers, reset } = useWizardStore();
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const { createPrompt } = usePrompts();
  const { user } = useAuth();

  const handleSavePrompt = async () => {
    if (!user) {
      toast.error('Você precisa estar logado para salvar prompts');
      return;
    }

    // Generate a title based on project type and objective
    const projectTypeLabels: Record<string, string> = {
      'crud': 'Sistema CRUD',
      'dashboard': 'Dashboard',
      'saas': 'SaaS',
      'landing': 'Landing Page',
      'tool': 'Ferramenta',
      'mobile': 'App Mobile',
      'ecommerce': 'E-commerce',
      'portfolio': 'Portfólio',
      'chatbot': 'Chatbot',
    };

    const title = objective 
      ? objective.substring(0, 50) + (objective.length > 50 ? '...' : '')
      : projectType 
        ? projectTypeLabels[projectType] || projectType
        : 'Prompt sem título';

    await createPrompt.mutateAsync({
      title,
      project_type: projectType,
      objective,
      audience: targetAudience,
      complexity,
      visual_style: visualStyle,
      ai_platform: aiPlatform,
      context_answers: contextAnswers,
      generated_prompt: generatedPrompt,
    });

    setSaved(true);
  };

  const handleExport = () => {
    if (generatedPrompt) {
      const blob = new Blob([generatedPrompt], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'prompt.txt';
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Prompt exportado!');
    }
  };

  const handleNewPrompt = () => {
    reset();
  };

  const handleCopy = () => {
    if (generatedPrompt) {
      navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      toast.success('Prompt copiado! Lembre-se de anexar as imagens de referência no Lovable.');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const platformName = aiPlatform ? platformLabels[aiPlatform] : 'IA';

  return (
    <WizardStep
      stepKey="result"
      title="Seu prompt está pronto! 🎉"
      subtitle={`Otimizado para ${platformName}`}
    >
      <div className="space-y-6">
        {/* Reference Images Preview */}
        {referenceImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="gradient-border rounded-2xl overflow-hidden"
          >
            <div className="bg-card p-4 border-b border-border flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Imagens de Referência ({referenceImages.length})</span>
            </div>
            <div className="p-4 bg-background/50">
              <div className="grid grid-cols-3 gap-3">
                {referenceImages.map((img, index) => (
                  <div key={index} className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <img
                      src={img}
                      alt={`Referência ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                ⚠️ Anexe estas imagens junto com o prompt no Lovable
              </p>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="gradient-border rounded-2xl overflow-hidden"
        >
          <div className="bg-card p-4 border-b border-border flex items-center justify-between">
            <span className="text-sm font-medium gradient-text">Prompt Gerado</span>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="text-muted-foreground hover:text-foreground"
              >
                {copied ? (
                  <Check className="w-4 h-4 mr-1" />
                ) : (
                  <Copy className="w-4 h-4 mr-1" />
                )}
                {copied ? 'Copiado!' : 'Copiar'}
              </Button>
            </div>
          </div>
          
          <div className="p-6 max-h-96 overflow-y-auto bg-background/50">
            <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed">
              {generatedPrompt}
            </pre>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-3 gap-4"
        >
          <Button
            variant="gradient-outline"
            size="lg"
            onClick={handleExport}
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button
            variant="gradient-outline"
            size="lg"
            onClick={handleSavePrompt}
            disabled={saved || createPrompt.isPending}
          >
            {saved ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Salvo
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </>
            )}
          </Button>
          <Button
            variant="gradient"
            size="lg"
            onClick={handleNewPrompt}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Novo
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-muted-foreground"
        >
          {referenceImages.length > 0 
            ? 'Dica: Cole o prompt e anexe as imagens de referência no Lovable ✨'
            : 'Dica: Cole o prompt no Lovable e veja a mágica acontecer ✨'
          }
        </motion.p>
      </div>
    </WizardStep>
  );
};
