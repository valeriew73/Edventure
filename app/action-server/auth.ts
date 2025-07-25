"use server";

import { DecodedIdToken } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { getUser } from "./user";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type ServerAuthResponse = {
    isAuthenticated: boolean;
    user?: DecodedIdToken;
};

export const serverAuth = async (): Promise<ServerAuthResponse> => {
    const cookieList = await cookies();
    const session = cookieList.get("session");

    const invalidSession = {
        isAuthenticated: false,
        user: undefined,
    }

    if (!session) return invalidSession;

    try {
        const responseAPI = await fetch(`${BASE_URL}/api/auth/login`, {
            headers: {
                Cookie: `session=${session?.value}`,
            },
        });

        if (!responseAPI.ok) throw new Error("Unauthorized");

        const result = await responseAPI.json();

        const userData = await getUser(result.user.uid);

        return {
            isAuthenticated: true,
            user: {
                ...result.user,
                ...userData,
            } as any,
        }
    } catch (error) {
        console.log("Error in serverAuth:", error);
        return invalidSession;
    }
}