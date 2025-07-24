import { serverAuth } from "../action-server/auth"
import Onboarding from "./onboarding";

export default async function Page() {
    const { user } = await serverAuth();

    console.log("User in onboarding page:", user);

    return <Onboarding userId={user?.userId} />
}