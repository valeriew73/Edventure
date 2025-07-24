import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export async function middleware(request: NextRequest) {
    const session = request.cookies.get("session")?.value;

    try {
        if (!session) return NextResponse.redirect(new URL("/login", BASE_URL));

        // Validate session by calling login API
        const loginApi = await fetch(`${BASE_URL}/api/auth/login`, {
            method: "GET",
            headers: {
                Cookie: `session=${session}`,
            },
        });

        if (!loginApi.ok) {
            return NextResponse.redirect(new URL("/api/auth/logout", BASE_URL));
        }

        const loginData = await loginApi.json();
        const userId = loginData.user.uid;

        // Fetch user metadata to check onboarding status
        const metadataApi = await fetch(`${BASE_URL}/api/auth/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
        });

        if (!metadataApi.ok) {
            return NextResponse.redirect(new URL("/api/auth/logout", BASE_URL));
        }

        const metadata = await metadataApi.json();
        if (!metadata.cvData || !metadata.cvUrl) {
            return NextResponse.redirect(new URL("/onboarding", BASE_URL));
        }

        return NextResponse.next();
    } catch (error) {
        console.error("Middleware error:", error);
        return NextResponse.redirect(new URL("/login", BASE_URL));
    }
}

export const config = {
    matcher: [
        // "/onboarding",
        // "/"
    ],
};
