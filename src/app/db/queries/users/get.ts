
import { db } from "../..";
import { users } from "../../schema";
import { eq } from "drizzle-orm";

export async function getAllUsers() {
    return await db.select().from(users);
}


export async function getUserById(id: string) {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
}

/**
 * Fetches a single user by their username.
 * @param username The username of the user.
 * @returns A promise that resolves to the user object, or undefined if not found.
 */
export async function getUserByUsername(username: string) {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
}


export async function getUserByEmail(email: string) {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
}