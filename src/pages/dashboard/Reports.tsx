import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Download, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const reports = [
  { id: 1, name: 'Relatório de Vendas', period: 'Janeiro 2026', status: 'up', change: '+12%' },
  { id: 2, name: 'Análise de Custos', period: 'Q4 2025', status: 'down', change: '-5%' },
  { id: 3, name: 'Performance Mensal', period: 'Dezembro 2025', status: 'neutral', change: '0%' },
  { id: 4, name: 'Métricas de Usuários', period: 'Dezembro 2025', status: 'up', change: '+23%' },
];

export default function Reports() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Relatórios</h1>
          <p className="text-muted-foreground">
            Visualize e exporte seus relatórios
          </p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Exportar Todos
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Relatórios Gerados</CardDescription>
            <CardTitle className="text-3xl">24</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Este mês
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Downloads</CardDescription>
            <CardTitle className="text-3xl">156</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Últimos 30 dias
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Relatórios Recentes</CardTitle>
          <CardDescription>
            Últimos relatórios gerados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{report.name}</p>
                  <p className="text-xs text-muted-foreground">{report.period}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(report.status)}
                  <span className={`text-sm font-medium ${
                    report.status === 'up' ? 'text-green-500' : 
                    report.status === 'down' ? 'text-red-500' : 'text-muted-foreground'
                  }`}>
                    {report.change}
                  </span>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
