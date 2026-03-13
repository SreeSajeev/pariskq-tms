import { useState } from 'react';
import { Search, Bell, Menu, AlertCircle, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';
import { useNotifications } from '@/hooks/useNotifications';
import { timeAgo } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function AppHeader() {
  const { user, subscription } = useAuthStore();
  const { setSidebarMobileOpen } = useUIStore();
  const { data: notifications } = useNotifications();
  const [searchFocused, setSearchFocused] = useState(false);

  const unreadCount = notifications?.filter(n => !n.isRead).length ?? 0;

  const trialDaysLeft = subscription?.trialEndsAt
    ? Math.max(0, Math.ceil((new Date(subscription.trialEndsAt).getTime() - Date.now()) / 86400000))
    : null;

  return (
    <>
      <header className="sticky top-0 z-30 flex h-[60px] items-center justify-between border-b border-border bg-card px-4 lg:px-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden text-foreground"
            onClick={() => setSidebarMobileOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Center — Search */}
        <div className="hidden md:block flex-1 max-w-md mx-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search shipments, vehicles, drivers... (Ctrl+K)"
              className={cn(
                'pl-9 h-[34px] text-[13px] border-transparent bg-muted rounded-md transition-all',
                searchFocused && 'bg-card border-primary'
              )}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Trial badge */}
          {trialDaysLeft !== null && subscription?.status === 'TRIALING' && (
            <Link
              to="/settings/subscription"
              className="hidden sm:flex items-center gap-1.5 rounded-full border border-warning bg-warning-bg px-3 py-1 text-xs font-semibold text-warning-text"
            >
              <AlertCircle className="h-3.5 w-3.5 text-warning" />
              {trialDaysLeft}d left — Upgrade
            </Link>
          )}

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative p-2 text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted">
                <Bell className="h-5 w-5" strokeWidth={1.5} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white px-1">
                    {unreadCount}
                  </span>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="px-3 py-2 border-b">
                <p className="text-sm font-semibold">Notifications</p>
              </div>
              {notifications?.slice(0, 5).map(n => (
                <DropdownMenuItem key={n.id} asChild>
                  <Link to={n.actionUrl ?? '#'} className="flex flex-col items-start gap-0.5 px-3 py-2">
                    <span className={cn('text-sm', !n.isRead && 'font-medium')}>{n.title}</span>
                    <span className="text-xs text-muted-foreground">{n.message}</span>
                    <span className="text-[11px] text-muted-foreground/70">{timeAgo(n.createdAt)}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/notifications" className="text-xs text-center w-full justify-center text-primary">
                  View all notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 p-1.5 rounded-md hover:bg-muted transition-colors">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {user?.fullName?.charAt(0) ?? 'U'}
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <div className="px-3 py-2 border-b">
                <p className="text-sm font-medium">{user?.fullName ?? 'User'}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <DropdownMenuItem asChild><Link to="/settings">Settings</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to="/settings/subscription">Subscription</Link></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-error">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Trial Banner */}
      {trialDaysLeft !== null && subscription?.status === 'TRIALING' && (
        <div className="border-b-2 border-warning bg-warning-bg px-4 py-2 flex items-center justify-center gap-2 text-sm">
          <AlertCircle className="h-4 w-4 text-warning" />
          <span className="text-warning-text font-medium">
            🎉 You're on a free trial · {trialDaysLeft} days remaining ·{' '}
            <Link to="/settings/subscription" className="text-primary underline font-semibold">
              Upgrade now →
            </Link>
          </span>
        </div>
      )}
    </>
  );
}
