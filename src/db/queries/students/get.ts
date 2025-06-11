import { count, eq } from 'drizzle-orm';
import { db } from '../..';
import { students } from '../../schema';

export async function getAllStudents() {
  return await db.select().from(students);
}

export async function getStudentsCount(){
  const total = await db.select({count : count()}).from(students);
  return total[0].count;
}

export async function getStudentById(studentId: string) {
  const result = await db.select().from(students).where(eq(students.studentID, studentId)).limit(1);
  return result[0];
}

export async function getStudentByEmail(email: string) {
  const result = await db.select().from(students).where(eq(students.email, email)).limit(1);
  return result[0];
}

export async function getStudentByRollNumber(rollNumber: string) {
  const result = await db.select().from(students).where(eq(students.rollNumber, rollNumber)).limit(1);
  return result[0];
}