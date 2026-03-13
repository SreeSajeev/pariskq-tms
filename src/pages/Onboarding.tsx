import { useState } from 'react';
import { Truck, Building2, User2, Users, CheckCircle2, ArrowRight, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const steps = [
  { label: 'Company', icon: Building2 },
  { label: 'Vehicle', icon: Truck },
  { label: 'Driver', icon: User2 },
  { label: 'Customer', icon: Users },
  { label: 'Done', icon: CheckCircle2 },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b bg-card">
        <div className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-primary" />
          <span className="font-bold text-primary">Pariskq</span>
        </div>
        <button className="text-sm text-muted-foreground hover:text-primary" onClick={() => window.location.href = '/dashboard'}>
          Skip setup →
        </button>
      </header>

      {/* Progress */}
      <div className="px-6 py-6 border-b bg-card">
        <div className="max-w-2xl mx-auto flex items-center">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center flex-1">
              <div className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold border-2 transition-colors',
                step > i ? 'bg-primary border-primary text-white' :
                step === i ? 'border-primary text-primary' :
                'border-border text-muted-foreground'
              )}>
                {step > i ? <CheckCircle2 className="h-4 w-4" /> : <s.icon className="h-4 w-4" />}
              </div>
              {i < steps.length - 1 && <div className={cn('h-px flex-1 mx-2', step > i ? 'bg-primary' : 'bg-border')} />}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          {step === 0 && (
            <div className="space-y-6">
              <div><h2 className="text-xl font-semibold mb-1">Company Profile</h2><p className="text-sm text-muted-foreground">Tell us more about your business</p></div>
              <div className="space-y-4">
                <div><Label>Company Address</Label><Input placeholder="Plot 42, MIDC Industrial Area" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>City</Label><Input placeholder="Pune" /></div>
                  <div><Label>State</Label><Input placeholder="Maharashtra" /></div>
                </div>
                <div><Label>GST Number</Label><Input placeholder="27AAACR5055K1Z5" /></div>
              </div>
              <Button className="w-full h-11" onClick={() => setStep(1)}>Continue <ArrowRight className="h-4 w-4 ml-1" /></Button>
            </div>
          )}
          {step === 1 && (
            <div className="space-y-6">
              <div><h2 className="text-xl font-semibold mb-1">Add Your First Vehicle</h2><p className="text-sm text-muted-foreground">You can add more later</p></div>
              <div className="space-y-4">
                <div><Label>Registration Number</Label><Input placeholder="MH-12-AB-1234" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Vehicle Type</Label><Input placeholder="Truck" /></div>
                  <div><Label>Capacity (tonnes)</Label><Input type="number" placeholder="16" /></div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setStep(2)}><SkipForward className="h-4 w-4 mr-1" /> Skip</Button>
                <Button className="flex-1 h-11" onClick={() => setStep(2)}>Add & Continue</Button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-6">
              <div><h2 className="text-xl font-semibold mb-1">Add Your First Driver</h2><p className="text-sm text-muted-foreground">You can add more later</p></div>
              <div className="space-y-4">
                <div><Label>Driver Name</Label><Input placeholder="Suresh Patil" /></div>
                <div><Label>Mobile Number</Label><Input placeholder="+91 9876543220" /></div>
                <div><Label>Licence Type</Label><Input placeholder="HMV" /></div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setStep(3)}><SkipForward className="h-4 w-4 mr-1" /> Skip</Button>
                <Button className="flex-1 h-11" onClick={() => setStep(3)}>Add & Continue</Button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-6">
              <div><h2 className="text-xl font-semibold mb-1">Add Your First Customer</h2><p className="text-sm text-muted-foreground">You can add more later</p></div>
              <div className="space-y-4">
                <div><Label>Company Name</Label><Input placeholder="ABC Manufacturing Ltd" /></div>
                <div><Label>Contact Email</Label><Input placeholder="contact@abcmfg.com" /></div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setStep(4)}><SkipForward className="h-4 w-4 mr-1" /> Skip</Button>
                <Button className="flex-1 h-11" onClick={() => setStep(4)}>Add & Continue</Button>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success-bg">
                  <CheckCircle2 className="h-10 w-10 text-success" />
                </div>
              </div>
              <h2 className="text-xl font-semibold mb-2">You're all set!</h2>
              <p className="text-muted-foreground mb-6">Your Pariskq TMS is ready. Start managing your fleet.</p>
              <Button className="h-12 px-8" onClick={() => window.location.href = '/dashboard'}>
                Take me to my dashboard →
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
