"use server";

import { db } from "@/db";
import { instructors } from "@/db/schema/instructors.schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createInstructor(prevState: any, formData: FormData) {
    try {
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const address = formData.get("address") as string;

        await db.insert(instructors).values({
            firstName,
            lastName,
            email,
            phone,
            address,
        });

        revalidatePath("/admin-dashboard/instructors");
        return { error: false, message: "Instructor created successfully!" };
    } catch (error: any) {
        return { error: true, message: `Failed to create instructor: ${error.message}` };
    }
}

export async function updateInstructor(prevState: any, formData: FormData) {
    try {
        const instructorID = formData.get("instructorID") as string;
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const address = formData.get("address") as string;

        await db.update(instructors).set({
            firstName,
            lastName,
            email,
            phone,
            address,
        }).where(eq(instructors.instructorID, instructorID));

        revalidatePath("/admin-dashboard/instructors");
        return { error: false, message: "Instructor updated successfully!" };
    } catch (error: any) {
        return { error: true, message: `Failed to update instructor: ${error.message}` };
    }
}

export async function deleteInstructor(prevState: any, formData: FormData) {
    try {
        const instructorId = formData.get("instructorId") as string;

        await db.delete(instructors).where(eq(instructors.instructorID, instructorId));

        revalidatePath("/admin-dashboard/instructors");
        return { error: false, message: "Instructor deleted successfully!" };
    } catch (error: any) {
        return { error: true, message: `Failed to delete instructor: ${error.message}` };
    }
}
