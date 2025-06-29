
import { getInstructorCourses } from "@/actions/instructors";
import { getResultsForCourse } from "@/actions/results";
import { createResult, updateResult } from "@/actions/results";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default async function ResultsPage({ searchParams }: { searchParams: { courseId: string } }) {
    const courses = await getInstructorCourses();
    const selectedCourseId = searchParams.courseId;
    const results = selectedCourseId ? await getResultsForCourse(selectedCourseId) : [];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Results</h1>
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
                        <CardTitle>Add/Update Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="space-y-4">
                                {results.map((result) => (
                                    <div key={result.enrollmentId} className="flex items-center justify-between">
                                        <p>{result.studentFirstName} {result.studentLastName}</p>
                                        <div className="flex items-center space-x-2">
                                            <input type="hidden" name={`result-${result.enrollmentId}-enrollmentId`} value={result.enrollmentId} />
                                            <Input type="number" name={`result-${result.enrollmentId}-marksObtained`} defaultValue={result.marksObtained || ''} placeholder="Marks" />
                                            <Input type="number" name={`result-${result.enrollmentId}-totalMarks`} defaultValue={result.totalMarks || ''} placeholder="Total" />
                                            <Input type="text" name={`result-${result.enrollmentId}-grade`} defaultValue={result.grade || ''} placeholder="Grade" />
                                            <Button formAction={result.resultId ? updateResult : createResult}> {result.resultId ? "Update" : "Add"}</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
