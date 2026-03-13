import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { AppLayout } from '@/components/AppLayout';
import { PageHeader } from '@/components/PageHeader';
import { FilterBar } from '@/components/FilterBar';
import { StatusBadge } from '@/components/StatusBadge';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { useShipments } from '@/hooks/useShipments';
import { formatDate } from '@/lib/api';
import type { ShipmentStatus } from '@/types';
import { cn } from '@/lib/utils';

const statusTabs: { label: string; value: ShipmentStatus | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Assigned', value: 'ASSIGNED' },
  { label: 'In Transit', value: 'IN_TRANSIT' },
  { label: 'Delivered', value: 'DELIVERED' },
  { label: 'Cancelled', value: 'CANCELLED' },
];

export default function ShipmentListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ShipmentStatus | 'ALL'>('ALL');

  const { data, isLoading } = useShipments({
    status: statusFilter === 'ALL' ? undefined : statusFilter,
    search: search || undefined,
  });

  const shipments = data?.data ?? [];

  return (
    <AppLayout>
      <PageHeader
        title="Shipments"
        breadcrumbs={[{ label: 'Shipments' }]}
        action={
          <Button asChild>
            <Link to="/shipments/new"><Plus className="h-4 w-4 mr-1.5" /> Create Shipment</Link>
          </Button>
        }
      />

      <FilterBar
        searchPlaceholder="Search reference, customer, location..."
        searchValue={search}
        onSearchChange={setSearch}
        className="mb-4"
      />

      {/* Status tabs */}
      <div className="flex items-center gap-1 border-b border-border mb-4 overflow-x-auto">
        {statusTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setStatusFilter(tab.value)}
            className={cn(
              'px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
              statusFilter === tab.value
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-primary hover:border-primary/30'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      {isLoading ? (
        <LoadingSkeleton rows={6} columns={7} />
      ) : shipments.length === 0 ? (
        <EmptyState
          title={search || statusFilter !== 'ALL' ? 'No shipments match your filters' : 'No shipments yet'}
          description={search || statusFilter !== 'ALL' ? 'Try adjusting your filters or search query.' : 'Create your first shipment to get started.'}
          actionLabel={!search && statusFilter === 'ALL' ? 'Create Shipment' : 'Clear filters'}
          onAction={() => { setSearch(''); setStatusFilter('ALL'); }}
        />
      ) : (
        <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted text-[12px] uppercase tracking-wider text-muted-foreground">
                  <th className="text-left px-4 py-2.5 font-semibold">Reference</th>
                  <th className="text-left px-4 py-2.5 font-semibold">Customer</th>
                  <th className="text-left px-4 py-2.5 font-semibold hidden md:table-cell">Pickup</th>
                  <th className="text-left px-4 py-2.5 font-semibold hidden lg:table-cell">Delivery</th>
                  <th className="text-left px-4 py-2.5 font-semibold hidden sm:table-cell">Weight</th>
                  <th className="text-left px-4 py-2.5 font-semibold">Status</th>
                  <th className="text-left px-4 py-2.5 font-semibold hidden lg:table-cell">Driver</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((s) => {
                  const isOverdue = s.status === 'IN_TRANSIT' && new Date(s.expectedDeliveryDate) < new Date();
                  return (
                    <tr
                      key={s.id}
                      onClick={() => navigate(`/shipments/${s.id}`)}
                      className={cn(
                        'border-b border-muted/40 cursor-pointer transition-colors',
                        isOverdue ? 'bg-error/[0.05] border-l-[3px] border-l-error' : 'hover:bg-primary/[0.04]'
                      )}
                    >
                      <td className="px-4 py-3 font-mono text-xs text-primary font-medium">{s.referenceNumber}</td>
                      <td className="px-4 py-3">{s.customer?.companyName ?? '—'}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell truncate max-w-[180px]">
                        {s.pickupAddress.split(',')[0]} · {formatDate(s.pickupDate)}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell truncate max-w-[180px]">
                        {s.deliveryAddress.split(',')[0]} · {formatDate(s.expectedDeliveryDate)}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                        {s.weightKg ? `${s.weightKg.toLocaleString()} kg` : '—'}
                      </td>
                      <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                      <td className="px-4 py-3 hidden lg:table-cell">{s.trip?.driver?.fullName ?? '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {data?.meta && (
            <div className="flex items-center justify-between border-t px-4 py-3 text-xs text-muted-foreground">
              <span>Showing {shipments.length} of {data.meta.total} shipments</span>
            </div>
          )}
        </div>
      )}
    </AppLayout>
  );
}
