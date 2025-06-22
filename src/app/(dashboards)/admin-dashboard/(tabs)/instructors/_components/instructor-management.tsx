"use client"

import DataTable from "@/components/data-table";
import InstructorForm from "./instructor-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { instructorColumns } from "@/components/column";
import { Instructor } from "@/db/schema";

export default function InstructorManagement({
    data,
}: {
    data: Instructor[];
}) {
    return (
        <div className="w-full">
            <Tabs defaultValue="manage-instructors">
                <TabsList >
                    <TabsTrigger value="manage-instructors">Manage Instructors</TabsTrigger>
                    <TabsTrigger value="create-instructor">Create Instructor</TabsTrigger>
                </TabsList>
                <TabsContent value="manage-instructors">
                    <div>
                        <h1 className="text-4xl mb-6">Manage Instructors</h1>
                        <DataTable data={data} columns={instructorColumns} searchBy="firstName" />
                    </div>
                </TabsContent>
                <TabsContent value="create-instructor">
                    <InstructorForm />
                </TabsContent>
            </Tabs>
        </div>
    );
}
