import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface Prompt {
  id: string;
  user_id: string;
  title: string;
  project_type: string | null;
  objective: string | null;
  audience: string | null;
  complexity: string | null;
  visual_style: string | null;
  ai_platform: string | null;
  context_answers: Record<string, string> | null;
  generated_prompt: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreatePromptData {
  title: string;
  project_type?: string | null;
  objective?: string | null;
  audience?: string | null;
  complexity?: string | null;
  visual_style?: string | null;
  ai_platform?: string | null;
  context_answers?: Record<string, string> | null;
  generated_prompt?: string | null;
}

export function usePrompts() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: prompts = [], isLoading, error } = useQuery({
    queryKey: ['prompts', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Prompt[];
    },
    enabled: !!user?.id,
  });

  const createPrompt = useMutation({
    mutationFn: async (promptData: CreatePromptData) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('prompts')
        .insert({
          user_id: user.id,
          ...promptData,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prompts', user?.id] });
      toast.success('Prompt salvo com sucesso!');
    },
    onError: (error) => {
      console.error('Error creating prompt:', error);
      toast.error('Erro ao salvar prompt');
    },
  });

  const deletePrompt = useMutation({
    mutationFn: async (promptId: string) => {
      const { error } = await supabase
        .from('prompts')
        .delete()
        .eq('id', promptId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prompts', user?.id] });
      toast.success('Prompt excluído');
    },
    onError: (error) => {
      console.error('Error deleting prompt:', error);
      toast.error('Erro ao excluir prompt');
    },
  });

  return {
    prompts,
    isLoading,
    error,
    createPrompt,
    deletePrompt,
    promptCount: prompts.length,
  };
}
