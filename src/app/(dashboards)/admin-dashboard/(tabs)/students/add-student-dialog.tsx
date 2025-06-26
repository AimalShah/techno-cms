"use client";
import React, { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createStudent } from "@/actions/students";
import { toast } from "sonner";

export function AddStudentDialog() {
    const [state, action, pending] = useActionState(createStudent , undefined);

    if(state?.message){
        toast.success(state.message)
    } 

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add Student</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Student</DialogTitle>
                </DialogHeader>
                <form action={action} className="space-y-4">
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
                            <Label htmlFor="rollNumber">Roll Number</Label>
                            <Input name="rollNumber" required />
                        </div>
                        <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input name="phone" required />
                        </div>
                        <div>
                            <Label htmlFor="address">Address</Label>
                            <Input name="address" required />
                        </div>
                        <div>
                            <Label htmlFor="dateOfBirth">Date of Birth</Label>
                            <Input name="dateOfBirth" type="date" required />
                        </div>
                    </div>
                    <DialogFooter>
                        <SubmitButton  pending={pending}/>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function SubmitButton({pending} : {pending : boolean;}) {
    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Creating..." : "Create"}
        </Button>
    );
}
