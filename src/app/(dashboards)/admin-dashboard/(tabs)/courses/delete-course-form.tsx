"use client";
import React from "react";
import { deleteCourse } from "@/actions/courses";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function DeleteCourseForm({ courseId }: { courseId: string }) {
    const [state, formAction] = useFormState(deleteCourse, {
        error: false,
        message: "",
    });

    if (state.message) {
        toast(state.message)
    }

    return (
        <form action={formAction}>
            <input type="hidden" name="courseId" value={courseId} />
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
