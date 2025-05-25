
import { getUser} from "@/lib/dal";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getUser();
  if(user){
    return redirect("/dashboard")
  }

  if(!user){
    return redirect("/login");
  }
}
