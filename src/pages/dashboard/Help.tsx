import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HelpCircle, MessageCircle, Book, Mail, Search } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Como faço para criar um novo documento?',
    answer: 'Acesse a seção "Documentos" no menu lateral e clique no botão "Upload" para adicionar um novo arquivo.'
  },
  {
    question: 'Como exporto meus relatórios?',
    answer: 'Na seção "Relatórios", você pode clicar no ícone de download ao lado de cada relatório ou usar o botão "Exportar Todos".'
  },
  {
    question: 'Como altero minha senha?',
    answer: 'Vá em "Configurações" e na seção "Segurança", clique em "Alterar Senha" para atualizar suas credenciais.'
  },
  {
    question: 'Como entro em contato com o suporte?',
    answer: 'Você pode enviar um email para suporte@exemplo.com ou usar o chat de ajuda disponível nesta página.'
  },
];

export default function Help() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Ajuda</h1>
        <p className="text-muted-foreground">
          Central de ajuda e suporte
        </p>
      </div>

      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar na ajuda..." className="pl-10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Book className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-1">Documentação</h3>
            <p className="text-sm text-muted-foreground">Guias e tutoriais</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-1">Chat ao Vivo</h3>
            <p className="text-sm text-muted-foreground">Fale com um agente</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-1">Email</h3>
            <p className="text-sm text-muted-foreground">suporte@exemplo.com</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            <CardTitle>Perguntas Frequentes</CardTitle>
          </div>
          <CardDescription>
            Respostas para as dúvidas mais comuns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
