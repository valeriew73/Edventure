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
            <div className="">
                <ul className="flex items-center gap-4">
                    <Link href="/">Explore</Link>
                    <Link href="/about">About</Link>
                    <li>
                        {user ? <SignOutButton /> : <SignInPopup />}
                    </li>
                </ul>
            </div>
        </nav>
    );
}