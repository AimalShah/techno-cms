import { db } from "@/db";
import { courses } from "@/db/schema/courses.schema";
import { count, eq } from 'drizzle-orm';

export async function getAllCourses() {
    const data = await db.query.courses.findMany();
    return data;
}

export async function getCourseCount() {
    const data = await db.select({count : count()}).from(courses);
    return data[0].count;
}
export async function getCourseById(id: string) {
    const data = await db.query.courses.findFirst({
        where: eq(courses.courseID, id),
    });
    return data;
}
