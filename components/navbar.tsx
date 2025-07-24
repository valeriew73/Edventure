"use client";

import { useAtom } from "jotai";
import { SignInPopup } from "./signin-button";
import { SignOutButton } from "./singout-button";
import { authUserAtom } from "@/app/store";
import Link from "next/link";
import Image from "next/image";

import edventureIcon from "@/app/icon1.png";

export default function Navbar() {
    const [user] = useAtom(authUserAtom);

    return (
        <nav className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto w-full">
            <div className="">
                <Link href="/" className="text-lg flex items-center">
                    <Image src={edventureIcon} alt="Edventure Icon" width={30} height={30} className="inline-block mr-2" />
                    <span className="font-semibold">Edventure</span>
                </Link>
            </div>
            <div className="flex items-center gap-5">
                <Link href="/">
                    <p className="text-lg font-semibold hover:underline transition-colors duration-200">
                        Explore
                    </p>
                </Link>
                <Link href="/about">
                    <p className="text-lg font-semibold hover:underline transition-colors duration-200">
                        About
                    </p>
                </Link>

                {user ? <SignOutButton /> : <SignInPopup />}

            </div>
        </nav>
    );
}