"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { portfolioData } from "@/data/data"
import { ModeToggle } from "@/components/providers/mode-toggle"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "About", href: "/#about" },
  { name: "Career", href: "/#career" },
  { name: "Projects", href: "/#projects" },
  { name: "Activity", href: "/#activity" },
  { name: "Contact", href: "/#contact" },
]

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("")

  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        const sectionIds = ["about", "career", "projects", "activity", "contact"]
        const scrollPosition = window.scrollY + 100 // 상단 여유분

        // 페이지 하단 도달 확인 (우선순위 1순위)
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
          setActiveSection("contact");
          return;
        }

        // 각 섹션의 위치를 확인하여 현재 위치와 가장 가까운 섹션 찾기
        let currentSection = "";
        for (const id of sectionIds) {
          const element = document.getElementById(id);
          if (element) {
            const offsetTop = element.offsetTop;
            if (scrollPosition >= offsetTop) {
              currentSection = id;
            }
          }
        }

        if (currentSection) {
          setActiveSection(currentSection);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // 초기 실행

    return () => window.removeEventListener("scroll", handleScroll);
  }, [])

  const handleContactClick = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", "/#contact");
      setActiveSection("contact");
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("/#", "");
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", href);
      setActiveSection(targetId);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <span className="inline-block font-bold text-lg tracking-tight">Mingyu's Portfolio</span>
            </Link>
            <nav className="hidden md:flex gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-colors hover:text-accent-foreground hover:bg-accent rounded-md",
                    activeSection === item.href.split('#')[1]
                      ? "text-accent-foreground bg-accent"
                      : "text-muted-foreground"
                  )}
                >
                  {item.name}
                  {activeSection === item.href.split('#')[1] && (
                    <span className="absolute inset-x-0 -bottom-px h-0.5 bg-accent-foreground" />
                  )}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <button
              onClick={handleContactClick}
              className="hidden sm:inline-flex h-9 items-center justify-center rounded-full bg-foreground px-5 text-sm font-bold text-background shadow-lg transition-all hover:scale-105 hover:bg-foreground/90 active:scale-95"
            >
              Contact
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
