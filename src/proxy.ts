import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  // 1. Get the generated response from next-intl
  const response = intlMiddleware(request);

  // 2. Check if the response is a redirect (contains a Location header)
  // if (response.headers.has('location')) {
  //   const location = response.headers.get('location');

  //   // 3. Forcefully strip the internal Docker port from the redirect URL
  //   if (location && location.includes(':3000')) {
  //     response.headers.set('location', location.replace(':3000', ''));
  //   }
  // }

  return response;
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
