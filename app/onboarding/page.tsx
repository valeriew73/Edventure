import { redirect } from "next/navigation";
import { serverAuth } from "../action-server/auth"
import Onboarding from "./onboarding";

export default async function Page() {
    const { user, isAuthenticated } = await serverAuth();

    if (!isAuthenticated) {
        return redirect("/login");
    }

    return <Onboarding userId={user?.userId} />
}