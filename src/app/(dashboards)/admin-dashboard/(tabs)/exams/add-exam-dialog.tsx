"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createExam } from "@/actions/exams";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

export function AddExamDialog() {
    const [state, formAction] = useFormState(createExam, {
        error: false,
        message: "",
    });

    if (state.message) {
        toast(state.message)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add Exam</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Exam</DialogTitle>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input name="title" required />
                        </div>
                        <div>
                            <Label htmlFor="date">Date</Label>
                            <Input name="date" type="date" required />
                        </div>
                        <div>
                            <Label htmlFor="totalMarks">Total Marks</Label>
                            <Input name="totalMarks" type="number" step="0.01" required />
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
