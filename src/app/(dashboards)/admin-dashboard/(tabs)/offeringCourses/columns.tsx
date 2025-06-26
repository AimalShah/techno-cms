"use client";
import { ColumnDef } from "@tanstack/react-table";
import { OfferingCourse } from "@/db/schema/offering_courses.schema";
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

import { DeleteOfferingCourseForm } from "./delete-offering-course-form";
import { EditOfferingCourseDialog } from "./edit-offering-course-dialog";

export const columns: ColumnDef<OfferingCourse>[] = [
  { accessorKey: "courseID", header: "Course ID" },
  { accessorKey: "instructorID", header: "Instructor ID" },
  { accessorKey: "price", header: "Price" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const offeringCourse = row.original;
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
              <EditOfferingCourseDialog offeringCourse={offeringCourse} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <DeleteOfferingCourseForm offeringId={offeringCourse.offeringID} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];