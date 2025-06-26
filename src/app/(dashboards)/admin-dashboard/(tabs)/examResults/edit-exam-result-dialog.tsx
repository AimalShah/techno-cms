"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateExamResult } from "@/actions/examResults";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { ExamResult } from "@/db/schema/examResults.schema";

export function EditExamResultDialog({ examResult }: { examResult: ExamResult }) {
    const [state, formAction] = useFormState(updateExamResult, {
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
                    <DialogTitle>Edit Exam Result</DialogTitle>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    <input type="hidden" name="examResultId" value={examResult.examResultId} />
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <Label htmlFor="examId">Exam ID</Label>
                            <Input name="examId" defaultValue={examResult.examId} required />
                        </div>
                        <div>
                            <Label htmlFor="studentId">Student ID</Label>
                            <Input name="studentId" defaultValue={examResult.studentId} required />
                        </div>
                        <div>
                            <Label htmlFor="marksObtained">Marks Obtained</Label>
                            <Input name="marksObtained" type="number" step="0.01" defaultValue={examResult.marksObtained} required />
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
