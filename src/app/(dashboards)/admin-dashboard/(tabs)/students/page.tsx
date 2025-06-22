import StudentManagement from "./_components/student-management";
import { getStudents } from "@/actions/students";
import { Student } from "@/db/schema";

export default async function Page(){

    const result = await getStudents();
    const data: Student[] = Array.isArray(result) ? result : [];

    return (
        <div className="px-6 py-2 flex flex-col items-center space-y-2">
            <StudentManagement data={data}/>
        </div>
    )
}