import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, Upload, AlertTriangle, Loader2 } from 'lucide-react';
import { AppLayout } from '@/components/AppLayout';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockCustomers } from '@/lib/mock-data';
import { formatINR } from '@/lib/api';
import { cn } from '@/lib/utils';

const schema = z.object({
  customerId: z.string().min(1, 'Customer is required'),
  goodsDescription: z.string().min(2, 'Describe the goods'),
  goodsType: z.string().min(1, 'Select goods type'),
  quantity: z.coerce.number().optional(),
  weightKg: z.coerce.number().optional(),
  volumeCbm: z.coerce.number().optional(),
  pickupAddress: z.string().min(5, 'Pickup address is required'),
  pickupDate: z.string().min(1, 'Pickup date is required'),
  pickupTimeFrom: z.string().optional(),
  pickupTimeTo: z.string().optional(),
  deliveryAddress: z.string().min(5, 'Delivery address is required'),
  expectedDeliveryDate: z.string().min(1, 'Delivery date is required'),
  billingRateType: z.string().optional(),
  billingRateValue: z.coerce.number().optional(),
  specialInstructions: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const goodsTypes = ['GENERAL', 'FRAGILE', 'HAZARDOUS', 'PERISHABLE', 'OVERSIZED', 'VALUABLE'];
const rateTypes = ['PER_KM', 'PER_TONNE', 'PER_TONNE_PER_KM', 'PER_TRIP', 'PER_DAY'];

export default function CreateShipmentPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showHazardousWarning, setShowHazardousWarning] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const goodsType = watch('goodsType');
  const rateType = watch('billingRateType');
  const rateValue = watch('billingRateValue');

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/shipments');
    }, 1200);
  };

  return (
    <AppLayout>
      <PageHeader
        title="Create Shipment"
        breadcrumbs={[{ label: 'Shipments', href: '/shipments' }, { label: 'Create' }]}
        action={
          <Button variant="ghost" asChild><Link to="/shipments">← Cancel</Link></Button>
        }
      />

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl space-y-6">
        {/* Customer */}
        <section className="rounded-lg border bg-card shadow-sm p-5">
          <h3 className="text-[15px] font-semibold border-b pb-3 mb-4">Customer</h3>
          <div className="space-y-1.5">
            <Label>Customer *</Label>
            <Select onValueChange={(v) => setValue('customerId', v)}>
              <SelectTrigger className={cn(errors.customerId && 'border-error')}>
                <SelectValue placeholder="Select customer" />
              </SelectTrigger>
              <SelectContent>
                {mockCustomers.map(c => (
                  <SelectItem key={c.id} value={c.id}>{c.companyName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.customerId && <p className="text-xs text-error">{errors.customerId.message}</p>}
          </div>
        </section>

        {/* Goods */}
        <section className="rounded-lg border bg-card shadow-sm p-5">
          <h3 className="text-[15px] font-semibold border-b pb-3 mb-4">Goods Details</h3>
          <div className="space-y-4">
            <div>
              <Label>Description *</Label>
              <Textarea placeholder="Describe the goods being transported" {...register('goodsDescription')} className={cn(errors.goodsDescription && 'border-error')} />
              {errors.goodsDescription && <p className="text-xs text-error">{errors.goodsDescription.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Goods Type *</Label>
                <Select onValueChange={(v) => { setValue('goodsType', v); if (v === 'HAZARDOUS') setShowHazardousWarning(true); }}>
                  <SelectTrigger className={cn(errors.goodsType && 'border-error')}>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>{goodsTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Quantity</Label><Input type="number" placeholder="0" {...register('quantity')} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Weight (kg)</Label><Input type="number" placeholder="0" {...register('weightKg')} /></div>
              <div><Label>Volume (CBM)</Label><Input type="number" step="0.1" placeholder="0" {...register('volumeCbm')} /></div>
            </div>
            <div><Label>Special Instructions</Label><Textarea placeholder="Any special handling requirements" {...register('specialInstructions')} /></div>
          </div>
        </section>

        {/* Hazardous warning */}
        {showHazardousWarning && (
          <div className="rounded-lg border border-warning bg-warning-bg p-5 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-warning-text">Hazardous Goods Notice</p>
              <p className="text-sm text-warning-text/80 mt-1">Transporting hazardous materials requires special vehicle certifications, driver training, and permits. Ensure compliance before dispatching.</p>
              <div className="mt-3 flex gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => { setValue('goodsType', 'GENERAL'); setShowHazardousWarning(false); }}>Change Goods Type</Button>
                <Button type="button" variant="default" size="sm" onClick={() => setShowHazardousWarning(false)} className="bg-warning text-white hover:bg-warning/90">I Understand</Button>
              </div>
            </div>
          </div>
        )}

        {/* Pickup */}
        <section className="rounded-lg border bg-card shadow-sm p-5">
          <h3 className="text-[15px] font-semibold border-b pb-3 mb-4">Pickup Details</h3>
          <div className="space-y-4">
            <div>
              <Label>Pickup Address *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Enter pickup address" {...register('pickupAddress')} className={cn('pl-9', errors.pickupAddress && 'border-error')} />
              </div>
              {errors.pickupAddress && <p className="text-xs text-error">{errors.pickupAddress.message}</p>}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div><Label>Pickup Date *</Label><Input type="date" {...register('pickupDate')} className={cn(errors.pickupDate && 'border-error')} /></div>
              <div><Label>Time From</Label><Input type="time" {...register('pickupTimeFrom')} /></div>
              <div><Label>Time To</Label><Input type="time" {...register('pickupTimeTo')} /></div>
            </div>
          </div>
        </section>

        {/* Delivery */}
        <section className="rounded-lg border bg-card shadow-sm p-5">
          <h3 className="text-[15px] font-semibold border-b pb-3 mb-4">Delivery Details</h3>
          <div className="space-y-4">
            <div>
              <Label>Delivery Address *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Enter delivery address" {...register('deliveryAddress')} className={cn('pl-9', errors.deliveryAddress && 'border-error')} />
              </div>
              {errors.deliveryAddress && <p className="text-xs text-error">{errors.deliveryAddress.message}</p>}
            </div>
            <div><Label>Expected Delivery Date *</Label><Input type="date" {...register('expectedDeliveryDate')} className={cn(errors.expectedDeliveryDate && 'border-error')} /></div>
          </div>
        </section>

        {/* Billing */}
        <section className="rounded-lg border bg-card shadow-sm p-5">
          <h3 className="text-[15px] font-semibold border-b pb-3 mb-4">Billing</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Rate Type</Label>
              <Select onValueChange={(v) => setValue('billingRateType', v)}>
                <SelectTrigger><SelectValue placeholder="Select rate type" /></SelectTrigger>
                <SelectContent>{rateTypes.map(t => <SelectItem key={t} value={t}>{t.replace(/_/g, ' ')}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Rate Value (₹)</Label><Input type="number" placeholder="0" {...register('billingRateValue')} /></div>
          </div>
        </section>

        {/* Attachments */}
        <section className="rounded-lg border bg-card shadow-sm p-5">
          <h3 className="text-[15px] font-semibold border-b pb-3 mb-4">Attachments</h3>
          <div className="rounded-lg border-2 border-dashed border-border p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Drop files here or click to upload</p>
            <p className="text-xs text-muted-foreground/60 mt-1">PDF, JPG, PNG — Max 10MB each</p>
          </div>
        </section>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3 sticky bottom-0 bg-background py-4 border-t">
          <Button type="button" variant="outline" asChild><Link to="/shipments">Cancel</Link></Button>
          <Button type="button" variant="secondary">Save as Draft</Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Create Shipment
          </Button>
        </div>
      </form>
    </AppLayout>
  );
}
