"use client"

import DataTable from "@/components/data-table";
import CourseForm from "./course-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { courseColumns } from "@/components/column";
import { courses } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

type Course = InferSelectModel<typeof courses>;

export default function CourseManagement({
    data,
}: {
    data: Course[];
}) {
    return (
        <div className="w-full">
            <Tabs defaultValue="manage-courses">
                <TabsList >
                    <TabsTrigger value="manage-courses">Manage Courses</TabsTrigger>
                    <TabsTrigger value="create-course">Create Course</TabsTrigger>
                </TabsList>
                <TabsContent value="manage-courses">
                    <div>
                        <h1 className="text-4xl mb-6">Manage Courses</h1>
                        <DataTable data={data} columns={courseColumns} searchBy="courseName" />
                    </div>
                </TabsContent>
                <TabsContent value="create-course">
                    <CourseForm />
                </TabsContent>
            </Tabs>
        </div>
    );
}
