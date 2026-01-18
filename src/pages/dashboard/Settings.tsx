import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { useTheme, colorPresets, ColorPresetKey } from '@/hooks/useTheme';
import { User, Bell, Lock, Palette, Loader2, Check, Sun, Moon } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const nameSchema = z.string().max(100, 'Nome deve ter no máximo 100 caracteres');
const passwordSchema = z.string().min(6, 'Senha deve ter no mínimo 6 caracteres');

export default function Settings() {
  const { user } = useAuth();
  const { profile, isLoading, updateProfile } = useProfile();
  const { mode, colorPreset, setMode, setColorPreset } = useTheme();
  
  const [name, setName] = useState('');
  const [notificationsEmail, setNotificationsEmail] = useState(true);
  const [notificationsPush, setNotificationsPush] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Password change
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Load profile data when it's available
  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setNotificationsEmail(profile.notifications_email ?? true);
      setNotificationsPush(profile.notifications_push ?? false);
    }
  }, [profile]);

  const handleSaveProfile = async () => {
    try {
      nameSchema.parse(name);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
        return;
      }
    }

    setIsSaving(true);
    try {
      await updateProfile.mutateAsync({
        name: name.trim() || null,
        theme: `${mode}:${colorPreset}`,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleNotificationChange = async (type: 'email' | 'push', value: boolean) => {
    if (type === 'email') {
      setNotificationsEmail(value);
      await updateProfile.mutateAsync({ notifications_email: value });
      toast.success(value ? 'Notificações por email ativadas' : 'Notificações por email desativadas');
    } else {
      if (value) {
        // Request push notification permission
        if ('Notification' in window) {
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            setNotificationsPush(true);
            await updateProfile.mutateAsync({ notifications_push: true });
            toast.success('Notificações push ativadas');
            // Show test notification
            new Notification('PromptPro IA', {
              body: 'Notificações push ativadas com sucesso!',
              icon: '/favicon.ico'
            });
          } else {
            toast.error('Permissão de notificações negada pelo navegador');
          }
        } else {
          toast.error('Seu navegador não suporta notificações push');
        }
      } else {
        setNotificationsPush(false);
        await updateProfile.mutateAsync({ notifications_push: false });
        toast.success('Notificações push desativadas');
      }
    }
  };

  const handleModeChange = (isDark: boolean) => {
    setMode(isDark ? 'dark' : 'light');
    toast.success(isDark ? 'Modo escuro ativado' : 'Modo claro ativado');
  };

  const handleColorPresetChange = (preset: ColorPresetKey) => {
    setColorPreset(preset);
    toast.success(`Cor ${colorPresets[preset].name} aplicada`);
  };

  const handleChangePassword = async () => {
    // Validate passwords
    try {
      passwordSchema.parse(newPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
        return;
      }
    }

    if (newPassword !== confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    setIsChangingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success('Senha alterada com sucesso!');
      setShowPasswordDialog(false);
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast.error('Erro ao alterar senha');
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie suas preferências e conta
        </p>
      </div>

      <div className="space-y-6 max-w-2xl">
        {/* Profile Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle>Perfil</CardTitle>
            </div>
            <CardDescription>
              Informações da sua conta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user?.email || ''} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input 
                id="name" 
                placeholder="Seu nome" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
              />
            </div>
            <Button onClick={handleSaveProfile} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Notifications Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle>Notificações</CardTitle>
            </div>
            <CardDescription>
              Configure como você recebe notificações
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Notificações por email</p>
                <p className="text-xs text-muted-foreground">Receba atualizações por email</p>
              </div>
              <Switch 
                checked={notificationsEmail}
                onCheckedChange={(value) => handleNotificationChange('email', value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Notificações push</p>
                <p className="text-xs text-muted-foreground">Receba notificações no navegador</p>
              </div>
              <Switch 
                checked={notificationsPush}
                onCheckedChange={(value) => handleNotificationChange('push', value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Appearance Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              <CardTitle>Aparência</CardTitle>
            </div>
            <CardDescription>
              Personalize a interface do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Theme Mode Toggle */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Modo de Tema</Label>
              <div className="flex gap-3">
                <button
                  onClick={() => handleModeChange(false)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all",
                    mode === 'light' 
                      ? "border-primary bg-primary/10" 
                      : "border-border hover:border-muted-foreground"
                  )}
                >
                  <Sun className="h-5 w-5" />
                  <span className="font-medium">Claro</span>
                </button>
                <button
                  onClick={() => handleModeChange(true)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all",
                    mode === 'dark' 
                      ? "border-primary bg-primary/10" 
                      : "border-border hover:border-muted-foreground"
                  )}
                >
                  <Moon className="h-5 w-5" />
                  <span className="font-medium">Escuro</span>
                </button>
              </div>
            </div>

            {/* Color Presets */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Cor Principal</Label>
              <div className="grid grid-cols-4 gap-3">
                {(Object.keys(colorPresets) as ColorPresetKey[]).map((preset) => {
                  const colors = colorPresets[preset];
                  return (
                    <button
                      key={preset}
                      onClick={() => handleColorPresetChange(preset)}
                      className={cn(
                        "flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all",
                        colorPreset === preset 
                          ? "border-primary bg-primary/10" 
                          : "border-border hover:border-muted-foreground"
                      )}
                    >
                      <div 
                        className="w-8 h-8 rounded-full shadow-md"
                        style={{ backgroundColor: `hsl(${colors.primary})` }}
                      />
                      <span className="text-xs font-medium">{colors.name}</span>
                      {colorPreset === preset && (
                        <Check className="h-3 w-3 text-primary" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Pré-visualização</Label>
              <div className="p-4 rounded-lg border bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold">A</span>
                  </div>
                  <div>
                    <p className="font-medium">Exemplo de Usuário</p>
                    <p className="text-sm text-muted-foreground">usuario@exemplo.com</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm">Botão Primário</Button>
                  <Button size="sm" variant="outline">Secundário</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              <CardTitle>Segurança</CardTitle>
            </div>
            <CardDescription>
              Configurações de segurança da conta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" onClick={() => setShowPasswordDialog(true)}>
              Alterar Senha
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Password Change Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alterar Senha</DialogTitle>
            <DialogDescription>
              Digite sua nova senha abaixo
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">Nova Senha</Label>
              <Input 
                id="new-password" 
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
              <Input 
                id="confirm-password" 
                type="password"
                placeholder="Digite novamente"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleChangePassword} disabled={isChangingPassword}>
              {isChangingPassword ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Alterando...
                </>
              ) : (
                'Alterar Senha'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
