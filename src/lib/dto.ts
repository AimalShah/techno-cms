import 'server-only'
import {getUser} from '@/lib/dal'
import { db } from '@/app/db';
import { eq } from 'drizzle-orm';
import { users } from '@/app/db/schema';

type User = {
    username : string;
    email : string;
    role : "student" | "instructor" | "admin";
}

function canSeeUsername(viewer : User){
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
}