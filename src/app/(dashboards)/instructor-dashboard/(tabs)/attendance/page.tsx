import { getInstructorCourses } from "@/actions/instructors";
import { getEnrolledStudents } from "@/actions/enrollments";
import { createAttendance } from "@/actions/attendance";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CourseSelector } from "@/components/course-selector";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AttendancePage({ searchParams }: { searchParams: { courseId: string } }) {
    const { courseId } = searchParams;
    console.log(courseId);
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Attendance</h1>
            <Suspense fallback={<Skeleton className="h-10 w-48" />}>
                <CourseSelectorWrapper selectedCourseId={courseId} />
            </Suspense>

            <Suspense fallback={<p>Loading students...</p>}>
                <StudentAttendanceList courseId={courseId} />
            </Suspense>
        </div>
    );
}

async function CourseSelectorWrapper({ selectedCourseId }: { selectedCourseId: string | undefined }) {
    const courses = await getInstructorCourses();
    return <CourseSelector courses={courses} selectedCourseId={selectedCourseId} />;
}

async function StudentAttendanceList({ courseId }: { courseId: string | undefined }) {
    if (!courseId) {
        return <p className="text-muted-foreground">Please select a course to view students.</p>;
    }

    const students = await getEnrolledStudents(courseId);

    if (students.length === 0) {
        return <p className="text-muted-foreground">No students are enrolled in this course.</p>;
    }

    return (
        <form action={async (formData) => { 
            "use server"
            await createAttendance(formData); }}>
            <Card>
                <CardHeader>
                    <CardTitle>Mark Attendance</CardTitle>
                </CardHeader>
                <CardContent>
                    <input type="hidden" name="courseId" value={courseId} />
                    <div className="space-y-4">
                        {students.map((student) => (
                            <div key={student.enrollmentID} className="flex items-center justify-between">
                                <p>{student.firstName} {student.lastName}</p>
                                <input type="hidden" name={`enrollmentId`} value={student.enrollmentID} />
                                <Select name={`status`} defaultValue="Present">
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
                </CardContent>
            </Card>
        </form>
    );
}
