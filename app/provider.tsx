"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Provider as JotaiProvider } from 'jotai'

import { useAtom } from 'jotai'
import { Fragment, useEffect } from 'react'

import { fbAuth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { authUserAtom } from '@/app/store';
import { useQuery } from '@tanstack/react-query';
import { DecodedIdToken } from 'firebase-admin/auth';


interface AuthProviderProps { children: React.ReactNode }

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


export const AuthProvider = ({
    children,
}: AuthProviderProps) => {
    const [, setAuthUser] = useAtom(authUserAtom);

    const { data } = useQuery({
        queryKey: ['authUser'],
        queryFn: async () => {
            return new Promise((resolve, reject) => {
                fetch(`${BASE_URL}/api/auth/login`, {
                    method: "GET",
                    credentials: "include", // this is crucial
                }).then(async (response) => {
                    if (!response.ok) {
                        reject(new Error('Failed to fetch user data'));
                    }
                    const data = await response.json();
                    resolve(data.user);
                })
            });
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    })

    useEffect(() => {
        if (data) setAuthUser(data as any);
        else setAuthUser(null);
    }, [data, setAuthUser]);

    // Listen for changes to the user session
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(fbAuth, async (authUser) => {
            if (authUser) setAuthUser({
                name: authUser.displayName,
                email: authUser.email,
                picture: authUser.photoURL,
                uid: authUser.uid,
            } as unknown as DecodedIdToken);
        });

        return () => unsubscribe();
    }, [fbAuth, setAuthUser]);

    return (
        <Fragment>
            {children}
        </Fragment>
    );
};

export default function Provider({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient()

    return (
        <JotaiProvider>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </QueryClientProvider>
        </JotaiProvider >
    );
}