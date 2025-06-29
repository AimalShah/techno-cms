"use server";

import { db } from "@/db";
import { examResults } from "@/db/schema/examResults.schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function revalidateExamResultsPath() {
    revalidatePath("/admin-dashboard/examResults");
}

export async function createExamResult(prevState: unknown, formData: FormData) {
    try {
        const examId = formData.get("examId") as string;
        const studentId = formData.get("studentId") as string;
        const marksObtained = parseFloat(formData.get("marksObtained") as string);

        await db.insert(examResults).values({
            examId,
            studentId,
            marksObtained,
        });

        revalidateExamResultsPath();
        return { error: false, message: "Exam result created successfully!" };
    } catch (error: unknown) {
        return { error: true, message: `Failed to create exam result: ${error.message}` };
    }
}

export async function updateExamResult(prevState: unknown, formData: FormData) {
    try {
        const examResultId = formData.get("examResultId") as string;
        const examId = formData.get("examId") as string;
        const studentId = formData.get("studentId") as string;
        const marksObtained = parseFloat(formData.get("marksObtained") as string);

        await db.update(examResults).set({
            examId,
            studentId,
            marksObtained,
        }).where(eq(examResults.examResultId, examResultId));

        revalidateExamResultsPath();
        return { error: false, message: "Exam result updated successfully!" };
    } catch (error: unknown) {
        return { error: true, message: `Failed to update exam result: ${error.message}` };
    }
}

export async function deleteExamResult(prevState: unknown, formData: FormData) {
    try {
        const examResultId = formData.get("examResultId") as string;

        await db.delete(examResults).where(eq(examResults.examResultId, examResultId));

        revalidateExamResultsPath();
        return { error: false, message: "Exam result deleted successfully!" };
    } catch (error: unknown) {
        return { error: true, message: `Failed to delete exam result: ${error.message}` };
    }
}