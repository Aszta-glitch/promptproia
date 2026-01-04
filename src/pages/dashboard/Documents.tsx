import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Upload, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

const documents = [
  { id: 1, name: 'Relatório Mensal.pdf', date: '04 Jan 2026', size: '2.4 MB', type: 'PDF' },
  { id: 2, name: 'Contrato de Serviço.docx', date: '02 Jan 2026', size: '1.1 MB', type: 'DOCX' },
  { id: 3, name: 'Planilha Financeira.xlsx', date: '28 Dez 2025', size: '856 KB', type: 'XLSX' },
  { id: 4, name: 'Apresentação Q4.pptx', date: '20 Dez 2025', size: '5.2 MB', type: 'PPTX' },
  { id: 5, name: 'Manual de Usuário.pdf', date: '15 Dez 2025', size: '3.8 MB', type: 'PDF' },
];

export default function Documents() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Documentos</h1>
          <p className="text-muted-foreground">
            Gerencie seus arquivos e documentos
          </p>
        </div>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Upload
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar documentos..." className="pl-10" />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todos os Documentos</CardTitle>
          <CardDescription>
            {documents.length} documentos encontrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{doc.type} • {doc.size}</p>
                </div>
                <span className="text-xs text-muted-foreground">{doc.date}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
