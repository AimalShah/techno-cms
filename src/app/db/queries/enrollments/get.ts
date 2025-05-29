import { count, eq, gte, sql, and, between, lte } from 'drizzle-orm';
import { db } from '../..';
import { enrollments, students, courses, offeringCourses, instructors } from '../../schema';
import { formatDateToYYYYMMDD } from '@/lib/utils';


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

export async function getEnrollmentsWithDetails(limit? : number) {
  let query = db.select({
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
  
  if(limit && limit > 0){
    //@ts-ignore
    query = query.limit(limit);
  }

  return await query;

}

/**
 * Fetches all enrollments that are currently active.
 * An enrollment is considered active if the current date falls between its start_date and end_date (inclusive).
 * @returns A promise that resolves to an array of active enrollment details.
 */
export async function getActiveEnrollments() {
    const today = new Date();
    const todayFormatted = formatDateToYYYYMMDD(today); // Format today's date

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
        .innerJoin(instructors, eq(offeringCourses.instructorID, instructors.instructorID))
        .where(and(
            // Ensure start_date is less than or equal to today
            lte(enrollments.startDate, todayFormatted),
            // Ensure end_date is greater than or equal to today
            gte(enrollments.endDate, todayFormatted)
        ));
}

/**
 * Fetches enrollments that have started within a specified number of recent days.
 * Default is 7 days if no `days` parameter is provided.
 * @param days The number of days back from today to consider for "new" enrollments. Defaults to 7.
 * @returns A promise that resolves to an array of new enrollment details.
 */
export async function getNewEnrollments(days: number = 7) {
    const today = new Date();
    const todayFormatted = formatDateToYYYYMMDD(today); // Format today's date

    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - days); // 'days' days ago
    const pastDateFormatted = formatDateToYYYYMMDD(pastDate); // Format the past date

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
        .innerJoin(instructors, eq(offeringCourses.instructorID, instructors.instructorID))
        .where(between(enrollments.startDate, pastDateFormatted, todayFormatted)); // Pass formatted strings
}