"use client"

import { useState, useSyncExternalStore } from "react"
import { motion, PanInfo } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProjectCard } from "./project-card"
import { portfolioData } from "@/data/data"

interface ProjectCarouselProps {
  onProjectClick: (id: string) => void
  activeCategory: string
}

// 리사이즈 이벤트를 effect의 setState 없이 구독하기 위한 외부 스토어 (SSR 안전)
function subscribeToResize(callback: () => void) {
  window.addEventListener("resize", callback)
  return () => window.removeEventListener("resize", callback)
}
const getWindowWidth = () => window.innerWidth
const getServerWindowWidth = () => 1200 // 서버/최초 하이드레이션 기본값

export function ProjectCarousel({ onProjectClick, activeCategory }: ProjectCarouselProps) {
  const [page, setPage] = useState(0)
  const windowWidth = useSyncExternalStore(subscribeToResize, getWindowWidth, getServerWindowWidth)

  const projects = portfolioData.projects.filter(project => {
    if (activeCategory === "All") return true
    return project.categories?.includes(activeCategory)
  })

  // 반응형 수치 계산
  const isMobile = windowWidth < 768
  const isTablet = windowWidth >= 768 && windowWidth < 1024
  const itemsPerPage = isMobile ? 1 : isTablet ? 2 : 3

  const pageCount = Math.max(1, Math.ceil(projects.length / itemsPerPage))

  // 카테고리 변경 또는 화면 크기(itemsPerPage) 변경 시 페이지 리셋
  // (렌더 중 상태 조정: effect 대신 React 권장 패턴 사용)
  const resetKey = `${activeCategory}-${itemsPerPage}`
  const [prevResetKey, setPrevResetKey] = useState(resetKey)
  if (prevResetKey !== resetKey) {
    setPrevResetKey(resetKey)
    setPage(0)
  }

  const next = () => setPage((p) => (p + 1) % pageCount)
  const prev = () => setPage((p) => (p - 1 + pageCount) % pageCount)

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 60
    if (info.offset.x < -threshold) next()
    else if (info.offset.x > threshold) prev()
  }

  if (projects.length === 0) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center text-muted-foreground font-semibold">
        해당 기술 스택의 프로젝트가 아직 없습니다.
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 py-4 md:py-10 group/carousel overflow-hidden">
      <div className="flex flex-col items-center">
        {/* Controls & Pagination */}
        {pageCount > 1 && (
          <div className="flex items-center gap-4 md:gap-8 mb-6 md:mb-8 z-20">
            <button
              onClick={prev}
              className="p-2.5 md:p-3 rounded-full bg-transparent hover:bg-accent hover:scale-105 transition-all active:scale-95"
              aria-label="Previous projects"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: pageCount }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  aria-label={`Go to page ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === page ? "w-6 bg-foreground" : "w-1.5 bg-foreground/25 hover:bg-foreground/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2.5 md:p-3 rounded-full bg-transparent hover:bg-accent hover:scale-105 transition-all active:scale-95"
              aria-label="Next projects"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        )}

        {/* Swiper Viewport */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={handleDragEnd}
            animate={{ x: `-${page * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
          >
            {projects.map((project, i) => (
              <div
                key={i}
                className="shrink-0 px-2 md:px-3 py-2"
                style={{ width: `${100 / itemsPerPage}%` }}
              >
                <ProjectCard
                  project={project}
                  onClick={() => onProjectClick(project.notionId)}
                  className="h-full shadow-md dark:border dark:border-white/15 dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
                  priority={i < itemsPerPage}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 배경 장식 */}
      <div className="absolute top-1/2 left-0 w-48 md:w-96 h-48 md:h-96 bg-accent/5 rounded-full blur-[80px] md:blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-48 md:w-96 h-48 md:h-96 bg-accent/5 rounded-full blur-[80px] md:blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
    </div>
  )
}
