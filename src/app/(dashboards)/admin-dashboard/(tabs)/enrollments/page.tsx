
import EnrollmentManagement from "./_components/enrollment-management";
import { db } from "@/db";
import { enrollments, students, offeringCourses, courses, instructors } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Enrollments } from "@/components/column";

export default async function Page(){

    const result = await db.select({
        enrollmentId: enrollments.enrollmentID,
        startDate: enrollments.startDate,
        endDate: enrollments.endDate,
        studentFirstName: students.firstName,
        studentLastName: students.lastName,
        courseName: courses.courseName,
        instructorFirstName: instructors.firstName,
        instructorLastName: instructors.lastName,
    })
    .from(enrollments)
    .leftJoin(students, eq(enrollments.studentID, students.studentID))
    .leftJoin(offeringCourses, eq(enrollments.offeringID, offeringCourses.offeringID))
    .leftJoin(courses, eq(offeringCourses.courseID, courses.courseID))
    .leftJoin(instructors, eq(offeringCourses.instructorID, instructors.instructorID));

    const data: Enrollments[] = Array.isArray(result) ? result : [];

    return (
        <div className="px-6 py-2 flex flex-col items-center space-y-2">
            <EnrollmentManagement data={data}/>
        </div>
    )
}