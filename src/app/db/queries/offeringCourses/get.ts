import { eq } from 'drizzle-orm';
import { db } from '../..';
import { instructors, offeringCourses, courses } from '../../schema';

export async function getAllOfferingCourses() {
  return await db.select().from(offeringCourses);
}

export async function getOfferingCourseById(offeringId: string) {
  const result = await db.select().from(offeringCourses).where(eq(offeringCourses.offeringID, offeringId)).limit(1);
  return result[0];
}

export async function getOfferingCoursesByCourseId(courseId: string) {
  return await db.select().from(offeringCourses).where(eq(offeringCourses.courseID, courseId));
}

export async function getOfferingCoursesByInstructorId(instructorId: string) {
  return await db.select().from(offeringCourses).where(eq(offeringCourses.instructorID, instructorId));
}

export async function getOfferingCoursesWithDetails() {
  return await db.select({
    offeringId: offeringCourses.offeringID,
    price: offeringCourses.price,
    courseName: courses.courseName,
    courseDuration: courses.duration,
    instructorFirstName: instructors.firstName,
    instructorLastName: instructors.lastName,
  })
  .from(offeringCourses)
  .innerJoin(courses, eq(offeringCourses.courseID, courses.courseID))
  .innerJoin(instructors, eq(offeringCourses.courseID, instructors.instructorID));
}