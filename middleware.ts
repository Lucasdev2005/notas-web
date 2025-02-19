import { NextRequest, NextResponse } from 'next/server';
import { TOKEN_KEY } from './src/constants/token';

export function middleware(req: NextRequest) {
  const token = req.cookies.get(TOKEN_KEY);
  const { pathname } = req.nextUrl;

  if (!token && pathname !== '/login' && pathname !== '/') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
