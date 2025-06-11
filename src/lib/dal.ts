import 'server-only'

import { cookies } from "next/headers";
import { decrypt } from './session';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import { getUserById } from '@/db/queries/users/get';

export const verifySession = cache(async () => {
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie);

    if (!session?.sessionId) {
        redirect('/login')
    }

    return { isAuth: true, userId : session.userId}
})

export const getUser = cache(async () => {
    const session = await verifySession()

    if (!session) return null

    try {
        const user = await getUserById(session.userId as string);

        return user
    } catch (error) {
        console.log('Failed to fetch user')
        return null
    }
})