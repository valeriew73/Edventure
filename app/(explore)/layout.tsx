import { redirect } from "next/navigation";
import { serverAuth } from "../action-server/auth";

export default async function Layout({ children }: { children: React.ReactNode }) {

    const { isAuthenticated, user } = await serverAuth();

    if (!isAuthenticated) {
        return redirect("/login");
    }

    if (!user?.onboardingCompleted) {
        return redirect("/onboarding");
    }

    return (
        <div>
            {children}
        </div>
    );
}