import { db } from "@/db";
import { attendance } from "@/db/schema/attendance.schema";
import { eq } from "drizzle-orm";

export async function getAllAttendance() {
    const data = await db.query.attendance.findMany();
    return data;
}

export async function getAttendanceById(id: string) {
    const data = await db.query.attendance.findFirst({
        where: eq(attendance.attendanceId, id),
    });
    return data;
}