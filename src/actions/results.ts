
"use server";

import { db } from "@/db";
import { results, enrollments, students } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getResultsForCourse(offeringId: string) {
    const courseResults = await db
        .select({
            resultId: results.resultId,
            enrollmentId: results.enrollmentId,
            marksObtained: results.marksObtained,
            totalMarks: results.totalMarks,
            grade: results.grade,
            studentFirstName: students.firstName,
            studentLastName: students.lastName,
        })
        .from(results)
        .rightJoin(enrollments, eq(results.enrollmentId, enrollments.enrollmentID))
        .innerJoin(students, eq(enrollments.studentID, students.studentID))
        .where(eq(enrollments.offeringID, offeringId));

    return courseResults;
}

export async function createResult(formData: FormData) {
    try {
        const enrollmentId = formData.get("enrollmentId") as string;
        const marksObtained = parseFloat(formData.get("marksObtained") as string);
        const totalMarks = parseFloat(formData.get("totalMarks") as string);
        const grade = formData.get("grade") as string;

        await db.insert(results).values({
            enrollmentId,
            marksObtained,
            totalMarks,
            grade,
        });

        revalidatePath("/instructor-dashboard/results");
        return { error: false, message: "Result created successfully!" };
    } catch (error: unknown) {
        return { error: true, message: `Failed to create result: ${error.message}` };
    }
}

export async function updateResult(formData: FormData) {
    try {
        const resultId = formData.get("resultId") as string;
        const marksObtained = parseFloat(formData.get("marksObtained") as string);
        const totalMarks = parseFloat(formData.get("totalMarks") as string);
        const grade = formData.get("grade") as string;

        await db.update(results).set({
            marksObtained,
            totalMarks,
            grade,
        }).where(eq(results.resultId, resultId));

        revalidatePath("/instructor-dashboard/results");
        return { error: false, message: "Result updated successfully!" };
    } catch (error: unknown) {
        return { error: true, message: `Failed to update result: ${error.message}` };
    }
}

export async function deleteResult(prevState: unknown, formData: FormData) {
    try {
        const resultId = formData.get("resultId") as string;

        await db.delete(results).where(eq(results.resultId, resultId));

        revalidatePath("/instructor-dashboard/results");
        return { error: false, message: "Result deleted successfully!" };
    } catch (error: unknown) {
        return { error: true, message: `Failed to delete result: ${error.message}` };
    }
}
