import { NextRequest , NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";

const protectedRoutes = ['/admin-dashboard'];
const publicRoutes = ['/login', '/signup' , '/'];

export default async function middleware(req: NextRequest){

    const path = req.nextUrl.pathname
    const isProtecedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path);


    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)


    if(isProtecedRoute && !session?.sessionId){
        return NextResponse.redirect(new URL('/login' , req.nextUrl))
    }

    if (
        isPublicRoute &&
        session?.userID &&
        !req.nextUrl.pathname.startsWith('/admin-dashboard')
    ) {
        return NextResponse.redirect(new URL('/admin-dashboard', req.nextUrl))
    }

    return NextResponse.next()
}

export const config = {
    matcher : ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}