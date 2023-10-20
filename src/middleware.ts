import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/teste-middleware')) {
    return NextResponse.redirect(new URL('/teste-middleware-2', request.url));
  }
}

// Rotas que usam esse middleware:
export const config = {
  matcher: ['/teste-middleware'],
};
