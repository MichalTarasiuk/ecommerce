import {NextResponse} from 'next/server';

import {routes} from './common/consts/consts';
import {isProduction} from './common/utils/nodeEnvironment';

import type {NextRequest} from 'next/server';

const forbiddenPathnames = [/\.(js|mjs|cjs)/g];

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  if (
    isProduction() &&
    forbiddenPathnames.some((matcher) => url.pathname.match(matcher))
  ) {
    url.pathname = routes.home;

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
