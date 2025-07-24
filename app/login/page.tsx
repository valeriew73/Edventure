"use client";

import { SignInPopup } from "@/components/signin-button";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    const handleSuccess = () => {
        router.push("/");
    };

    return (
        <div className="flex items-center justify-center my-20">
            <div className="flex flex-col gap-4 items-center justify-center">
                <h1 className="text-4xl font-bold">Login</h1>
                <p className="text-lg">Please log in to continue.</p>

                <SignInPopup onSuccess={handleSuccess} />
            </div>
        </div>
    )
}