import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Users } from 'lucide-react';
import { AppLayout } from '@/components/AppLayout';
import { PageHeader } from '@/components/PageHeader';
import { FilterBar } from '@/components/FilterBar';
import { StatusBadge } from '@/components/StatusBadge';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { useDrivers } from '@/hooks/useFleet';
import { cn } from '@/lib/utils';

export default function DriverListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const { data, isLoading } = useDrivers({ search: search || undefined });
  const drivers = data?.data ?? [];

  return (
    <AppLayout>
      <PageHeader
        title="Drivers"
        breadcrumbs={[{ label: 'Fleet', href: '/fleet' }, { label: 'Drivers' }]}
        action={<Button><Plus className="h-4 w-4 mr-1.5" /> Add Driver</Button>}
      />
      <FilterBar searchPlaceholder="Search by name or mobile..." searchValue={search} onSearchChange={setSearch} className="mb-4" />

      {isLoading ? <LoadingSkeleton rows={5} columns={6} /> : drivers.length === 0 ? (
        <EmptyState icon={Users} title="No drivers found" actionLabel="Add Driver" />
      ) : (
        <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted text-[12px] uppercase tracking-wider text-muted-foreground">
                  <th className="text-left px-4 py-2.5 font-semibold">Name</th>
                  <th className="text-left px-4 py-2.5 font-semibold hidden sm:table-cell">Mobile</th>
                  <th className="text-left px-4 py-2.5 font-semibold hidden md:table-cell">Licence</th>
                  <th className="text-left px-4 py-2.5 font-semibold">Status</th>
                  <th className="text-left px-4 py-2.5 font-semibold hidden lg:table-cell">Safety Score</th>
                  <th className="text-left px-4 py-2.5 font-semibold hidden lg:table-cell">Trips</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map(d => {
                  const licenceExpiring = d.licenceExpiresAt && (new Date(d.licenceExpiresAt).getTime() - Date.now()) < 30 * 86400000;
                  return (
                    <tr key={d.id} onClick={() => navigate(`/fleet/drivers/${d.id}`)} className="border-b border-muted/40 hover:bg-primary/[0.04] cursor-pointer transition-colors">
                      <td className="px-4 py-3 font-medium">{d.fullName}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{d.mobile}</td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="font-mono text-xs">{d.licenceNumber.slice(0, 12)}...</span>
                        {licenceExpiring && <span className="ml-2 text-[10px] font-semibold text-warning">EXPIRING</span>}
                      </td>
                      <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span className={cn('font-semibold text-xs',
                          (d.safetyScore ?? 0) >= 90 ? 'text-success' :
                          (d.safetyScore ?? 0) >= 70 ? 'text-warning' : 'text-error'
                        )}>{d.safetyScore ?? '—'}%</span>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground">{d.totalTrips ?? '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
