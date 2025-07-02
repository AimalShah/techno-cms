'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Course {
    offeringID: string;
    courseName: string;
}

export function CourseSelector({ courses, selectedCourseId }: { courses: Course[], selectedCourseId: string | undefined }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSelection = (courseId: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (courseId) {
            params.set('courseId', courseId);
        } else {
            params.delete('courseId');
        }
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="mb-4">
            <Select onValueChange={handleSelection} defaultValue={selectedCourseId}>
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
        </div>
    );
}
