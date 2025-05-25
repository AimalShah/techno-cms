import { eq } from 'drizzle-orm';
import { db } from '../..';
import { offeringCourses } from '../../schema';

export async function deleteOfferingCourse(offeringId: string) {
  const deletedOfferingCourse = await db.delete(offeringCourses)
    .where(eq(offeringCourses.offeringID, offeringId))
    .returning();
  return deletedOfferingCourse[0];
};