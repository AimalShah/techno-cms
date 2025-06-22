import UserManagement from "./_components/user-management";
import { getUsers } from "@/actions/users";

export default async function Page(){

    const result = await getUsers();
    const data: User[] = Array.isArray(result) ? result : [];

    return (
        <div className="px-6 py-2 flex flex-col items-center space-y-2">
            <UserManagement data={data}/>
        </div>
    )
}