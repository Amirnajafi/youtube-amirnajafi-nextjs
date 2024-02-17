// src/middleware.ts
import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import {isAuthenticated} from './helper/authentication';

// This function can be marked `async` if using `await` inside
const bypassAuth = ['/api/auth/login', '/api/auth/register'];
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api')) {
    if (
      request.method !== 'GET' &&
      !bypassAuth.includes(request.nextUrl.pathname)
    ) {
      const authStatus = await isAuthenticated(request);
      if (!authStatus.status)
        return NextResponse.json(authStatus, {status: 401});

      return NextResponse.next();
    }
  }
  return NextResponse.next();
}
