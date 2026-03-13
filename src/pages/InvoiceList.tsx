import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Receipt } from 'lucide-react';
import { AppLayout } from '@/components/AppLayout';
import { PageHeader } from '@/components/PageHeader';
import { StatCard } from '@/components/StatCard';
import { FilterBar } from '@/components/FilterBar';
import { StatusBadge } from '@/components/StatusBadge';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { useInvoices } from '@/hooks/useBilling';
import { formatINR, formatDate } from '@/lib/api';
import type { InvoiceStatus } from '@/types';
import { cn } from '@/lib/utils';

const statusTabs: { label: string; value: InvoiceStatus | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Draft', value: 'DRAFT' },
  { label: 'Sent', value: 'SENT' },
  { label: 'Paid', value: 'PAID' },
  { label: 'Overdue', value: 'OVERDUE' },
  { label: 'Disputed', value: 'DISPUTED' },
];

export default function InvoiceListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | 'ALL'>('ALL');

  const { data, isLoading } = useInvoices({ status: statusFilter === 'ALL' ? undefined : statusFilter, search: search || undefined });
  const invoices = data?.data ?? [];

  return (
    <AppLayout>
      <PageHeader title="Invoices" breadcrumbs={[{ label: 'Billing', href: '/billing' }, { label: 'Invoices' }]} action={<Button asChild><Link to="/billing/invoices/new"><Plus className="h-4 w-4 mr-1.5" /> Create Invoice</Link></Button>} />

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="Total Outstanding" value={formatINR(482000)} icon={Receipt} />
        <StatCard label="Overdue" value={formatINR(120000)} icon={Receipt} variant="danger" />
        <StatCard label="Paid This Month" value={formatINR(865000)} icon={Receipt} />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border mb-4 overflow-x-auto">
        {statusTabs.map(tab => (
          <button key={tab.value} onClick={() => setStatusFilter(tab.value)} className={cn('px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap', statusFilter === tab.value ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-primary')}>
            {tab.label}
          </button>
        ))}
      </div>

      <FilterBar searchPlaceholder="Search invoice #, customer..." searchValue={search} onSearchChange={setSearch} className="mb-4" />

      {isLoading ? <LoadingSkeleton rows={5} columns={6} /> : invoices.length === 0 ? (
        <EmptyState icon={Receipt} title="No invoices found" actionLabel="Create Invoice" />
      ) : (
        <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted text-[12px] uppercase tracking-wider text-muted-foreground">
                  <th className="text-left px-4 py-2.5 font-semibold">Invoice #</th>
                  <th className="text-left px-4 py-2.5 font-semibold">Customer</th>
                  <th className="text-left px-4 py-2.5 font-semibold hidden sm:table-cell">Date</th>
                  <th className="text-left px-4 py-2.5 font-semibold hidden md:table-cell">Due</th>
                  <th className="text-right px-4 py-2.5 font-semibold">Amount</th>
                  <th className="text-left px-4 py-2.5 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map(inv => (
                  <tr key={inv.id} onClick={() => navigate(`/billing/invoices/${inv.id}`)} className={cn('border-b border-muted/40 cursor-pointer transition-colors', inv.status === 'OVERDUE' ? 'bg-error/[0.05]' : 'hover:bg-primary/[0.04]')}>
                    <td className="px-4 py-3 font-mono text-xs text-primary font-medium">{inv.invoiceNumber}</td>
                    <td className="px-4 py-3">{inv.customer?.companyName ?? '—'}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{formatDate(inv.issueDate)}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{formatDate(inv.dueDate)}</td>
                    <td className="px-4 py-3 text-right font-mono font-medium">{formatINR(inv.totalPaise)}</td>
                    <td className="px-4 py-3"><StatusBadge status={inv.status} /></td>
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
