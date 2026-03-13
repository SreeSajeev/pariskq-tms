import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, Truck, Users, MapPin, Receipt,
  BarChart3, Settings, ChevronLeft, ChevronRight, LogOut,
  ChevronDown, User2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';
import { StatusBadge } from '@/components/StatusBadge';

interface NavItem {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  badge?: string;
  children?: { label: string; href: string }[];
  tierBadge?: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Shipments', href: '/shipments', icon: Package, badge: '5' },
  {
    label: 'Fleet', href: '/fleet', icon: Truck,
    children: [
      { label: 'Vehicles', href: '/fleet/vehicles' },
      { label: 'Drivers', href: '/fleet/drivers' },
    ],
  },
  { label: 'Customers', href: '/customers', icon: Users },
  { label: 'Live Map', href: '/map', icon: MapPin, tierBadge: 'Growth+' },
  {
    label: 'Billing', href: '/billing', icon: Receipt,
    children: [
      { label: 'Invoices', href: '/billing/invoices' },
      { label: 'Payments', href: '/billing/payments' },
    ],
  },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { sidebarCollapsed, toggleSidebar, sidebarMobileOpen, setSidebarMobileOpen } = useUIStore();
  const { user, organisation } = useAuthStore();
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + '/');

  const toggleGroup = (label: string) => {
    setExpandedGroups(prev =>
      prev.includes(label) ? prev.filter(g => g !== label) : [...prev, label]
    );
  };

  // Auto expand group if child is active
  useEffect(() => {
    navItems.forEach(item => {
      if (item.children?.some(c => isActive(c.href))) {
        setExpandedGroups(prev => prev.includes(item.label) ? prev : [...prev, item.label]);
      }
    });
  }, [location.pathname]);

  return (
    <>
      {/* Mobile overlay */}
      {sidebarMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-screen flex flex-col bg-primary border-r border-sidebar-border transition-all duration-200',
          sidebarCollapsed ? 'w-16' : 'w-60',
          sidebarMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="flex h-[60px] items-center gap-2.5 border-b border-sidebar-border px-4 flex-shrink-0">
          <Truck className="h-6 w-6 text-accent flex-shrink-0" strokeWidth={1.5} />
          {!sidebarCollapsed && (
            <div className="overflow-hidden">
              <span className="text-lg font-bold text-white tracking-tight">Pariskq</span>
              {organisation && (
                <p className="text-[11px] text-sidebar-foreground truncate leading-tight">
                  {organisation.companyName}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          <p className="px-3 pt-2 pb-1 text-[10px] font-medium uppercase tracking-[1.5px] text-sidebar-foreground/60">
            Operations
          </p>
          {navItems.map((item) => {
            const active = isActive(item.href);
            const hasChildren = !!item.children;
            const expanded = expandedGroups.includes(item.label);

            return (
              <div key={item.label}>
                <button
                  onClick={() => {
                    if (hasChildren) {
                      toggleGroup(item.label);
                    } else {
                      navigate(item.href);
                      setSidebarMobileOpen(false);
                    }
                  }}
                  className={cn(
                    'group flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-all duration-150',
                    active
                      ? 'bg-sidebar-accent text-white border-l-[3px] border-accent'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-white border-l-[3px] border-transparent'
                  )}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" strokeWidth={1.5} />
                  {!sidebarCollapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-white px-1.5">
                          {item.badge}
                        </span>
                      )}
                      {item.tierBadge && (
                        <span className="text-[9px] font-semibold uppercase tracking-wide text-accent">
                          {item.tierBadge}
                        </span>
                      )}
                      {hasChildren && (
                        <ChevronDown
                          className={cn('h-3.5 w-3.5 transition-transform', expanded && 'rotate-180')}
                        />
                      )}
                    </>
                  )}
                </button>

                {/* Children */}
                {hasChildren && expanded && !sidebarCollapsed && (
                  <div className="ml-6 mt-0.5 space-y-0.5 border-l border-sidebar-border pl-3">
                    {item.children!.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        onClick={() => setSidebarMobileOpen(false)}
                        className={cn(
                          'block rounded-md px-3 py-1.5 text-[13px] transition-colors',
                          isActive(child.href)
                            ? 'text-white font-semibold'
                            : 'text-sidebar-foreground/80 hover:text-white'
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User area */}
        <div className="border-t border-sidebar-border p-3 flex-shrink-0">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-semibold text-white flex-shrink-0">
                {user?.fullName?.charAt(0) ?? 'U'}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-white truncate">{user?.fullName ?? 'User'}</p>
                <p className="text-[11px] text-sidebar-foreground/70 truncate">{user?.role ?? 'Admin'}</p>
              </div>
              <button className="ml-auto text-sidebar-foreground/60 hover:text-white" title="Logout">
                <LogOut className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-semibold text-white">
                {user?.fullName?.charAt(0) ?? 'U'}
              </div>
            </div>
          )}
        </div>

        {/* Collapse toggle (desktop) */}
        <button
          onClick={toggleSidebar}
          className="hidden lg:flex absolute -right-3 top-[72px] h-6 w-6 items-center justify-center rounded-full border bg-card shadow-sm text-muted-foreground hover:text-primary"
        >
          {sidebarCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
        </button>
      </aside>
    </>
  );
}
