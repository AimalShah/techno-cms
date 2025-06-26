import { SidebarDataProps } from "@/components/app-sidebar";

export const adminSidebarData : SidebarDataProps= {
  navMain: [
    { title: "Dashboard", url: "/admin-dashboard", icon: "dashboard" },
    { title: "Students", url: "/admin-dashboard/students", icon: "students" },
    { title: "Instructors", url: "/admin-dashboard/instructors", icon: "instructors" },
    { title: "Courses", url: "/admin-dashboard/courses", icon: "courses" },
    { title: "Enrollments", url: "/admin-dashboard/enrollments", icon: "enrollments" },
    { title: "Users", url: "/admin-dashboard/users", icon: "users" },
    {title: "Exams" , url: "/admin-dashboard/exams" , icon: "exams"},
    { title: "Results", url: "/admin-dashboard/results", icon: "results" }
  ],
  navSecondary: [
    { title: "Settings", url: "#", icon: "settings" },
  ],
};

export const studentSidebarData : SidebarDataProps = {
  navMain: [
    { title: "Dashboard", url: "/student-dashboard", icon: "dashboard" },
    { title: "Attendance", url: "/student-dashboard/attendance", icon: "results" },
    { title: "Result", url: "/student-dashboard/results", icon: "results" }, // ✅ Fixed URL and icon key
    { title: "Courses", url: "/student-dashboard/courses", icon: "courses" },
    { title: "Enrollments", url: "/student-dashboard/enrollments", icon: "users" },
  ],
  navSecondary: [
    { title: "Settings", url: "#", icon: "settings" },
  ],
};

  

