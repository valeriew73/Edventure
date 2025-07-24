
import { NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import { initializeAdmin } from "@/lib/firebase-admin";

initializeAdmin();
const db = getFirestore();

export async function POST(req: Request) {
    const body = await req.json();  // Parse the incoming body

    const userId = body.userId;
    if (!userId) return NextResponse.json(null, { status: 400 });

    const userSnap = await db.collection("users").doc(userId).get();
    if (!userSnap.exists) return NextResponse.json(null, { status: 404 });

    const data = { ...userSnap.data(), userId: userSnap.id };

    return NextResponse.json(data, { status: 200 });
}
