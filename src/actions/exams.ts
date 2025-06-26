"use server";

import { db } from "@/db";
import { exams } from "@/db/schema/exams.schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createExam(prevState: any, formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const date = new Date(formData.get("date") as string);
        const totalMarks = parseFloat(formData.get("totalMarks") as string);

        await db.insert(exams).values({
            title,
            date,
            totalMarks,
        });

        revalidatePath("/admin-dashboard/exams");
        return { error: false, message: "Exam created successfully!" };
    } catch (error: any) {
        return { error: true, message: `Failed to create exam: ${error.message}` };
    }
}

export async function updateExam(prevState: any, formData: FormData) {
    try {
        const examId = formData.get("examId") as string;
        const title = formData.get("title") as string;
        const date = new Date(formData.get("date") as string);
        const totalMarks = parseFloat(formData.get("totalMarks") as string);

        await db.update(exams).set({
            title,
            date,
            totalMarks,
        }).where(eq(exams.examId, examId));

        revalidatePath("/admin-dashboard/exams");
        return { error: false, message: "Exam updated successfully!" };
    } catch (error: any) {
        return { error: true, message: `Failed to update exam: ${error.message}` };
    }
}

export async function deleteExam(prevState: any, formData: FormData) {
    try {
        const examId = formData.get("examId") as string;

        await db.delete(exams).where(eq(exams.examId, examId));

        revalidatePath("/admin-dashboard/exams");
        return { error: false, message: "Exam deleted successfully!" };
    } catch (error: any) {
        return { error: true, message: `Failed to delete exam: ${error.message}` };
    }
}
