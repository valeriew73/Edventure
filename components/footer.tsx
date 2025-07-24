import Link from "next/link";

export default function Footer() {
    return (
        <footer>
            <div className="flex justify-between items-center px-6 py-5 max-w-6xl mx-auto text-xs">
                <p>&copy; 2023 Edventure. All rights reserved.</p>
                <ul className="flex gap-4 items-center">
                    <li><Link href="/privacy">Privacy&nbsp;Policy</Link></li>
                    <li><Link href="/terms">Terms&nbsp;of&nbsp;Service</Link></li>
                </ul>
            </div>
        </footer>
    );
}