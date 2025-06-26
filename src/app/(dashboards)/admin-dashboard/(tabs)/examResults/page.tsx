import React from "react";
import { getAllExamResults } from "@/db/queries/examResults/get";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import LoadingSkeleton from "@/components/loading-skeleton";
import { AddExamResultDialog } from "./add-exam-result-dialog";


export type ExamResult {
    examResultId: string;
    examId: string;
    studentId: string;
    marksObtained: number;
};

export default function Page() {
  const [data, setData] = React.useState<ExamResult[]>([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const allExamResults = async () => {
      const data = await getAllExamResults();
      setData(data);
      setLoading(false)
    };
    allExamResults();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Exam Results Management</h1>
        <AddExamResultDialog />
      </div>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <DataTable columns={columns} data={data} searchKey="marksObtained" />
      )}
    </div>
  );
}