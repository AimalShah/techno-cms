import React from "react";
import { getAllSessions } from "@/db/queries/sessions/get";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Session } from "@/db/schema/sessions.schema";
import LoadingSkeleton from "@/components/loading-skeleton";
import { AddSessionDialog } from "./add-session-dialog";

export default function Page() {
  const [data, setData] = React.useState<Session[]>([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const allSessions = async () => {
      const data = await getAllSessions();
      setData(data);
      setLoading(false)
    };
    allSessions();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Sessions Management</h1>
        <AddSessionDialog />
      </div>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <DataTable columns={columns} data={data} searchKey="userID" />
      )}
    </div>
  );
}