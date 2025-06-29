
import { getInstructorCourses } from "@/actions/instructors";
import { getEnrolledStudents } from "@/actions/enrollments";
import { createAttendance } from "@/actions/attendance";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AttendancePage({ searchParams }: { searchParams: { courseId: string } }) {
    const courses = await getInstructorCourses();
    const selectedCourseId = searchParams.courseId;
    const students = selectedCourseId ? await getEnrolledStudents(selectedCourseId) : [];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Attendance</h1>
            <form className="mb-4">
                <Select name="courseId">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                        {courses.map((course) => (
                            <SelectItem key={course.offeringID} value={course.offeringID}>
                                {course.courseName}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button type="submit" className="ml-2">Load Students</Button>
            </form>

            {selectedCourseId && (
                <Card>
                    <CardHeader>
                        <CardTitle>Mark Attendance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form action={createAttendance}>
                            <input type="hidden" name="courseId" value={selectedCourseId} />
                            <div className="space-y-4">
                                {students.map((student) => (
                                    <div key={student.enrollmentID} className="flex items-center justify-between">
                                        <p>{student.firstName} {student.lastName}</p>
                                        <input type="hidden" name={`student-${student.enrollmentID}-enrollmentId`} value={student.enrollmentID} />
                                        <Select name={`student-${student.enrollmentID}-status`}>
                                            <SelectTrigger className="w-[120px]">
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Present">Present</SelectItem>
                                                <SelectItem value="Absent">Absent</SelectItem>
                                                <SelectItem value="Excused">Excused</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                ))}
                            </div>
                            <Button type="submit" className="mt-4">Submit Attendance</Button>
                        </form>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
