import { eq } from 'drizzle-orm';
import { db } from '../..';
import { students } from '../../schema';

export async function deleteStudent(studentId: string) {
  const deletedStudent = await db.delete(students)
    .where(eq(students.studentID, studentId))
    .returning();
  return deletedStudent[0];
}