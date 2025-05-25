
import { eq } from 'drizzle-orm';
import { db } from '../..';
import { attendance, attendanceStatusEnum } from '../../schema/attendance.schema';


export async function updateAttendance(attendanceId: string, attendanceData: { enrollmentId?: string; date?: Date; status?: typeof attendanceStatusEnum.enumValues[number] }) {
  const updatedAttendance = await db.update(attendance)
    .set(attendanceData)
    .where(eq(attendance.attendanceId, attendanceId))
    .returning();
  return updatedAttendance[0];
}