import { eq } from 'drizzle-orm';
import { db } from '../..';
import { enrollments } from '../../schema';

export async function deleteEnrollment(enrollmentId: string) {
    
  const deletedEnrollment = await db.delete(enrollments)
    .where(eq(enrollments.enrollmentID, enrollmentId))
    .returning();

  return deletedEnrollment[0];
}