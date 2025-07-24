import { serverAuth } from "../action-server/auth";

export default async function Layout({ children }: { children: React.ReactNode }) {

    const { isAuthenticated, user } = await serverAuth();



    return (
        <div>
            {children}
        </div>
    );
}