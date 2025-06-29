
import { AppSidebar } from "@/components/app-sidebar";
import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";

import { SidebarDataProps } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function InstructorDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
     const userData = await getUser();
    const user = {
        username : userData?.username,
        email : userData?.email,
        avatar : ""
    };
    

    const navItems : SidebarDataProps = {
        navMain : [
        {
            title: "My Courses",
            url: "/instructor-dashboard/courses",
            icon :"courses"
        },
        {
            title: "Attendance",
            url: "/instructor-dashboard/attendance",
            icon : "enrollments"
            
        },
        {
            title: "Results",
            url: "/instructor-dashboard/results",
            icon : "exams"
        },
        {
            title: "Announcements",
            url: "/instructor-dashboard/announcements",
            icon : "results"
        },
        
    ],
     navSecondary: [
    { title: "Settings", url: "#", icon: "settings" },
  ],

};

    return (
        <SidebarProvider
                style={
                    {
                        "--sidebar-width": "calc(var(--spacing) * 72)",
                        "--header-height": "calc(var(--spacing) * 12)",
                    } as React.CSSProperties
                }
            >

            <AppSidebar user={user} data={navItems} />
            <SidebarInset>
            <main className="flex-1 p-8">{children}</main>
            </SidebarInset>
            </SidebarProvider>
    );
}
