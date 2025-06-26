"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Result } from "@/db/schema/results.schema";
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

import { DeleteResultForm } from "./delete-result-form";
import { EditResultDialog } from "./edit-result-dialog";

export const columns: ColumnDef<Result>[] = [
  { accessorKey: "enrollmentId", header: "Enrollment ID" },
  { accessorKey: "marksObtained", header: "Marks Obtained" },
  { accessorKey: "totalMarks", header: "Total Marks" },
  { accessorKey: "grade", header: "Grade" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const result = row.original;
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
              <EditResultDialog result={result} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <DeleteResultForm resultId={result.resultId} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];