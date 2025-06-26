"use server";

import { db } from "@/db";
import { students, SchemaStudentNew, SchemaStudentEdit } from "@/db/schema/students.schema";
import { users } from "@/db/schema/users.schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Create Student
export async function createStudent(state : any , formData: FormData) {
  const email = formData.get("email") as string;
  // Only allow emails of users with role 'student'
  const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (!user[0] || user[0].role !== "student") {
    return { message: "Email must belong to a user with role 'student'." };
  }

  const validatedFields = SchemaStudentNew.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email,
    rollNumber: formData.get("rollNumber"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    dateOfBirth: formData.get("dateOfBirth"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Student.",
    };
  }

  try {
    await db.insert(students).values(validatedFields.data);
    revalidatePath("/admin-dashboard/students");
    return { message: "Student created successfully." };
  } catch (error: any) {
    return { message: "Database Error: Failed to Create Student." };
  }
}

// Update Student
export async function updateStudent(id: string, formData: FormData) {
  const email = formData.get("email") as string;
  // Only allow emails of users with role 'student'
  const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (!user[0] || user[0].role !== "student") {
    return { message: "Email must belong to a user with role 'student'." };
  }

  const validatedFields = SchemaStudentEdit.safeParse({
    studentID: id,
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email,
    rollNumber: formData.get("rollNumber"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    dateOfBirth: formData.get("dateOfBirth"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Student.",
    };
  }

  try {
    await db.update(students).set(validatedFields.data).where(eq(students.studentID, id));
    revalidatePath("/admin-dashboard/students");
    return { message: "Student updated successfully." };
  } catch (error: any) {
    return { message: "Database Error: Failed to Update Student." };
  }
}

// Delete Student
export async function deleteStudent(id: string) {
  try {
    await db.delete(students).where(eq(students.studentID, id));
    revalidatePath("/admin-dashboard/students");
    return { message: "Student deleted successfully." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Student." };
  }
}

// Get All Students
export async function getAllStudents() {
  return db.select().from(students);
}

// Get All Users with role student
export async function getAllStudentUsers() {
  return db.select().from(users).where(eq(users.role, "student"));
}
