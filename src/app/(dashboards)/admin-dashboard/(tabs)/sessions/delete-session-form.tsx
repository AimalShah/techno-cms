"use client";
import React from "react";
import { deleteSession } from "@/actions/sessions";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function DeleteSessionForm({ sessionId }: { sessionId: string }) {
    const [state, formAction] = useFormState(deleteSession, {
        error: false,
        message: "",
    });

    if (state.message) {
        toast(state.message)
    }

    return (
        <form action={formAction}>
            <input type="hidden" name="sessionId" value={sessionId} />
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
