import { AppSidebar } from "@/components/app-sidebar"
import { getUser } from "@/lib/dal"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header";


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const userdata = await getUser();

    const user = {
        username: userdata?.username,
        email: userdata?.email,
        avatar: ''
    };

  

    return (<SidebarProvider
        style={
            {
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
        }
    >
        <AppSidebar variant="inset" user={user} />
        <SidebarInset>
        <SiteHeader />
            {children}
        </SidebarInset>
    </SidebarProvider>
    )
}