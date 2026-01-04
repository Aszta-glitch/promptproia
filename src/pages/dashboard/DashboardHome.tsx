import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Sparkles, FileText, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock data - in a real app this would come from the database
const mockPrompts = [
  { id: 1, title: 'Landing Page Moderna', type: 'Website', date: '04 Jan 2026' },
  { id: 2, title: 'App de Delivery', type: 'Aplicativo', date: '02 Jan 2026' },
  { id: 3, title: 'Dashboard Analytics', type: 'Sistema', date: '28 Dez 2025' },
];

export default function DashboardHome() {
  const { user } = useAuth();
  const navigate = useNavigate();

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
          <CardTitle className="text-5xl font-bold text-primary">{mockPrompts.length}</CardTitle>
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
          {mockPrompts.length > 0 ? (
            <div className="space-y-3">
              {mockPrompts.map((prompt) => (
                <div
                  key={prompt.id}
                  className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{prompt.title}</p>
                    <p className="text-xs text-muted-foreground">{prompt.type}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{prompt.date}</span>
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
    </div>
  );
}
