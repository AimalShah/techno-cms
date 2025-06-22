"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookOpen } from "lucide-react"
import { createCourse } from "@/actions/courses"

export default function CourseForm() {
    const [formData, setFormData] = useState({
        courseName: "",
        duration: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const form = e.currentTarget as HTMLFormElement;
        const data = new FormData(form);
        const result = await createCourse(data);
        if (result?.message) {
            alert(result.message);
        }
        setFormData({ courseName: "", duration: "" })
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    return (
        <div className="w-full">
            <Card className="p-0 pb-4">
                <CardHeader className="bg-blue-600 text-white rounded-t-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Create New Course</CardTitle>
                    <CardDescription className="text-blue-100">
                      Add a new course to the system
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="courseName">Course Name</Label>
                                <Input
                                    id="courseName"
                                    name="courseName"
                                    type="text"
                                    placeholder="Enter course name"
                                    value={formData.courseName}
                                    onChange={(e) => handleInputChange("courseName", e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="duration">Duration (hours)</Label>
                                <Input
                                    id="duration"
                                    name="duration"
                                    type="number"
                                    placeholder="Enter duration in hours"
                                    value={formData.duration}
                                    onChange={(e) => handleInputChange("duration", e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" className="flex-1">
                                <BookOpen className="h-4 w-4 mr-2" />
                                Create Course
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setFormData({ courseName: "", duration: "" })}
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
