"use client";
import React, { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createInstructor } from "@/actions/instructors";

import { toast } from "sonner";

export function AddInstructorDialog() {
    const [state, formAction] = useActionState(createInstructor, {
        error: false,
        message: "",
    });

    if (state.message) {
        toast(state.message)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add Instructor</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Instructor</DialogTitle>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input name="firstName" required />
                        </div>
                        <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input name="lastName" required />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input name="email" type="email" required />
                        </div>
                        <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input name="phone" required />
                        </div>
                        <div>
                            <Label htmlFor="address">Address</Label>
                            <Input name="address" required />
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
