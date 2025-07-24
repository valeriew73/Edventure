"use client";

import React from "react";

import { GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { setUserMutation } from "@/app/action-server/user";
import { authProvider, fbAuth } from "@/lib/firebase";
import { toast } from "sonner";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface Props {
    direction?: string;
    onSuccess?: () => void;
}

export const SignInPopup: React.FC<Props> = ({ onSuccess }) => {
    const router = useRouter();

    const { mutate: setUser } = useMutation({ mutationFn: setUserMutation });

    const signIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (!fbAuth) {
            toast.error("Authentication service is offline!");
            return;
        }

        try {
            const result = await signInWithPopup(fbAuth, authProvider);
            const { user } = result;
            const isNewUser = getAdditionalUserInfo(result)?.isNewUser;

            setUser({
                userId: user.uid, name: user.displayName,
                email: user.email, picture: user.photoURL
            });

            if (isNewUser) {
                router.push("/onboarding");
                return;
            }

            const response = await fetch(`${BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: { Authorization: `Bearer ${await user.getIdToken()}` },
                credentials: "include", // this is crucial
            });

            if (response.status === 200) {
                fbAuth.signOut(); // Sign out from Firebase to avoid conflicts with session cookie

                toast.success("Login successful!");
                router.refresh();

                onSuccess?.();
            }
        } catch {
            toast.error("Failed to log in!");
        }
    }

    return (
        <Button onClick={signIn} className="flex gap-2 items-center justify-center hover:cursor-pointer">
            <span>Masuk dengan</span><span>Google</span>
        </Button>
    );
}
