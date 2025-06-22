"use client"

import DataTable from "@/components/data-table";
import EnrollmentForm from "./enrollment-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { enrllmentColumns, Enrollments } from "@/components/column";

export default function EnrollmentManagement({
    data,
}: {
    data: Enrollments[];
}) {
    return (
        <div className="w-full">
            <Tabs defaultValue="manage-enrollments">
                <TabsList >
                    <TabsTrigger value="manage-enrollments">Manage Enrollments</TabsTrigger>
                    <TabsTrigger value="create-enrollment">Create Enrollment</TabsTrigger>
                </TabsList>
                <TabsContent value="manage-enrollments">
                    <div>
                        <h1 className="text-4xl mb-6">Manage Enrollments</h1>
                        <DataTable data={data} columns={enrllmentColumns} searchBy="studentFirstName" />
                    </div>
                </TabsContent>
                <TabsContent value="create-enrollment">
                    <EnrollmentForm />
                </TabsContent>
            </Tabs>
        </div>
    );
}
