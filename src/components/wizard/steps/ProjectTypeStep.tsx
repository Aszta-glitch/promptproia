import { OptionCard } from '../OptionCard';
import { WizardStep } from '../WizardStep';
import { useWizardStore, ProjectType } from '@/store/wizardStore';
import { Database, BarChart3, Rocket, Layout, Wrench } from 'lucide-react';

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
      <div className="grid gap-4">
        {projectTypes.map((project, index) => (
          <OptionCard
            key={project.type}
            title={project.title}
            description={project.description}
            icon={project.icon}
            selected={projectType === project.type}
            onClick={() => handleSelect(project.type)}
            delay={index * 0.1}
          />
        ))}
      </div>
    </WizardStep>
  );
};
