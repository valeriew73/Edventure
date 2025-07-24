import { NextResponse } from "next/server";
import { } from "playwright"

async function revalidateFunction() {
    try {
        // Do crawling with playwright

        return true;
    } catch (error) {
        return false;
    }

}

export async function POST(req: Request) {

    (async () => {
        await revalidateFunction();
    })();

    return NextResponse.json({ message: "Revalidation triggered" }, { status: 200 });
}