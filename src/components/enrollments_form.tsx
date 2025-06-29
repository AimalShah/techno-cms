"use client"

import type React from "react"
import { useState, useCallback, useMemo, useTransition } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "./ui/button"
import { enrollStudent } from "@/actions/enrollments"
import StudentField from "./enrollment_form_studentField"
import CoursesField from "./enrollment_form_courseField"
import { CheckCircle, AlertCircle, X } from "lucide-react"

// Types
export type Student = {
    studentID: string
    firstName: string
    lastName: string
    email: string
    rollNumber: string
    phone: string
    address: string
    dateOfBirth: string
}

export type OfferingCourse = {
    offeringId: string;
    price: number;
    courseName: string;
    courseDuration: number;
    instructorFirstName: string;
    instructorLastName: string;
}

interface FormState {
    firstName: string;
    courseName: string;
    startDate: string;
    endDate: string;
    selectedStudent: Student | null;
    selectedCourse: OfferingCourse | null;
}

interface NotificationState {
    show: boolean;
    type: 'success' | 'error';
    message: string;
}

const initialFormState: FormState = {
    firstName: '',
    courseName: '',
    startDate: '',
    endDate: '',
    selectedStudent: null,
    selectedCourse: null,
};

const initialNotificationState: NotificationState = {
    show: false,
    type: 'success',
    message: ''
};

export default function EnrollmentForm({ students, courses }: { students: Student[], courses: OfferingCourse[] }) {
    const [formState, setFormState] = useState<FormState>(initialFormState);
    const [notification, setNotification] = useState<NotificationState>(initialNotificationState);
    const [isPending, startTransition] = useTransition();

    // Memoized filtered results to prevent unnecessary re-computations
    const filteredStudents = useMemo(() => {
        if (!formState.firstName) return [];
        const searchTerm = formState.firstName.toLowerCase();
        return students
            .filter(student => student.firstName.toLowerCase().includes(searchTerm))
            .slice(0, 10);
    }, [students, formState.firstName]);

    const filteredCourses = useMemo(() => {
        if (!formState.courseName) return [];
        const searchTerm = formState.courseName.toLowerCase();
        return courses
            .filter(course => course.courseName.toLowerCase().includes(searchTerm))
            .slice(0, 10);
    }, [courses, formState.courseName]);

    // Optimized update functions using useCallback
    const updateFormState = useCallback((updates: Partial<FormState>) => {
        setFormState(prev => ({ ...prev, ...updates }));
    }, []);

    const showNotification = useCallback((type: 'success' | 'error', message: string) => {
        setNotification({ show: true, type, message });
        // Auto-hide notification after 5 seconds
        setTimeout(() => {
            setNotification(prev => ({ ...prev, show: false }));
        }, 5000);
    }, []);

    const hideNotification = useCallback(() => {
        setNotification(prev => ({ ...prev, show: false }));
    }, []);

    const handleClear = useCallback(() => {
        setFormState(initialFormState);
        hideNotification();
    }, [hideNotification]);

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        hideNotification();

        if (!formState.selectedStudent || !formState.selectedCourse) {
            showNotification('error', 'Please select both a student and a course');
            return;
        }

        if (!formState.startDate || !formState.endDate) {
            showNotification('error', 'Please select both start and end dates');
            return;
        }

        startTransition(async () => {
            try {
                const formData = new FormData();
                formData.append("studentId", formState.selectedStudent!.studentID);
                formData.append("courseId", formState.selectedCourse!.offeringId);
                formData.append("startDate", formState.startDate);
                formData.append("endDate", formState.endDate);

                const result = await enrollStudent(formData);

                if (result.success) {
                    showNotification('success', result.message);
                    handleClear(); // Clear form on success
                } else {
                    showNotification('error', result.message);
                }
            } catch (error: unknown) {
                showNotification('error', 'An unexpected error occurred. Please try again.');
            }
        });
    }, [formState, handleClear, showNotification, hideNotification]);

    // Form validation
    const isFormValid = formState.selectedStudent && 
                       formState.selectedCourse && 
                       formState.startDate && 
                       formState.endDate;

    return (
        <div className="p-2 border rounded-lg space-y-4">
            <h1 className="text-4xl">Create New Enrollment</h1>
            
            {/* Notification */}
            {notification.show && (
                <div className={`p-4 rounded-md flex items-center justify-between ${
                    notification.type === 'success' 
                        ? 'bg-green-50 border border-green-200 text-green-800' 
                        : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                    <div className="flex items-center gap-2">
                        {notification.type === 'success' ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                            <AlertCircle className="h-5 w-5 text-red-600" />
                        )}
                        <span>{notification.message}</span>
                    </div>
                    <button
                        onClick={hideNotification}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="flex  gap-8">
                    <StudentField 
                        firstName={formState.firstName} 
                        setFirstName={(firstName) => updateFormState({ firstName })}
                        selectedStudent={formState.selectedStudent}
                        setSelectedStudent={(selectedStudent) => updateFormState({ selectedStudent })}
                        showSuggestion={filteredStudents}
                    />
                    <CoursesField
                        courseName={formState.courseName}
                        selectedCourse={formState.selectedCourse}
                        setCourseName={(courseName) => updateFormState({ courseName })}
                        setSelectedCourse={(selectedCourse) => updateFormState({ selectedCourse })}
                        showCourses={filteredCourses}
                    />
                </div>
                
                <div className="flex gap-8 mt-4">
                    <div className="space-y-2 w-full">
                        <Label htmlFor="startDate">Start Date *</Label>
                        <Input
                            id="startDate"
                            type="date"
                            value={formState.startDate}
                            onChange={(e) => updateFormState({ startDate: e.target.value })}
                            min={new Date().toISOString().split('T')[0]} // Prevent past dates
                            required
                        />
                    </div>
                    <div className="space-y-2 w-full">
                        <Label htmlFor="endDate">End Date *</Label>
                        <Input
                            id="endDate"
                            value={formState.endDate}
                            onChange={(e) => updateFormState({ endDate: e.target.value })}
                            type="date"
                            min={formState.startDate || new Date().toISOString().split('T')[0]} // End date must be after start date
                            required
                        />
                    </div>
                </div>
                
                <div className="mt-4 flex gap-4">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={handleClear}
                        disabled={isPending}
                    >
                        Clear Form
                    </Button>
                    <Button
                        type="submit"
                        disabled={isPending || !isFormValid}
                        className="min-w-24"
                    >
                        {isPending ? 'Creating...' : 'Create'}
                    </Button>
                </div>
            </form>
        </div>
    )
}