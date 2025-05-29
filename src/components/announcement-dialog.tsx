"use client"


import { DialogTitle } from "@radix-ui/react-dialog"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import React, { useActionState } from "react"
import { MessageSquare } from "lucide-react"
import { createAnnouncement } from "@/actions/announcement"
import { stat } from "fs"




export default function AnnouncementDialog() {
    const [onOpenChange , setOnOpenChange] = React.useState<boolean>(true);
    const [state , action, pending] = useActionState(createAnnouncement , undefined);

    return (
        <Dialog onOpenChange={() => onOpenChange}>
            <DialogTrigger>
                <Button className="cursor-pointer">
                    <MessageSquare/>
                    New Announcement
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Create Announcement</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" action={action}>
                    <div className="space-y-2">
                        <Label htmlFor="title">Tilte</Label>
                        <Input
                            id="title"
                            placeholder="Announcement Title"
                            name="title"
                        />
                        {state?.errors?.title && <p className="text-red-500 text-xs">{state?.errors?.title}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                            id="content"
                            placeholder="Write your announcement content here..."
                            className={`min-h-[150px`}
                            name="content"
                        />
                        {state?.errors?.title && <p className="text-red-500 text-xs">{state?.errors?.title}</p>}
                    </div>

                    <DialogFooter>
                        {
                            !pending ? 
                            <Button type="submit" className="cursor-pointer">Create</Button>
                            : <Button disabled>Creating.....</Button>
                        }
                    </DialogFooter>
                    {state?.success && <p className="text-green-400">{state?.message}</p>}
                </form>
            </DialogContent>
        </Dialog>
    )
}