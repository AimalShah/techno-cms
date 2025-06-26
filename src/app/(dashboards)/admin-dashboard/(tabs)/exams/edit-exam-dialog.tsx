"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateExam } from "@/actions/exams";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Exam } from "@/db/schema/exams.schema";

export function EditExamDialog({ exam }: { exam: Exam }) {
    const [state, formAction] = useFormState(updateExam, {
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
                    <DialogTitle>Edit Exam</DialogTitle>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    <input type="hidden" name="examId" value={exam.examId} />
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input name="title" defaultValue={exam.title} required />
                        </div>
                        <div>
                            <Label htmlFor="date">Date</Label>
                            <Input name="date" type="date" defaultValue={exam.date.toISOString().split('T')[0]} required />
                        </div>
                        <div>
                            <Label htmlFor="totalMarks">Total Marks</Label>
                            <Input name="totalMarks" type="number" step="0.01" defaultValue={exam.totalMarks} required />
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
