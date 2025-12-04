import authRoutes from "@/features/auth/config/routes";
import type { UserType } from "@/features/auth/types";
import { create } from "zustand";
import { StateStorage, createJSONStorage, persist } from "zustand/middleware";

type State = {
  user: UserType | undefined;
  loading: boolean;
  error?: string;
  login: (creds: { email: string; password: string }) => Promise<any>;
  logout: () => Promise<void>;
  fetchMe: () => Promise<void>;
};

// Create a custom storage object
const customStorage: StateStorage = {
  getItem: (name: string): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(name);
  },
  setItem: (name: string, value: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(name, value);
  },
  removeItem: (name: string): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(name);
  },
};

export const useAuthStore = create<State>()(
  persist(
    (set) => ({
      user: undefined,
      loading: false,
      async login(creds) {
        set({ loading: true, error: undefined });
        try {
          // TODO:LOGIN
        } catch (e: any) {
          set({
            error: e?.response?.data?.detail?.message || "Invalid credentials",
          });
          return null;
        } finally {
          set({ loading: false });
        }
      },

      async fetchMe() {
        set({ loading: true });
        try {
          // TODO:FETCH_ME
        } finally {
          set({ loading: false });
        }
      },

      async logout() {
        // TODO:LOGOUT
        set({ user: undefined });
      },
    }),
    {
      name: "demo-creator-auth-store",
      storage: createJSONStorage(() => customStorage),
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
