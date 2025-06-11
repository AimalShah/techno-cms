"use client"
import { DialogTitle } from "@radix-ui/react-dialog"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import React, { useActionState, useEffect } from "react"
import { MessageSquare } from "lucide-react"
import { createAnnouncement } from "@/actions/announcement"

export default function AnnouncementDialog() {
    const [open, setOpen] = React.useState<boolean>(false);
    const [state, action, pending] = useActionState(createAnnouncement, undefined);

    useEffect(() => {
        if (state?.success) {
            setOpen(false);
        }
    }, [state?.success]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger 
                suppressHydrationWarning 
                className="flex gap-2 items-center cursor-pointer bg-primary text-primary-foreground rounded p-2 hover:bg-primary/90 transition-colors"
            >
                <MessageSquare className="h-4 w-4" />
                New Announcement
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Create Announcement</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" action={action}>
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            placeholder="Announcement Title"
                            name="title"
                            required
                        />
                        {state?.errors?.title && (
                            <p className="text-red-500 text-xs">{state.errors.title}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                            id="content"
                            placeholder="Write your announcement content here..."
                            className="min-h-[150px]"
                            name="content"
                            required
                        />
                        {state?.errors?.content && (
                            <p className="text-red-500 text-xs">{state.errors.content}</p>
                        )}
                    </div>
                    
                    {state?.error && (
                        <p className="text-red-500 text-sm">{state.error}</p>
                    )}
                    

                    {state?.success && (
                        <p className="text-green-600 text-sm">{state.message}</p>
                    )}

                    <DialogFooter>
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setOpen(false)}
                            disabled={pending}
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={pending}
                            className="cursor-pointer"
                        >
                            {pending ? "Creating..." : "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}