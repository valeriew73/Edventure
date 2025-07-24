import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function GET() {
    (await cookies()).delete("session");

    return NextResponse.redirect(`${BASE_URL}/`)
}