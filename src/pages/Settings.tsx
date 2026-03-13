import { AppLayout } from '@/components/AppLayout';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuthStore } from '@/stores/authStore';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const tabs = ['Organisation', 'Users', 'Subscription', 'Notifications'];

export default function SettingsPage() {
  const { organisation, subscription, user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('Organisation');

  return (
    <AppLayout>
      <PageHeader title="Settings" breadcrumbs={[{ label: 'Settings' }]} />

      <div className="flex items-center gap-1 border-b border-border mb-6 overflow-x-auto">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={cn('px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap', activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-primary')}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Organisation' && (
        <div className="max-w-2xl space-y-6">
          <div className="rounded-lg border bg-card shadow-sm p-5">
            <h3 className="text-[15px] font-semibold border-b pb-3 mb-4">Company Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><Label>Company Name</Label><Input defaultValue={organisation?.companyName} /></div>
              <div><Label>GST Number</Label><Input defaultValue={organisation?.gstNumber ?? ''} /></div>
              <div className="sm:col-span-2"><Label>Address</Label><Input defaultValue={organisation?.addressLine1 ?? ''} /></div>
              <div><Label>City</Label><Input defaultValue={organisation?.city ?? ''} /></div>
              <div><Label>State</Label><Input defaultValue={organisation?.state ?? ''} /></div>
              <div><Label>Phone</Label><Input defaultValue={organisation?.phone ?? ''} /></div>
              <div><Label>Email</Label><Input defaultValue={organisation?.email ?? ''} /></div>
            </div>
            <Button className="mt-4">Save Changes</Button>
          </div>
        </div>
      )}

      {activeTab === 'Users' && (
        <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b">
            <h3 className="text-[15px] font-semibold">Team Members</h3>
            <Button size="sm">Invite User</Button>
          </div>
          <table className="w-full text-sm">
            <thead><tr className="bg-muted text-[12px] uppercase tracking-wider text-muted-foreground">
              <th className="text-left px-4 py-2.5 font-semibold">Name</th>
              <th className="text-left px-4 py-2.5 font-semibold">Email</th>
              <th className="text-left px-4 py-2.5 font-semibold">Role</th>
              <th className="text-left px-4 py-2.5 font-semibold">Status</th>
            </tr></thead>
            <tbody>
              <tr className="border-b hover:bg-primary/[0.04]">
                <td className="px-4 py-3 font-medium">{user?.fullName}</td>
                <td className="px-4 py-3 text-muted-foreground">{user?.email}</td>
                <td className="px-4 py-3"><span className="text-xs font-semibold uppercase text-primary">{user?.role}</span></td>
                <td className="px-4 py-3"><span className="text-xs font-semibold text-success">Active</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'Subscription' && (
        <div className="max-w-2xl space-y-6">
          <div className="rounded-lg border bg-card shadow-sm p-5">
            <h3 className="text-[15px] font-semibold border-b pb-3 mb-4">Current Plan</h3>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl font-bold text-primary">{subscription?.tier}</span>
              {subscription?.status === 'TRIALING' && <span className="rounded-full bg-warning-bg text-warning-text text-xs font-semibold px-2.5 py-0.5 border border-warning">Trial</span>}
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Vehicles</span>
                  <span className="font-medium">4 / {subscription?.maxVehicles}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${(4 / (subscription?.maxVehicles ?? 25)) * 100}%` }} /></div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Users</span>
                  <span className="font-medium">1 / {subscription?.maxUsers}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${(1 / (subscription?.maxUsers ?? 10)) * 100}%` }} /></div>
              </div>
            </div>
            <Button className="mt-6">Upgrade Plan</Button>
          </div>
        </div>
      )}

      {activeTab === 'Notifications' && (
        <div className="max-w-2xl rounded-lg border bg-card shadow-sm p-5">
          <h3 className="text-[15px] font-semibold border-b pb-3 mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            {['Shipment status updates', 'Driver assignments', 'Document expiry alerts', 'Invoice reminders', 'System announcements'].map(pref => (
              <div key={pref} className="flex items-center justify-between py-2 border-b last:border-0">
                <span className="text-sm">{pref}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-9 h-5 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </AppLayout>
  );
}
