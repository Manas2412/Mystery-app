import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const { pathname } = request.nextUrl;

    // Redirect logged-in users away from auth pages
    if (
        token &&
        (pathname.startsWith("/sign-in") ||
            pathname.startsWith("/sign-up") ||
            pathname.startsWith("/verify") ||
            pathname === "/"
        )
    ) {
        return NextResponse.redirect(
            new URL("/dashboard", request.url)
        );
    }

    // Protect dashboard routes
    if (!token && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(
            new URL("/sign-in", request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/sign-in",
        "/sign-up",
        "/verify/:path*",
        "/dashboard/:path*",
    ],
};
