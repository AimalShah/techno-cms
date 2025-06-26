"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateTest } from "@/actions/tests";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Test } from "@/db/schema/tests.schema";

export function EditTestDialog({ test }: { test: Test }) {
    const [state, formAction] = useFormState(updateTest, {
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
                    <DialogTitle>Edit Test</DialogTitle>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    <input type="hidden" name="testId" value={test.testId} />
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input name="title" defaultValue={test.title} required />
                        </div>
                        <div>
                            <Label htmlFor="date">Date</Label>
                            <Input name="date" type="datetime-local" defaultValue={test.date.toISOString().slice(0, 16)} required />
                        </div>
                        <div>
                            <Label htmlFor="totalMarks">Total Marks</Label>
                            <Input name="totalMarks" type="number" step="0.01" defaultValue={test.totalMarks} required />
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
