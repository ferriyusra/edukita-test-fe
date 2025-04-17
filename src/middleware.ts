import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { JWTExtended } from './types/Auth';
import { getToken } from 'next-auth/jwt';
import { environment } from './config/environment';

export async function middleware(request: NextRequest) {
	const token: JWTExtended | null = await getToken({
		req: request,
		secret: environment.AUTH_SECRET,
	});

	const { pathname } = request.nextUrl;

	if (pathname === '/auth/login' || pathname === '/auth/register') {
		if (token) {
			return NextResponse.redirect(new URL('/', request.url));
		}
	}

	if (pathname.startsWith('/teacher')) {
		if (!token) {
			const url = new URL('/auth/login', request.url);
			url.searchParams.set('callbackUrl', encodeURI(request.url));

			return NextResponse.redirect(url);
		}

		if (token?.user?.role !== 'TEACHER') {
			return NextResponse.redirect(new URL('/', request.url));
		}

		if (pathname === '/teacher') {
			return NextResponse.redirect(new URL('/teacher/assignment', request.url));
		}
	}

	if (pathname.startsWith('/student')) {
		if (!token) {
			const url = new URL('/auth/login', request.url);
			url.searchParams.set('callbackUrl', encodeURI(request.url));
			return NextResponse.redirect(url);
		}

		if (token?.user?.role !== 'STUDENT') {
			return NextResponse.redirect(new URL('/', request.url));
		}

		if (pathname === '/student') {
			return NextResponse.redirect(new URL('/student/assignment', request.url));
		}
	}
}

export const config = {
	matcher: ['/auth/:path*', '/teacher/:path*', '/student/:path*'],
};
