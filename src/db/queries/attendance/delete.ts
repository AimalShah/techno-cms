import { eq } from 'drizzle-orm';
import { attendance } from '../../schema/attendance.schema';
import { db } from '../..';

export async function deleteAttendance(attendanceId: string) {
  const deletedAttendance = await db.delete(attendance)
    .where(eq(attendance.attendanceId, attendanceId))
    .returning();
  return deletedAttendance[0];
}