import { eq } from "drizzle-orm";
import { db } from "../..";
import { users } from "../../schema";
import { enumUserRole } from "../../schema/users.schema";

export async function updateUser(
  userId: string,
  userData: {
    username?: string;
    email?: string;
    password?: string; // This password should already be hashed if provided
    role?: typeof enumUserRole.enumValues[number];
  }
) {
  const updateFields: Partial<typeof users.$inferInsert> = {};

  if (userData.username !== undefined) {
    updateFields.username = userData.username;
  }
  if (userData.email !== undefined) {
    updateFields.email = userData.email;
  }
  if (userData.password !== undefined) {
    updateFields.password = userData.password;
  }
  if (userData.role !== undefined) {
    updateFields.role = userData.role;
  }

  const updatedUser = await db
    .update(users)
    .set(updateFields)
    .where(eq(users.id, userId))
    .returning();

  return updatedUser[0];
}
