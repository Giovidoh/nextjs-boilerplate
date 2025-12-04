import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
// import routes from './features/account/dashboard/config/routes';
// import authRoutes from './features/auth/config/routes';
import { routing } from './i18n/routing';
// import { decodeJWT, type JWTPayload } from './lib/utils/jwt';

// Créer le middleware i18n
const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  // D'abord, gérer l'i18n
  const intlResponse = intlMiddleware(req);

  // Vérifier l'authentification pour les routes protégées
  const access = req.cookies.get('access_token')?.value;
  const pathname = req.nextUrl.pathname;
  const locale = pathname.match(/^\/(fr|en)/)?.[1] || routing.defaultLocale;

  // Extraire la locale depuis le pathname (ex: /fr/dashboard -> dashboard)
  const pathnameWithoutLocale = pathname.replace(/^\/(fr|en)/, '');

  // Décoder le JWT pour obtenir les informations utilisateur
  // let user: JWTPayload | null = null;
  // if (access) {
  //   user = decodeJWT<JWTPayload>(access);
  // }

  // // Les routes autorisées (publiques)
  // const publicAuthRoutes = [authRoutes.login.index, authRoutes.register.index];

  // // Les routes protégées
  // const protectedRoutes = [
  //   routes.dashboard.index,
  //   routes.manageProperties.index,
  //   routes.manageTenants.index,
  //   routes.manageRentsBillings.index,
  //   routes.trackInvoices.index,
  //   routes.payout.index,
  //   routes.myAgency.index,
  //   routes.settings.index,
  // ];

  // // // Si l'utilisateur est connecté mais pas actif
  // // if (user && !user.is_active) {
  // //   // Si pas déjà sur la page d'OTP validation, rediriger
  // //   if (!pathname.includes(authRoutes.register.otpValidation)) {
  // //     return NextResponse.redirect(
  // //       new URL(`/${locale}${authRoutes.register.otpValidation}`, req.url)
  // //     );
  // //   }
  // // }

  // // Vérifier si la route est protégée
  // if (protectedRoutes.some((route) => pathnameWithoutLocale.startsWith(route))) {
  //   if (!access || !user) {
  //     // Pas de token ou token invalide
  //     return NextResponse.redirect(new URL(`/${locale}${authRoutes.login.index}`, req.url));
  //   }

  //   if (!user.is_active) {
  //     // Utilisateur pas encore activé
  //     return NextResponse.redirect(
  //       new URL(`/${locale}${authRoutes.register.otpValidation}`, req.url),
  //     );
  //   }
  // }

  // // Si l'utilisateur est déjà connecté et actif, il ne devrait pas accéder aux pages publiques d'auth
  // if (publicAuthRoutes.some((route) => pathname.includes(route))) {
  //   if (user && user.is_active) {
  //     return NextResponse.redirect(new URL(`/${locale}${routes.dashboard.index}`, req.url));
  //   }
  // }

  // Retourner la réponse i18n si tout est OK
  return intlResponse;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
