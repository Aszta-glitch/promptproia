import { motion } from 'framer-motion';
import { Sparkles, Zap, Target, Shield, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DottedSurface } from '@/components/ui/dotted-surface';
import { GetStartedButton } from '@/components/ui/get-started-button';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onStart: () => void;
}

export const Hero = ({ onStart }: HeroProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* 3D Dotted Surface Background */}
      <DottedSurface className="!opacity-50" />
      
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" style={{ zIndex: 1 }} />
      
      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full gradient-primary opacity-20 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent opacity-10 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Gerador profissional de prompts</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          Astra<span className="gradient-text">X</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Crie prompts otimizados para Lovable, Cursor, ChatGPT, Claude e mais.
          Em menos de 3 minutos, resultados profissionais.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <GetStartedButton onClick={onStart}>
            Criar meu prompt
          </GetStartedButton>
          <Button
            onClick={() => navigate('/leads')}
            variant="outline"
            size="lg"
            className="gap-2 px-8 py-6 text-lg rounded-xl border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all"
          >
            <Users className="w-5 h-5" />
            Encontrar Clientes
          </Button>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
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
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="gradient-border p-6 rounded-2xl text-center"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl gradient-primary flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
