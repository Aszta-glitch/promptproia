import { motion } from 'framer-motion';
import { WizardStep } from '../WizardStep';
import { useWizardStore, AIPlatform } from '@/store/wizardStore';
import { 
  Sparkles, 
  Zap, 
  Code2, 
  MessageSquare, 
  Bot,
  Cpu,
  Terminal,
  Layers
} from 'lucide-react';

interface PlatformOption {
  id: AIPlatform;
  name: string;
  description: string;
  icon: typeof Sparkles;
  color: string;
}

const platforms: PlatformOption[] = [
  {
    id: 'lovable',
    name: 'Lovable',
    description: 'Apps completos com React, Tailwind e Supabase',
    icon: Sparkles,
    color: 'from-pink-500 to-violet-500',
  },
  {
    id: 'cursor',
    name: 'Cursor',
    description: 'IDE com IA para desenvolvimento profissional',
    icon: Code2,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'bolt',
    name: 'Bolt.new',
    description: 'Prototipagem rápida de aplicações web',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 'v0',
    name: 'v0 (Vercel)',
    description: 'Componentes UI com shadcn/ui',
    icon: Layers,
    color: 'from-gray-600 to-gray-800',
  },
  {
    id: 'replit',
    name: 'Replit',
    description: 'Ambiente de desenvolvimento online',
    icon: Terminal,
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'Assistente geral para código e ideias',
    icon: Bot,
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Raciocínio avançado e código detalhado',
    icon: MessageSquare,
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    description: 'Autocompletar código no editor',
    icon: Cpu,
    color: 'from-gray-500 to-gray-700',
  },
  {
    id: 'other',
    name: 'GitHub Copilot',
    description: 'Autocompletar código no editor',
    icon: Cpu,
    color: 'from-gray-500 to-gray-700',
  },
  {
    id: 'other',
    name: 'Outra IA',
    description: 'Windsurf, Codeium, Amazon Q, etc.',
    icon: Bot,
    color: 'from-purple-500 to-pink-500',
  },
];

export const AIPlatformStep = () => {
  const { aiPlatform, setAIPlatform, nextStep } = useWizardStore();

  const handleSelect = (platform: AIPlatform) => {
    setAIPlatform(platform);
    setTimeout(() => nextStep(), 200);
  };

  return (
    <WizardStep
      stepKey="ai-platform"
      title="Para qual IA você quer gerar o prompt?"
      subtitle="Cada plataforma tem seu estilo de prompt otimizado"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {platforms.map((platform, index) => {
          const Icon = platform.icon;
          const isSelected = aiPlatform === platform.id;
          
          return (
            <motion.button
              key={platform.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleSelect(platform.id)}
              className={`
                relative p-4 rounded-xl border-2 text-left transition-all duration-300
                hover:scale-[1.02] hover:shadow-lg
                ${isSelected 
                  ? 'border-primary bg-primary/10 shadow-lg' 
                  : 'border-border bg-card hover:border-primary/50'
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div className={`
                  p-2 rounded-lg bg-gradient-to-br ${platform.color}
                  flex items-center justify-center
                `}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-sm">
                    {platform.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                    {platform.description}
                  </p>
                </div>
              </div>
              
              {isSelected && (
                <motion.div
                  layoutId="selected-platform"
                  className="absolute inset-0 border-2 border-primary rounded-xl pointer-events-none"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </WizardStep>
  );
};
