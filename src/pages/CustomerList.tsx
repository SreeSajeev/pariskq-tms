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
import { useCustomers } from '@/hooks/useBilling';

export default function CustomerListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { data, isLoading } = useCustomers({ search: search || undefined });
  const customers = data?.data ?? [];

  return (
    <AppLayout>
      <PageHeader title="Customers" breadcrumbs={[{ label: 'Customers' }]} action={<Button><Plus className="h-4 w-4 mr-1.5" /> Add Customer</Button>} />
      <FilterBar searchPlaceholder="Search customers..." searchValue={search} onSearchChange={setSearch} className="mb-4" />

      {isLoading ? <LoadingSkeleton rows={5} columns={5} /> : customers.length === 0 ? (
        <EmptyState icon={Users} title="No customers yet" actionLabel="Add Customer" />
      ) : (
        <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted text-[12px] uppercase tracking-wider text-muted-foreground">
                  <th className="text-left px-4 py-2.5 font-semibold">Company</th>
                  <th className="text-left px-4 py-2.5 font-semibold hidden sm:table-cell">Contact</th>
                  <th className="text-left px-4 py-2.5 font-semibold hidden md:table-cell">City</th>
                  <th className="text-left px-4 py-2.5 font-semibold">Status</th>
                  <th className="text-left px-4 py-2.5 font-semibold hidden lg:table-cell">Portal</th>
                </tr>
              </thead>
              <tbody>
                {customers.map(c => (
                  <tr key={c.id} onClick={() => navigate(`/customers/${c.id}`)} className="border-b border-muted/40 hover:bg-primary/[0.04] cursor-pointer transition-colors">
                    <td className="px-4 py-3 font-medium">{c.companyName}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{c.contactName ?? '—'}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{c.city ?? '—'}</td>
                    <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                    <td className="px-4 py-3 hidden lg:table-cell">{c.portalEnabled ? <span className="text-xs text-success font-medium">Enabled</span> : <span className="text-xs text-muted-foreground">—</span>}</td>
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
