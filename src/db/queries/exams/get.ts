import { db } from "@/db";
import { exams } from "@/db/schema/exams.schema";
import { eq } from "drizzle-orm";

export async function getAllExams() {
    const data = await db.query.exams.findMany();
    return data;
}

export async function getExamById(id: string) {
    const data = await db.query.exams.findFirst({
        where: eq(exams.examId, id),
    });
    return data;
}
