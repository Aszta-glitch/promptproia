import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, FileText, ArrowRight, Copy, Check, Trash2, Eye, Zap, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePrompts, Prompt } from '@/hooks/usePrompts';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { DottedSurface } from '@/components/ui/dotted-surface';

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

const platformLabels: Record<string, string> = {
  'lovable': 'Lovable',
  'cursor': 'Cursor',
  'bolt': 'Bolt',
  'v0': 'v0',
  'replit': 'Replit',
  'chatgpt': 'ChatGPT',
  'claude': 'Claude',
  'copilot': 'Copilot',
  'other': 'Outro',
};

export default function DashboardHome() {
  const navigate = useNavigate();
  const { prompts, isLoading, promptCount, deletePrompt } = usePrompts();
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    toast.success('Prompt copiado!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeletePrompt = async (promptId: string) => {
    await deletePrompt.mutateAsync(promptId);
    setSelectedPrompt(null);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMM yyyy, HH:mm", { locale: ptBR });
  };

  return (
    <div className="p-6 relative min-h-full">
      {/* Background */}
      <DottedSurface className="!opacity-30" />
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />

      <div className="relative z-10">
        {/* Header with Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Gerador profissional de prompts</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Meus Prompts</h1>
          <p className="text-muted-foreground">
            Gerencie e crie novos prompts para suas ideias
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <div className="gradient-border p-6 rounded-2xl text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl gradient-primary flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-semibold mb-2">Total de Prompts</h3>
            <p className="text-4xl font-bold text-primary">
              {isLoading ? '...' : promptCount}
            </p>
          </div>

          <div className="gradient-border p-6 rounded-2xl text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl gradient-primary flex items-center justify-center">
              <Target className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-semibold mb-2">Crie mais prompts</h3>
            <p className="text-sm text-muted-foreground">
              Use nossa ferramenta profissional
            </p>
          </div>
        </motion.div>

        {/* Create New Prompt Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Button 
            size="lg" 
            className="w-full h-16 text-lg gap-3 gradient-primary hover:opacity-90 shadow-lg rounded-2xl"
            onClick={() => navigate('/?create=true')}
          >
            <Sparkles className="h-6 w-6" />
            Criar Novo Prompt
            <ArrowRight className="h-5 w-5 ml-auto" />
          </Button>
        </motion.div>

        {/* Prompts List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="gradient-border rounded-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold">Seus Prompts</h3>
            <p className="text-sm text-muted-foreground">Histórico de prompts criados</p>
          </div>
          
          <div className="p-4">
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Carregando...</p>
              </div>
            ) : prompts.length > 0 ? (
              <div className="space-y-3">
                {prompts.map((prompt, index) => (
                  <motion.div
                    key={prompt.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => setSelectedPrompt(prompt)}
                    className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-border/50 hover:bg-secondary/50 hover:border-primary/30 transition-all cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{prompt.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {prompt.project_type ? projectTypeLabels[prompt.project_type] || prompt.project_type : 'Prompt'}
                        {prompt.ai_platform && ` • ${platformLabels[prompt.ai_platform] || prompt.ai_platform}`}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground hidden md:block">
                      {formatDate(prompt.created_at)}
                    </span>
                    <Eye className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl gradient-primary flex items-center justify-center opacity-50">
                  <Sparkles className="h-8 w-8 text-primary-foreground" />
                </div>
                <p className="text-muted-foreground mb-4">Você ainda não criou nenhum prompt</p>
                <Button variant="link" onClick={() => navigate('/?create=true')} className="text-primary">
                  Criar seu primeiro prompt
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Prompt Detail Dialog */}
      <Dialog open={!!selectedPrompt} onOpenChange={() => setSelectedPrompt(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="pr-8">{selectedPrompt?.title}</DialogTitle>
            <DialogDescription className="flex items-center gap-2 flex-wrap">
              {selectedPrompt?.project_type && (
                <Badge variant="secondary">
                  {projectTypeLabels[selectedPrompt.project_type] || selectedPrompt.project_type}
                </Badge>
              )}
              {selectedPrompt?.ai_platform && (
                <Badge variant="outline">
                  {platformLabels[selectedPrompt.ai_platform] || selectedPrompt.ai_platform}
                </Badge>
              )}
              {selectedPrompt?.complexity && (
                <Badge variant="outline">{selectedPrompt.complexity}</Badge>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto space-y-4">
            {selectedPrompt?.objective && (
              <div>
                <h4 className="text-sm font-medium mb-1">Objetivo</h4>
                <p className="text-sm text-muted-foreground">{selectedPrompt.objective}</p>
              </div>
            )}

            {selectedPrompt?.audience && (
              <div>
                <h4 className="text-sm font-medium mb-1">Público-alvo</h4>
                <p className="text-sm text-muted-foreground">{selectedPrompt.audience}</p>
              </div>
            )}

            {selectedPrompt?.generated_prompt && (
              <div>
                <h4 className="text-sm font-medium mb-2">Prompt Gerado</h4>
                <div className="bg-muted/50 rounded-lg p-4 max-h-64 overflow-y-auto border border-border">
                  <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono">
                    {selectedPrompt.generated_prompt}
                  </pre>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-4 border-t">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => selectedPrompt?.generated_prompt && handleCopyPrompt(selectedPrompt.generated_prompt)}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar Prompt
                </>
              )}
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => selectedPrompt && handleDeletePrompt(selectedPrompt.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
