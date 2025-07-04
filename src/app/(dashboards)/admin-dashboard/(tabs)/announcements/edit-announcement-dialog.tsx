"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateAnnouncement } from "@/actions/announcement";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Announcement } from "@/db/schema/announcements.schema";

export function EditAnnouncementDialog({ announcement }: { announcement: Announcement }) {
    const [state, formAction] = useFormState(updateAnnouncement, {
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
                    <DialogTitle>Edit Announcement</DialogTitle>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    <input type="hidden" name="announcementId" value={announcement.announcementId} />
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input name="title" defaultValue={announcement.title} required />
                        </div>
                        <div>
                            <Label htmlFor="content">Content</Label>
                            <Input name="content" defaultValue={announcement.content} required />
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
