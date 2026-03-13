import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone } from 'lucide-react';
import { AppLayout } from '@/components/AppLayout';
import { StatusBadge } from '@/components/StatusBadge';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { Button } from '@/components/ui/button';
import { useDriver } from '@/hooks/useFleet';
import { formatDate } from '@/lib/api';
import { cn } from '@/lib/utils';

export default function DriverDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: driver, isLoading } = useDriver(id ?? '');

  if (isLoading) return <AppLayout><LoadingSkeleton variant="cards" rows={4} /></AppLayout>;
  if (!driver) return <AppLayout><div className="py-20 text-center"><p>Driver not found</p><Button asChild variant="outline" className="mt-4"><Link to="/fleet/drivers">← Back</Link></Button></div></AppLayout>;

  return (
    <AppLayout>
      <Link to="/fleet/drivers" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to Drivers
      </Link>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <h1 className="text-lg font-bold">{driver.fullName}</h1>
        <StatusBadge status={driver.status} />
        <Button size="sm" variant="outline" className="ml-auto">Edit</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border bg-card shadow-sm p-5">
          <h3 className="text-[15px] font-semibold border-b pb-3 mb-4">Profile</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><p className="text-xs text-muted-foreground">Mobile</p><a href={`tel:${driver.mobile}`} className="font-medium text-primary flex items-center gap-1"><Phone className="h-3 w-3" />{driver.mobile}</a></div>
            <div><p className="text-xs text-muted-foreground">Employment</p><p className="font-medium">{driver.employmentType.replace('_', ' ')}</p></div>
            <div><p className="text-xs text-muted-foreground">City</p><p className="font-medium">{driver.city ?? '—'}</p></div>
            <div><p className="text-xs text-muted-foreground">State</p><p className="font-medium">{driver.state ?? '—'}</p></div>
          </div>
        </div>

        <div className="rounded-lg border bg-card shadow-sm p-5">
          <h3 className="text-[15px] font-semibold border-b pb-3 mb-4">Licence & Documents</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><p className="text-xs text-muted-foreground">Licence #</p><p className="font-mono text-xs font-medium">{driver.licenceNumber}</p></div>
            <div><p className="text-xs text-muted-foreground">Type</p><p className="font-medium">{driver.licenceType}</p></div>
            <div>
              <p className="text-xs text-muted-foreground">Expires</p>
              <p className={cn('font-medium', driver.licenceExpiresAt && new Date(driver.licenceExpiresAt) < new Date() ? 'text-error' : '')}>
                {driver.licenceExpiresAt ? formatDate(driver.licenceExpiresAt) : '—'}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card shadow-sm p-5">
          <h3 className="text-[15px] font-semibold border-b pb-3 mb-4">Performance</h3>
          <div className="flex items-center justify-center py-6">
            <div className="text-center">
              <p className={cn('text-3xl font-bold',
                (driver.safetyScore ?? 0) >= 90 ? 'text-success' :
                (driver.safetyScore ?? 0) >= 70 ? 'text-warning' : 'text-error'
              )}>{driver.safetyScore ?? '—'}%</p>
              <p className="text-xs text-muted-foreground mt-1">Safety Score</p>
              <p className="text-sm text-muted-foreground mt-3">{driver.totalTrips ?? 0} total trips</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card shadow-sm p-5">
          <h3 className="text-[15px] font-semibold border-b pb-3 mb-4">Trip History</h3>
          <div className="text-center py-8 text-sm text-muted-foreground">Trip history chart placeholder</div>
        </div>
      </div>
    </AppLayout>
  );
}
