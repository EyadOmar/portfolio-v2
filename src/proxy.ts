import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  // Strip the internal Docker port so Next.js doesn't append it to redirect URLs
  if (request.nextUrl.port === '3000') {
    request.nextUrl.port = '';
  }

  // Pass the cleaned request to next-intl
  return intlMiddleware(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
