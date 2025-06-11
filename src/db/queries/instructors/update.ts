import { eq } from 'drizzle-orm';
import { db } from '../..';
import { instructors } from '../../schema';

export async function updateInstructor(instructorId: string, instructorData: { firstName?: string; lastName?: string; phone?: string; email?: string; address?: string }) {
  const updatedInstructor = await db.update(instructors)
    .set(instructorData)
    .where(eq(instructors.instructorID, instructorId))
    .returning();
  return updatedInstructor[0];
}