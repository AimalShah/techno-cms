import { Suspense } from "react";
import UserManagement from "./_components/user-management";
import { getAllUsers } from "@/db/queries/users/get";

export default async function Page(){

    const data = await getAllUsers();

    return (
        <div className="px-6 py-2 flex flex-col items-center space-y-2">
            <Suspense fallback={"loading...."}>
            <UserManagement data={data}/>
            </Suspense>
        </div>
    )
}