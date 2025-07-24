"use client";

import React from "react";

import { signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";

import { LogOutIcon } from "lucide-react";
import { fbAuth } from "@/lib/firebase";
import { deleteUserSession } from "@/app/action-server/logout";

export const SignOutButton: React.FC<{ iconOnly?: boolean }> = ({ iconOnly = false }) => {
    const onSignOUt = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        await signOut(fbAuth);
        await deleteUserSession();
    }

    return (
        <React.Fragment>
            <Button
                size="sm"
                variant={"destructive"}
                onClick={onSignOUt}
                className="flex gap-3 items-center justify-center"
            >
                {!iconOnly && <span>Sign Out</span>}<LogOutIcon className="size-4" />
            </Button>
        </React.Fragment>
    );
}
