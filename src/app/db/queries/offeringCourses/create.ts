import { db } from "../..";
import { offeringCourses } from "../../schema";

export async function createOfferingCourse(offeringData: { courseID: string; instructorID: string; price: number; }) {
  const newOfferingCourse = await db.insert(offeringCourses).values(offeringData).returning();
  return newOfferingCourse[0];
}