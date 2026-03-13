import { AppLayout } from '@/components/AppLayout';
import { PageHeader } from '@/components/PageHeader';
import { BarChart3 } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <AppLayout>
      <PageHeader title="Analytics" breadcrumbs={[{ label: 'Analytics' }]} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {['Revenue Overview', 'Shipment Volume', 'Fleet Utilisation', 'Customer Profitability'].map(chart => (
          <div key={chart} className="rounded-lg border bg-card shadow-sm p-5">
            <h3 className="text-[15px] font-semibold border-b pb-3 mb-4">{chart}</h3>
            <div className="h-52 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BarChart3 className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">Recharts integration placeholder</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
