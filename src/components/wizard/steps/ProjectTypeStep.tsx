import { OptionCard } from '../OptionCard';
import { WizardStep } from '../WizardStep';
import { useWizardStore, ProjectType } from '@/store/wizardStore';
import { Database, BarChart3, Rocket, Layout, Wrench, Smartphone, ShoppingCart, Globe, MessageSquare } from 'lucide-react';

const projectTypes: { type: ProjectType; title: string; description: string; icon: typeof Database }[] = [
  {
    type: 'crud',
    title: 'CRUD / Admin Panel',
    description: 'Sistema de gestão com criação, leitura, edição e exclusão de dados',
    icon: Database,
  },
  {
    type: 'dashboard',
    title: 'Dashboard Analytics',
    description: 'Painel de visualização de dados com gráficos e métricas',
    icon: BarChart3,
  },
  {
    type: 'saas',
    title: 'SaaS / Aplicação Web',
    description: 'Produto SaaS completo com autenticação e funcionalidades avançadas',
    icon: Rocket,
  },
  {
    type: 'landing',
    title: 'Landing Page',
    description: 'Página de conversão otimizada para marketing e vendas',
    icon: Layout,
  },
  {
    type: 'tool',
    title: 'Ferramenta / Utilitário',
    description: 'Ferramenta online para resolver um problema específico',
    icon: Wrench,
  },
  {
    type: 'mobile',
    title: 'App Mobile / PWA',
    description: 'Aplicativo mobile ou Progressive Web App responsivo',
    icon: Smartphone,
  },
  {
    type: 'ecommerce',
    title: 'E-commerce / Loja',
    description: 'Loja virtual com catálogo, carrinho e checkout',
    icon: ShoppingCart,
  },
  {
    type: 'portfolio',
    title: 'Portfólio / Blog',
    description: 'Site pessoal, portfólio criativo ou blog',
    icon: Globe,
  },
  {
    type: 'chatbot',
    title: 'Chatbot / IA',
    description: 'Assistente virtual, chatbot ou aplicação com IA',
    icon: MessageSquare,
  },
];

export const ProjectTypeStep = () => {
  const { projectType, setProjectType, nextStep } = useWizardStore();

  const handleSelect = (type: ProjectType) => {
    setProjectType(type);
    setTimeout(() => nextStep(), 300);
  };

  return (
    <WizardStep
      stepKey="project-type"
      title="Que tipo de projeto você quer criar?"
      subtitle="Escolha a categoria que melhor descreve sua ideia"
    >
      <div className="flex flex-col gap-3 max-w-md mx-auto">
        {projectTypes.map((project, index) => (
          <OptionCard
            key={project.type}
            title={project.title}
            description={project.description}
            icon={project.icon}
            selected={projectType === project.type}
            onClick={() => handleSelect(project.type)}
            delay={index * 0.03}
          />
        ))}
      </div>
    </WizardStep>
  );
};
