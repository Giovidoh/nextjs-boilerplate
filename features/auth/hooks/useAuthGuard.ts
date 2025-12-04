'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '../store/auth-store';

/**
 * Redirige vers la page de login si l'utilisateur n'est pas authentifié.
 * Utilisation : const user = useAuthGuard();
 */
export function useAuthGuard() {
  const { user, fetchMe } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    async function check() {
      if (!user) {
        try {
          await fetchMe();
        } catch {
          router.replace('/?next=' + encodeURIComponent(window.location.pathname));
        }
      }
    }
    check();
  }, [user, fetchMe, router]);

  return user;
}
