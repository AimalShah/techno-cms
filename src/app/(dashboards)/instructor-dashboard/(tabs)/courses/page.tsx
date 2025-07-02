
import { getInstructorCourses } from "@/actions/instructors";
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";

export default async function CoursesPage() {
    const courses = await getInstructorCourses();

    const columns: ColumnDef<typeof courses[0]>[] = [
        {
            accessorKey: "courseName",
            header: "Course Name",
        },
        {
            accessorKey: "duration",
            header: "Duration (in weeks)",
        },
        {
            accessorKey: "price",
            header: "Price",
        },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold">My Courses</h1>
            <DataTable columns={columns} data={courses} searchKey="courseName" />
        </div>
    );
}
