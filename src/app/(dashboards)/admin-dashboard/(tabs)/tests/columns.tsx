import { ColumnDef } from "@tanstack/react-table";
import { Test } from "@/db/schema/tests.schema";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// TODO: Add actions for tests (create, update, delete)

export const columns: ColumnDef<Test>[] = [
  { accessorKey: "title", header: "Title" },
  { accessorKey: "date", header: "Date" },
  { accessorKey: "totalMarks", header: "Total Marks" },
  {
    id: "actions",
    header: "Actions",
    cell: () => {
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
            {/* <DropdownMenuItem asChild>
              <EditTestDialog test={test} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <DeleteTestForm testId={test.testId} />
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
