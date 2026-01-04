import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { z } from 'zod';
import { SmokeyBackground, LoginForm } from '@/components/ui/login-form';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, role } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setIsLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setIsLoading(false);
      if (error.message.includes('Invalid login credentials')) {
        toast.error('Email ou senha incorretos');
      } else if (error.message.includes('Email not confirmed')) {
        toast.error('Email não confirmado');
      } else {
        toast.error('Erro ao fazer login');
      }
      return;
    }

    toast.success('Login realizado com sucesso!');
    
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // Redirect based on role when it's available
  if (role === 'admin') {
    navigate('/admin', { replace: true });
  } else if (role === 'user') {
    navigate('/dashboard', { replace: true });
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <SmokeyBackground 
        color="#6366f1" 
        backdropBlurAmount="md" 
        className="absolute inset-0"
      />
      <LoginForm
        email={email}
        password={password}
        isLoading={isLoading}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
