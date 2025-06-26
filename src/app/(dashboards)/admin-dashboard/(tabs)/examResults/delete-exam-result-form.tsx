"use client";
import React from "react";
import { deleteExamResult } from "@/actions/examResults";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function DeleteExamResultForm({ examResultId }: { examResultId: string }) {
    const [state, formAction] = useFormState(deleteExamResult, {
        error: false,
        message: "",
    });

    if (state.message) {
        toast(state.message)
    }

    return (
        <form action={formAction}>
            <input type="hidden" name="examResultId" value={examResultId} />
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
