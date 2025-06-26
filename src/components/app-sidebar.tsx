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
  IconUsers,
  IconChalkboard,
  IconBook2,
  IconUserPlus,
  IconUserCog,
  IconClipboardList,
  IconClipboardCheck,
  IconInnerShadowTop,
  IconSettings,
} from '@tabler/icons-react';

export const iconMap = {
  dashboard: IconDashboard,         // Dashboard overview
  students: IconUsers,              // Group of users → students
  instructors: IconChalkboard,      // Teachers/instructors board
  courses: IconBook2,               // Courses → books
  enrollments: IconUserPlus,        // Adding users to something
  users: IconUserCog,               // Managing system users
  exams: IconClipboardList,         // Exam paper or checklist
  results: IconClipboardCheck,      // Checked/graded results
  settings: IconSettings
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
