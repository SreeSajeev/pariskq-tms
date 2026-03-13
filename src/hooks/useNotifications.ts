import { useQuery } from '@tanstack/react-query';
import { mockFetch } from '@/lib/api';
import { mockNotifications } from '@/lib/mock-data';

export function useNotifications() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: () => mockFetch(mockNotifications),
  });
}
