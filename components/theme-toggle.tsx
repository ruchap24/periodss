'use client'

import { Moon, Sun, Sparkles } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="opacity-0">
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark')
    else if (theme === 'dark') setTheme('system')
    else setTheme('light')
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={cycleTheme}
            className="rounded-full transition-all duration-300 hover:bg-pink-100/50 dark:hover:bg-purple-800/50"
          >
            {theme === 'light' && <Sun className="h-5 w-5 text-pink-600 hover:text-pink-700" />}
            {theme === 'dark' && <Moon className="h-5 w-5 text-purple-300 hover:text-purple-100" />}
            {theme === 'system' && <Sparkles className="h-5 w-5 text-amber-500 hover:text-amber-400" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle theme: {theme}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}