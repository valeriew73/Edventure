"use client";

import React from "react";

import { signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";

import { LogOutIcon } from "lucide-react";
import { fbAuth } from "@/lib/firebase";
import { deleteUserSession } from "@/app/action-server/logout";
import { useRouter } from "next/navigation";

export const SignOutButton: React.FC<{ iconOnly?: boolean }> = ({ iconOnly = false }) => {
    const router = useRouter();

    const onSignOUt = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        await signOut(fbAuth);
        await deleteUserSession();

        router.refresh();
    }

    return (
        <React.Fragment>
            <Button
                variant={"destructive"}
                onClick={onSignOUt}
                className="flex gap-3 items-center justify-center hover:cursor-pointer"
            >
                {!iconOnly && <span>Sign Out</span>}<LogOutIcon className="size-4" />
            </Button>
        </React.Fragment>
    );
}
