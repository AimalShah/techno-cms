"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "./ui/checkbox";

export type Enrollments = {
    enrollmentId: string;
    startDate: string;
    endDate: string;
    studentFirstName: string;
    studentLastName: string;
    courseName: string;
    instructorFirstName: string;
    instructorLastName: string;
}

export type Users = {
    id: string;
    username: string;
    email: string;
    role: "student" | "instructor" | "admin" | null;
    createdAt: string | null;
    lastLogin: string | null;
    isActive: boolean | null;
}

export const enrllmentColumns: ColumnDef<Enrollments>[] = [
    {
    id : "select",
    header : ({table}) => (
        <Checkbox
        checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected()) && "indeterminate"
        }
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        aria-label="Select all"
        />
    ),
    cell: ({row}) => (
        <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        />
    ),
    enableSorting : false,
    enableHiding : false
    },
    {
        accessorKey: "studentFirstName",
        filterFn : "includesString",
        header: ({ column }) => {
            return (
                <Button
                variant={"ghost"}
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                First Name
                <ArrowUpDown/>
                </Button>
            )
        },
        cell : ({row}) => {
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

export const userColumns: ColumnDef<Users>[] = [
    {
    id : "select",
    header : ({table}) => (
        <Checkbox
        checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected()) && "indeterminate"
        }
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        aria-label="Select all"
        />
    ),
    cell: ({row}) => (
        <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        />
    ),
    enableSorting : false,
    enableHiding : false
    },
    {
        accessorKey: "username",
        filterFn : "includesString",
        header: ({ column }) => {
            return (
                <Button
                variant={"ghost"}
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
               Username
                <ArrowUpDown/>
            </Button>
            )
        },
        cell : ({row}) => {
            return <div className="px-4">{row.getValue("username")}</div>
        }
    },
    {
        accessorKey: "email",
        header: () => <div className=" font-semibold">email</div>,
    },
    {
        accessorKey: "role",
        header: () => <div className="text-left font-semibold">Role</div>,
    },
        {
        accessorKey: "createdAt",
        header: () => <div className=" font-semibold">CreateAt</div>,
    },
    {
        accessorKey: "lastLogin",
        header: () => <div className=" font-semibold">Last Login</div>,
    },
    {
        accessorKey: "isActive",
        header: () => <div className=" font-semibold">IsActive</div>,
    }
]