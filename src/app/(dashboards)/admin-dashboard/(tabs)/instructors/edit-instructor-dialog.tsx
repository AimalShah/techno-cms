"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateInstructor } from "@/actions/instructors";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Instructor } from "@/db/schema/instructors.schema";

export function EditInstructorDialog({ instructor }: { instructor: Instructor }) {
    const [state, formAction] = useFormState(updateInstructor, {
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
                    <DialogTitle>Edit Instructor</DialogTitle>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    <input type="hidden" name="instructorID" value={instructor.instructorID} />
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input name="firstName" defaultValue={instructor.firstName} required />
                        </div>
                        <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input name="lastName" defaultValue={instructor.lastName} required />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input name="email" type="email" defaultValue={instructor.email} required />
                        </div>
                        <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input name="phone" defaultValue={instructor.phone} required />
                        </div>
                        <div>
                            <Label htmlFor="address">Address</Label>
                            <Input name="address" defaultValue={instructor.address} required />
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
