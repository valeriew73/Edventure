'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

export const deleteUserSession = async () => {
    const cookieList = await cookies();
    cookieList.delete('session');
}