"use client"

import DataTable from "@/components/data-table";
import StudentForm from "./student-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { studentColumns } from "@/components/column";
import { Student } from "@/db/schema";

export default function StudentManagement({
    data,
}: {
    data: Student[];
}) {
    return (
        <div className="w-full">
            <Tabs defaultValue="manage-students">
                <TabsList >
                    <TabsTrigger value="manage-students">Manage Students</TabsTrigger>
                    <TabsTrigger value="create-student">Create Student</TabsTrigger>
                </TabsList>
                <TabsContent value="manage-students">
                    <div>
                        <h1 className="text-4xl mb-6">Manage Students</h1>
                        <DataTable data={data} columns={studentColumns} searchBy="firstName" />
                    </div>
                </TabsContent>
                <TabsContent value="create-student">
                    <StudentForm />
                </TabsContent>
            </Tabs>
        </div>
    );
}
