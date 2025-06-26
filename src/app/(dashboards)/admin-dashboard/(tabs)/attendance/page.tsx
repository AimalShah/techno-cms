import React from "react";
import { getAllAttendance } from "@/db/queries/attendance/get";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Attendance } from "@/db/schema/attendance.schema";
import LoadingSkeleton from "@/components/loading-skeleton";
import { AddAttendanceDialog } from "./add-attendance-dialog";

export default function Page() {
  const [data, setData] = React.useState<Attendance[]>([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const allAttendance = async () => {
      const data = await getAllAttendance();
      setData(data);
      setLoading(false)
    };
    allAttendance();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Attendance Management</h1>
        <AddAttendanceDialog />
      </div>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <DataTable columns={columns} data={data} searchKey="enrollmentId" />
      )}
    </div>
  );
}