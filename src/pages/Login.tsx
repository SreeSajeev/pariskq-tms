import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Truck, Eye, EyeOff, Lock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setError(null);
    // Mock — in prod this goes through httpOnly cookie flow
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = '/dashboard';
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[40%] bg-primary flex-col justify-between p-10">
        <div className="flex items-center gap-2">
          <Truck className="h-7 w-7 text-accent" strokeWidth={1.5} />
          <span className="text-xl font-bold text-white">Pariskq</span>
        </div>
        <div>
          <p className="text-2xl font-bold text-white leading-snug mb-4">
            Your fleet, your drivers,<br />your business — one platform.
          </p>
          <p className="text-sm text-white/60 leading-relaxed">
            Trusted by transport operators across India to manage shipments, track deliveries, and automate billing.
          </p>
          <div className="mt-8 flex items-center gap-2 text-white/40 text-xs">
            <div className="h-px flex-1 bg-white/20" />
            <span className="font-mono">14,000+ trips tracked this month</span>
            <div className="h-px flex-1 bg-white/20" />
          </div>
        </div>
        <p className="text-xs text-white/30">© 2025 Pariskq IoT Solutions</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-[400px]">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Truck className="h-6 w-6 text-primary" strokeWidth={1.5} />
            <span className="text-lg font-bold text-primary">Pariskq</span>
          </div>

          <h1 className="text-xl font-semibold text-foreground mb-1">Welcome back</h1>
          <p className="text-sm text-muted-foreground mb-6">Log in to your transport control tower</p>

          {error && (
            <div className="mb-4 rounded-md border border-error/30 bg-error-bg p-3 text-sm text-error-text">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                {...register('email')}
                className={cn(errors.email && 'border-error bg-error-bg')}
              />
              {errors.email && <p className="text-xs text-error">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password')}
                  className={cn(errors.password && 'border-error bg-error-bg')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-error">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full h-11" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              Start your free trial →
            </Link>
          </p>

          <p className="mt-8 text-center text-[11px] text-muted-foreground/60 flex items-center justify-center gap-1">
            <Lock className="h-3 w-3" /> Secured with 256-bit encryption
          </p>
        </div>
      </div>
    </div>
  );
}
