"use server";

import { db } from "@/db";
import { attendance } from "@/db/schema/attendance.schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createAttendance(prevState: any, formData: FormData) {
    try {
        const enrollmentId = formData.get("enrollmentId") as string;
        const date = new Date(formData.get("date") as string);
        const status = formData.get("status") as "Present" | "Absent" | "Excused";

        await db.insert(attendance).values({
            enrollmentId,
            date,
            status,
        });

        revalidatePath("/admin-dashboard/attendance");
        return { error: false, message: "Attendance created successfully!" };
    } catch (error: any) {
        return { error: true, message: `Failed to create attendance: ${error.message}` };
    }
}

export async function updateAttendance(prevState: any, formData: FormData) {
    try {
        const attendanceId = formData.get("attendanceId") as string;
        const enrollmentId = formData.get("enrollmentId") as string;
        const date = new Date(formData.get("date") as string);
        const status = formData.get("status") as "Present" | "Absent" | "Excused";

        await db.update(attendance).set({
            enrollmentId,
            date,
            status,
        }).where(eq(attendance.attendanceId, attendanceId));

        revalidatePath("/admin-dashboard/attendance");
        return { error: false, message: "Attendance updated successfully!" };
    } catch (error: any) {
        return { error: true, message: `Failed to update attendance: ${error.message}` };
    }
}

export async function deleteAttendance(prevState: any, formData: FormData) {
    try {
        const attendanceId = formData.get("attendanceId") as string;

        await db.delete(attendance).where(eq(attendance.attendanceId, attendanceId));

        revalidatePath("/admin-dashboard/attendance");
        return { error: false, message: "Attendance deleted successfully!" };
    } catch (error: any) {
        return { error: true, message: `Failed to delete attendance: ${error.message}` };
    }
}
