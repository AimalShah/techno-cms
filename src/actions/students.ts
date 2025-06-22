"use server";

import { db } from "@/db";
import { students, SchemaStudentNew, SchemaStudentEdit } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Create Student
export async function createStudent(formData: FormData): Promise<{ message: string; errors?: any }> {
  const validatedFields = SchemaStudentNew.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
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

  const { firstName, lastName, email, rollNumber, phone, address, dateOfBirth } = validatedFields.data;

  try {
    await db.insert(students).values({
      firstName,
      lastName,
      email,
      rollNumber,
      phone,
      address,
      dateOfBirth,
    });
  } catch (error: any) {
    if (error instanceof Error && error.message.includes("duplicate key value violates unique constraint")) {
      return {
        message: "Student with this email or roll number already exists.",
      };
    }
    return {
      message: "Database Error: Failed to Create Student.",
    };
  }

  revalidatePath("/admin-dashboard/students");
  return { message: "Student created successfully." };
}

// Get Students
export async function getStudents(): Promise<any[] | { message: string }> {
  try {
    const allStudents = await db.select().from(students);
    return allStudents;
  } catch (error) {
    return {
      message: "Database Error: Failed to retrieve students.",
    };
  }
}

// Get Student by ID
export async function getStudentById(id: string): Promise<any | { message: string }> {
  try {
    const student = await db.select().from(students).where(eq(students.studentID, id)).limit(1);
    return student[0];
  } catch (error) {
    return {
      message: "Database Error: Failed to retrieve student.",
    };
  }
}

// Update Student
export async function updateStudent(id: string, formData: FormData): Promise<{ message: string; errors?: any }> {
  const validatedFields = SchemaStudentEdit.safeParse({
    studentID: id,
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
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

  const { firstName, lastName, email, rollNumber, phone, address, dateOfBirth } = validatedFields.data;

  try {
    await db.update(students).set({
      firstName,
      lastName,
      email,
      rollNumber,
      phone,
      address,
      dateOfBirth,
    }).where(eq(students.studentID, id));
  } catch (error: any) {
    if (error instanceof Error && error.message.includes("duplicate key value violates unique constraint")) {
      return {
        message: "Student with this email or roll number already exists.",
      };
    }
    return {
      message: "Database Error: Failed to Update Student.",
    };
  }

  revalidatePath("/admin-dashboard/students");
  return { message: "Student updated successfully." };
}

// Delete Student
export async function deleteStudent(id: string): Promise<{ message: string }> {
  try {
    await db.delete(students).where(eq(students.studentID, id));
  } catch (error) {
    return {
      message: "Database Error: Failed to Delete Student.",
    };
  }

  revalidatePath("/admin-dashboard/students");
  return { message: "Student deleted successfully." };
}
