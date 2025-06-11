import { AppSidebar } from "@/components/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header";
import {studentSidebarData } from "@/lib/data";
import { getUser } from "@/lib/dal";


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const userData = await getUser();
    const user =  {
        username : userData?.username,
        email : userData?.email,
        avatar : '',
    }




    return (<SidebarProvider
        style={
            {
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
        }
    >
        <AppSidebar variant="inset" user={user} data={studentSidebarData} />
        <SidebarInset>
            <SiteHeader />
            {children}
        </SidebarInset>
    </SidebarProvider>
    )
}