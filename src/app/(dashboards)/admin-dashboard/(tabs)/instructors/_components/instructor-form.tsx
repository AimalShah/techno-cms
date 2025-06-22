"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserPlus } from "lucide-react"
import { createInstructor } from "@/actions/instructors"

export default function InstructorForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const form = e.currentTarget as HTMLFormElement;
        const data = new FormData(form);
        const result = await createInstructor(data);
        if (result?.message) {
            alert(result.message);
        }
        setFormData({ firstName: "", lastName: "", email: "", phone: "", address: "" })
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    return (
        <div className="w-full">
            <Card className="p-0 pb-4">
                <CardHeader className="bg-blue-600 text-white rounded-t-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <UserPlus className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Create New Instructor</CardTitle>
                    <CardDescription className="text-blue-100">
                      Add a new instructor to the system
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    placeholder="Enter first name"
                                    value={formData.firstName}
                                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    placeholder="Enter last name"
                                    value={formData.lastName}
                                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="instructor@example.com"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    placeholder="Enter phone number"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange("phone", e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    name="address"
                                    type="text"
                                    placeholder="Enter address"
                                    value={formData.address}
                                    onChange={(e) => handleInputChange("address", e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" className="flex-1">
                                <UserPlus className="h-4 w-4 mr-2" />
                                Create Instructor
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setFormData({ firstName: "", lastName: "", email: "", phone: "", address: "" })}
                            >
                                Clear Form
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
