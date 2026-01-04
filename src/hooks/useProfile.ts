import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  notifications_email: boolean;
  notifications_push: boolean;
  theme: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}

export interface UpdateProfileData {
  name?: string | null;
  notifications_email?: boolean;
  notifications_push?: boolean;
  theme?: string;
}

export function useProfile() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data as UserProfile;
    },
    enabled: !!user?.id,
  });

  const updateProfile = useMutation({
    mutationFn: async (profileData: UpdateProfileData) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
      toast.success('Configurações salvas!');
    },
    onError: (error) => {
      console.error('Error updating profile:', error);
      toast.error('Erro ao salvar configurações');
    },
  });

  return {
    profile,
    isLoading,
    error,
    updateProfile,
  };
}
