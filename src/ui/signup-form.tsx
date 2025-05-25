"use client"

import type React from "react"

import { useActionState, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AtSign, Lock, User, CheckCircle2 } from "lucide-react"
import { signup } from "@/actions/auth"

export function SignupForm() {

    const [showPass, useShowPass] = useState<boolean>(false);
    const [state, action, pending] = useActionState(signup, undefined);

    return (
        <div className="w-full max-w-md">
            <Card className="border-none shadow-lg overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-teal-50/50 dark:from-purple-950/20 dark:to-teal-950/20 z-0"></div>
                <div className="relative z-10">
                    <CardHeader className="space-y-1 pb-6">
                        <div className="flex justify-center mb-2">
                            <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center">
                                <User className="h-8 w-8 text-white" />
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-bold text-center">Join Us Today</CardTitle>
                        <CardDescription className="text-center">Create your account to get started</CardDescription>
                    </CardHeader>
                    <form action={action}>
                        <CardContent className="space-y-6 pb-6">
                            <div className="space-y-2">
                                <Label htmlFor="username" className="text-sm font-medium">
                                    Username
                                </Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                                        <User className="h-4 w-4" />
                                    </div>
                                    <Input
                                        id="username"
                                        name="name"
                                        placeholder="johndoe"
                                        className="pl-10 bg-white/50 dark:bg-gray-950/50 border-gray-200 dark:border-gray-800 focus:border-purple-500 focus:ring-purple-500"
                                        required
                                    />
                                </div>
                                {state?.errors && <p className="text-xs text-red-500">{state.errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium">
                                    Email
                                </Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                                        <AtSign className="h-4 w-4" />
                                    </div>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        className="pl-10 bg-white/50 dark:bg-gray-950/50 border-gray-200 dark:border-gray-800 focus:border-purple-500 focus:ring-purple-500"
                                        required
                                    />
                                </div>
                                {state?.errors && <p className="text-xs text-red-500">{state.errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium">
                                    Password
                                </Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                                        <Lock className="h-4 w-4" />
                                    </div>
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPass ? "text" : "password"}
                                        className="pl-10 bg-white/50 dark:bg-gray-950/50 border-gray-200 dark:border-gray-800 focus:border-purple-500 focus:ring-purple-500"
                                        required
                                    />
                                </div>
                                <Button
                                    variant={"outline"} className="px-2"
                                    onClick={() => useShowPass(!showPass)}
                                >{showPass ? "Hide" : "Show"}</Button>
                                {state?.errors?.password && (
                                    <div className="text-xs border p-2 bg-red-500/90">
                                        <p>Password must:</p>
                                        <ul>
                                            {state.errors.password.map((error) => (
                                                <li key={error}>- {error}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3 pt-2">
                                <Label className="text-sm font-medium">Select Your Role</Label>
                                <RadioGroup defaultValue="admin" name="role" className="flex gap-4">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="admin" id="r1" className="" />
                                        <Label htmlFor="r1">Admin</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="student" id="r2" className="" />
                                        <Label htmlFor="r2">Student</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="instructor" id="r3" className="" />
                                        <Label htmlFor="r3">Instructor</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </CardContent>
                        <CardFooter className="pb-6">
                            {
                                !pending ?
                                    <Button
                                        type="submit"
                                        className="w-full py-6 text-base font-medium"
                                    >
                                        Create Account
                                    </Button> :
                                    <Button
                                        type="submit"
                                        className="w-full py-6 text-base font-medium"
                                        disabled
                                    >
                                        Loading...
                                    </Button>

                            }
                        </CardFooter>
                    </form>
                </div>
            </Card>
        </div>
    )
}
