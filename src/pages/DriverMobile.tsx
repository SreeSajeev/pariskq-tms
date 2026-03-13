import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Phone, MapPin, Camera, Check, ChevronRight, Bell, User2 } from 'lucide-react';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { mockShipments } from '@/lib/mock-data';

const driverTrips = mockShipments.filter(s => s.trip?.driver?.id === 'd2a3b4c5-d6e7-8901-bcde-f12345678901');
const activeTrip = driverTrips.find(s => s.status === 'IN_TRANSIT');

type Tab = 'trips' | 'notifications' | 'profile';

export default function DriverMobilePage() {
  const [tab, setTab] = useState<Tab>('trips');
  const [podStep, setPodStep] = useState(0); // 0 = not started

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b bg-card">
        <div className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-primary" />
          <span className="font-bold text-primary">Pariskq</span>
        </div>
        <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">Driver</span>
      </header>

      {/* Offline banner */}
      <div className="bg-warning-bg border-b border-warning px-4 py-1.5 text-xs text-warning-text text-center font-medium hidden">
        You're offline — data will sync when connected
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-4">
        {tab === 'trips' && (
          <>
            {/* Active trip */}
            {activeTrip && podStep === 0 && (
              <div className="rounded-xl border-2 border-primary bg-card shadow-md p-5 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
                  <StatusBadge status={activeTrip.status} />
                </div>

                <div className="space-y-4 mb-5">
                  <div className="flex items-start gap-2">
                    <div className="mt-1 h-3 w-3 rounded-full border-2 border-info bg-info/20 flex-shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase text-muted-foreground tracking-wide font-semibold">From</p>
                      <p className="text-sm">{activeTrip.pickupAddress}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="mt-1 h-3 w-3 rounded-full border-2 border-error bg-error/20 flex-shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase text-muted-foreground tracking-wide font-semibold">To</p>
                      <p className="text-sm font-medium">{activeTrip.deliveryAddress}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-3 mb-4 text-sm">
                  <p className="font-medium">{activeTrip.customer?.companyName}</p>
                  <a href={`tel:${activeTrip.customer?.contactPhone}`} className="text-primary text-xs flex items-center gap-1 mt-1">
                    <Phone className="h-3 w-3" /> {activeTrip.customer?.contactPhone}
                  </a>
                </div>

                {activeTrip.goodsDescription && (
                  <p className="text-xs text-muted-foreground mb-4">{activeTrip.goodsDescription}</p>
                )}

                <Button className="w-full h-14 text-base bg-warning text-white hover:bg-warning/90" onClick={() => setPodStep(0)}>
                  Reached Destination
                </Button>

                <button className="w-full mt-2 text-sm text-muted-foreground text-center py-2 hover:text-foreground">
                  Report Issue
                </button>

                <a
                  href={`https://maps.google.com/?q=${activeTrip.deliveryLat},${activeTrip.deliveryLng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 mt-3 text-sm text-primary hover:underline"
                >
                  <MapPin className="h-4 w-4" /> Open in Maps →
                </a>
              </div>
            )}

            {/* POD Flow */}
            {podStep > 0 && (
              <div className="rounded-xl border bg-card shadow-sm p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs text-muted-foreground">Step {podStep} of 4</span>
                  <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(podStep / 4) * 100}%` }} />
                  </div>
                </div>

                {podStep === 1 && (
                  <div className="text-center py-8">
                    <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p className="font-medium mb-1">Take Delivery Photos</p>
                    <p className="text-sm text-muted-foreground mb-4">Minimum 1 photo required</p>
                    <Button className="w-full h-12">Open Camera</Button>
                    <Button variant="outline" className="w-full mt-2" onClick={() => setPodStep(2)}>Next →</Button>
                  </div>
                )}
                {podStep === 2 && (
                  <div className="py-4 space-y-4">
                    <div><label className="text-sm font-medium">Recipient Name</label><input className="mt-1 w-full rounded-md border border-border px-3 py-3 text-base" placeholder="Full name" /></div>
                    <div><label className="text-sm font-medium">Designation (optional)</label><input className="mt-1 w-full rounded-md border border-border px-3 py-3 text-base" placeholder="e.g. Warehouse Manager" /></div>
                    <Button className="w-full h-12" onClick={() => setPodStep(3)}>Next →</Button>
                  </div>
                )}
                {podStep === 3 && (
                  <div className="py-4 text-center">
                    <p className="text-sm font-medium mb-3">Ask the recipient to sign below</p>
                    <div className="border-2 border-dashed border-border rounded-lg h-48 bg-background flex items-center justify-center text-sm text-muted-foreground">Signature pad placeholder</div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" className="flex-1">Clear</Button>
                      <Button className="flex-1" onClick={() => setPodStep(4)}>Next →</Button>
                    </div>
                  </div>
                )}
                {podStep === 4 && (
                  <div className="py-4 text-center">
                    <Check className="h-16 w-16 text-success mx-auto mb-3" />
                    <p className="text-lg font-semibold mb-1">Delivery Complete!</p>
                    <p className="text-sm text-muted-foreground mb-4">POD submitted successfully. Your customer has been notified.</p>
                    <Button className="w-full h-12" onClick={() => setPodStep(0)}>Back to My Trips</Button>
                  </div>
                )}
              </div>
            )}

            {/* Trip list */}
            {podStep === 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-3">My Trips</h3>
                <div className="space-y-2">
                  {driverTrips.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">No trips assigned</p>
                  ) : (
                    driverTrips.map(s => (
                      <div key={s.id} className="rounded-lg border bg-card p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-xs text-primary font-medium">{s.referenceNumber}</span>
                          <StatusBadge status={s.status} />
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{s.deliveryAddress}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {tab === 'notifications' && (
          <div className="text-center py-16 text-muted-foreground"><Bell className="h-8 w-8 mx-auto mb-2" /><p className="text-sm">No new notifications</p></div>
        )}

        {tab === 'profile' && (
          <div className="text-center py-16 text-muted-foreground"><User2 className="h-8 w-8 mx-auto mb-2" /><p className="text-sm">Driver profile</p></div>
        )}
      </main>

      {/* Bottom nav */}
      <nav className="flex items-center border-t bg-card">
        {([
          { id: 'trips' as const, label: 'My Trips', icon: Truck },
          { id: 'notifications' as const, label: 'Alerts', icon: Bell },
          { id: 'profile' as const, label: 'Profile', icon: User2 },
        ]).map(item => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={cn(
              'flex-1 flex flex-col items-center gap-0.5 py-3 text-[11px] transition-colors',
              tab === item.id ? 'text-primary font-semibold' : 'text-muted-foreground'
            )}
          >
            <item.icon className="h-5 w-5" strokeWidth={1.5} />
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
