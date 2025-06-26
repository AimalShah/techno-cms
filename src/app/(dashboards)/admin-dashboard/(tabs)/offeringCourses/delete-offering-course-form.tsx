"use client";
import React from "react";
import { deleteOfferingCourse } from "@/actions/offeringCourses";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function DeleteOfferingCourseForm({ offeringId }: { offeringId: string }) {
    const [state, formAction] = useFormState(deleteOfferingCourse, {
        error: false,
        message: "",
    });

    if (state.message) {
        toast(state.message)
    }

    return (
        <form action={formAction}>
            <input type="hidden" name="offeringId" value={offeringId} />
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
