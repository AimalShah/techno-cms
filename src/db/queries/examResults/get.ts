import { db } from "@/db";
import { examResults } from "@/db/schema/examResults.schema";
import { eq } from "drizzle-orm";

export async function getAllExamResults() {
    const data = await db.query.examResults.findMany();
    return data;
}

export async function getExamResultById(id: string) {
    const data = await db.query.examResults.findFirst({
        where: eq(examResults.examResultId, id),
    });
    return data;
}
