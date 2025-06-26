import { db } from "../..";
import { students } from "../../schema";
import { SQL, Placeholder } from "drizzle-orm";

type StudentInput = {
    firstName: string;
    lastName: string;
    email: string;
    rollNumber: string;
    phone: string;
    address: string;
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