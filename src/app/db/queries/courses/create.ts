import { db } from "../..";
import { courses } from "../../schema";

export async function createCourse(courseData: { courseName: string; duration: number}) {
  const newCourse = await db.insert(courses).values({
    courseName : courseData.courseName,
    duration : courseData.duration,
  }).returning();
  
  return newCourse[0];
}