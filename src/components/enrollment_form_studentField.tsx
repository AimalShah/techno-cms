import { UserIcon } from "lucide-react";
import { memo, useCallback } from "react";
import { Student } from "./enrollments_form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";

interface StudentFieldProps {
    firstName: string;
    setFirstName: (e : string) => void;
    selectedStudent: Student | null;
    setSelectedStudent: (e : Student) => void;
    showSuggestion: Student[];
}

// Memoized student item component
const StudentItem = memo(({ 
    student, 
    onSelect 
}: { 
    student: Student; 
    onSelect: (student: Student) => void; 
}) => (
    <div
        className="px-3 py-2 hover:bg-white/20 cursor-pointer border-b last:border-b-0"
        onClick={() => onSelect(student)}
    >
        <div className="font-medium">
            {student.firstName} {student.lastName}
        </div>
        <div className="text-sm text-gray-500">
            {student.rollNumber} • {student.email}
        </div>
    </div>
));

StudentItem.displayName = 'StudentItem';

// Memoized selected student display
const SelectedStudentDisplay = memo(({ student }: { student: Student }) => (
    <div className="p-2 border-green-600 border-2 bg-green-600/25 rounded-md">
        <div className="flex items-center gap-2">
            <UserIcon className="h-4 w-4" />
            <span className="font-medium">
                {student.firstName} {student.lastName}
            </span>
            <Badge variant="outline" className="border-green-300">
                {student.rollNumber}
            </Badge>
        </div>
        <div className="text-sm mt-1">{student.email}</div>
    </div>
));

SelectedStudentDisplay.displayName = 'SelectedStudentDisplay';

function StudentField({ 
    firstName, 
    setFirstName, 
    selectedStudent, 
    setSelectedStudent, 
    showSuggestion 
}: StudentFieldProps) {
    
    const handleStudentSelect = useCallback((student: Student) => {
        setSelectedStudent(student);
        setFirstName('');
    }, [setSelectedStudent, setFirstName]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    }, [setFirstName]);

    return (
        <div className="space-y-2 lg:w-full relative">
            <Label htmlFor="first-name">Student Name</Label>
            <Input
                type="text"
                name="firstName"
                id="first-name"
                value={firstName}
                onChange={handleInputChange}
                placeholder="Search By Student First Name"
                autoComplete="off"
            />
            
            {firstName !== '' && showSuggestion.length > 0 && (
                <div className="absolute z-10 mt-1 bg-background border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto w-full">
                    {showSuggestion.map((student) => (
                        <StudentItem
                            key={student.studentID}
                            student={student}
                            onSelect={handleStudentSelect}
                        />
                    ))}
                </div>
            )}
            
            {selectedStudent && (
                <SelectedStudentDisplay student={selectedStudent} />
            )}
        </div>
    );
}

export default memo(StudentField);