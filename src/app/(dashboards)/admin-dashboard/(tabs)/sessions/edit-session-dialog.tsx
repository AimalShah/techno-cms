"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateSession } from "@/actions/sessions";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Session } from "@/db/schema/sessions.schema";

export function EditSessionDialog({ session }: { session: Session }) {
    const [state, formAction] = useFormState(updateSession, {
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
                    <DialogTitle>Edit Session</DialogTitle>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    <input type="hidden" name="sessionID" value={session.sessionID} />
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <Label htmlFor="userID">User ID</Label>
                            <Input name="userID" defaultValue={session.userID} required />
                        </div>
                        <div>
                            <Label htmlFor="expiresAt">Expires At</Label>
                            <Input name="expiresAt" type="datetime-local" defaultValue={session.expiresAt.toISOString().slice(0, 16)} required />
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
