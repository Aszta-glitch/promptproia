import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, FileText, ArrowRight, Copy, Check, Trash2, X, Eye } from 'lucide-react';
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
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Meus Prompts</h1>
        <p className="text-muted-foreground">
          Gerencie e crie novos prompts para suas ideias
        </p>
      </div>

      {/* Stats Card */}
      <Card className="mb-8">
        <CardHeader className="pb-2">
          <CardDescription>Total de Prompts Criados</CardDescription>
          <CardTitle className="text-5xl font-bold text-primary">
            {isLoading ? '...' : promptCount}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Create New Prompt Button */}
      <Button 
        size="lg" 
        className="w-full mb-8 h-16 text-lg gap-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg"
        onClick={() => navigate('/')}
      >
        <Sparkles className="h-6 w-6" />
        Criar Novo Prompt
        <ArrowRight className="h-5 w-5 ml-auto" />
      </Button>

      {/* Prompts List */}
      <Card>
        <CardHeader>
          <CardTitle>Seus Prompts</CardTitle>
          <CardDescription>
            Histórico de prompts criados
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Carregando...</p>
            </div>
          ) : prompts.length > 0 ? (
            <div className="space-y-3">
              {prompts.map((prompt) => (
                <div
                  key={prompt.id}
                  onClick={() => setSelectedPrompt(prompt)}
                  className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer group"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{prompt.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {prompt.project_type ? projectTypeLabels[prompt.project_type] || prompt.project_type : 'Prompt'}
                      {prompt.ai_platform && ` • ${platformLabels[prompt.ai_platform] || prompt.ai_platform}`}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(prompt.created_at)}
                  </span>
                  <Eye className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Você ainda não criou nenhum prompt</p>
              <Button variant="link" onClick={() => navigate('/')}>
                Criar seu primeiro prompt
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

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
                <div className="bg-muted/50 rounded-lg p-4 max-h-64 overflow-y-auto">
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
