import { getEnrollmentsWithDetails } from "@/app/db/queries/enrollments/get";
import { enrllmentColumns } from "@/components/column";
import DataTable from "@/components/data-table";

export default async function Page(){
    const data = await getEnrollmentsWithDetails();
    return(
        <div className="p-8"> 
            <DataTable data={data} columns={enrllmentColumns} searchBy="studentFirstName"/>
        </div>
    )
}