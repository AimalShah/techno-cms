import React from "react";
import { getAllTests } from "@/db/queries/tests/get";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Test } from "@/db/schema/tests.schema";
import LoadingSkeleton from "@/components/loading-skeleton";
import { AddTestDialog } from "./add-test-dialog";

export default function Page() {
  const [data, setData] = React.useState<Test[]>([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const allTests = async () => {
      const data = await getAllTests();
      setData(data);
      setLoading(false)
    };
    allTests();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tests Management</h1>
        <AddTestDialog />
      </div>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <DataTable columns={columns} data={data} searchKey="title" />
      )}
    </div>
  );
}