"use client";

import React, { useEffect, useState } from "react";
import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAllStudents, createStudent, updateStudent, deleteStudent } from "@/actions/students";

interface Student {
  studentID: string;
  firstName: string;
  lastName: string;
  email: string;
  rollNumber: string;
  phone: string;
  address: string;
  dateOfBirth: string;
}

export default function Page() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [form, setForm] = useState<Partial<Student>>({});
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    const data = await getAllStudents();
    setStudents(data);
    setLoading(false);
  };

  const columns = [
    { accessorKey: "firstName", header: "First Name" },
    { accessorKey: "lastName", header: "Last Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "rollNumber", header: "Roll Number" },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "address", header: "Address" },
    { accessorKey: "dateOfBirth", header: "Date of Birth" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: any) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => handleEdit(row.original)}>Edit</Button>
          <Button size="sm" variant="destructive" onClick={() => handleDelete(row.original.studentID)}>Delete</Button>
        </div>
      ),
    },
  ];

  const handleOpen = () => {
    setForm({});
    setEditStudent(null);
    setError(null);
    setOpen(true);
  };

  const handleEdit = (student: Student) => {
    setForm(student);
    setEditStudent(student);
    setError(null);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    setPending(true);
    await deleteStudent(id);
    await fetchStudents();
    setPending(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      if (editStudent) {
        await updateStudent(editStudent.studentID, form as any);
      } else {
        const res = await createStudent(form as any);
        if (!res?.message?.includes("success")) {
          setError(res?.message || "Failed to create student");
          setPending(false);
          return;
        }
      }
      await fetchStudents();
      setOpen(false);
    } catch (err: any) {
      setError("Error saving student");
    }
    setPending(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Students Management</h1>
        <Button onClick={handleOpen}>Add Student</Button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <DataTable columns={columns} data={students} searchBy="firstName" />
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editStudent ? "Edit Student" : "Add Student"}</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input name="firstName" value={form.firstName || ""} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input name="lastName" value={form.lastName || ""} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input name="email" type="email" value={form.email || ""} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="rollNumber">Roll Number</Label>
                <Input name="rollNumber" value={form.rollNumber || ""} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input name="phone" value={form.phone || ""} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input name="address" value={form.address || ""} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input name="dateOfBirth" type="date" value={form.dateOfBirth || ""} onChange={handleChange} required />
              </div>
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={pending}>Cancel</Button>
              <Button type="submit" disabled={pending}>{pending ? "Saving..." : editStudent ? "Update" : "Create"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}