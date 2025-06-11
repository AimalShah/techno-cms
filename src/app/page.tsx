
import { getUser} from "@/lib/dal";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getUser();
  if(user?.role === "admin"){
    return redirect("/admin-dashboard")
  }

  if(user?.role === "instructor"){
    return redirect("/instrucor-dashboard");
  }

  if(user?.role === "student"){
    return redirect("/student-dashboard");
  }

  if(!user){
    return redirect("/login");
  }
}
