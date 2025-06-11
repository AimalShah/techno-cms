import 'server-only'
import {SignJWT, jwtVerify} from "jose";
import { cookies } from 'next/headers';
import { db } from '@/db';
import { sessions } from '@/db/schema/sessions.schema';


const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload : any){
    console.log(payload);
    return new SignJWT(payload)
        .setProtectedHeader({alg : 'HS256'})
        .setIssuedAt()
        .setExpirationTime('2d')
        .sign(encodedKey);
}

export async function decrypt(session: string | undefined = ''){
    try {
        const {payload} = await jwtVerify(session, encodedKey, {
            algorithms : ['HS256']
        })
        console.log(payload);
        return payload
    } catch(error) {
        console.log('Failed to verify session')
        console.log(error);
    }
}


export async function createSession(id: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const data = await db
    .insert(sessions)
    .values({
        userID : id,
        expiresAt,
    })
    .returning({id : sessions.sessionID , userId: sessions.userID});

    const sessionId = data[0].id;
    const userId = data[0].userId;

    const session = await encrypt({sessionId, userId, expiresAt});

    const cookieStore = await cookies()
    cookieStore.set('session', session, {
        httpOnly: true,
        secure : true,
        expires : expiresAt,
        sameSite : 'lax',
        path : '/'
    })

};


export async function updateSession() {
    const session = (await cookies()).get('session')?.value
    const payload = await decrypt(session)

    if(!session || !payload){
        return null
    }

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    const cookieStore = await cookies()
    cookieStore.set('session', session , {
        httpOnly : true,
        secure : true,
        expires: expires,
        sameSite : 'lax',
        path : '/',
    })
}

export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete('session');
}


