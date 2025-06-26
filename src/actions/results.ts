"use server";

import { db } from "@/db";
import { results } from "@/db/schema/results.schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createResult(prevState: any, formData: FormData) {
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

        revalidatePath("/admin-dashboard/results");
        return { error: false, message: "Result created successfully!" };
    } catch (error: any) {
        return { error: true, message: `Failed to create result: ${error.message}` };
    }
}

export async function updateResult(prevState: any, formData: FormData) {
    try {
        const resultId = formData.get("resultId") as string;
        const enrollmentId = formData.get("enrollmentId") as string;
        const marksObtained = parseFloat(formData.get("marksObtained") as string);
        const totalMarks = parseFloat(formData.get("totalMarks") as string);
        const grade = formData.get("grade") as string;

        await db.update(results).set({
            enrollmentId,
            marksObtained,
            totalMarks,
            grade,
        }).where(eq(results.resultId, resultId));

        revalidatePath("/admin-dashboard/results");
        return { error: false, message: "Result updated successfully!" };
    } catch (error: any) {
        return { error: true, message: `Failed to update result: ${error.message}` };
    }
}

export async function deleteResult(prevState: any, formData: FormData) {
    try {
        const resultId = formData.get("resultId") as string;

        await db.delete(results).where(eq(results.resultId, resultId));

        revalidatePath("/admin-dashboard/results");
        return { error: false, message: "Result deleted successfully!" };
    } catch (error: any) {
        return { error: true, message: `Failed to delete result: ${error.message}` };
    }
}
