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

export const userColumns: ColumnDef<Users>[] = [
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
        accessorKey: "username",
        filterFn: "includesString",
        header: ({ column }) => {
            return (
                <Button
                    variant={"ghost"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Username
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
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
        cell: ({ row }) => {
            const role: "admin" | "student" | "instructor" = row.getValue("role");

            return (
                <Badge className={`${getRoleBadgeColor(role)} flex items-center gap-1 w-fit`}>
                    {getRoleIcon(role)}
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                </Badge>
            )

        }
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
        cell: ({ row }) => {
            const status: boolean = row.getValue("isActive");

            return (
                <div className="flex items-center gap-2">
                    {getStatusBadge(status)}
                    <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                    >
                        {status === true ? (
                            <UserX className="h-4 w-4 text-red-500" />
                        ) : (
                            <UserCheck className="h-4 w-4 text-green-500" />
                        )}
                    </Button>
                </div>
            )
        },
    },
    {
        id: "actions",
        header: () => <div className="font-semibold">actions</div>,
        cell: ({ row }) => {

            const status = row.getValue("isActive");

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center gap-2">
                            <Edit className="h-4 w-4" />
                            Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="flex items-center gap-2"
                        >
                            {status === true ? (
                                <>
                                    <UserX className="h-4 w-4" />
                                    Deactivate
                                </>
                            ) : (
                                <>
                                    <UserCheck className="h-4 w-4" />
                                    Activate
                                </>
                            )}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                            <Trash2 className="h-4 w-4" />
                            Delete User
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]