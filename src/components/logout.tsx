'use client'

import { logout } from "@/actions/auth"
import { Button } from "@/components/ui/button"

export default function Logout() {
  return (
    <div>
       <Button onClick={() => logout()} className="border p-3 cursor-pointer">Logout</Button>
    </div>
  )
}
