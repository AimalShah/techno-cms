"use server";

import { db } from "@/db";
import { sessions } from "@/db/schema/sessions.schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function revalidateSessionsPath() {
    revalidatePath("/admin-dashboard/sessions");
}

export async function createSession(prevState: unknown, formData: FormData) {
    try {
        const userID = formData.get("userID") as string;
        const expiresAt = new Date(formData.get("expiresAt") as string);

        await db.insert(sessions).values({
            userID,
            expiresAt,
        });

        revalidateSessionsPath();
        return { error: false, message: "Session created successfully!" };
    } catch (error: unknown) {
        return { error: true, message: `Failed to create session: ${error.message}` };
    }
}

export async function updateSession(prevState: unknown, formData: FormData) {
    try {
        const sessionID = formData.get("sessionID") as string;
        const userID = formData.get("userID") as string;
        const expiresAt = new Date(formData.get("expiresAt") as string);

        await db.update(sessions).set({
            userID,
            expiresAt,
        }).where(eq(sessions.sessionID, sessionID));

        revalidateSessionsPath();
        return { error: false, message: "Session updated successfully!" };
    } catch (error: unknown) {
        return { error: true, message: `Failed to update session: ${error.message}` };
    }
}

export async function deleteSession(prevState: unknown, formData: FormData) {
    try {
        const sessionId = formData.get("sessionId") as string;

        await db.delete(sessions).where(eq(sessions.sessionID, sessionId));

        revalidateSessionsPath();
        return { error: false, message: "Session deleted successfully!" };
    } catch (error: unknown) {
        return { error: true, message: `Failed to delete session: ${error.message}` };
    }
}