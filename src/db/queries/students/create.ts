import { db } from "../..";
import { students } from "../../schema";
import { SQL, Placeholder } from "drizzle-orm";

type StudentInput = {
    firstName: string | SQL<unknown> | Placeholder<string, any>;
    lastName: string | SQL<unknown> | Placeholder<string, any>;
    email: string | SQL<unknown> | Placeholder<string, any>;
    rollNumber: string | SQL<unknown> | Placeholder<string, any>;
    phone: string | SQL<unknown> | Placeholder<string, any>;
    address: string | SQL<unknown> | Placeholder<string, any>;
    dateOfBirth: Date;
}

export async function createStudent(studentData: StudentInput) {
    const newStudent = await db.insert(students).values({
        firstName : studentData.firstName,
        lastName   : studentData.lastName,
        email      : studentData.email,
        rollNumber : studentData.rollNumber,
        phone : studentData.phone,
        address : studentData.address,
        dateOfBirth : studentData.dateOfBirth.toISOString()
    }).returning();

    return newStudent[0];
}