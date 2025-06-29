"use client";
import React, { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCourse } from "@/actions/courses";

import { toast } from "sonner";

export function AddCourseDialog() {
    const [state, formAction] = useActionState(createCourse, {
        error: false,
        message: "",
    });

    if (state.message) {
        toast(state.message)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add Course</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Course</DialogTitle>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <Label htmlFor="courseName">Course Name</Label>
                            <Input name="courseName" required />
                        </div>
                        <div>
                            <Label htmlFor="duration">Duration</Label>
                            <Input name="duration" type="number" required />
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
