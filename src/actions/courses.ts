"use server";

import { db } from "@/db";
import { courses, SchemaCourseNew, SchemaCourseEdit } from "@/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { z } from "zod";
import { z } from "zod";

// Create Course
export async function createCourse(formData: FormData) {
  const validatedFields = SchemaNewCourse.safeParse({
    courseName: formData.get("courseName"),
    duration: parseInt(formData.get("duration") as string),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Course.",
    };
  }

  const { courseName, duration } = validatedFields.data;

  try {
    await db.insert(courses).values({
      courseName,
      duration,
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("duplicate key value violates unique constraint")) {
      return {
        message: "Course with this name already exists.",
      };
    }
    return {
      message: "Database Error: Failed to Create Course.",
    };
  }

  revalidatePath("/admin-dashboard/courses");
  return { message: "Course created successfully." };
}

// Get Courses
export async function getCourses() {
  try {
    const allCourses = await db.select().from(courses);
    return allCourses;
  } catch (error) {
    return {
      message: "Database Error: Failed to retrieve courses.",
    };
  }
}

// Get Course by ID
export async function getCourseById(id: string) {
  try {
    const course = await db.select().from(courses).where(eq(courses.courseID, id)).limit(1);
    return course[0];
  } catch (error) {
    return {
      message: "Database Error: Failed to retrieve course.",
    };
  }
}

// Update Course
export async function updateCourse(id: string, formData: FormData) {
  const validatedFields = SchemaCourseEdit.safeParse({
    courseID: id,
    courseName: formData.get("courseName"),
    duration: parseInt(formData.get("duration") as string),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Course.",
    };
  }

  const { courseName, duration } = validatedFields.data;

  try {
    await db.update(courses).set({
      courseName,
      duration,
    }).where(eq(courses.courseID, id));
  } catch (error) {
    if (error instanceof Error && error.message.includes("duplicate key value violates unique constraint")) {
      return {
        message: "Course with this name already exists.",
      };
    }
    return {
      message: "Database Error: Failed to Update Course.",
    };
  }

  revalidatePath("/admin-dashboard/courses");
  return { message: "Course updated successfully." };
}

// Delete Course
export async function deleteCourse(id: string) {
  try {
    await db.delete(courses).where(eq(courses.courseID, id));
  } catch (error) {
    return {
      message: "Database Error: Failed to Delete Course.",
    };
  }

  revalidatePath("/admin-dashboard/courses");
  return { message: "Course deleted successfully." };
}
