import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Next.js 16: export named "proxy" instead of default
export function proxy(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all paths except static assets and API routes
    '/((?!_next|_vercel|.*\\..*).*)',
    '/',
  ],
};
