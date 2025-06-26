import React, { Suspense } from "react";
import { getAllResults } from "@/db/queries/results/get";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import LoadingSkeleton from "@/components/loading-skeleton";
import { AddResultDialog } from "./add-result-dialog";

export default async function Page() {
 const data = await getAllResults();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Results Management</h1>
        <AddResultDialog />
      </div>

        <Suspense fallback={<LoadingSkeleton />}>
        <DataTable columns={columns} data={data} searchKey="grade" />
        </Suspense>
    </div>
  );
}