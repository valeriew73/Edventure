import Link from "next/link";

export default function Footer() {
    return (
        <footer>
            <div className="flex justify-between items-center px-6 py-5 max-w-6xl mx-auto">
                <p>&copy; 2023 Edventure. All rights reserved.</p>
                <ul className="flex gap-4 items-center">
                    <li><Link href="/privacy">Privacy Policy</Link></li>
                    <li><Link href="/terms">Terms of Service</Link></li>
                </ul>
            </div>
        </footer>
    );
}