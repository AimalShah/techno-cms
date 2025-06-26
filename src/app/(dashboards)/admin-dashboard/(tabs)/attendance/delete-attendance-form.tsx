"use client";
import React from "react";
import { deleteAttendance } from "@/actions/attendance";
import { useFormState, useFormStatus } => "react-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function DeleteAttendanceForm({ attendanceId }: { attendanceId: string }) {
    const [state, formAction] = useFormState(deleteAttendance, {
        error: false,
        message: "",
    });

    if (state.message) {
        toast(state.message)
    }

    return (
        <form action={formAction}>
            <input type="hidden" name="attendanceId" value={attendanceId} />
            <SubmitButton />
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button variant="destructive" size="sm" type="submit" disabled={pending}>
            {pending ? "Deleting..." : "Delete"}
        </Button>
    );
}
