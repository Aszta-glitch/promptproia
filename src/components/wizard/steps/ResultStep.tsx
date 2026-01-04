import { useState } from 'react';
import { motion } from 'framer-motion';
import { WizardStep } from '../WizardStep';
import { useWizardStore } from '@/store/wizardStore';
import { Button } from '@/components/ui/button';
import { Copy, Download, Check, Lock, RotateCcw, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

export const ResultStep = () => {
  const { generatedPrompt, referenceImages, reset } = useWizardStore();
  const [copied, setCopied] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  const handleCopy = () => {
    // Show paywall for copy action
    setShowPaywall(true);
  };

  const handleExport = () => {
    // Show paywall for export action
    setShowPaywall(true);
  };

  const handleNewPrompt = () => {
    reset();
  };

  const handleFreeCopy = () => {
    if (generatedPrompt) {
      navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      toast.success('Prompt copiado! Lembre-se de anexar as imagens de referência no Lovable.');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (showPaywall) {
    return (
      <WizardStep
        stepKey="paywall"
        title="Desbloqueie o acesso completo"
        subtitle="Crie uma conta gratuita para copiar e salvar seus prompts"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="gradient-border p-8 rounded-3xl text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gradient-primary flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary-foreground" />
            </div>
            
            <h3 className="text-xl font-semibold mb-2">Conta Gratuita</h3>
            <p className="text-muted-foreground mb-6">
              Com uma conta gratuita você pode:
            </p>
            
            <ul className="text-left space-y-3 mb-8">
              {[
                'Copiar e exportar prompts',
                'Salvar até 5 prompts no histórico',
                'Acessar templates exclusivos',
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button variant="gradient" size="xl" className="w-full mb-4">
              Criar conta grátis
            </Button>
            
            <button
              onClick={() => setShowPaywall(false)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Voltar ao prompt
            </button>
          </div>
        </motion.div>
      </WizardStep>
    );
  }

  return (
    <WizardStep
      stepKey="result"
      title="Seu prompt está pronto! 🎉"
      subtitle="Copie e cole diretamente no Lovable"
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
                onClick={handleFreeCopy}
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
          className="grid grid-cols-2 gap-4"
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
            variant="gradient"
            size="lg"
            onClick={handleNewPrompt}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Novo Prompt
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
