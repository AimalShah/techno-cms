import { db } from "@/db";
import { tests } from "@/db/schema/tests.schema";
import { eq } from "drizzle-orm";

export async function getAllTests() {
    const data = await db.query.tests.findMany();
    return data;
}

export async function getTestById(id: string) {
    const data = await db.query.tests.findFirst({
        where: eq(tests.testId, id),
    });
    return data;
}
