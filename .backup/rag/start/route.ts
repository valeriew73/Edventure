
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    return NextResponse.json({ message: "RAG process started for fileId" }, { status: 200 });
}