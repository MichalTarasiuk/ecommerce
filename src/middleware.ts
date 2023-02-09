import {NextResponse} from 'next/server';

import {routes} from './common/consts/consts';

import type {NextRequest} from 'next/server';

const forbiddenPathnames = ['/mockServiceWorker.js'];

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  if (forbiddenPathnames.includes(url.pathname)) {
    url.pathname = routes.home;

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
