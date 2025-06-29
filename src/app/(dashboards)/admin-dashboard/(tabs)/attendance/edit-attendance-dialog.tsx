"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateAttendance } from "@/actions/attendance";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Attendance } from "@/db/schema/attendance.schema";

export function EditAttendanceDialog({ attendance }: { attendance: Attendance }) {
    const [state, formAction] = useFormState(updateAttendance, {
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
                    <DialogTitle>Edit Attendance</DialogTitle>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    <input type="hidden" name="attendanceId" value={attendance.attendanceId} />
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <Label htmlFor="enrollmentId">Enrollment ID</Label>
                            <Input name="enrollmentId" defaultValue={attendance.enrollmentId} required />
                        </div>
                        <div>
                            <Label htmlFor="date">Date</Label>
                            <Input name="date" type="date" defaultValue={attendance.date.toISOString().split('T')[0]} required />
                        </div>
                        <div>
                            <Label htmlFor="status">Status</Label>
                            <Input name="status" defaultValue={attendance.status} required />
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
