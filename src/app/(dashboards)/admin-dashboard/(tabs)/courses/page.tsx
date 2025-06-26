import React, { Suspense } from "react";
import { getAllCourses } from "@/db/queries/courses/get";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import LoadingSkeleton from "@/components/loading-skeleton";
import { AddCourseDialog } from "./add-course-dialog";


export type Course = {
    duration: number;
    courseID: string;
    courseName: string;
};

export default async function Page() {
  const data = await getAllCourses();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Courses Management</h1>
        <AddCourseDialog />
      </div>
        <Suspense fallback={<LoadingSkeleton />}>
        <DataTable columns={columns} data={data} searchKey="courseName" />
        </Suspense>
    </div>
  );
}
