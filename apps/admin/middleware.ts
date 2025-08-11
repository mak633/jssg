import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);

  const scheme = headers.get('x-forwarded-proto');
  const host = headers.get('x-forwarded-host');
  const url = `${scheme}://${host}`;

  headers.set('x-url', url);

  return NextResponse.next({
    request: {
      headers: headers,
    },
  });
}
