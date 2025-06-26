"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createAttendance } from "@/actions/attendance";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

export function AddAttendanceDialog() {
    const [state, formAction] = useFormState(createAttendance, {
        error: false,
        message: "",
    });

    if (state.message) {
        toast(state.message)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add Attendance</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Attendance</DialogTitle>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <Label htmlFor="enrollmentId">Enrollment ID</Label>
                            <Input name="enrollmentId" required />
                        </div>
                        <div>
                            <Label htmlFor="date">Date</Label>
                            <Input name="date" type="date" required />
                        </div>
                        <div>
                            <Label htmlFor="status">Status</Label>
                            <Input name="status" required />
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
