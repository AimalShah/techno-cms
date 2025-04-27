import 'server-only'

import {cookies} from "next/headers";
import { decrypt } from './session';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import { db } from '@/app/db';
import { users } from '@/app/db/schema';
import { eq } from 'drizzle-orm';

export const verifySession =  cache(async () => {
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)


    if(!session?.userID) {
        redirect('/login')
    }

    return {isAuth: true, userID: session.userID}
})

export const getUser = cache(async () => {
    const session = await verifySession()

    if(!session) return null

    try {
        const data = await db.select({
            username : users.id,
            email : users.email,
            role : users.role
        }).from(users).where(eq(users.id, String(session.userID)));

        const user = data[0]

        return user
    } catch(error) {
        console.log('Failed to fetch user')
        return null
    }
})