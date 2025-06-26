import { db } from "@/db";
import { instructors } from "@/db/schema/instructors.schema";
import { eq , count } from "drizzle-orm";

export async function getAllInstructors() {
    const data = await db.query.instructors.findMany();
    return data;
}

export async function getInstructorCount() {
    const data = await db.select({count : count()}).from(instructors);
    return data[0].count;
}

export async function getInstructorById(id: string) {
    const data = await db.query.instructors.findFirst({
        where: eq(instructors.instructorID, id),
    });
    return data;
}
