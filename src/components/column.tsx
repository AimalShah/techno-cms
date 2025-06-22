"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { ArrowUpDown, BookOpen, Edit, GraduationCap, Mail, MoreHorizontal, Shield, Trash2, UserCheck, UserX } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"

export type Enrollments = {
    enrollmentId: string;
    startDate: string;
    endDate: string;
    studentFirstName: string | null;
    studentLastName: string | null;
    courseName: string | null;
    instructorFirstName: string | null;
    instructorLastName: string | null;
}

import { users, students, instructors, courses, exams } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type User = InferSelectModel<typeof users>;
export type Student = InferSelectModel<typeof students>;
export type Instructor = InferSelectModel<typeof instructors>;
export type Course = InferSelectModel<typeof courses>;
export type Exam = InferSelectModel<typeof exams>;

import { users, students, instructors, courses, exams } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type User = InferSelectModel<typeof users>;
export type Student = InferSelectModel<typeof students>;
export type Instructor = InferSelectModel<typeof instructors>;
export type Course = InferSelectModel<typeof courses>;
export type Exam = InferSelectModel<typeof exams>;

import { users, students, instructors, courses, exams } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type User = InferSelectModel<typeof users>;
export type Student = InferSelectModel<typeof students>;
export type Instructor = InferSelectModel<typeof instructors>;
export type Course = InferSelectModel<typeof courses>;
export type Exam = InferSelectModel<typeof exams>;

export type Users = {
    id: string;
    username: string;
    email: string;
    role: "student" | "instructor" | "admin" | null;
    createdAt: string | null;
    lastLogin: string | null;
    isActive: boolean | null;
}

const getRoleBadgeColor = (role: string) => {
    switch (role) {
        case "admin":
            return "bg-red-600 text-white hover:bg-red-700"
        case "instructor":
            return "bg-blue-600 text-white hover:bg-blue-700"
        case "student":
            return "bg-green-600 text-white hover:bg-green-700"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

const getRoleIcon = (role: string) => {
    switch (role) {
        case "admin":
            return <Shield className="h-4 w-4" />
        case "instructor":
            return <GraduationCap className="h-4 w-4" />
        case "student":
            return <BookOpen className="h-4 w-4" />
        default:
            return null
    }
}

const getStatusBadge = (status: boolean) => {
    return status === true ? (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
    ) : (
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Inactive</Badge>
    )
}


export const enrllmentColumns: ColumnDef<Enrollments>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected()) && "indeterminate"
                }
                onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: "studentFirstName",
        filterFn: "includesString",
        header: ({ column }) => {
            return (
                <Button
                    variant={"ghost"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    First Name
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <div className="px-4">{row.getValue("studentFirstName")}</div>
        }
    },
    {
        accessorKey: "studentLastName",
        header: () => <div className=" font-semibold">Last Name</div>,
    },
    {
        accessorKey: "courseName",
        header: () => <div className=" font-semibold">Course</div>,
    },
    {
        accessorKey: "instructorFirstName",
        header: () => <div className="text-left font-semibold">Instructor</div>,
    },
    {
        accessorKey: "startDate",
        header: () => <div className=" font-semibold">Start Date</div>,
    },
    {
        accessorKey: "endDate",
        header: () => <div className=" font-semibold">End Date</div>,
    }
];

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "lastLogin",
    header: "Last Login",
  },
  {
    accessorKey: "isActive",
    header: "Active",
  },
];

export const studentColumns: ColumnDef<Student>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "rollNumber",
    header: "Roll Number",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "dateOfBirth",
    header: "Date of Birth",
  },
];

export const instructorColumns: ColumnDef<Instructor>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
];

export const courseColumns: ColumnDef<Course>[] = [
  {
    accessorKey: "courseName",
    header: "Course Name",
  },
  {
    accessorKey: "duration",
    header: "Duration (hours)",
  },
];

export const examColumns: ColumnDef<Exam>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "totalMarks",
    header: "Total Marks",
  },
];