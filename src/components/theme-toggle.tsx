"use client"

import { Moon, Sun } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
 
 

  const handleToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light")
  }



  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4" />
      <Switch
        id="theme-toggle"
        checked={resolvedTheme === "dark"}
        onCheckedChange={handleToggle}
      />
      <Moon className="h-4 w-4" />
    </div>
  )
}