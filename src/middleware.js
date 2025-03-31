// app/middleware.js
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request) {

//   const authToken = request.cookies.get('token');
//   if (!authToken && request.nextUrl.pathname !== '/auth' && request.nextUrl.pathname !== '/auth') {
//     // If not authenticated, redirect to the login page
//     return NextResponse.redirect(new URL('/auth', request.url));
//   } else {
//     return NextResponse.next()
//   }
}

// Correct matcher to capture routes under /auth/*
// export const config = {
//   matcher: !['/auth'],  // Example patterns
// };
