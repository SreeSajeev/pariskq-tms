import { useQuery } from '@tanstack/react-query';
import { mockFetch, mockPaginatedFetch } from '@/lib/api';
import { mockInvoices, mockCustomers } from '@/lib/mock-data';
import type { InvoiceStatus } from '@/types';

export function useInvoices(filters?: { status?: InvoiceStatus; search?: string }) {
  return useQuery({
    queryKey: ['invoices', filters],
    queryFn: () =>
      mockPaginatedFetch(mockInvoices, 1, 50, (inv) => {
        if (filters?.status && inv.status !== filters.status) return false;
        if (filters?.search) {
          const q = filters.search.toLowerCase();
          return inv.invoiceNumber.toLowerCase().includes(q) ||
            (inv.customer?.companyName ?? '').toLowerCase().includes(q);
        }
        return true;
      }),
  });
}

export function useInvoice(id: string) {
  return useQuery({
    queryKey: ['invoice', id],
    queryFn: () => mockFetch(mockInvoices.find((i) => i.id === id) ?? null),
    enabled: !!id,
  });
}

export function useCustomers(filters?: { search?: string }) {
  return useQuery({
    queryKey: ['customers', filters],
    queryFn: () =>
      mockPaginatedFetch(mockCustomers, 1, 50, (c) => {
        if (filters?.search) {
          const q = filters.search.toLowerCase();
          return c.companyName.toLowerCase().includes(q);
        }
        return true;
      }),
  });
}

export function useCustomer(id: string) {
  return useQuery({
    queryKey: ['customer', id],
    queryFn: () => mockFetch(mockCustomers.find((c) => c.id === id) ?? null),
    enabled: !!id,
  });
}
