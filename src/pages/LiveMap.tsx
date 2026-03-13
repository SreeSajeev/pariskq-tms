import { MapPin, Lock } from 'lucide-react';
import { AppLayout } from '@/components/AppLayout';
import { PageHeader } from '@/components/PageHeader';
import { StatusBadge } from '@/components/StatusBadge';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';
import { mockVehicles } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export default function LiveMapPage() {
  const { subscription } = useAuthStore();
  const isGrowthPlus = subscription && ['GROWTH', 'BUSINESS', 'ENTERPRISE'].includes(subscription.tier);

  if (!isGrowthPlus) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-muted mb-4">
            <Lock className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Live Fleet Tracking</h2>
          <p className="text-muted-foreground max-w-md mb-6">
            Track your entire fleet in real time on a live map. See driver locations, speed, and ETAs. Available on Growth plan and above.
          </p>
          <Button asChild><Link to="/settings/subscription">Upgrade to Growth — ₹14,999/month</Link></Button>
        </div>
      </AppLayout>
    );
  }

  const activeVehicles = mockVehicles.filter(v => v.status === 'IN_USE' || v.status === 'AVAILABLE');

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-140px)] gap-0 -m-4 lg:-m-6">
        {/* Sidebar panel */}
        <div className="w-80 border-r bg-card flex-shrink-0 flex flex-col overflow-hidden hidden md:flex">
          <div className="p-4 border-b">
            <h3 className="text-[15px] font-semibold">Fleet Overview</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{activeVehicles.length} vehicles tracked</p>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {mockVehicles.map(v => (
              <div key={v.id} className="rounded-md border p-3 hover:bg-muted/50 cursor-pointer transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-medium">{v.registrationNumber}</span>
                  <StatusBadge status={v.status} />
                </div>
                <p className="text-xs text-muted-foreground">{v.vehicleType.replace('_', ' ')} · {v.make}</p>
                {v.lastGpsPingAt && <p className="text-[10px] text-muted-foreground/70 mt-1">Last update: {Math.round((Date.now() - new Date(v.lastGpsPingAt).getTime()) / 60000)} min ago</p>}
              </div>
            ))}
          </div>
          <div className="p-3 border-t text-[11px] text-muted-foreground text-center">
            Showing {mockVehicles.length}/{mockVehicles.length} vehicles · Updated 30s ago
          </div>
        </div>

        {/* Map area */}
        <div className="flex-1 bg-muted flex items-center justify-center relative">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground font-medium">Google Maps integration</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Map container — requires @vis.gl/react-google-maps + API key</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
