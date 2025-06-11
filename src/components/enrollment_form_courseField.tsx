import { UserIcon } from "lucide-react";
import { memo, useCallback } from "react";
import { OfferingCourse } from "./enrollments_form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";

interface CoursesFieldProps {
    courseName: string;
    setCourseName: (e: string) => void;
    selectedCourse: OfferingCourse | null;
    setSelectedCourse: (e: OfferingCourse) => void;
    showCourses: OfferingCourse[];
}


const CourseItem = memo(({
    course,
    onSelect
}: {
    course: OfferingCourse;
    onSelect: (course: OfferingCourse) => void;
}) => (
    <div
        className="px-3 py-2 hover:bg-white/20 cursor-pointer border-b last:border-b-0"
        onClick={() => onSelect(course)}
    >
        <div className="font-medium">{course.courseName}</div>
        <div className="text-sm text-gray-500">
            duration • {course.courseDuration}
        </div>
    </div>
));

CourseItem.displayName = 'CourseItem';

const SelectedCourseDisplay = memo(({ course }: { course: OfferingCourse }) => (
    <div className="p-2 border-green-600 border-2 bg-green-600/25 rounded-md">
        <div className="flex items-center gap-2">
            <UserIcon className="h-4 w-4" />
            <span className="font-medium">{course.courseName}</span>
            <Badge variant="outline" className="border-green-300">
                {course.instructorFirstName}
            </Badge>
        </div>
        <div className="text-sm mt-1">Duration • {course.courseDuration}</div>
    </div>
));

SelectedCourseDisplay.displayName = 'SelectedCourseDisplay';

function CoursesField({
    courseName,
    setCourseName,
    selectedCourse,
    setSelectedCourse,
    showCourses
}: CoursesFieldProps) {

    const handleCourseSelect = useCallback((course: OfferingCourse) => {
        setSelectedCourse(course);
        setCourseName('');
    }, [setSelectedCourse, setCourseName]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setCourseName(e.target.value);
    }, [setCourseName]);

    return (
        <div className="space-y-2 lg:w-full relative">
            <Label htmlFor="courseName">Courses</Label>
            <Input
                type="text"
                name="courseName"
                id="courseName"
                placeholder="Course Name"
                value={courseName}
                onChange={handleInputChange}
                autoComplete="off"
            />

            {courseName !== '' && showCourses.length > 0 && (
                <div className="absolute z-10 mt-1 bg-background border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto w-full">
                    {showCourses.map((course) => (
                        <CourseItem
                            key={course.offeringId}
                            course={course}
                            onSelect={handleCourseSelect}
                        />
                    ))}
                </div>
            )}

            {selectedCourse && (
                <SelectedCourseDisplay course={selectedCourse} />
            )}
        </div>
    );
}

export default memo(CoursesField);