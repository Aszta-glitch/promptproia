import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { 
  LogOut, 
  LayoutDashboard, 
  Settings, 
  User, 
  Menu,
  Users,
  Home
} from 'lucide-react';
import { toast } from 'sonner';
import { NavLink, useLocation, useNavigate, Routes, Route } from 'react-router-dom';
import DashboardHome from './dashboard/DashboardHome';
import SettingsPage from './dashboard/Settings';
import FindLeads from './dashboard/FindLeads';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Encontrar Clientes', url: '/dashboard/leads', icon: Users },
  { title: 'Configurações', url: '/dashboard/settings', icon: Settings },
];

function DashboardSidebar() {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    toast.success('Logout realizado');
  };

  const isActive = (url: string) => {
    if (url === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(url);
  };

  return (
    <Sidebar className="border-r border-border/50">
      <SidebarHeader className="border-b border-border/50 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{user?.email}</p>
            <p className="text-xs text-muted-foreground">Usuário</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={isActive(item.url)}
                  >
                    <NavLink to={item.url} end={item.url === '/dashboard'}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="mt-auto p-4 border-t border-border/50 space-y-2">
        <Button variant="outline" className="w-full justify-start" asChild>
          <NavLink to="/">
            <Home className="h-4 w-4 mr-2" />
            Página Inicial
          </NavLink>
        </Button>
        <Button variant="outline" className="w-full justify-start" onClick={handleSignOut}>
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </div>
    </Sidebar>
  );
}

export default function Dashboard() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        
        <main className="flex-1">
          {/* Top Bar */}
          <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-40 h-16 flex items-center px-4 gap-4">
            <SidebarTrigger>
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            <div className="flex-1" />
          </header>

          {/* Content */}
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="leads" element={<FindLeads />} />
            <Route path="settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </SidebarProvider>
  );
}
