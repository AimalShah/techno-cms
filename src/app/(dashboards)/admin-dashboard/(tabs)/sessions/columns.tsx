"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Session } from "@/db/schema/sessions.schema";
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

import { DeleteSessionForm } from "./delete-session-form";
import { EditSessionDialog } from "./edit-session-dialog";

export const columns: ColumnDef<Session>[] = [
  { accessorKey: "sessionID", header: "Session ID" },
  { accessorKey: "userID", header: "User ID" },
  { accessorKey: "expiresAt", header: "Expires At" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const session = row.original;
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
              <EditSessionDialog session={session} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <DeleteSessionForm sessionId={session.sessionID} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];