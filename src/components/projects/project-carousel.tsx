"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProjectCard } from "./project-card"
import { portfolioData } from "@/data/data"

interface ProjectCarouselProps {
  onProjectClick: (id: string) => void
  activeCategory: string
}

export function ProjectCarousel({ onProjectClick, activeCategory }: ProjectCarouselProps) {
  const [index, setIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [windowWidth, setWindowWidth] = useState(1200) // 기본값 설정

  const projects = portfolioData.projects.filter(project => {
    if (activeCategory === "All") return true
    return project.categories?.includes(activeCategory)
  })

  // 카테고리 변경 시 인덱스 리셋
  useEffect(() => {
    setIndex(0)
  }, [activeCategory])

  // 클라이언트 마운트 완료 및 화면 크기 변화 감지
  useEffect(() => {
    setMounted(true)
    setWindowWidth(window.innerWidth)

    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const next = () => {
    if (projects.length === 0) return
    setIndex((prev) => (prev + 1) % projects.length)
  }

  const prev = () => {
    if (projects.length === 0) return
    setIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  // 마운트 전에는 서버와 동일한 초기 상태를 유지하거나 렌더링을 지연시킵니다.
  if (!mounted) return <div className="h-[600px]" />;

  if (projects.length === 0) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center text-muted-foreground font-semibold">
        해당 기술 스택의 프로젝트가 아직 없습니다.
      </div>
    )
  }

  // 반응형 수치 계산
  const isMobile = windowWidth < 768
  const isTablet = windowWidth >= 768 && windowWidth < 1024

  const cardWidth = isMobile ? 300 : isTablet ? 360 : 420
  const cardSpacing = isMobile ? 240 : isTablet ? 300 : 340

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-8 md:py-20 group/carousel overflow-hidden">
      <div className="flex flex-col items-center">
        {/* Carousel Viewport: 모바일 높이를 600px로 확장하여 겹침 방지 */}
        <div className="relative w-full flex justify-center items-center h-[600px] md:h-[550px]">
          <div className="flex items-center justify-center relative w-full overflow-visible">
            {projects.map((project, i) => {
              let offset = i - index
              if (offset > projects.length / 2) offset -= projects.length
              if (offset < -projects.length / 2) offset += projects.length

              const isActive = offset === 0
              const isVisible = isMobile ? Math.abs(offset) === 0 : Math.abs(offset) <= 1

              return (
                <motion.div
                  key={i}
                  initial={false}
                  animate={{
                    x: offset * cardSpacing,
                    scale: isActive ? 1 : 0.85,
                    opacity: isActive ? 1 : isVisible ? 0.3 : 0,
                    zIndex: isActive ? 20 : 10,
                    filter: isActive ? "none" : "blur(4px)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25
                  }}
                  className="absolute px-2"
                  style={{
                    width: cardWidth,
                    pointerEvents: isActive ? "auto" : "none"
                  }}
                >
                  <ProjectCard
                    project={project}
                    onClick={() => onProjectClick(project.notionId)}
                    className={isActive
                      ? "shadow-2xl ring-1 ring-border dark:shadow-[0_0_40px_rgba(255,255,255,0.08)] dark:ring-white/10"
                      : "shadow-md grayscale-[0.2] dark:shadow-none dark:border dark:border-border/30"}
                    priority={i <= 2 || i === projects.length - 1}
                  />
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Controls & Pagination */}
        {projects.length > 1 && (
          <div className="flex items-center gap-4 md:gap-8 mt-8 md:mt-12 z-20">
            <button
              onClick={prev}
              className="p-2.5 md:p-3 rounded-full bg-background border border-border shadow-sm hover:bg-accent hover:scale-105 transition-all active:scale-95"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            <div className="flex flex-col items-center gap-1 min-w-[60px] md:min-w-[80px]">
              <span className="text-lg md:text-xl font-bold tracking-tighter">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="w-6 md:w-8 h-0.5 bg-accent/30 relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute inset-0 bg-accent-foreground"
                  initial={false}
                  animate={{ x: `${(index / (projects.length - 1)) * 100 - 100}%` }}
                />
              </div>
              <span className="text-[8px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-50">
                Total {projects.length}
              </span>
            </div>

            <button
              onClick={next}
              className="p-2.5 md:p-3 rounded-full bg-background border border-border shadow-sm hover:bg-accent hover:scale-105 transition-all active:scale-95"
              aria-label="Next project"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        )}
      </div>

      {/* 배경 장식 */}
      <div className="absolute top-1/2 left-0 w-48 md:w-96 h-48 md:h-96 bg-accent/5 rounded-full blur-[80px] md:blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-48 md:w-96 h-48 md:h-96 bg-accent/5 rounded-full blur-[80px] md:blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
    </div>
  )
}
