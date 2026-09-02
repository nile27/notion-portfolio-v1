"use client"

import { useState } from "react"
import { Mail, Link as LinkIcon } from "lucide-react"
import { portfolioData } from "@/data/data"
import { cn } from "@/lib/utils"
import { Section } from "@/components/layout/section"

export function ContactSection() {
  const [showToast, setShowToast] = useState(false)

  const handleCopyEmail = () => {
    // 1. 이메일 주소 복사
    navigator.clipboard.writeText(portfolioData.about.email);

    // 2. 토스트 알림 표시
    setShowToast(true);

    // 3. 3초 후 토스트 제거
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <>
      <Section id="contact" className="container mx-auto max-w-7xl px-4 scroll-mt-20">
        <h2 className="section-heading">Contact</h2>

        <div className="grid gap-12 md:grid-cols-2 items-start mt-12">
          <div className="space-y-6">
            <p className="text-xl text-muted-foreground leading-relaxed">
              제 포트폴리오를 봐주셔서 감사합니다. <br />
              함께 성장할 수 있는 기회를 기다리고 있습니다. <br />
              언제든 편하게 연락해 주세요!
            </p>
          </div>

          <div className="grid gap-6">
            {/* Email - Click to Copy */}
            <div
              onClick={handleCopyEmail}
              className="group flex items-center gap-6 p-6 rounded-3xl bg-secondary/20 shadow-tinted transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent cursor-pointer"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent-foreground/10 text-accent-foreground transition-colors">
                <Mail className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest group-hover:text-accent-foreground/70 transition-colors">Email</p>
                <span className="text-xl font-bold transition-colors group-hover:text-accent-foreground">
                  {portfolioData.about.email}
                </span>
              </div>
            </div>

            {/* GitHub */}
            <a
              href={portfolioData.about.github}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-6 p-6 rounded-3xl bg-secondary/20 shadow-tinted transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent-foreground/10 text-accent-foreground transition-colors">
                <LinkIcon className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest group-hover:text-accent-foreground/70 transition-colors">GitHub</p>
                <span className="text-xl font-bold transition-colors group-hover:text-accent-foreground">
                  github.com/nile27
                </span>
              </div>
            </a>
          </div>
        </div>
      </Section>

      {/* 커스텀 토스트 알림 */}
      <div className={cn(
        "fixed bottom-10 left-1/2 -translate-x-1/2 z-[60] transition-all duration-500 w-max pointer-events-none",
        showToast ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      )}>
        <div className="bg-foreground text-background px-6 py-3 rounded-2xl shadow-2xl font-bold text-sm flex items-center gap-3 border border-white/10 backdrop-blur-xl whitespace-nowrap">
          <div className="bg-primary/20 p-1 rounded-full text-xs text-primary font-bold">
            📋
          </div>
          <span>이메일 주소가 복사되었습니다!</span>
        </div>
      </div>
    </>
  )
}
