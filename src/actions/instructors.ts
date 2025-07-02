
"use server";

import { db } from "@/db";
import { courses, instructors, offeringCourses } from "@/db/schema";
import { getUser } from "@/lib/dal";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getInstructorCourses() {
    const user = await getUser();
    console.log(user);
    if (!user || user.role !== "instructor") {
        throw new Error("Unauthorized");
    }

    const instructor = await db.query.instructors.findFirst({
        where: eq(instructors.email, user.email),
    });

    if (!instructor) {
        throw new Error("Instructor not found");
    }

    const instructorCourses = await db
        .select({
            offeringID: offeringCourses.offeringID,
            courseName: courses.courseName,
            duration: courses.duration,
            price: offeringCourses.price,
        })
        .from(offeringCourses)
        .innerJoin(courses, eq(offeringCourses.courseID, courses.courseID))
        .where(eq(offeringCourses.instructorID, instructor.instructorID));

    return instructorCourses;
}

export async function createInstructor(prevState: unknown, formData: FormData) {
    try {
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const address = formData.get("address") as string;

        const data = await db.insert(instructors).values({
            firstName,
            lastName,
            email,
            phone,
            address,
        }).returning();

        console.log(data);
        
        revalidatePath("/admin-dashboard/instructors");
        return { error: false, message: "Instructor created successfully!" };
    } catch (error: unknown) {
        //@ts-ignore
        return { error: true, message: `Failed to create instructor: ${error.message}` };
    }
}

export async function updateInstructor(prevState: unknown, formData: FormData) {
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
    } catch (error: unknown) {
        //@ts-ignore
        return { error: true, message: `Failed to update instructor: ${error.message}` };
    }
}

export async function deleteInstructor(prevState: unknown, formData: FormData) {
    try {
        const instructorId = formData.get("instructorId") as string;

        await db.delete(instructors).where(eq(instructors.instructorID, instructorId));

        revalidatePath("/admin-dashboard/instructors");
        return { error: false, message: "Instructor deleted successfully!" };
    } catch (error: unknown) {
        //@ts-ignore
        return { error: true, message: `Failed to delete instructor: ${error.message}` };
    }
}
