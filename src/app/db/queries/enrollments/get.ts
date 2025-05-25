import { count, eq } from 'drizzle-orm';
import { db } from '../..';
import { enrollments, students, courses, offeringCourses, instructors } from '../../schema';

export async function getAllEnrollments() {
  return await db.select().from(enrollments);
}

export async function getEnrollmentCount() {
  const total = await db.select({ count: count() }).from(enrollments);

  return total[0].count;
}

export async function getEnrollmentById(enrollmentId: string) {
  const result = await db.select().from(enrollments).where(eq(enrollments.enrollmentID, enrollmentId)).limit(1);
  return result[0];
}

export async function getEnrollmentsByStudentId(studentId: string) {
  return await db.select().from(enrollments).where(eq(enrollments.studentID, studentId));
}

export async function getEnrollmentsByOfferingId(offeringId: string) {
  return await db.select().from(enrollments).where(eq(enrollments.offeringID, offeringId));
}

export async function getEnrollmentsWithDetails() {
  return await db.select({
    enrollmentId: enrollments.enrollmentID,
    startDate: enrollments.startDate,
    endDate: enrollments.endDate,
    studentFirstName: students.firstName,
    studentLastName: students.lastName,
    courseName: courses.courseName,
    instructorFirstName: instructors.firstName,
    instructorLastName: instructors.lastName,
  })
    .from(enrollments)
    .innerJoin(students, eq(enrollments.studentID, students.studentID))
    .innerJoin(offeringCourses, eq(enrollments.offeringID, offeringCourses.offeringID))
    .innerJoin(courses, eq(offeringCourses.courseID, courses.courseID))
    .innerJoin(instructors, eq(offeringCourses.instructorID, instructors.instructorID));
}