
import { db } from "../..";
import { users } from "../../schema";
import { eq } from "drizzle-orm";

export async function getAllUsers() {
    return await db.select({
        id : users.id,
        username : users.username,
        email : users.email,
        role : users.role,
        createdAt : users.createdAt,
        lastLogin : users.lastLogin,
        isActive : users.isActive
    }).from(users);
}


export async function getUserById(id: string) {
    const result = await db.select({
        id : users.id,
        username : users.username,
        email : users.email,
        role : users.role,
        isActive : users.isActive,
        lastLogin : users.lastLogin
    }).from(users).where(eq(users.id, id));
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

export async function getActiveUsers(){
    const result = await db.query.users.findMany({
        where : eq(users.isActive , false)
    })

    return result
};