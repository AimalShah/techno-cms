import { eq } from "drizzle-orm";
import { db } from "../..";
import { users } from "../../schema";

export async function deleteUser(userId: string) {
  const deletedUser = await db
    .delete(users)
    .where(eq(users.id, userId))
    .returning();

  return deletedUser[0];
}