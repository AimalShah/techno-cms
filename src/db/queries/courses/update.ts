import { eq } from 'drizzle-orm';
import { db } from '../..';
import { courses } from '../../schema';


export async function updateCourse(courseId: string, courseData: { courseName?: string; duration?: number;}) {
  const updatedCourse = await db.update(courses)
    .set(courseData)
    .where(eq(courses.courseID, courseId))
    .returning();
    
  return updatedCourse[0];
}