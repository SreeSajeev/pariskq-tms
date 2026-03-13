import { Link } from 'react-router-dom';
import { Package, Truck, CheckCircle, AlertCircle, Plus, UserPlus, Receipt, ArrowRight, AlertTriangle } from 'lucide-react';
import { AppLayout } from '@/components/AppLayout';
import { PageHeader } from '@/components/PageHeader';
import { StatCard } from '@/components/StatCard';
import { StatusBadge } from '@/components/StatusBadge';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { EmptyState } from '@/components/EmptyState';
import { useDashboardKPIs, useShipments, useAlerts, useAuditLogs } from '@/hooks/useShipments';
import { useAuthStore } from '@/stores/authStore';
import { formatDate, timeAgo } from '@/lib/api';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { data: kpis, isLoading: kpisLoading } = useDashboardKPIs();
  const { data: shipmentsData, isLoading: shipmentsLoading } = useShipments({ status: undefined });
  const { data: alerts, isLoading: alertsLoading } = useAlerts();
  const { data: auditLogs, isLoading: logsLoading } = useAuditLogs();

  const upcomingPickups = shipmentsData?.data?.filter(s => s.status === 'PENDING' || s.status === 'ASSIGNED').slice(0, 5) ?? [];

  const getGreeting = () => {
    const h = new Date().getHours();
    return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  };

  return (
    <AppLayout>
      <PageHeader
        title="Dashboard"
        subtitle={`${getGreeting()}, ${user?.fullName?.split(' ')[0] ?? 'there'}. Here's your operation today.`}
      />

      {/* KPI Cards */}
      {kpisLoading ? (
        <LoadingSkeleton variant="cards" rows={4} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            label="Active Shipments"
            value={kpis?.activeShipments ?? 0}
            icon={Package}
            trend={kpis?.activeShipmentsTrend}
            href="/shipments?status=PENDING"
          />
          <StatCard
            label="Trips in Transit"
            value={kpis?.tripsInTransit ?? 0}
            icon={Truck}
            subtext="Live tracking available"
            href="/map"
          />
          <StatCard
            label="Delivered Today"
            value={kpis?.deliveredToday ?? 0}
            icon={CheckCircle}
            trend={kpis?.deliveredTodayTrend}
            href="/shipments?status=DELIVERED"
          />
          <StatCard
            label="Overdue Deliveries"
            value={kpis?.overdueDeliveries ?? 0}
            icon={AlertCircle}
            variant="danger"
            href="/shipments?status=IN_TRANSIT"
          />
        </div>
      )}

      {/* Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Upcoming Pickups */}
        <div className="lg:col-span-2 rounded-lg border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b px-5 py-3">
            <h3 className="text-[15px] font-semibold">Upcoming Pickups Today</h3>
            <Link to="/shipments" className="text-xs text-primary font-medium hover:underline">View all →</Link>
          </div>
          {shipmentsLoading ? (
            <LoadingSkeleton rows={4} columns={5} />
          ) : upcomingPickups.length === 0 ? (
            <EmptyState icon={Package} title="No pickups scheduled for today" className="py-10" />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted text-muted-foreground text-xs uppercase tracking-wider">
                    <th className="text-left px-4 py-2.5 font-semibold">Reference</th>
                    <th className="text-left px-4 py-2.5 font-semibold">Customer</th>
                    <th className="text-left px-4 py-2.5 font-semibold hidden md:table-cell">Pickup</th>
                    <th className="text-left px-4 py-2.5 font-semibold hidden sm:table-cell">Date</th>
                    <th className="text-left px-4 py-2.5 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingPickups.map((s) => (
                    <tr key={s.id} className="border-b border-muted/50 hover:bg-primary/[0.04] cursor-pointer" onClick={() => window.location.href = `/shipments/${s.id}`}>
                      <td className="px-4 py-3 font-mono text-xs text-primary font-medium">{s.referenceNumber}</td>
                      <td className="px-4 py-3">{s.customer?.companyName}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell truncate max-w-[200px]">{s.pickupAddress}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{formatDate(s.pickupDate)}</td>
                      <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Alerts */}
        <div className="rounded-lg border bg-card shadow-sm">
          <div className="flex items-center gap-2 border-b px-5 py-3">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <h3 className="text-[15px] font-semibold">Needs Attention</h3>
          </div>
          {alertsLoading ? (
            <LoadingSkeleton variant="list" rows={4} />
          ) : !alerts || alerts.length === 0 ? (
            <div className="flex flex-col items-center py-10 text-center">
              <CheckCircle className="h-10 w-10 text-success mb-2" />
              <p className="text-sm font-medium text-success-text">Everything looks good!</p>
            </div>
          ) : (
            <div className="p-3 space-y-1 max-h-[300px] overflow-y-auto">
              {alerts.map((alert) => (
                <Link
                  key={alert.id}
                  to={alert.actionUrl}
                  className="flex items-start gap-2.5 rounded-md p-2.5 hover:bg-muted transition-colors"
                >
                  <div className={cn(
                    'mt-0.5 h-2 w-2 rounded-full flex-shrink-0',
                    alert.severity === 'critical' ? 'bg-error' : alert.severity === 'warning' ? 'bg-warning' : 'bg-info'
                  )} />
                  <span className="text-sm text-foreground leading-snug">{alert.message}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity */}
        <div className="rounded-lg border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b px-5 py-3">
            <h3 className="text-[15px] font-semibold">Recent Activity</h3>
          </div>
          {logsLoading ? (
            <LoadingSkeleton variant="list" rows={5} />
          ) : (
            <div className="p-3 space-y-0.5 max-h-[300px] overflow-y-auto">
              {auditLogs?.map((log) => (
                <div key={log.id} className="flex items-start gap-3 p-2.5">
                  <div className={cn(
                    'mt-1 h-2 w-2 rounded-full flex-shrink-0',
                    log.action === 'CREATED' ? 'bg-primary' :
                    log.action === 'DELIVERED' ? 'bg-success' :
                    log.action === 'CANCELLED' ? 'bg-error' :
                    'bg-warning'
                  )} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{log.description}</p>
                    <p className="text-[11px] text-muted-foreground">{timeAgo(log.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="rounded-lg border bg-card shadow-sm">
          <div className="border-b px-5 py-3">
            <h3 className="text-[15px] font-semibold">Quick Actions</h3>
          </div>
          <div className="p-4 grid grid-cols-2 gap-3">
            {[
              { label: 'Create Shipment', icon: Plus, href: '/shipments/new' },
              { label: 'Assign Driver', icon: UserPlus, href: '/shipments' },
              { label: 'Add Vehicle', icon: Truck, href: '/fleet/vehicles' },
              { label: 'Create Invoice', icon: Receipt, href: '/billing/invoices/new' },
            ].map((action) => (
              <Link
                key={action.label}
                to={action.href}
                className="flex flex-col items-center justify-center gap-2 rounded-lg border border-border p-5 hover:bg-primary/[0.06] hover:border-primary hover:-translate-y-0.5 transition-all group"
              >
                <action.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary" strokeWidth={1.5} />
                <span className="text-sm font-medium text-foreground">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
