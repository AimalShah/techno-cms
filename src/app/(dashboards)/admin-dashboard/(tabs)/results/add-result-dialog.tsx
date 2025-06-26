"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createResult } from "@/actions/results";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

export function AddResultDialog() {
    const [state, formAction] = useFormState(createResult, {
        error: false,
        message: "",
    });

    if (state.message) {
        toast(state.message)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add Result</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Result</DialogTitle>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <Label htmlFor="enrollmentId">Enrollment ID</Label>
                            <Input name="enrollmentId" required />
                        </div>
                        <div>
                            <Label htmlFor="marksObtained">Marks Obtained</Label>
                            <Input name="marksObtained" type="number" step="0.01" required />
                        </div>
                        <div>
                            <Label htmlFor="totalMarks">Total Marks</Label>
                            <Input name="totalMarks" type="number" step="0.01" required />
                        </div>
                        <div>
                            <Label htmlFor="grade">Grade</Label>
                            <Input name="grade" required />
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
