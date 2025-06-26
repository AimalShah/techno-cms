
import React, { Suspense } from "react";
import { getAllInstructors } from "@/db/queries/instructors/get";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import LoadingSkeleton from "@/components/loading-skeleton";
import { AddInstructorDialog } from "./add-instructor-dialog";


export type Instructor = {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    instructorID: string;
};

export default async function Page() {
  // const [data, setData] = React.useState<Instructor[]>([]);
  // const [loading, setLoading] = React.useState(true);
  // React.useEffect(() => {
  //   const allInstructors = async () => {
  //     const data = await getAllInstructors();
  //     setData(data);
  //     setLoading(false)
  //   };
  //   allInstructors();
  // }, []);

  const data = await getAllInstructors();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Instructors Management</h1>
        <AddInstructorDialog />
      </div>
        <Suspense fallback={<LoadingSkeleton />}>
        <DataTable columns={columns} data={data} searchKey="firstName" />
        </Suspense>
    </div>
  );
}
