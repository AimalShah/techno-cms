import { eq } from 'drizzle-orm';
import { db } from '../..';
import { offeringCourses } from '../../schema';


export async function updateOfferingCourse(offeringId: string, offeringData: { courseID?: string; instructorID?: string; price?: number }) {
  const updatedOfferingCourse = await db.update(offeringCourses)
    .set(offeringData)
    .where(eq(offeringCourses.offeringID, offeringId))
    .returning();
  return updatedOfferingCourse[0];
}