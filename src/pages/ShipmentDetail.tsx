import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Mail, FileText, Clock } from 'lucide-react';
import { AppLayout } from '@/components/AppLayout';
import { PageHeader } from '@/components/PageHeader';
import { StatusBadge } from '@/components/StatusBadge';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { Button } from '@/components/ui/button';
import { useShipment } from '@/hooks/useShipments';
import { formatDate, formatDateTime, formatINR, timeAgo } from '@/lib/api';
import { cn } from '@/lib/utils';
import { mockAuditLogs } from '@/lib/mock-data';

export default function ShipmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: shipment, isLoading } = useShipment(id ?? '');

  if (isLoading) {
    return <AppLayout><LoadingSkeleton variant="cards" rows={6} /></AppLayout>;
  }

  if (!shipment) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center py-20">
          <p className="text-lg font-semibold mb-2">Shipment not found</p>
          <Button asChild variant="outline"><Link to="/shipments">← Back to Shipments</Link></Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mb-4">
        <Link to="/shipments" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 mb-3">
          <ArrowLeft className="h-4 w-4" /> Back to Shipments
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-lg font-mono font-bold text-primary">{shipment.referenceNumber}</h1>
          <StatusBadge status={shipment.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left 60% */}
        <div className="lg:col-span-3 space-y-6">
          {/* Route */}
          <div className="rounded-lg border bg-card shadow-sm p-5">
            <h3 className="text-[15px] font-semibold border-b pb-3 mb-4">Route</h3>
            <div className="bg-muted rounded-lg h-40 flex items-center justify-center text-sm text-muted-foreground mb-4">
              <MapPin className="h-5 w-5 mr-2" /> Map placeholder
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Pickup</p>
                <p className="text-sm">{shipment.pickupAddress}</p>
                <p className="text-xs text-muted-foreground mt-1">{formatDate(shipment.pickupDate)} {shipment.pickupTimeFrom && `· ${shipment.pickupTimeFrom}–${shipment.pickupTimeTo}`}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Delivery</p>
                <p className="text-sm">{shipment.deliveryAddress}</p>
                <p className="text-xs text-muted-foreground mt-1">{formatDate(shipment.expectedDeliveryDate)}</p>
              </div>
            </div>
            {shipment.estimatedDistanceKm && (
              <p className="mt-3 text-xs text-muted-foreground">Estimated distance: ~{shipment.estimatedDistanceKm} km</p>
            )}
          </div>

          {/* Goods */}
          <div className="rounded-lg border bg-card shadow-sm p-5">
            <h3 className="text-[15px] font-semibold border-b pb-3 mb-4">Goods</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div><p className="text-xs text-muted-foreground">Type</p><p className="font-medium">{shipment.goodsType}</p></div>
              <div><p className="text-xs text-muted-foreground">Quantity</p><p className="font-medium">{shipment.quantity ?? '—'}</p></div>
              <div><p className="text-xs text-muted-foreground">Weight</p><p className="font-medium">{shipment.weightKg ? `${shipment.weightKg.toLocaleString()} kg` : '—'}</p></div>
              <div><p className="text-xs text-muted-foreground">Volume</p><p className="font-medium">{shipment.volumeCbm ? `${shipment.volumeCbm} CBM` : '—'}</p></div>
            </div>
            {shipment.goodsDescription && <p className="mt-3 text-sm text-muted-foreground">{shipment.goodsDescription}</p>}
            {shipment.specialInstructions && (
              <div className="mt-3 rounded-md bg-warning-bg border border-warning/30 p-3 text-sm text-warning-text">{shipment.specialInstructions}</div>
            )}
          </div>

          {/* Activity */}
          <div className="rounded-lg border bg-card shadow-sm p-5">
            <h3 className="text-[15px] font-semibold border-b pb-3 mb-4">Activity</h3>
            <div className="space-y-3">
              {mockAuditLogs.filter(l => l.entityId === shipment.id).map(log => (
                <div key={log.id} className="flex items-start gap-3">
                  <div className={cn('mt-1.5 h-2 w-2 rounded-full',
                    log.action === 'CREATED' ? 'bg-primary' : log.action === 'DELIVERED' ? 'bg-success' : 'bg-warning'
                  )} />
                  <div>
                    <p className="text-sm">{log.description}</p>
                    <p className="text-[11px] text-muted-foreground">{timeAgo(log.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 40% */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer */}
          {shipment.customer && (
            <div className="rounded-lg border bg-card shadow-sm p-5">
              <h3 className="text-[15px] font-semibold border-b pb-3 mb-4">Customer</h3>
              <p className="font-medium text-foreground">{shipment.customer.companyName}</p>
              {shipment.customer.contactName && (
                <p className="text-sm text-muted-foreground mt-1">{shipment.customer.contactName}</p>
              )}
              {shipment.customer.contactPhone && (
                <a href={`tel:${shipment.customer.contactPhone}`} className="flex items-center gap-1.5 text-sm text-primary mt-2">
                  <Phone className="h-3.5 w-3.5" /> {shipment.customer.contactPhone}
                </a>
              )}
              {shipment.customer.contactEmail && (
                <a href={`mailto:${shipment.customer.contactEmail}`} className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                  <Mail className="h-3.5 w-3.5" /> {shipment.customer.contactEmail}
                </a>
              )}
            </div>
          )}

          {/* Trip Assignment */}
          <div className="rounded-lg border bg-card shadow-sm p-5">
            <h3 className="text-[15px] font-semibold border-b pb-3 mb-4">Trip Assignment</h3>
            {shipment.trip ? (
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Vehicle</p>
                  <p className="text-sm font-mono font-medium">{shipment.trip.vehicle?.registrationNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Driver</p>
                  <p className="text-sm font-medium">{shipment.trip.driver?.fullName}</p>
                  {shipment.trip.driver?.mobile && (
                    <a href={`tel:${shipment.trip.driver.mobile}`} className="text-xs text-primary">
                      {shipment.trip.driver.mobile}
                    </a>
                  )}
                </div>
                {/* Status timeline */}
                <div className="mt-3 space-y-2">
                  {['SCHEDULED', 'IN_TRANSIT', 'REACHED', 'DELIVERED'].map((step, i) => {
                    const tripStatuses = ['SCHEDULED', 'IN_TRANSIT', 'REACHED', 'DELIVERED'];
                    const currentIdx = tripStatuses.indexOf(shipment.trip!.status);
                    const done = i <= currentIdx;
                    return (
                      <div key={step} className="flex items-center gap-2.5">
                        <div className={cn(
                          'h-2.5 w-2.5 rounded-full border-2',
                          done ? 'bg-primary border-primary' : 'bg-card border-border'
                        )} />
                        <span className={cn('text-xs', done ? 'text-foreground font-medium' : 'text-muted-foreground')}>
                          {step.replace('_', ' ')}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground mb-3">No trip assigned yet</p>
                <Button size="sm">Assign Driver & Vehicle</Button>
              </div>
            )}
          </div>

          {/* Billing */}
          <div className="rounded-lg border bg-card shadow-sm p-5">
            <h3 className="text-[15px] font-semibold border-b pb-3 mb-4">Billing</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rate type</span>
                <span className="font-medium">{shipment.billingRateType ?? '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rate value</span>
                <span className="font-medium font-mono">{shipment.billingRateValue ? formatINR(shipment.billingRateValue) : '—'}</span>
              </div>
              {shipment.estimatedTripValue && (
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-medium">Estimated total</span>
                  <span className="font-bold font-mono text-primary">{formatINR(shipment.estimatedTripValue)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
