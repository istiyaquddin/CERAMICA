import { betterFetch } from "@better-fetch/fetch";
import { NextResponse } from "next/server";

export default async function middleware(request) {
	const { data: session } = await betterFetch(
		"/api/auth/get-session",
		{
			baseURL: request.nextUrl.origin,
			headers: {
				//get the cookie from the request
				cookie: request.headers.get("cookie") || "",
			},
		},
	);

	const isPrivateRoute = 
        request.nextUrl.pathname.startsWith("/tile/") || 
        request.nextUrl.pathname.startsWith("/my-profile");

	if (isPrivateRoute && !session) {
		return NextResponse.redirect(new URL("/login?message=Please login to access this page", request.url));
	}
	return NextResponse.next();
}

export const config = {
	matcher: ["/tile/:path*", "/my-profile"],
};
