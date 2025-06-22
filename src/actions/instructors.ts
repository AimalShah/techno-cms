"use server";

import { db } from "@/db";
import { instructors, SchemaInstructorNew, SchemaInstructorEdit } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";



// Create Instructor
export async function createInstructor(formData: FormData) {
  const validatedFields = SchemaInstructorNew.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Instructor.",
    };
  }

  const { firstName, lastName, email, phone, address } = validatedFields.data;

  try {
    await db.insert(instructors).values({
      firstName,
      lastName,
      email,
      phone,
      address,
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("duplicate key value violates unique constraint")) {
      return {
        message: "Instructor with this email already exists.",
      };
    }
    return {
      message: "Database Error: Failed to Create Instructor.",
    };
  }

  revalidatePath("/admin-dashboard/instructors");
  return { message: "Instructor created successfully." };
}

// Get Instructors
export async function getInstructors() {
  try {
    const allInstructors = await db.select().from(instructors);
    return allInstructors;
  } catch (error) {
    return {
      message: "Database Error: Failed to retrieve instructors.",
    };
  }
}

// Get Instructor by ID
export async function getInstructorById(id: string) {
  try {
    const instructor = await db.select().from(instructors).where(eq(instructors.instructorID, id)).limit(1);
    return instructor[0];
  } catch (error) {
    return {
      message: "Database Error: Failed to retrieve instructor.",
    };
  }
}

// Update Instructor
export async function updateInstructor(id: string, formData: FormData) {
  const validatedFields = SchemaInstructorEdit.safeParse({
    instructorID: id,
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Instructor.",
    };
  }

  const { firstName, lastName, email, phone, address } = validatedFields.data;

  try {
    await db.update(instructors).set({
      firstName,
      lastName,
      email,
      phone,
      address,
    }).where(eq(instructors.instructorID, id));
  } catch (error) {
    if (error instanceof Error && error.message.includes("duplicate key value violates unique constraint")) {
      return {
        message: "Instructor with this email already exists.",
      };
    }
    return {
      message: "Database Error: Failed to Update Instructor.",
    };
  }

  revalidatePath("/admin-dashboard/instructors");
  return { message: "Instructor updated successfully." };
}

// Delete Instructor
export async function deleteInstructor(id: string) {
  try {
    await db.delete(instructors).where(eq(instructors.instructorID, id));
  } catch (error) {
    return {
      message: "Database Error: Failed to Delete Instructor.",
    };
  }

  revalidatePath("/admin-dashboard/instructors");
  return { message: "Instructor deleted successfully." };
}
