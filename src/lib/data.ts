import { SidebarDataProps } from "@/components/app-sidebar";

export const adminSidebarData : SidebarDataProps= {
  navMain: [
    { title: "Dashboard", url: "/admin-dashboard", icon: "dashboard" },
    { title: "Students", url: "/admin-dashboard/students", icon: "users" },
    { title: "Instructors", url: "/admin-dashboard/instructors", icon: "chart" },
    { title: "Courses", url: "/admin-dashboard/courses", icon: "folder" },
    { title: "Enrollments", url: "/admin-dashboard/enrollments", icon: "users" },
    { title: "Users", url: "/admin-dashboard/users", icon: "users" },
    {title: "Exams" , url: "/admin-dashboard/exams" , icon: "clipboard"}
  ],
  navSecondary: [
    { title: "Settings", url: "#", icon: "settings" },
  ],
};

export const studentSidebarData : SidebarDataProps = {
  navMain: [
    { title: "Dashboard", url: "/student-dashboard", icon: "dashboard" },
    { title: "Attendance", url: "/student-dashboard/attendance", icon: "checklist" },
    { title: "Result", url: "/student-dashboard/instructors", icon: "chart" },
    { title: "Courses", url: "/student-dashboard/courses", icon: "folder" },
    { title: "Enrollments", url: "/student-dashboard/enrollments", icon: "users" },
  ],
  navSecondary: [
    { title: "Settings", url: "#", icon: "settings" },
  ],
};
