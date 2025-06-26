import React, { Suspense } from "react";
import { getAllExams } from "@/db/queries/exams/get";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import LoadingSkeleton from "@/components/loading-skeleton";
import { AddExamDialog } from "./add-exam-dialog";

export type Exam = {
  title: string;
  date: Date;
  examId: string;
  totalMarks: number;
};

export default async function Page() {
  const data = await getAllExams();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Exams Management</h1>
        <AddExamDialog />
      </div>

      <Suspense fallback={<LoadingSkeleton />}>
        <DataTable columns={columns} data={data} searchKey="title" />
      </Suspense>

    </div>
  );
}