import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  // Redireciona a rota raiz para /dashboard
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  return NextResponse.next()
}
 
export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/dashboard/:path*'
  ]
}
