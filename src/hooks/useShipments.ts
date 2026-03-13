import { useQuery } from '@tanstack/react-query';
import { mockFetch, mockPaginatedFetch } from '@/lib/api';
import { mockShipments, mockDashboardKPIs, mockAlerts, mockAuditLogs } from '@/lib/mock-data';
import type { ShipmentStatus } from '@/types';

export function useShipments(filters?: { status?: ShipmentStatus; search?: string; page?: number }) {
  return useQuery({
    queryKey: ['shipments', filters],
    queryFn: () =>
      mockPaginatedFetch(mockShipments, filters?.page ?? 1, 20, (s) => {
        if (filters?.status && s.status !== filters.status) return false;
        if (filters?.search) {
          const q = filters.search.toLowerCase();
          return s.referenceNumber.toLowerCase().includes(q) ||
            (s.customer?.companyName ?? '').toLowerCase().includes(q) ||
            s.pickupAddress.toLowerCase().includes(q) ||
            s.deliveryAddress.toLowerCase().includes(q);
        }
        return true;
      }),
  });
}

export function useShipment(id: string) {
  return useQuery({
    queryKey: ['shipment', id],
    queryFn: () => mockFetch(mockShipments.find((s) => s.id === id) ?? null),
    enabled: !!id,
  });
}

export function useDashboardKPIs() {
  return useQuery({
    queryKey: ['dashboard-kpis'],
    queryFn: () => mockFetch(mockDashboardKPIs),
  });
}

export function useAlerts() {
  return useQuery({
    queryKey: ['alerts'],
    queryFn: () => mockFetch(mockAlerts),
  });
}

export function useAuditLogs() {
  return useQuery({
    queryKey: ['audit-logs'],
    queryFn: () => mockFetch(mockAuditLogs),
  });
}
