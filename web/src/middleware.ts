import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { Tokens } from './app/lib/session';

const protectedRoutes = ['/'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  const cookieStore = cookies();
  const accessToken = cookieStore.get('access')?.value;
  const refreshToken = cookieStore.get('refresh')?.value;

  if (!accessToken && !refreshToken && isProtectedRoute) {
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
  }

  const response = NextResponse.next();
  if (!accessToken && refreshToken) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/users/refresh`, {
      headers: {
        'Refresh-Token': refreshToken,
      },
    });

    const tokens = (await res.json()) as Tokens;
    response.cookies.set({
      name: 'access',
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      sameSite: 'strict',
      path: '/',
      value: tokens.accessToken,
    });
    response.cookies.set({
      name: 'refresh',
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      sameSite: 'strict',
      path: '/',
      value: tokens.refreshToken,
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
