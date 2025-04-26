'use client'

import { signup } from "@/actions/auth"
import { useActionState } from "react"

export default function SignupForm() {
    const [state, action, pending] = useActionState(signup, undefined);

    return (
        <form action={action} className="p-4">
            <div className="flex flex-col">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" placeholder="name" className="border p-2" />
            </div>
            {state?.errors?.name && <p className="text-red-500">{state.errors.name}</p>}
            <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" placeholder="email" className="border p-2" />
            </div>
            {state?.errors?.email && <p className="text-red-500">{state.errors.email}</p>}
            <div className="flex flex-col">
                <label htmlFor="password">Password</label>
                <input type="text" name="password" id="password" placeholder="password" className="border p-2" />
            </div>
            {state?.errors?.password && (
                <div className="border mt-2 p-2 text-sm bg-rose-400/90">
                    <p>Password must:</p>
                    <ul>
                        {state.errors.password.map((error : any) => (
                            <li key={error}>- {error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <button type="submit" className="border p-4 mt-4">Sign Up</button><br />
            {state?.error && <p className="border mt-2 bg-red-400/90">{state.message}</p>}
            {state?.success && <p className="border mt-2 bg-green-400/90">{state.message}</p>}
        </form>
    )
}