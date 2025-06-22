"use server";

import { db } from "@/db";
import { exams } from "@/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { z } from "zod";
import { z } from "zod";

const examSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
  date: z.string().refine((date) => {
    const parsed = new Date(date);
    return !isNaN(parsed.getTime());
  }, "Date must be a valid date"),
  totalMarks: z.string().refine((val) => !isNaN(Number(val)), "Total Marks must be a number").transform(Number),
});

// Create Exam
export async function createExam(formData: FormData) {
  const validatedFields = examSchema.safeParse({
    title: formData.get("title"),
    date: formData.get("date"),
    totalMarks: formData.get("totalMarks"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Exam.",
    };
  }

  const { title, date, totalMarks } = validatedFields.data;

  try {
    await db.insert(exams).values({
      title,
      date,
      totalMarks,
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Exam.",
    };
  }

  revalidatePath("/admin-dashboard/exams");
  return { message: "Exam created successfully." };
}

// Get Exams
export async function getExams() {
  try {
    const allExams = await db.select().from(exams);
    return allExams;
  } catch (error) {
    return {
      message: "Database Error: Failed to retrieve exams.",
    };
  }
}

// Get Exam by ID
export async function getExamById(id: string) {
  try {
    const exam = await db.select().from(exams).where(eq(exams.examId, id)).limit(1);
    return exam[0];
  } catch (error) {
    return {
      message: "Database Error: Failed to retrieve exam.",
    };
  }
}

// Update Exam
export async function updateExam(id: string, formData: FormData) {
  const validatedFields = examSchema.safeParse({
    title: formData.get("title"),
    date: formData.get("date"),
    totalMarks: formData.get("totalMarks"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Exam.",
    };
  }

  const { title, date, totalMarks } = validatedFields.data;

  try {
    await db.update(exams).set({
      title,
      date,
      totalMarks,
    }).where(eq(exams.examId, id));
  } catch (error) {
    return {
      message: "Database Error: Failed to Update Exam.",
    };
  }

  revalidatePath("/admin-dashboard/exams");
  return { message: "Exam updated successfully." };
}

// Delete Exam
export async function deleteExam(id: string) {
  try {
    await db.delete(exams).where(eq(exams.examId, id));
  } catch (error) {
    return {
      message: "Database Error: Failed to Delete Exam.",
    };
  }

  revalidatePath("/admin-dashboard/exams");
  return { message: "Exam deleted successfully." };
}
