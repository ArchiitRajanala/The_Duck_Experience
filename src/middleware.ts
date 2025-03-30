import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 204 });
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Max-Age', '86400');
    return response;
  }

  const response = NextResponse.next();
  
  // Add CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Set CSP header to allow Firebase Storage and remove frame-ancestors restriction
  response.headers.set(
    'Content-Security-Policy',
    `
      default-src 'self' https://*.googleapis.com https://*.firebaseio.com https://*.firebasestorage.googleapis.com;
      img-src 'self' blob: data: https://*.googleapis.com https://*.firebasestorage.googleapis.com;
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.firebaseio.com https://*.googleapis.com;
      style-src 'self' 'unsafe-inline';
      connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://*.firebasestorage.googleapis.com ws://localhost:*;
      font-src 'self' data:;
    `.replace(/\s+/g, ' ').trim()
  );

  return response;
}

// Configure which paths middleware will run on
export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};