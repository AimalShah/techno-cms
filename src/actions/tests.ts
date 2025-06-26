"use server";

import { db } from "@/db";
import { tests } from "@/db/schema/tests.schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createTest(prevState: any, formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const date = new Date(formData.get("date") as string);
        const totalMarks = parseFloat(formData.get("totalMarks") as string);

        await db.insert(tests).values({
            title,
            date,
            totalMarks,
        });

        revalidatePath("/admin-dashboard/tests");
        return { error: false, message: "Test created successfully!" };
    } catch (error: any) {
        return { error: true, message: `Failed to create test: ${error.message}` };
    }
}

export async function updateTest(prevState: any, formData: FormData) {
    try {
        const testId = formData.get("testId") as string;
        const title = formData.get("title") as string;
        const date = new Date(formData.get("date") as string);
        const totalMarks = parseFloat(formData.get("totalMarks") as string);

        await db.update(tests).set({
            title,
            date,
            totalMarks,
        }).where(eq(tests.testId, testId));

        revalidatePath("/admin-dashboard/tests");
        return { error: false, message: "Test updated successfully!" };
    } catch (error: any) {
        return { error: true, message: `Failed to update test: ${error.message}` };
    }
}

export async function deleteTest(prevState: any, formData: FormData) {
    try {
        const testId = formData.get("testId") as string;

        await db.delete(tests).where(eq(tests.testId, testId));

        revalidatePath("/admin-dashboard/tests");
        return { error: false, message: "Test deleted successfully!" };
    } catch (error: any) {
        return { error: true, message: `Failed to delete test: ${error.message}` };
    }
}
