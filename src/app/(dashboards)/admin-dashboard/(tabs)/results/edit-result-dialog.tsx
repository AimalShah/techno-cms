"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateResult } from "@/actions/results";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Result } from "@/db/schema/results.schema";

export function EditResultDialog({ result }: { result: Result }) {
    const [state, formAction] = useFormState(updateResult, {
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
                    <DialogTitle>Edit Result</DialogTitle>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    <input type="hidden" name="resultId" value={result.resultId} />
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <Label htmlFor="enrollmentId">Enrollment ID</Label>
                            <Input name="enrollmentId" defaultValue={result.enrollmentId} required />
                        </div>
                        <div>
                            <Label htmlFor="marksObtained">Marks Obtained</Label>
                            <Input name="marksObtained" type="number" step="0.01" defaultValue={result.marksObtained} required />
                        </div>
                        <div>
                            <Label htmlFor="totalMarks">Total Marks</Label>
                            <Input name="totalMarks" type="number" step="0.01" defaultValue={result.totalMarks} required />
                        </div>
                        <div>
                            <Label htmlFor="grade">Grade</Label>
                            <Input name="grade" defaultValue={result.grade} required />
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
