import { OptionCard } from '../OptionCard';
import { WizardStep } from '../WizardStep';
import { useWizardStore, ProjectType } from '@/store/wizardStore';
import { Database, BarChart3, Rocket, Layout, Wrench, Smartphone, ShoppingCart, Globe, MessageSquare } from 'lucide-react';

const projectTypes: { type: ProjectType; title: string; description: string; icon: typeof Database; image?: string }[] = [
  {
    type: 'crud',
    title: 'CRUD / Admin Panel',
    description: 'Sistema de gestão com criação, leitura, edição e exclusão de dados',
    icon: Database,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
  },
  {
    type: 'dashboard',
    title: 'Dashboard Analytics',
    description: 'Painel de visualização de dados com gráficos e métricas',
    icon: BarChart3,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
  },
  {
    type: 'saas',
    title: 'SaaS / Aplicação Web',
    description: 'Produto SaaS completo com autenticação e funcionalidades avançadas',
    icon: Rocket,
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&h=200&fit=crop',
  },
  {
    type: 'landing',
    title: 'Landing Page',
    description: 'Página de conversão otimizada para marketing e vendas',
    icon: Layout,
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=200&fit=crop',
  },
  {
    type: 'tool',
    title: 'Ferramenta / Utilitário',
    description: 'Ferramenta online para resolver um problema específico',
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=200&fit=crop',
  },
  {
    type: 'mobile',
    title: 'App Mobile / PWA',
    description: 'Aplicativo mobile ou Progressive Web App responsivo',
    icon: Smartphone,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop',
  },
  {
    type: 'ecommerce',
    title: 'E-commerce / Loja',
    description: 'Loja virtual com catálogo, carrinho e checkout',
    icon: ShoppingCart,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop',
  },
  {
    type: 'portfolio',
    title: 'Portfólio / Blog',
    description: 'Site pessoal, portfólio criativo ou blog',
    icon: Globe,
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=200&fit=crop',
  },
  {
    type: 'chatbot',
    title: 'Chatbot / IA',
    description: 'Assistente virtual, chatbot ou aplicação com IA',
    icon: MessageSquare,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop',
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projectTypes.map((project, index) => (
          <OptionCard
            key={project.type}
            title={project.title}
            description={project.description}
            icon={project.icon}
            image={project.image}
            selected={projectType === project.type}
            onClick={() => handleSelect(project.type)}
            delay={index * 0.05}
          />
        ))}
      </div>
    </WizardStep>
  );
};
