"use client"

import DataTable from "@/components/data-table";
import AdminUserForm from "./admin-user-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { userColumns } from "@/components/column";
import { User } from "@/db/schema";
import { Badge, Users as UserIcon, } from "lucide-react";

export default function UserManagement({ data }: {
    data: User[]
}) {
    return (
        <div className="w-full">
            <Tabs defaultValue="manage-users">
                <TabsList >
                    <TabsTrigger value="manage-users">Manage Users</TabsTrigger>
                    <TabsTrigger value="create-user">Create User</TabsTrigger>
                </TabsList>
                <TabsContent value="manage-users">
                    <div>
                    <h1 className="text-4xl mb-6">Manage Users</h1>
                        <DataTable data={data} columns={userColumns} searchBy="username" />
                    </div>
                </TabsContent>
                <TabsContent value="create-user">
                    <AdminUserForm />
                </TabsContent>
            </Tabs>
        </div>
    );
}