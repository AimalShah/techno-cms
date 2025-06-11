import { db } from "../..";
import { attendance, attendanceStatusEnum } from "../../schema/attendance.schema";

export async function createAttendance(attendanceData: { enrollmentId: string; date: Date; status: typeof attendanceStatusEnum.enumValues[number] }) {
  const newAttendance = await db.insert(attendance).values(attendanceData).returning();
  return newAttendance[0];
}

export async function createMultipleAttendance(attendanceRecords: Array<{ enrollmentId: string; date: Date; status: typeof attendanceStatusEnum.enumValues[number] }>) {
  const newAttendanceRecords = await db.insert(attendance).values(attendanceRecords).returning();
  return newAttendanceRecords;
}