"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createOfferingCourse } from "@/actions/offeringCourses";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

export function AddOfferingCourseDialog() {
    const [state, formAction] = useFormState(createOfferingCourse, {
        error: false,
        message: "",
    });

    if (state.message) {
        toast(state.message)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add Offering Course</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Offering Course</DialogTitle>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <Label htmlFor="courseID">Course ID</Label>
                            <Input name="courseID" required />
                        </div>
                        <div>
                            <Label htmlFor="instructorID">Instructor ID</Label>
                            <Input name="instructorID" required />
                        </div>
                        <div>
                            <Label htmlFor="price">Price</Label>
                            <Input name="price" type="number" step="0.01" required />
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
            {pending ? "Creating..." : "Create"}
        </Button>
    );
}
