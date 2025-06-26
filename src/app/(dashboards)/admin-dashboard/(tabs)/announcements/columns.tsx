"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Announcement } from "@/db/schema/announcements.schema";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DeleteAnnouncementForm } from "./delete-announcement";
import { EditAnnouncementDialog } from "./edit-announcement-dialog";

export const columns: ColumnDef<Announcement>[] = [
  { accessorKey: "title", header: "Title" },
  { accessorKey: "content", header: "Content" },
  { accessorKey: "postedAt", header: "Posted At" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const announcement = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <EditAnnouncementDialog announcement={announcement} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <DeleteAnnouncementForm announcementId={announcement.announcementId} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
