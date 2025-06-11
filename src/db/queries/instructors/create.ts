import { db } from "../..";
import { instructors } from "../../schema";

export async function createInstructor(instructorData: { firstName: string; lastName: string; phone: string; email: string; address: string }) {
  const newInstructor = await db.insert(instructors).values(instructorData).returning();
  return newInstructor[0];
}