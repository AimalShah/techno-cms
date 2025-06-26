"user server";

import { db } from "@/db";
import { offeringCourses } from "@/db/schema/offering_courses.schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createOfferingCourse(prevState: any, formData: FormData) {
    try {
        const courseID = formData.get("courseID") as string;
        const instructorID = formData.get("instructorID") as string;
        const price = parseFloat(formData.get("price") as string);

        await db.insert(offeringCourses).values({
            courseID,
            instructorID,
            price,
        });

        revalidatePath("/admin-dashboard/offeringCourses");
        return { error: false, message: "Offering course created successfully!" };
    } catch (error: any) {
        return { error: true, message: `Failed to create offering course: ${error.message}` };
    }
}

export async function updateOfferingCourse(prevState: any, formData: FormData) {
    try {
        const offeringID = formData.get("offeringID") as string;
        const courseID = formData.get("courseID") as string;
        const instructorID = formData.get("instructorID") as string;
        const price = parseFloat(formData.get("price") as string);

        await db.update(offeringCourses).set({
            courseID,
            instructorID,
            price,
        }).where(eq(offeringCourses.offeringID, offeringID));

        revalidatePath("/admin-dashboard/offeringCourses");
        return { error: false, message: "Offering course updated successfully!" };
    } catch (error: any) {
        return { error: true, message: `Failed to update offering course: ${error.message}` };
    }
}

export async function deleteOfferingCourse(prevState: any, formData: FormData) {
    try {
        const offeringId = formData.get("offeringId") as string;

        await db.delete(offeringCourses).where(eq(offeringCourses.offeringID, offeringId));

        revalidatePath("/admin-dashboard/offeringCourses");
        return { error: false, message: "Offering course deleted successfully!" };
    } catch (error: any) {
        return { error: true, message: `Failed to delete offering course: ${error.message}` };
    }
}
