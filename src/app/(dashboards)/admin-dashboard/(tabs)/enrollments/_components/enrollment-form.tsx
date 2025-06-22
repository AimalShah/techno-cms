"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus } from "lucide-react"
import { enrollStudent } from "@/actions/enrollments"
import { getStudents } from "@/actions/students"
import { getCourses } from "@/actions/courses"
import { students, courses, offeringCourses, instructors } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

type Student = InferSelectModel<typeof students>;
type Course = InferSelectModel<typeof courses>;
type OfferingCourse = InferSelectModel<typeof offeringCourses> & {
    courseName: string;
    instructorFirstName: string;
    instructorLastName: string;
};

export default function EnrollmentForm() {
    const [formData, setFormData] = useState({
        studentId: "",
        courseId: "",
        startDate: "",
        endDate: "",
    })
    const [students, setStudents] = useState<Student[]>([])
    const [courses, setCourses] = useState<Course[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const studentsResult = await getStudents();
            const coursesResult = await getCourses();
            if (Array.isArray(studentsResult)) {
                setStudents(studentsResult);
            }
            if (Array.isArray(coursesResult)) {
                setCourses(coursesResult);
            }
        }
        fetchData();
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const form = e.currentTarget as HTMLFormElement;
        const data = new FormData(form);
        const result = await enrollStudent(data);
        if (result?.message) {
            alert(result.message);
        }
        setFormData({ studentId: "", courseId: "", startDate: "", endDate: "" })
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
                    <UserPlus className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Create New Enrollment</CardTitle>
                    <CardDescription className="text-blue-100">
                      Enroll a student in a course
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="studentId">Student</Label>
                                <Select value={formData.studentId} onValueChange={(value) => handleInputChange("studentId", value)} name="studentId">
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a student" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {students.map((student) => (
                                            <SelectItem key={student.studentID} value={student.studentID}>
                                                {student.firstName} {student.lastName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="courseId">Course Offering</Label>
                                <Select value={formData.courseId} onValueChange={(value) => handleInputChange("courseId", value)} name="courseId">
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a course offering" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {courses.map((course) => (
                                            <SelectItem key={course.courseID} value={course.courseID}>
                                                {course.courseName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="startDate">Start Date</Label>
                                <Input
                                    id="startDate"
                                    name="startDate"
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="endDate">End Date</Label>
                                <Input
                                    id="endDate"
                                    name="endDate"
                                    type="date"
                                    value={formData.endDate}
                                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" className="flex-1">
                                <UserPlus className="h-4 w-4 mr-2" />
                                Create Enrollment
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setFormData({ studentId: "", courseId: "", startDate: "", endDate: "" })}
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
