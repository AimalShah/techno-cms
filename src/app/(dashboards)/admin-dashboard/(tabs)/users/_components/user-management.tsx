"use client"

import {DataTable}   from "@/components/data-table";
import AdminUserForm from "./admin-user-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { userColumns, Users } from "@/components/column";


export default function UserManagement({ data }: {
    data: Users[]
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
                        {// @ts-expect-error: This is a temporary workaround for a type mismatch with the DataTable component.
                        <DataTable data={data} columns={userColumns} searchBy="username" />
                        }
                    </div>
                </TabsContent>
                <TabsContent value="create-user">   
                    <AdminUserForm />
                </TabsContent>
            </Tabs>
        </div>
    );
}