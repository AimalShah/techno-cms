"use server";

import { db } from "@/db";
import { attendance } from "@/db/schema/attendance.schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createBulkAttendance(prevState: unknown, formData: FormData) {
    try {
        const date = new Date();

        const attendanceData = Array.from(formData.keys())
            .filter((key) => key.startsWith("student-") && key.endsWith("-status"))
            .map((key) => {
                const enrollmentId = formData.get(key.replace("-status", "-enrollmentId")) as string;
                const status = formData.get(key) as "Present" | "Absent" | "Excused";
                return { enrollmentId, date, status };
            });

        await db.insert(attendance).values(attendanceData);

        revalidatePath("/instructor-dashboard/attendance");
        return { error: false, message: "Attendance created successfully!" };
    } catch (error: unknown) {
        return { error: true, message: `Failed to create attendance: ${error.message}` };
    }
}

export async function createAttendance(prevState: unknown, formData: FormData) {
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
    } catch (error: unknown) {
        return { error: true, message: `Failed to create attendance: ${error.message}` };
    }
}

export async function updateAttendance(prevState: unknown, formData: FormData) {
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
    } catch (error: unknown) {
        return { error: true, message: `Failed to update attendance: ${error.message}` };
    }
}

export async function deleteAttendance(prevState: unknown, formData: FormData) {
    try {
        const attendanceId = formData.get("attendanceId") as string;

        await db.delete(attendance).where(eq(attendance.attendanceId, attendanceId));

        revalidatePath("/admin-dashboard/attendance");
        return { error: false, message: "Attendance deleted successfully!" };
    } catch (error: unknown) {
        return { error: true, message: `Failed to delete attendance: ${error.message}` };
    }
}