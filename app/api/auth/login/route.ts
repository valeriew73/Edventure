import { initializeAdmin } from "@/lib/firebase-admin";
import { auth } from "firebase-admin";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

// Init the Firebase SDK every time the server is called
initializeAdmin();

export async function POST(request: Request) {

    const headersList = await headers();

    const authorization = headersList.get("Authorization");
    if (authorization?.startsWith("Bearer ")) {

        const idToken = authorization.split("Bearer ")[1];
        const decodedToken = await auth().verifyIdToken(idToken);

        if (decodedToken) {
            //Generate session cookie
            const expiresIn = 60 * 60 * 24 * 5 * 1000;
            const sessionCookie = await auth().createSessionCookie(idToken, {
                expiresIn,
            });
            const options = {
                name: "session",
                value: sessionCookie,
                maxAge: expiresIn,
                httpOnly: true,
                secure: true,
            };

            const cookieList = await cookies();

            cookieList.set(options);

            return NextResponse.json({
                message: "User verified!"
            }, { status: 200 });
        }

        return NextResponse.json({
            message: "Failed to verify user!"
        }, { status: 400 });

    }
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function GET(request: Request) {

    const cookieList = await cookies();

    const session = cookieList.get("session");
    if (!session) {
        return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }

    const sessionValue = session.value;

    try {
        const decodedClaims = await auth().verifySessionCookie(sessionValue, true);
        return NextResponse.json({ isAuthenticated: true, user: decodedClaims }, { status: 200 });
    } catch (error) {
        cookieList.delete("session");
        return NextResponse.redirect(`${BASE_URL}/`)
    }
}
