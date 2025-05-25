import { db } from "../db";
import { count, eq } from "drizzle-orm";
import { courses, enrollments, instructors, offeringCourses, students } from "../db/schema";
import CardsSection from "@/components/cards-section";
import { getCourseCount } from "../db/queries/courses/get";
import { getInstructorCount } from "../db/queries/instructors/get";
import { getStudentsCount } from "../db/queries/students/get";
import { getEnrollmentCount } from "../db/queries/enrollments/get";



export default async function Page() {

  const studentCount = await getStudentsCount()
  const instructorCount = await getInstructorCount();
  const totalCourses = await getCourseCount();
  const totalEnrollments = await getEnrollmentCount();


  return (
    <div className="">

      <CardsSection
        students={studentCount}
        teachers={instructorCount}
        courses={totalCourses}
        enrollments={totalEnrollments}
      />
    </div>
  )
}
