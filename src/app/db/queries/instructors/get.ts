import { count, eq } from 'drizzle-orm';
import { instructors } from '../../schema';
import { db } from '../..';


export async function getAllInstructors() {
  return await db.select().from(instructors);
}

export async function getInstructorCount(){
    const total = await db.select({count : count()}).from(instructors);
    return total[0].count;
}

export async function getInstructorById(instructorId: string) {
  const result = await db.select().from(instructors).where(eq(instructors.instructorID, instructorId)).limit(1);
  return result[0];
}



export async function getInstructorByEmail(email: string) {
  const result = await db.select().from(instructors).where(eq(instructors.email, email)).limit(1);
  return result[0];
}