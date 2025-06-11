"use client"

import { type Icon } from "@tabler/icons-react"
import { redirect, usePathname } from "next/navigation"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { iconMap } from "./app-sidebar"


export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: keyof typeof iconMap
  }[]
}) {

  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => {
            const Icon = iconMap[item.icon]
            return (<SidebarMenuItem className={pathname === item.url ? 'bg-primary text-secondary rounded-md' : ''} key={item.title}>
              <SidebarMenuButton onClick={() => redirect(item.url)} tooltip={item.title}>
                {item.icon && <Icon/>}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>)
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
