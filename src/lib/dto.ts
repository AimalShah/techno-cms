import 'server-only'
import {getUser} from '@/lib/dal'
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { users } from '@/db/schema';

type User = {
    username : string;
    email : string;
    role : "student" | "instructor" | "admin" | null;
}

function canSeeUsername(viewer : User | null){
    return true
}

function canSeeEmail(viewer : User){
    return viewer.role === 'admin' ? true : false;
}

export async function getProfileDTO(slug: string){
    const data = await db.query.users.findMany({
        where : eq(users.id, slug)
    })

    const user = data[0]
    const currentUser = await getUser();

    if (!currentUser) {
        throw new Error("Current user is not authenticated");
    }

    return {
        username: canSeeUsername(currentUser) ? user.username : null,
        email : canSeeEmail(currentUser)? user.email : null
    }
}