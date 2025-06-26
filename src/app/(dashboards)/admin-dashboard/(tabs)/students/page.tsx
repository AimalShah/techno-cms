"use client";
import React from "react";
import { getAllStudents } from "@/actions/students";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Student } from "@/db/schema/students.schema";
import LoadingSkeleton from "@/components/loading-skeleton";

export default function Page() {
  const [data, setData] = React.useState<Student[]>([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const allStudents = async () => {
      const data = await getAllStudents();
      setData(data);
      setLoading(false)
    };
    allStudents();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Students Management</h1>
      </div>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <DataTable columns={columns} data={data} searchKey="firstName" />
      )}
    </div>
  );
}
