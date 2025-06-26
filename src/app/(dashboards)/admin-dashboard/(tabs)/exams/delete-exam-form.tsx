"use client";
import React from "react";
import { deleteExam } from "@/actions/exams";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function DeleteExamForm({ examId }: { examId: string }) {
    const [state, formAction] = useFormState(deleteExam, {
        error: false,
        message: "",
    });

    if (state.message) {
        toast(state.message)
    }

    return (
        <form action={formAction}>
            <input type="hidden" name="examId" value={examId} />
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
