"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  IconDashboard,
  IconChecklist,
  IconChartBar,
  IconFolder,
  IconSettings,
  IconUsers,
  IconClipboard,
  IconInnerShadowTop,
} from '@tabler/icons-react';

export const iconMap = {
  dashboard: IconDashboard,
  checklist: IconChecklist,
  chart: IconChartBar,
  folder: IconFolder,
  settings: IconSettings,
  users: IconUsers,
  clipboard : IconClipboard,
};

export type SidebarDataProps = {
  navMain: {
    title: string;
    url: string;
    icon: keyof typeof iconMap;
  }[];
  navSecondary: {
    title: string;
    url: string;
    icon: keyof typeof iconMap;
  }[]
}

export type SidebarUserProps = {
  username: string | undefined;
  email: string | undefined;
  avatar : string;
};




export function AppSidebar(
  { ...props }: 
  React.ComponentProps<typeof Sidebar>
    &
    {
      user: SidebarUserProps,
      data: SidebarDataProps
    }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Techno CMS</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={props.data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={props.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
