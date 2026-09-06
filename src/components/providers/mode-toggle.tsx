"use client"

import { useSyncExternalStore } from "react"
import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

const noopSubscribe = () => () => {}

export function ModeToggle() {
  // 서버/최초 하이드레이션에서는 false, 클라이언트 마운트 후 true (effect의 setState 없이)
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false)
  const { resolvedTheme, setTheme } = useTheme()

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="다크 모드 켜기/끄기"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative inline-flex h-8 w-14 shrink-0 items-center rounded-full border border-border bg-secondary/60 transition-colors hover:bg-secondary"
    >
      <motion.span
        className="flex h-6 w-6 items-center justify-center rounded-full bg-background shadow-sm"
        initial={false}
        animate={{ x: isDark ? 26 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 text-foreground" />
        ) : (
          <Sun className="h-3.5 w-3.5 text-accent-foreground" />
        )}
      </motion.span>
    </button>
  )
}
