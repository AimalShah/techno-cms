import { eq } from "drizzle-orm";
import { db } from "../..";
import { courses } from "../../schema";


export async function deleteCourse(courseId: string) {
  const deletedCourse = await db.delete(courses)
    .where(eq(courses.courseID, courseId))
    .returning();
    
  return deletedCourse[0];
}