import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { WizardStep } from '../WizardStep';
import { useWizardStore, ProjectType } from '@/store/wizardStore';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface Question {
  id: string;
  label: string;
  placeholder: string;
}

const generateContextQuestions = (objective: string, projectType: ProjectType | null): Question[] => {
  const baseQuestions: Question[] = [];
  const lowerObjective = objective.toLowerCase();

  // Perguntas baseadas em palavras-chave do objetivo
  if (lowerObjective.includes('cadastro') || lowerObjective.includes('gerenciar') || lowerObjective.includes('registrar')) {
    baseQuestions.push({
      id: 'dataFields',
      label: 'Quais informações precisam ser cadastradas?',
      placeholder: 'Ex: Nome, email, telefone, endereço, data de nascimento...',
    });
  }

  if (lowerObjective.includes('vend') || lowerObjective.includes('produto') || lowerObjective.includes('loja') || lowerObjective.includes('e-commerce')) {
    baseQuestions.push({
      id: 'productInfo',
      label: 'Quais informações dos produtos são importantes?',
      placeholder: 'Ex: Preço, estoque, categorias, fotos, descrição...',
    });
  }

  if (lowerObjective.includes('agendamento') || lowerObjective.includes('reserva') || lowerObjective.includes('horário')) {
    baseQuestions.push({
      id: 'scheduling',
      label: 'Como funciona o sistema de agendamento?',
      placeholder: 'Ex: Por horário, por profissional, com confirmação por email...',
    });
  }

  if (lowerObjective.includes('métrica') || lowerObjective.includes('relatório') || lowerObjective.includes('dashboard') || lowerObjective.includes('análise')) {
    baseQuestions.push({
      id: 'metrics',
      label: 'Quais métricas são mais importantes?',
      placeholder: 'Ex: Vendas totais, conversão, ticket médio, usuários ativos...',
    });
  }

  if (lowerObjective.includes('cliente') || lowerObjective.includes('usuário') || lowerObjective.includes('lead')) {
    baseQuestions.push({
      id: 'userJourney',
      label: 'Qual a jornada principal do usuário?',
      placeholder: 'Ex: Cadastra, busca serviço, agenda, paga, avalia...',
    });
  }

  if (lowerObjective.includes('pagamento') || lowerObjective.includes('assinatura') || lowerObjective.includes('plano')) {
    baseQuestions.push({
      id: 'payment',
      label: 'Como será o modelo de pagamento?',
      placeholder: 'Ex: Mensal, anual, por uso, freemium...',
    });
  }

  if (lowerObjective.includes('conteúdo') || lowerObjective.includes('post') || lowerObjective.includes('artigo') || lowerObjective.includes('blog')) {
    baseQuestions.push({
      id: 'content',
      label: 'Que tipos de conteúdo serão gerenciados?',
      placeholder: 'Ex: Textos, imagens, vídeos, documentos...',
    });
  }

  if (lowerObjective.includes('notifica') || lowerObjective.includes('alert') || lowerObjective.includes('aviso')) {
    baseQuestions.push({
      id: 'notifications',
      label: 'Quais notificações são necessárias?',
      placeholder: 'Ex: Email, push, SMS, in-app...',
    });
  }

  if (lowerObjective.includes('integra') || lowerObjective.includes('api') || lowerObjective.includes('conectar')) {
    baseQuestions.push({
      id: 'integrations',
      label: 'Quais integrações são necessárias?',
      placeholder: 'Ex: WhatsApp, Google Calendar, Stripe, Mailchimp...',
    });
  }

  if (lowerObjective.includes('converter') || lowerObjective.includes('transform') || lowerObjective.includes('processar')) {
    baseQuestions.push({
      id: 'processing',
      label: 'Qual o fluxo de processamento esperado?',
      placeholder: 'Ex: Upload arquivo, seleciona formato, processa, baixa resultado...',
    });
  }

  // Perguntas baseadas no tipo de projeto
  if (projectType === 'saas' && baseQuestions.length < 2) {
    baseQuestions.push({
      id: 'coreFeature',
      label: 'Qual a funcionalidade central do SaaS?',
      placeholder: 'Ex: Automação de tarefas, gestão de projetos, analytics...',
    });
  }

  if (projectType === 'landing' && baseQuestions.length < 2) {
    baseQuestions.push({
      id: 'conversion',
      label: 'Qual a ação principal que o visitante deve fazer?',
      placeholder: 'Ex: Cadastrar email, agendar demo, comprar produto...',
    });
  }

  if (projectType === 'dashboard' && baseQuestions.length < 2) {
    baseQuestions.push({
      id: 'dataSource',
      label: 'De onde vêm os dados do dashboard?',
      placeholder: 'Ex: API externa, banco de dados interno, planilhas...',
    });
  }

  // Pergunta genérica de funcionalidades se não tiver muitas perguntas
  if (baseQuestions.length < 2) {
    baseQuestions.push({
      id: 'mainFeatures',
      label: 'Quais são as 3 funcionalidades mais importantes?',
      placeholder: 'Ex: Login social, filtros avançados, exportar PDF...',
    });
  }

  // Pergunta sobre diferencial
  baseQuestions.push({
    id: 'differentiator',
    label: 'O que diferencia seu projeto dos concorrentes?',
    placeholder: 'Ex: Mais simples, mais rápido, melhor design, preço...',
  });

  // Limita a 3 perguntas para não sobrecarregar
  return baseQuestions.slice(0, 3);
};

export const ContextQuestionsStep = () => {
  const { objective, projectType, contextAnswers, setContextAnswers, nextStep, prevStep } = useWizardStore();
  const [localAnswers, setLocalAnswers] = useState<Record<string, string>>(contextAnswers);

  const questions = useMemo(
    () => generateContextQuestions(objective, projectType),
    [objective, projectType]
  );

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
      subtitle="Responda para gerar um prompt mais preciso"
    >
      <div className="space-y-5">
        {questions.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
          >
            <label className="block text-sm font-medium text-foreground mb-2">
              {question.label}
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
      </div>
    </WizardStep>
  );
};
