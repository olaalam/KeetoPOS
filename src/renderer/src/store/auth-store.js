import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    setLogin: (user, token) => set({ user, token, isAuthenticated: true }),
    setLogout: () => set({ user: null, token: null, isAuthenticated: false }),
}));