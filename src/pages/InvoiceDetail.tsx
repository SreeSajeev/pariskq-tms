import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Send, CreditCard } from 'lucide-react';
import { AppLayout } from '@/components/AppLayout';
import { StatusBadge } from '@/components/StatusBadge';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { Button } from '@/components/ui/button';
import { useInvoice } from '@/hooks/useBilling';
import { formatINR, formatDate } from '@/lib/api';
import { mockOrganisation } from '@/lib/mock-data';

export default function InvoiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: invoice, isLoading } = useInvoice(id ?? '');

  if (isLoading) return <AppLayout><LoadingSkeleton variant="cards" rows={4} /></AppLayout>;
  if (!invoice) return <AppLayout><div className="py-20 text-center"><p>Invoice not found</p><Button asChild variant="outline" className="mt-4"><Link to="/billing/invoices">← Back</Link></Button></div></AppLayout>;

  return (
    <AppLayout>
      <Link to="/billing/invoices" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to Invoices
      </Link>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <h1 className="text-lg font-mono font-bold text-primary">{invoice.invoiceNumber}</h1>
        <StatusBadge status={invoice.status} />
        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" /> Download PDF</Button>
          {invoice.status === 'DRAFT' && <Button variant="outline" size="sm"><Send className="h-4 w-4 mr-1" /> Send</Button>}
          {invoice.status !== 'PAID' && <Button size="sm"><CreditCard className="h-4 w-4 mr-1" /> Record Payment</Button>}
        </div>
      </div>

      {/* Invoice preview card */}
      <div className="max-w-3xl rounded-lg border bg-card shadow-sm p-8">
        {/* Header */}
        <div className="flex justify-between border-b pb-6 mb-6">
          <div>
            <p className="text-xl font-bold text-primary">INVOICE</p>
            <p className="text-sm font-mono text-muted-foreground mt-1">{invoice.invoiceNumber}</p>
          </div>
          <div className="text-right text-sm">
            <p className="font-semibold">{mockOrganisation.companyName}</p>
            <p className="text-muted-foreground">{mockOrganisation.addressLine1}</p>
            <p className="text-muted-foreground">{mockOrganisation.city}, {mockOrganisation.state}</p>
            <p className="text-muted-foreground">GST: {mockOrganisation.gstNumber}</p>
          </div>
        </div>

        {/* Bill to */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Bill To</p>
            <p className="font-medium">{invoice.customer?.companyName}</p>
            <p className="text-sm text-muted-foreground">{invoice.customer?.contactName}</p>
            <p className="text-sm text-muted-foreground">{invoice.customer?.city}, {invoice.customer?.state}</p>
          </div>
          <div className="text-right text-sm">
            <p><span className="text-muted-foreground">Issue Date:</span> {formatDate(invoice.issueDate)}</p>
            <p><span className="text-muted-foreground">Due Date:</span> {formatDate(invoice.dueDate)}</p>
          </div>
        </div>

        {/* Line items */}
        <table className="w-full text-sm mb-6">
          <thead>
            <tr className="border-b-2 text-xs uppercase tracking-wider text-muted-foreground">
              <th className="text-left py-2">Description</th>
              <th className="text-right py-2">Qty</th>
              <th className="text-right py-2">Rate</th>
              <th className="text-right py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.lineItems.map(item => (
              <tr key={item.id} className="border-b">
                <td className="py-3">{item.description}</td>
                <td className="py-3 text-right">{item.quantity}</td>
                <td className="py-3 text-right font-mono">{formatINR(item.unitPricePaise)}</td>
                <td className="py-3 text-right font-mono">{formatINR(item.totalPaise)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-64 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-mono">{formatINR(invoice.subtotalPaise)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Tax (GST 18%)</span><span className="font-mono">{formatINR(invoice.taxPaise)}</span></div>
            <div className="flex justify-between border-t pt-2 text-base font-bold"><span className="text-primary">Total Due</span><span className="font-mono text-primary">{formatINR(invoice.totalPaise)}</span></div>
            {invoice.paidPaise > 0 && (
              <div className="flex justify-between text-success"><span>Paid</span><span className="font-mono">{formatINR(invoice.paidPaise)}</span></div>
            )}
            {invoice.balancePaise > 0 && (
              <div className="flex justify-between font-semibold text-error"><span>Balance</span><span className="font-mono">{formatINR(invoice.balancePaise)}</span></div>
            )}
          </div>
        </div>

        {/* Bank details */}
        <div className="mt-8 rounded-md bg-muted border border-border p-4 text-sm">
          <p className="font-semibold mb-1">Bank Details</p>
          <p className="text-muted-foreground">Bank: State Bank of India · A/C: 1234567890 · IFSC: SBIN0001234</p>
        </div>
      </div>

      {/* Payment history */}
      {invoice.payments.length > 0 && (
        <div className="max-w-3xl mt-6 rounded-lg border bg-card shadow-sm p-5">
          <h3 className="text-[15px] font-semibold border-b pb-3 mb-4">Payment History</h3>
          {invoice.payments.map(p => (
            <div key={p.id} className="flex items-center justify-between py-2 border-b last:border-0 text-sm">
              <div>
                <p className="font-medium">{p.paymentMethod} — {p.referenceNumber}</p>
                <p className="text-xs text-muted-foreground">{formatDate(p.paymentDate)}</p>
              </div>
              <span className="font-mono font-medium text-success">{formatINR(p.amountPaise)}</span>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  );
}
