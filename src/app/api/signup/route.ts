import { db } from "@/app/db";
import { users } from "@/app/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    return NextResponse.json({ message: 'this is signup route res' }, { status: 200 });
}

export async function POST(req: NextRequest) {
    const body = await req.json();

    console.log(body);

    
    const data = await db
        .insert(users)
        .values({
            username: body.name,
            email: body.email,
            password: body.password,
        })
        .returning({ id: users.id });

    const user = data[0];

    if (!user) {
        return NextResponse.json(
            { message: 'An error occurred while creating your account' },
            { status: 300 }
        )
    }

    return NextResponse.json(
        {
            userData: user,
            message: 'Account created successfull'
        },
        { status: 200 }
    );
}