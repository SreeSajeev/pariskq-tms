import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Loader2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const schema = z.object({ email: z.string().email('Enter a valid email') });

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, getValues } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = () => {
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); setSent(true); }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-[440px]">
        <Link to="/login" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to login
        </Link>

        {!sent ? (
          <>
            <h1 className="text-xl font-semibold mb-1">Reset your password</h1>
            <p className="text-sm text-muted-foreground mb-6">Enter your email and we'll send you a reset link.</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <Label>Email address</Label>
                <Input type="email" placeholder="you@company.com" {...register('email')} />
                {errors.email && <p className="text-xs text-error">{errors.email.message}</p>}
              </div>
              <Button type="submit" className="w-full h-11" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Send Reset Link
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-success-bg">
                <Mail className="h-7 w-7 text-success" />
              </div>
            </div>
            <h2 className="text-lg font-semibold mb-2">Check your email</h2>
            <p className="text-sm text-muted-foreground">
              We've sent a password reset link to <span className="font-medium text-foreground">{getValues('email')}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
