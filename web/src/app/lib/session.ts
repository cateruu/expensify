import 'server-only';
import { cookies } from 'next/headers';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export async function createSession(tokens: Tokens) {
  const accessExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const refreshExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookies().set('access', tokens.accessToken, {
    httpOnly: true,
    secure: true,
    expires: accessExpires,
    sameSite: 'strict',
    path: '/',
  });

  cookies().set('refresh', tokens.refreshToken, {
    httpOnly: true,
    secure: true,
    expires: refreshExpires,
    sameSite: 'lax',
    path: '/',
  });
}
