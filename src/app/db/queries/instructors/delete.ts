import { eq } from 'drizzle-orm';
import { db } from '../..';
import { instructors } from '../../schema';

export async function deleteInstructor(instructorId: string) {
  const deletedInstructor = await db.delete(instructors)
    .where(eq(instructors.instructorID, instructorId))
    .returning();
  return deletedInstructor[0];
}