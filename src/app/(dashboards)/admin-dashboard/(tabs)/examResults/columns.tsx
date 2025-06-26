"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ExamResult } from "@/db/schema/examResults.schema";
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

import { DeleteExamResultForm } from "./delete-exam-result-form";
import { EditExamResultDialog } from "./edit-exam-result-dialog";

export const columns: ColumnDef<ExamResult>[] = [
  { accessorKey: "examId", header: "Exam ID" },
  { accessorKey: "studentId", header: "Student ID" },
  { accessorKey: "marksObtained", header: "Marks Obtained" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const examResult = row.original;
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
              <EditExamResultDialog examResult={examResult} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <DeleteExamResultForm examResultId={examResult.examResultId} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];