import { db } from '../..';
import { eq, and, between, sql } from 'drizzle-orm';
import { attendance } from '../../schema/attendance.schema';
import { enrollments } from '../../schema';


export async function getAllAttendance() {
    return await db.select().from(attendance);
}

export async function getAttendanceById(attendanceId: string) {
    const result = await db.select().from(attendance).where(eq(attendance.attendanceId, attendanceId)).limit(1);
    return result[0];
}

export async function getAttendanceByEnrollmentId(enrollmentId: string) {
    return await db.select().from(attendance).where(eq(attendance.enrollmentId, enrollmentId));
}

export async function getAttendanceByDate(date: Date) {
    // This will fetch attendance records for a specific date (timestamp without time component)
    // Adjust based on how 'date' column in attendance table is stored (e.g., date vs timestamp)
    return await db.select().from(attendance).where(eq(attendance.date, date));
}

export async function getAttendanceForStudentInEnrollment(studentId: string, enrollmentId: string) {
    return await db.select().from(attendance)
        .innerJoin(enrollments, eq(attendance.enrollmentId, enrollments.enrollmentID))
        .where(and(eq(enrollments.studentID, studentId), eq(enrollments.enrollmentID, enrollmentId)));
}

export async function getAttendanceForOfferingCourse(offeringId: string) {
    return await db.select().from(attendance)
        .innerJoin(enrollments, eq(attendance.enrollmentId, enrollments.enrollmentID))
        .where(eq(enrollments.offeringID, offeringId));
}

export async function getAttendanceSummaryByEnrollmentId(enrollmentId: string) {
    const total = await db.select({ count: sql<number>`count(*)` }).from(attendance).where(eq(attendance.enrollmentId, enrollmentId));
    const present = await db.select({ count: sql<number>`count(*)` }).from(attendance).where(and(eq(attendance.enrollmentId, enrollmentId), eq(attendance.status, 'Present')));
    const absent = await db.select({ count: sql<number>`count(*)` }).from(attendance).where(and(eq(attendance.enrollmentId, enrollmentId), eq(attendance.status, 'Absent')));
    const excused = await db.select({ count: sql<number>`count(*)` }).from(attendance).where(and(eq(attendance.enrollmentId, enrollmentId), eq(attendance.status, 'Excused')));

    return {
        total: total[0].count,
        present: present[0].count,
        absent: absent[0].count,
        excused: excused[0].count,
    };
}