import React from "react";
import { getAllAnnouncements } from "@/db/queries/announcements/get";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Announcement } from "@/db/schema/announcements.schema";
import LoadingSkeleton from "@/components/loading-skeleton";
import { AddAnnouncementDialog } from "./add-announcement-dialog";

export default function Page() {
  const [data, setData] = React.useState<Announcement[]>([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const allAnnouncements = async () => {
      const data = await getAllAnnouncements();
      setData(data);
      setLoading(false)
    };
    allAnnouncements();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Announcements Management</h1>
        <AddAnnouncementDialog />
      </div>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <DataTable columns={columns} data={data} searchKey="title" />
      )}
    </div>
  );
}
