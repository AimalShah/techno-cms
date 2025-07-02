
"use server";

import { db } from "@/db";
import { enrollments, students, offeringCourses } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function getEnrolledStudents(offeringId: string) {
    const enrolledStudents = await db
        .select({
            enrollmentID: enrollments.enrollmentID,
            studentID: students.studentID,
            firstName: students.firstName,
            lastName: students.lastName,
        })
        .from(enrollments)
        .innerJoin(students, eq(enrollments.studentID, students.studentID))
        .where(eq(enrollments.offeringID, offeringId));

        if(!enrolledStudents){
          console.log("No Stundets");
        }

    return enrolledStudents;
}

const enrollmentSchema = z.object({
  studentId: z.string().uuid("Invalid student ID format"),
  courseId: z.string().uuid("Invalid course ID format"),  
  startDate: z.string().refine((date) => {
    const parsed = new Date(date);
    return !isNaN(parsed.getTime());
  }, "Start date must be a valid date"),
  endDate: z.string().refine((date) => {
    const parsed = new Date(date);
    return !isNaN(parsed.getTime());
  }, "End date must be a valid date"),
}).refine((data) => {
  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);
  return startDate < endDate;
}, {
  message: "End date must be after start date",
  path: ["endDate"]
});



async function validateStudent(studentId: string) {
  class EnrollmentError extends Error {
    constructor(message: string, public code: string) {
      super(message);
      this.name = 'EnrollmentError';
    }
  }

  const student = await db
    .select({ studentID: students.studentID })
    .from(students)
    .where(eq(students.studentID, studentId))
    .limit(1);
    
  if (student.length === 0) {
    throw new EnrollmentError("Student not found", "STUDENT_NOT_FOUND");
  }
}


async function validateCourseOffering(courseId: string) {
  class EnrollmentError extends Error {
    constructor(message: string, public code: string) {
      super(message);
      this.name = 'EnrollmentError';
    }
  }

  const course = await db
    .select({ offeringID: offeringCourses.offeringID })
    .from(offeringCourses)
    .where(eq(offeringCourses.offeringID, courseId))
    .limit(1);
    
  if (course.length === 0) {
    throw new EnrollmentError("Course offering not found", "COURSE_NOT_FOUND");
  }
}


async function checkDuplicateEnrollment(studentId: string, courseId: string) {
  class EnrollmentError extends Error {
    constructor(message: string, public code: string) {
      super(message);
      this.name = 'EnrollmentError';
    }
  }

  const existingEnrollment = await db
    .select({ enrollmentID: enrollments.enrollmentID })
    .from(enrollments)
    .where(
      and(
        eq(enrollments.studentID, studentId),
        eq(enrollments.offeringID, courseId)
      )
    )
    .limit(1);
    
  if (existingEnrollment.length > 0) {
    throw new EnrollmentError(
      "Student is already enrolled in this course", 
      "DUPLICATE_ENROLLMENT"
    );
  }
}

export async function enrollStudent(formData: FormData) {
  class EnrollmentError extends Error {
    constructor(message: string, public code: string) {
      super(message);
      this.name = 'EnrollmentError';
    }
  }

  try {
    const rawData = {
      studentId: formData.get("studentId")?.toString() ?? "",
      courseId: formData.get("courseId")?.toString() ?? "",
      startDate: formData.get("startDate")?.toString() ?? "",
      endDate: formData.get("endDate")?.toString() ?? "",
    };


    const validatedData = enrollmentSchema.parse(rawData);

    
    await Promise.all([
      validateStudent(validatedData.studentId),
      validateCourseOffering(validatedData.courseId),
      checkDuplicateEnrollment(validatedData.studentId, validatedData.courseId)
    ]);

    const [newEnrollment] = await db
      .insert(enrollments)
      .values({
        studentID: validatedData.studentId,
        offeringID: validatedData.courseId,
        startDate: validatedData.startDate,
        endDate: validatedData.endDate,
      })
      .returning({
        enrollmentID: enrollments.enrollmentID,
        studentID: enrollments.studentID,
        offeringID: enrollments.offeringID,
        startDate: enrollments.startDate,
        endDate: enrollments.endDate,
      });

    
    revalidatePath("/admin-dashboard/enrollments");
    revalidatePath("/admin-dashboard/");
    
    return {
      success: true,
      data: newEnrollment,
      message: "Enrollment created successfully"
    };

  } catch (error) {
    console.error("Enrollment creation error:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "VALIDATION_ERROR",
        message: error.errors[0]?.message || "Invalid input data",
        details: error.errors
      };
    }

    if (error instanceof EnrollmentError) {
      return {
        success: false,
        error: error.code,
        message: error.message
      };
    }


    if (error instanceof Error) {
      if (error.message.includes("valid_date_range")) {
        return {
          success: false,
          error: "DATE_RANGE_ERROR",
          message: "Start date must be before end date"
        };
      }

      if (error.message.includes("foreign key constraint")) {
        return {
          success: false,
          error: "REFERENCE_ERROR",
          message: "Invalid student or course reference"
        };
      }
    }

    return {
      success: false,
      error: "INTERNAL_ERROR",
      message: "An unexpected error occurred. Please try again."
    };
  }
}
