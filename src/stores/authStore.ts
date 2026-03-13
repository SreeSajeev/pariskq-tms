import { create } from 'zustand';
import type { User, Organisation, Subscription } from '@/types';

interface AuthState {
  user: User | null;
  organisation: Organisation | null;
  subscription: Subscription | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setAuth: (user: User, org: Organisation, sub: Subscription) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  organisation: null,
  subscription: null,
  isAuthenticated: false,
  isLoading: true,

  setAuth: (user, organisation, subscription) =>
    set({ user, organisation, subscription, isAuthenticated: true, isLoading: false }),

  clearAuth: () =>
    set({ user: null, organisation: null, subscription: null, isAuthenticated: false, isLoading: false }),

  setLoading: (isLoading) => set({ isLoading }),
}));
