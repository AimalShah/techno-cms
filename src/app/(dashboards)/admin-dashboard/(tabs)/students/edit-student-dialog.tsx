"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateStudent } from "@/actions/students";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Student } from "@/db/schema/students.schema";

export function EditStudentDialog({ student }: { student: Student }) {
    const [state, formAction] = useFormState(updateStudent, {
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
                    <DialogTitle>Edit Student</DialogTitle>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    <input type="hidden" name="studentId" value={student.studentID} />
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input name="firstName" defaultValue={student.firstName} required />
                        </div>
                        <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input name="lastName" defaultValue={student.lastName} required />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input name="email" type="email" defaultValue={student.email} required />
                        </div>
                        <div>
                            <Label htmlFor="rollNumber">Roll Number</Label>
                            <Input name="rollNumber" defaultValue={student.rollNumber} required />
                        </div>
                        <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input name="phone" defaultValue={student.phone} required />
                        </div>
                        <div>
                            <Label htmlFor="address">Address</Label>
                            <Input name="address" defaultValue={student.address} required />
                        </div>
                        <div>
                            <Label htmlFor="dateOfBirth">Date of Birth</Label>
                            <Input name="dateOfBirth" type="date" defaultValue={student.dateOfBirth} required />
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
