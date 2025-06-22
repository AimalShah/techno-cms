
import { createUser } from "@/db/queries/users/create";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    return NextResponse.json({ message: 'this is signup route res' }, { status: 200 });
}

export async function POST(req: NextRequest) {
    const body = await req.json();

    

    const user = await createUser(body);

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