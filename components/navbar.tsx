import { SignInPopup } from "./signin-button";
import { SignOutButton } from "./singout-button";

export default function Navbar({ isAuthenticated }: { isAuthenticated: boolean }) {
    return (
        <nav className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto w-full">
            <div className="">
                <a href="/" className="text-lg">Edventure</a>
            </div>
            <div className="">
                <ul className="flex items-center gap-4">
                    <li><a href="/home">Explore</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li>
                        {isAuthenticated ? (
                            <SignOutButton />
                        ) : (
                            <SignInPopup />
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
}