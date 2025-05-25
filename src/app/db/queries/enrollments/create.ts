import { db } from "../..";
import { enrollments } from "../../schema";

export async function createEnrollment(enrollmentData: { studentID: string; offeringID: string; startDate: string; endDate: string }) {
  const newEnrollment = await db.insert(enrollments).values(enrollmentData).returning();
  return newEnrollment[0];
}