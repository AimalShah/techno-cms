"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateOfferingCourse } from "@/actions/offeringCourses";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { OfferingCourse } from "@/db/schema/offering_courses.schema";

export function EditOfferingCourseDialog({ offeringCourse }: { offeringCourse: OfferingCourse }) {
    const [state, formAction] = useFormState(updateOfferingCourse, {
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
                    <DialogTitle>Edit Offering Course</DialogTitle>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    <input type="hidden" name="offeringID" value={offeringCourse.offeringID} />
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <Label htmlFor="courseID">Course ID</Label>
                            <Input name="courseID" defaultValue={offeringCourse.courseID} required />
                        </div>
                        <div>
                            <Label htmlFor="instructorID">Instructor ID</Label>
                            <Input name="instructorID" defaultValue={offeringCourse.instructorID} required />
                        </div>
                        <div>
                            <Label htmlFor="price">Price</Label>
                            <Input name="price" type="number" step="0.01" defaultValue={offeringCourse.price} required />
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
