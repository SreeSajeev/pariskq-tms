import { ReactNode, useEffect } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { AppHeader } from '@/components/AppHeader';
import { useUIStore } from '@/stores/uiStore';
import { useAuthStore } from '@/stores/authStore';
import { mockUser, mockOrganisation, mockSubscription } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { sidebarCollapsed } = useUIStore();
  const { setAuth, isAuthenticated } = useAuthStore();

  // Mock auth for development
  useEffect(() => {
    if (!isAuthenticated) {
      setAuth(mockUser, mockOrganisation, mockSubscription);
    }
  }, [isAuthenticated, setAuth]);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div
        className={cn(
          'transition-all duration-200',
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
        )}
      >
        <AppHeader />
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
