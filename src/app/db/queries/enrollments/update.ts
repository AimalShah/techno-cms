import { eq } from 'drizzle-orm';
import { db } from '../..';
import { enrollments } from '../../schema';

export async function updateEnrollment(enrollmentId: string, enrollmentData: { studentID?: string; offeringID?: string; startDate?: string; endDate?: string }) {
  
    const updatedEnrollment = await db.update(enrollments)
    .set(enrollmentData)
    .where(eq(enrollments.enrollmentID, enrollmentId))
    .returning();

  return updatedEnrollment[0];
}