"use server"

import { db } from "@/db";
import { users } from "@/db/schema";
import { SignupFormSchema, FormState, LoginFormState, LoginFormSchema } from "@/lib/definitions"
import { createSession, deleteSession } from "@/lib/session";
import bycrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function signup(state: FormState, formData: FormData) {
    const validateFields = SignupFormSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        role: formData.get("role"),
    });

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors
        }
    }
    const { name, email, password, role } = validateFields.data;
    const hashedPassword = await bycrypt.hash(password, 10);

    const reqData = {
        username: name,
        email,
        password: hashedPassword,
        role
    }

    try {
        const res = await fetch("http://localhost:3000/api/signup", {
            method: 'POST',
            body: JSON.stringify(reqData),
        });

        if (res.ok) {
            const data = await res.json();
            await createSession(data.userData.id);
            return redirect("/");
        }

        return {
            error: true,
            success: false,
            message: 'An error occurd try again'
        }
    } catch (e) {
        throw e;
    }



}


export async function login(formData: FormData) {
    const validateField = LoginFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!validateField.success) {
        return {
            errors: validateField.error.flatten().fieldErrors
        }
    }

    const { email, password } = validateField.data;


    try {
        const user = await db.query.users.findFirst({
            where: eq(users.email, email)
        });

        if (!user) {
            return {
                error: true,
                message: "Email not found"
            };
        }

        const isPasswordCorrect = await bycrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return {
                error: true,
                message: "Password is Incorrect"
            };
        }


        await db.update(users).set({
            lastLogin : new Date().toISOString(),
        })
        .where(eq(users.email , user.email))

        await createSession(user.id);
        redirect("/");


    } catch (e) {
        throw e;
    }


}

export async function logout() {
    deleteSession();
    redirect("/login");
}