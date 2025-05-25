import { count, eq } from 'drizzle-orm';
import { db } from '../..';
import { courses } from '../../schema';


export async function getAllCourses() {
  return await db.select().from(courses);
}

export async function getCourseCount(){
  const total = await db.select({count : count()}).from(courses);

  return total[0].count;
}

export async function getCourseById(courseId: string) {
  const result = await db.select().from(courses).where(eq(courses.courseID, courseId)).limit(1);
  return result[0];
}

export async function getCourseByName(courseName: string) {
  const result = await db.select().from(courses).where(eq(courses.courseName, courseName)).limit(1);
  return result[0];
}