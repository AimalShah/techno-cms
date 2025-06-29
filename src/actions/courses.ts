'use server';

import { db } from "@/db";
import { courses } from "@/db/schema/courses.schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createCourse(prevState: unknown, formData: FormData) {
    try {
        const courseName = formData.get("courseName") as string;
        const duration = parseInt(formData.get("duration") as string);

        await db.insert(courses).values({
            courseName,
            duration,
        });

        revalidatePath("/admin-dashboard/courses");
        return { error: false, message: "Course created successfully!" };
    } catch (error: unknown) {
        return { error: true, message: `Failed to create course: ${error.message}` };
    }
}

export async function updateCourse(prevState: unknown, formData: FormData) {
    try {
        const courseID = formData.get("courseID") as string;
        const courseName = formData.get("courseName") as string;
        const duration = parseInt(formData.get("duration") as string);

        await db.update(courses).set({
            courseName,
            duration,
        }).where(eq(courses.courseID, courseID));

        revalidatePath("/admin-dashboard/courses");
        return { error: false, message: "Course updated successfully!" };
    } catch (error: unknown) {
        return { error: true, message: `Failed to update course: ${error.message}` };
    }
}

export async function deleteCourse(prevState: unknown, formData: FormData) {
    try {
        const courseId = formData.get("courseId") as string;

        await db.delete(courses).where(eq(courses.courseID, courseId));

        revalidatePath("/admin-dashboard/courses");
        return { error: false, message: "Course deleted successfully!" };
    } catch (error: unknown) {
        return { error: true, message: `Failed to delete course: ${error.message}` };
    }
}
