import { db } from "@/db";
import { sessions } from "@/db/schema/sessions.schema";
import { eq } from "drizzle-orm";

export async function getAllSessions() {
    const data = await db.query.sessions.findMany();
    return data;
}

export async function getSessionById(id: string) {
    const data = await db.query.sessions.findFirst({
        where: eq(sessions.sessionID, id),
    });
    return data;
}
