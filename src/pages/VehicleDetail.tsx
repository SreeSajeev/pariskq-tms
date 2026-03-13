import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { AppLayout } from '@/components/AppLayout';
import { StatusBadge } from '@/components/StatusBadge';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { Button } from '@/components/ui/button';
import { useVehicle } from '@/hooks/useFleet';
import { formatDate } from '@/lib/api';

export default function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: vehicle, isLoading } = useVehicle(id ?? '');

  if (isLoading) return <AppLayout><LoadingSkeleton variant="cards" rows={4} /></AppLayout>;
  if (!vehicle) return <AppLayout><div className="py-20 text-center"><p>Vehicle not found</p><Button asChild variant="outline" className="mt-4"><Link to="/fleet/vehicles">← Back</Link></Button></div></AppLayout>;

  return (
    <AppLayout>
      <Link to="/fleet/vehicles" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to Vehicles
      </Link>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <h1 className="text-lg font-mono font-bold text-primary">{vehicle.registrationNumber}</h1>
        <StatusBadge status={vehicle.status} />
        <Button size="sm" variant="outline" className="ml-auto">Edit</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border bg-card shadow-sm p-5">
          <h3 className="text-[15px] font-semibold border-b pb-3 mb-4">Vehicle Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><p className="text-xs text-muted-foreground">Type</p><p className="font-medium">{vehicle.vehicleType}</p></div>
            <div><p className="text-xs text-muted-foreground">Make / Model</p><p className="font-medium">{vehicle.make} {vehicle.model}</p></div>
            <div><p className="text-xs text-muted-foreground">Year</p><p className="font-medium">{vehicle.year ?? '—'}</p></div>
            <div><p className="text-xs text-muted-foreground">Fuel</p><p className="font-medium">{vehicle.fuelType}</p></div>
            <div><p className="text-xs text-muted-foreground">Capacity</p><p className="font-medium">{vehicle.capacityTonnes ? `${vehicle.capacityTonnes} tonnes` : '—'}</p></div>
            <div><p className="text-xs text-muted-foreground">GPS Device</p><p className="font-medium">{vehicle.gpsDeviceId ?? 'Not linked'}</p></div>
          </div>
        </div>

        <div className="rounded-lg border bg-card shadow-sm p-5">
          <h3 className="text-[15px] font-semibold border-b pb-3 mb-4">Documents</h3>
          <div className="text-center py-8 text-sm text-muted-foreground">
            <p>No documents uploaded yet</p>
            <Button size="sm" className="mt-3">Add Document</Button>
          </div>
        </div>

        <div className="rounded-lg border bg-card shadow-sm p-5">
          <h3 className="text-[15px] font-semibold border-b pb-3 mb-4">Maintenance Log</h3>
          <div className="text-center py-8 text-sm text-muted-foreground">No maintenance records</div>
        </div>

        <div className="rounded-lg border bg-card shadow-sm p-5">
          <h3 className="text-[15px] font-semibold border-b pb-3 mb-4">Location</h3>
          {vehicle.lastKnownLat ? (
            <div className="bg-muted rounded-lg h-40 flex items-center justify-center text-sm text-muted-foreground">
              <MapPin className="h-5 w-5 mr-2" /> Map — {vehicle.lastKnownLat.toFixed(4)}, {vehicle.lastKnownLng?.toFixed(4)}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">No GPS data available</p>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
