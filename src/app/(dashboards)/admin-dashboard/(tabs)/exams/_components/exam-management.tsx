"use client"

import DataTable from "@/components/data-table";
import ExamForm from "./exam-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { examColumns } from "@/components/column";
import { Exam } from "@/db/schema";

export default function ExamManagement({
    data,
}: {
    data: Exam[];
}) {
    return (
        <div className="w-full">
            <Tabs defaultValue="manage-exams">
                <TabsList >
                    <TabsTrigger value="manage-exams">Manage Exams</TabsTrigger>
                    <TabsTrigger value="create-exam">Create Exam</TabsTrigger>
                </TabsList>
                <TabsContent value="manage-exams">
                    <div>
                        <h1 className="text-4xl mb-6">Manage Exams</h1>
                        <DataTable data={data} columns={examColumns} searchBy="title" />
                    </div>
                </TabsContent>
                <TabsContent value="create-exam">
                    <ExamForm />
                </TabsContent>
            </Tabs>
        </div>
    );
}
