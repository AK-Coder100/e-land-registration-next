// app/middleware.js
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request) {
    //   const authToken = request.cookies.get('auth_token');
    console.log("here")

    //   if (!authToken) {
    //     // If not authenticated, redirect to the login page
    //     return NextResponse.redirect(new URL('/login', request.url));
    //   }

    //   return NextResponse.next();
    return NextResponse.redirect(new URL('/', request.url))
}

// You can apply the middleware to specific paths like '/protected/*'
export const config = {
    matcher: ['/', '/auth/*'],  // Protect any routes under /protected and /dashboard
};
