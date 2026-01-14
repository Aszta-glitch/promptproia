import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Users, Zap, Target, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onStart: () => void;
}

export const Hero = ({ onStart }: HeroProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Red glow effect top-right */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[150px]"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Red glow effect bottom-left */}
      <motion.div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/15 blur-[120px]"
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">SISTEMA ONLINE</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-secondary border border-border">
            <Sparkles className="w-3 h-3 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">v1.0.0</span>
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1] tracking-tight"
        >
          Crie Prompts<br />
          <span className="text-primary">Profissionais</span><br />
          Com IA em<br />
          Minutos
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl"
        >
          Plataforma de geração automatizada de prompts para Lovable, Cursor, 
          ChatGPT, Claude e mais. Sistema integrado com framework C.L.E.A.R.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-start gap-4 mb-12"
        >
          <Button
            onClick={onStart}
            size="lg"
            className="gap-2 px-8 py-7 text-lg font-semibold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:shadow-[0_0_40px_rgba(220,38,38,0.4)] transition-all"
          >
            ACESSAR PLATAFORMA
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button
            onClick={() => navigate('/leads')}
            variant="ghost"
            size="lg"
            className="gap-2 px-6 py-7 text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-transparent transition-all"
          >
            <Play className="w-5 h-5" />
            Ver Sistema
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center gap-8"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">+1.000</span> prompts criados
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">+500</span> usuários ativos
            </span>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16"
        >
          {[
            {
              icon: Zap,
              title: 'Menos de 3 min',
              description: '5 perguntas simples, resultado profissional',
            },
            {
              icon: Target,
              title: 'Framework C.L.E.A.R.',
              description: 'Metodologia comprovada para prompts eficazes',
            },
            {
              icon: Shield,
              title: 'Guardrails inclusos',
              description: 'Evite erros comuns automaticamente',
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="p-5 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors"
            >
              <div className="w-10 h-10 mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
