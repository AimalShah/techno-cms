import "server-only";

import { count, eq, gte, desc , and, between, lte } from 'drizzle-orm';
import { db } from '../..';
import { enrollments, students, courses, offeringCourses, instructors } from '../../schema';
import { formatDateToYYYYMMDD } from '@/lib/server-utils';



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

export async function getEnrollmentForSpecificCourse(id : string){
   const data = await db.select({
    studentFirstName: students.firstName,
    studentLastName: students.lastName,
    courseName: courses.courseName,
  })
    .from(enrollments)
    .innerJoin(students, eq(enrollments.studentID, students.studentID))
    .where(eq(enrollments.offeringID, id));
    

    return data;
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
    query = query.limit(limit);
  }

  return await query;

}


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
            lte(enrollments.startDate, todayFormatted),
            gte(enrollments.endDate, todayFormatted)
        ));
}

export async function getNewEnrollments(days: number = 7) {
    const today = new Date();
    const todayFormatted = formatDateToYYYYMMDD(today);
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - days);
    const pastDateFormatted = formatDateToYYYYMMDD(pastDate);
    
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
        .where(between(enrollments.startDate, pastDateFormatted, todayFormatted))
        .orderBy(desc(enrollments.startDate))
        .limit(4);
}