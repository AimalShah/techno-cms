import { db } from "@/app/db";
import { users } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import bycrypt from "bcrypt";



export async function POST(req: NextRequest) {
    const body = await req.json();

    const user = await db.query.users.findFirst({
        where: eq(users.email, body.email)
    });

    if (!user) {
        return NextResponse.json(
            {
                success: false,
                error: true,
                message: "Email not found"
            },
            { status: 400 });
    };

    const isPasswordValid = await bycrypt.compare(body.password, user.password);

    if (!isPasswordValid) {
        return NextResponse.json({
            success: false,
            error: true,
            message: "Password is Incorrect"
        }, { status: 300 });
    }

    const { id } = user;

    return NextResponse.json({
        success: true,
        error: false,
        message: "Login Successfull",
        user: id
    },
        {
            status: 200
        });

}