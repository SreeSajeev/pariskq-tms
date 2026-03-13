import { useQuery } from '@tanstack/react-query';
import { mockFetch, mockPaginatedFetch } from '@/lib/api';
import { mockVehicles, mockDrivers } from '@/lib/mock-data';
import type { VehicleStatus, DriverStatus } from '@/types';

export function useVehicles(filters?: { status?: VehicleStatus; search?: string }) {
  return useQuery({
    queryKey: ['vehicles', filters],
    queryFn: () =>
      mockPaginatedFetch(mockVehicles, 1, 50, (v) => {
        if (filters?.status && v.status !== filters.status) return false;
        if (filters?.search) {
          const q = filters.search.toLowerCase();
          return v.registrationNumber.toLowerCase().includes(q) ||
            (v.make ?? '').toLowerCase().includes(q);
        }
        return true;
      }),
  });
}

export function useVehicle(id: string) {
  return useQuery({
    queryKey: ['vehicle', id],
    queryFn: () => mockFetch(mockVehicles.find((v) => v.id === id) ?? null),
    enabled: !!id,
  });
}

export function useDrivers(filters?: { status?: DriverStatus; search?: string }) {
  return useQuery({
    queryKey: ['drivers', filters],
    queryFn: () =>
      mockPaginatedFetch(mockDrivers, 1, 50, (d) => {
        if (filters?.status && d.status !== filters.status) return false;
        if (filters?.search) {
          const q = filters.search.toLowerCase();
          return d.fullName.toLowerCase().includes(q) ||
            d.mobile.includes(q);
        }
        return true;
      }),
  });
}

export function useDriver(id: string) {
  return useQuery({
    queryKey: ['driver', id],
    queryFn: () => mockFetch(mockDrivers.find((d) => d.id === id) ?? null),
    enabled: !!id,
  });
}
