"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateCourse } from "@/actions/courses";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Course } from "@/db/schema/courses.schema";

export function EditCourseDialog({ course }: { course: Course }) {
    const [state, formAction] = useFormState(updateCourse, {
        error: false,
        message: "",
    });

    if (state.message) {
        toast(state.message)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost">Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Course</DialogTitle>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    <input type="hidden" name="courseID" value={course.courseID} />
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <Label htmlFor="courseName">Course Name</Label>
                            <Input name="courseName" defaultValue={course.courseName} required />
                        </div>
                        <div>
                            <Label htmlFor="duration">Duration</Label>
                            <Input name="duration" type="number" defaultValue={course.duration} required />
                        </div>
                    </div>
                    <DialogFooter>
                        <SubmitButton />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Updating..." : "Update"}
        </Button>
    );
}
