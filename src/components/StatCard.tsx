import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  trend?: number;
  trendLabel?: string;
  variant?: 'default' | 'danger';
  href?: string;
  subtext?: string;
}

export function StatCard({ label, value, icon: Icon, trend, trendLabel, variant = 'default', href, subtext }: StatCardProps) {
  const isDanger = variant === 'danger' && typeof value === 'number' && value > 0;
  const Wrapper = href ? Link : 'div';
  const wrapperProps = href ? { to: href } : {};

  return (
    <Wrapper
      {...(wrapperProps as any)}
      className={cn(
        'group flex flex-col rounded-lg border bg-card p-5 shadow-sm transition-all hover:shadow-md cursor-pointer',
        isDanger ? 'border-error/40' : 'border-border'
      )}
    >
      <div className="flex items-start justify-between">
        <div
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-md',
            isDanger ? 'bg-error/10' : 'bg-primary/10'
          )}
        >
          <Icon className={cn('h-5 w-5', isDanger ? 'text-error' : 'text-primary')} strokeWidth={1.5} />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-[28px] font-bold leading-none text-foreground animate-count-up">{value}</p>
        <p className="mt-1 text-[13px] font-medium text-muted-foreground">{label}</p>
      </div>
      {(trend !== undefined || subtext) && (
        <div className="mt-2 flex items-center gap-1.5">
          {trend !== undefined && (
            <>
              {trend >= 0 ? (
                <ArrowUp className="h-3.5 w-3.5 text-success" />
              ) : (
                <ArrowDown className="h-3.5 w-3.5 text-error" />
              )}
              <span className={cn('text-xs font-semibold', trend >= 0 ? 'text-success' : 'text-error')}>
                {trend >= 0 ? '+' : ''}{trend} {trendLabel || 'from yesterday'}
              </span>
            </>
          )}
          {subtext && <span className="text-xs text-muted-foreground">{subtext}</span>}
        </div>
      )}
    </Wrapper>
  );
}
