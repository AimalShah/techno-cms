
import {getEnrollmentsWithDetails } from "@/db/queries/enrollments/get";
import { getOfferingCoursesWithDetails } from "@/db/queries/offeringCourses/get";
import { getAllStudents } from "@/db/queries/students/get";
import { enrllmentColumns } from "@/components/column";
import {DataTable}  from "@/components/data-table";
import EnrollmentForm from "@/components/enrollments_form";
import SkeletonCard from "@/components/loading-skeleton";
import { Suspense } from "react";

async function EnrollmentSection() {
    const [students , courses] = await Promise.all([
        getAllStudents(),
        getOfferingCoursesWithDetails(),
    ]);

    return <EnrollmentForm students={students} courses={courses}/>
}


async function SearchSection() {
    const data = await getEnrollmentsWithDetails();

    return (
        <div className="p-2 border rounded-lg">
            <h1 className="text-4xl mb-6">Search Enrollments</h1>
            {
                //@ts-ignore
                <DataTable data={data} columns={enrllmentColumns} searchBy="studentFirstName"/>
            }
        </div>
    )
}

export default async function Page(){

    return(
        <div className="px-8 py-4 space-y-4"> 
           <Suspense fallback={<SkeletonCard/>}>
            <EnrollmentSection/>
           </Suspense>

           <Suspense fallback={<SkeletonCard/>}>
            <SearchSection/>
           </Suspense>
            
        </div>
    )
}
