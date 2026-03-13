import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Truck } from 'lucide-react';
import { AppLayout } from '@/components/AppLayout';
import { PageHeader } from '@/components/PageHeader';
import { FilterBar } from '@/components/FilterBar';
import { StatusBadge } from '@/components/StatusBadge';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { useVehicles } from '@/hooks/useFleet';
import type { VehicleStatus } from '@/types';
import { cn } from '@/lib/utils';

const statusTabs: { label: string; value: VehicleStatus | 'ALL'; count?: number }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Available', value: 'AVAILABLE' },
  { label: 'In Use', value: 'IN_USE' },
  { label: 'In Maintenance', value: 'IN_MAINTENANCE' },
  { label: 'Retired', value: 'RETIRED' },
];

export default function VehicleListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<VehicleStatus | 'ALL'>('ALL');

  const { data, isLoading } = useVehicles({
    status: statusFilter === 'ALL' ? undefined : statusFilter,
    search: search || undefined,
  });

  const vehicles = data?.data ?? [];

  return (
    <AppLayout>
      <PageHeader
        title="Vehicles"
        breadcrumbs={[{ label: 'Fleet', href: '/fleet' }, { label: 'Vehicles' }]}
        action={<Button><Plus className="h-4 w-4 mr-1.5" /> Add Vehicle</Button>}
      />

      {/* Stats */}
      <div className="flex flex-wrap gap-2 mb-4">
        {statusTabs.filter(t => t.value !== 'ALL').map(tab => {
          const count = data?.data?.filter(v => v.status === tab.value).length ?? 0;
          return (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-semibold border transition-colors',
                statusFilter === tab.value
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card text-muted-foreground border-border hover:border-primary'
              )}
            >
              {tab.label} ({count})
            </button>
          );
        })}
      </div>

      <FilterBar searchPlaceholder="Search by plate number or type..." searchValue={search} onSearchChange={setSearch} className="mb-4" />

      {isLoading ? <LoadingSkeleton rows={5} columns={6} /> : vehicles.length === 0 ? (
        <EmptyState icon={Truck} title="No vehicles found" description="Add your first vehicle to get started." actionLabel="Add Vehicle" />
      ) : (
        <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted text-[12px] uppercase tracking-wider text-muted-foreground">
                  <th className="text-left px-4 py-2.5 font-semibold">Registration</th>
                  <th className="text-left px-4 py-2.5 font-semibold">Type</th>
                  <th className="text-left px-4 py-2.5 font-semibold hidden md:table-cell">Make / Model</th>
                  <th className="text-left px-4 py-2.5 font-semibold hidden sm:table-cell">Capacity</th>
                  <th className="text-left px-4 py-2.5 font-semibold">Status</th>
                  <th className="text-left px-4 py-2.5 font-semibold hidden lg:table-cell">GPS</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map(v => (
                  <tr key={v.id} onClick={() => navigate(`/fleet/vehicles/${v.id}`)} className="border-b border-muted/40 hover:bg-primary/[0.04] cursor-pointer transition-colors">
                    <td className="px-4 py-3 font-mono text-xs font-medium text-primary">{v.registrationNumber}</td>
                    <td className="px-4 py-3">{v.vehicleType.replace('_', ' ')}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{v.make} {v.model}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{v.capacityTonnes ? `${v.capacityTonnes}T` : '—'}</td>
                    <td className="px-4 py-3"><StatusBadge status={v.status} /></td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className={cn('inline-block h-2 w-2 rounded-full', v.gpsDeviceId ? 'bg-success' : 'bg-muted-foreground/30')} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
