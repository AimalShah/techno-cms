import { db } from "@/db";
import { results } from "@/db/schema/results.schema";
import { eq } from "drizzle-orm";

export async function getAllResults() {
    const data = await db.query.results.findMany();
    return data;
}

export async function getResultById(id: string) {
    const data = await db.query.results.findFirst({
        where: eq(results.resultId, id),
    });
    return data;
}
