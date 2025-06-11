import { eq } from 'drizzle-orm';
import { db } from '../..';
import { students } from '../../schema';

export async function updateStudent(studentId: string, studentData: {
  firstName?: string;
  lastName?: string;
  email: string;
  rollNumber: string;
  phone: string;
  address: string;
  dateOfBirth?: Date;
}) {
  const updatedStudent = await db.update(students)
    .set({
        firstName : studentData.firstName,
        lastName  : studentData.lastName,
        email    : studentData.email,
        rollNumber : studentData.rollNumber,
        phone : studentData.phone,
        address : studentData.address,
        dateOfBirth : studentData.dateOfBirth?.toISOString(),
    })
    .where(eq(students.studentID, studentId))
    .returning();
    
  return updatedStudent[0];
}