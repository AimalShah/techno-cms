"use client"


import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { useActionState } from "react"
import { login } from "@/actions/auth"


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [state, action, pending] = useActionState(login, undefined);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              {state?.errors?.email && <p className="text-red-500 text-xs">{state.errors.email}</p>}
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" name="password" required />
              </div>
              {state?.errors?.password && <p className="text-red-500">{state.errors.password}</p>}
              <div className="flex flex-col gap-3">
                {
                  !pending ?
                    <Button type="submit" className="w-full">
                      Login
                    </Button> :
                    <Button disabled>
                      Loading...
                    </Button>
                }
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      {state?.error &&(
         <Alert variant="destructive">
         <AlertCircle className="h-4 w-4" />
         <AlertTitle>Error</AlertTitle>
         <AlertDescription>
            {state.message}
         </AlertDescription>
       </Alert>
      )}
    </div>
  )
}
