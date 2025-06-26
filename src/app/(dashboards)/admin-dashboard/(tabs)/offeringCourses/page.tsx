import React, { Suspense } from "react";
import { getAllOfferingCourses } from "@/db/queries/offeringCourses/get";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import LoadingSkeleton from "@/components/loading-skeleton";
import { AddOfferingCourseDialog } from "./add-offering-course-dialog";

export default async function Page() {
  const data = await getAllOfferingCourses();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Offering Courses Management</h1>
        <AddOfferingCourseDialog />
      </div>
        <Suspense fallback={<LoadingSkeleton />}>
        <DataTable columns={columns} data={data} searchKey="price" />
        </Suspense>
    </div>
  );
}