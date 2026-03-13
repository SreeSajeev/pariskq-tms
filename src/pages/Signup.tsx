import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Truck, Eye, EyeOff, Loader2, Mail, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

const step1Schema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  fleetSizeRange: z.string().min(1, 'Select fleet size'),
  gstNumber: z.string().optional(),
});

const step2Schema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Enter a valid email'),
  mobile: z.string().min(10, 'Enter a valid mobile number'),
  password: z.string().min(8, 'Min 8 characters').regex(/[A-Z]/, 'Need uppercase').regex(/[0-9]/, 'Need number'),
});

type Step1 = z.infer<typeof step1Schema>;
type Step2 = z.infer<typeof step2Schema>;

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step1Data, setStep1Data] = useState<Step1 | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const form1 = useForm<Step1>({ resolver: zodResolver(step1Schema) });
  const form2 = useForm<Step2>({ resolver: zodResolver(step2Schema) });

  const onStep1 = (data: Step1) => {
    setStep1Data(data);
    setStep(2);
  };

  const onStep2 = async (data: Step2) => {
    setIsLoading(true);
    setSubmittedEmail(data.email);
    setTimeout(() => { setIsLoading(false); setStep(3); }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left */}
      <div className="hidden lg:flex lg:w-[40%] bg-primary flex-col justify-between p-10">
        <div className="flex items-center gap-2">
          <Truck className="h-7 w-7 text-accent" strokeWidth={1.5} />
          <span className="text-xl font-bold text-white">Pariskq</span>
        </div>
        <div>
          <p className="text-2xl font-bold text-white leading-snug mb-4">
            Digitise your transport<br />operations today.
          </p>
          <p className="text-sm text-white/60">
            Join hundreds of operators who've moved from WhatsApp dispatch to a professional TMS.
          </p>
        </div>
        <p className="text-xs text-white/30">© 2025 Pariskq IoT Solutions</p>
      </div>

      {/* Right */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-[480px]">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Truck className="h-6 w-6 text-primary" strokeWidth={1.5} />
            <span className="text-lg font-bold text-primary">Pariskq</span>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={cn(
                  'flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold border-2 transition-colors',
                  step > s ? 'bg-primary border-primary text-white' :
                  step === s ? 'border-primary text-primary' :
                  'border-border text-muted-foreground'
                )}>
                  {step > s ? <CheckCircle2 className="h-4 w-4" /> : s}
                </div>
                {s < 3 && <div className={cn('h-px flex-1', step > s ? 'bg-primary' : 'bg-border')} />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <>
              <h1 className="text-xl font-semibold mb-1">Create your account</h1>
              <p className="text-sm text-muted-foreground mb-6">Step 1 — Organisation details</p>
              <form onSubmit={form1.handleSubmit(onStep1)} className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Company Name</Label>
                  <Input placeholder="e.g. Ravi Transport Co." {...form1.register('companyName')} className={cn(form1.formState.errors.companyName && 'border-error')} />
                  {form1.formState.errors.companyName && <p className="text-xs text-error">{form1.formState.errors.companyName.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>Fleet Size</Label>
                  <Select onValueChange={(v) => form1.setValue('fleetSizeRange', v)}>
                    <SelectTrigger className={cn(form1.formState.errors.fleetSizeRange && 'border-error')}>
                      <SelectValue placeholder="Select fleet size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-5">1–5 vehicles</SelectItem>
                      <SelectItem value="6-15">6–15 vehicles</SelectItem>
                      <SelectItem value="16-25">16–25 vehicles</SelectItem>
                      <SelectItem value="26-50">26–50 vehicles</SelectItem>
                      <SelectItem value="50+">50+ vehicles</SelectItem>
                    </SelectContent>
                  </Select>
                  {form1.formState.errors.fleetSizeRange && <p className="text-xs text-error">{form1.formState.errors.fleetSizeRange.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>GST Number <span className="text-muted-foreground font-normal">(optional)</span></Label>
                  <Input placeholder="27AAACR5055K1Z5" {...form1.register('gstNumber')} />
                </div>
                <Button type="submit" className="w-full h-11">Continue →</Button>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-xl font-semibold mb-1">Admin user details</h1>
              <p className="text-sm text-muted-foreground mb-6">Step 2 — Your account information</p>
              <form onSubmit={form2.handleSubmit(onStep2)} className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Full Name</Label>
                  <Input placeholder="Ravi Kumar" {...form2.register('fullName')} className={cn(form2.formState.errors.fullName && 'border-error')} />
                  {form2.formState.errors.fullName && <p className="text-xs text-error">{form2.formState.errors.fullName.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>Email</Label>
                  <Input type="email" placeholder="ravi@company.com" {...form2.register('email')} className={cn(form2.formState.errors.email && 'border-error')} />
                  {form2.formState.errors.email && <p className="text-xs text-error">{form2.formState.errors.email.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>Mobile Number</Label>
                  <Input placeholder="+91 9876543210" {...form2.register('mobile')} className={cn(form2.formState.errors.mobile && 'border-error')} />
                  {form2.formState.errors.mobile && <p className="text-xs text-error">{form2.formState.errors.mobile.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>Password</Label>
                  <div className="relative">
                    <Input type={showPassword ? 'text' : 'password'} placeholder="Min 8 chars, 1 uppercase, 1 number" {...form2.register('password')} className={cn(form2.formState.errors.password && 'border-error')} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {form2.formState.errors.password && <p className="text-xs text-error">{form2.formState.errors.password.message}</p>}
                </div>
                <p className="text-xs text-muted-foreground">
                  By signing up, you agree to our{' '}
                  <a href="#" className="text-primary underline">Terms of Service</a> and{' '}
                  <a href="#" className="text-primary underline">Privacy Policy</a>.
                </p>
                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">← Back</Button>
                  <Button type="submit" className="flex-1 h-11" disabled={isLoading}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Create My Account
                  </Button>
                </div>
              </form>
            </>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-success-bg">
                  <Mail className="h-8 w-8 text-success" />
                </div>
              </div>
              <h1 className="text-xl font-semibold mb-2">Check your inbox</h1>
              <p className="text-sm text-muted-foreground mb-2">
                We've sent a verification email to <span className="font-medium text-foreground">{submittedEmail}</span>
              </p>
              <p className="text-sm text-muted-foreground mb-6">Click the link in the email to activate your account.</p>
              <Button variant="outline" size="sm">Didn't receive it? Resend email</Button>
            </div>
          )}

          {step !== 3 && (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-medium hover:underline">Sign in →</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
