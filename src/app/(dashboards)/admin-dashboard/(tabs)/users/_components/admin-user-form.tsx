"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Eye, EyeOff, Shield, GraduationCap, BookOpen } from "lucide-react"

export default function AdminUserForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Creating user:", formData)
        setFormData({ username: "", email: "", password: "", role: "" })
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case "admin":
                return "bg-red-100 text-red-800 hover:bg-red-200"
            case "instructor":
                return "bg-blue-100 text-blue-800 hover:bg-blue-200"
            case "student":
                return "bg-green-100 text-green-800 hover:bg-green-200"
            default:
                return "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }
    }

    return (
        <div className="w-full">
            <Card className="p-0 pb-4">
                <CardHeader className="bg-blue-600 text-white rounded-t-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <UserPlus className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Create New User</CardTitle>
                    <CardDescription className="text-blue-100">
                      Add a new user to the system with their role and credentials
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Enter username"
                                    value={formData.username}
                                    onChange={(e) => handleInputChange("username", e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="user@example.com"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter secure password"
                                    value={formData.password}
                                    onChange={(e) => handleInputChange("password", e.target.value)}
                                    required
                                    className="pr-10"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-gray-500" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-gray-500" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2 w-full">
                            <Label htmlFor="role">User Role</Label>
                            <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select user role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">
                                        <div className="flex items-center gap-3">
                                            <Shield className="h-4 w-4 text-red-500" />
                                            <div>
                                                <div className="font-medium">Admin</div>
                                                <div className="text-xs text-gray-500">Full system access</div>
                                            </div>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="instructor">
                                        <div className="flex items-center gap-3">
                                            <GraduationCap className="h-4 w-4 text-blue-500" />
                                            <div>
                                                <div className="font-medium">Instructor</div>
                                                <div className="text-xs text-gray-500">Course management</div>
                                            </div>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="student">
                                        <div className="flex items-center gap-3">
                                            <BookOpen className="h-4 w-4 text-green-500" />
                                            <div>
                                                <div className="font-medium">Student</div>
                                                <div className="text-xs text-gray-500">Course enrollment</div>
                                            </div>
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {formData.role && (
                            <div className="p-4 bg-muted rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-sm font-medium">Selected Role:</span>
                                    <Badge className={getRoleBadgeColor(formData.role)}>
                                        {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {formData.role === "admin" && "Admins have full access to all system features and user management."}
                                    {formData.role === "instructor" &&
                                        "Instructors can create and manage courses, view student progress, and grade assignments."}
                                    {formData.role === "student" &&
                                        "Students can enroll in courses, submit assignments, and view their progress."}
                                </p>
                            </div>
                        )}

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" className="flex-1">
                                <UserPlus className="h-4 w-4 mr-2" />
                                Create User
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setFormData({ username: "", email: "", password: "", role: "" })}
                            >
                                Clear Form
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
