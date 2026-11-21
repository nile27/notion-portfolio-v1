"use client"

import { useState, useEffect, useRef } from "react"
import { portfolioData } from "@/data/data"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"

const NotionModal = dynamic(() => import("./notion-modal").then(mod => mod.NotionModal), {
  ssr: false,
})
import { ProjectCarousel } from "./project-carousel"

export function ProjectSection() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>("All")
  // 사이트 안에서 카드를 눌러 연 경우에만 history에 모달 항목이 쌓여 있다.
  // 공유 링크(/#project-id)로 바로 들어온 경우엔 뒤로가기가 사이트 밖으로 나가므로 구분한다.
  const openedInAppRef = useRef(false)

  const categories = [
    { id: "All", label: "전체" },
    { id: "NestJS", label: "NestJS" },
    { id: "Next.js", label: "Next.js" },
    { id: "React", label: "React" },
    { id: "React Native", label: "React Native" },
    { id: "C#", label: "C#" },
    { id: "Python", label: "Python" },
    { id: "Express.js", label: "Express.js" },
    { id: "JavaScript", label: "JavaScript" },
  ]

  const projectCounts = categories.reduce<Record<string, number>>((acc, category) => {
    acc[category.id] = category.id === "All"
      ? portfolioData.projects.length
      : portfolioData.projects.filter((p) => p.categories?.includes(category.id)).length
    return acc
  }, {})

  // URL 해시 변경 감지하여 모달 열기/닫기
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash.startsWith("#project-")) {
        const id = hash.replace("#project-", "")
        setSelectedProjectId(id)
      } else {
        // 브라우저 뒤로가기 등 어떤 경로로 닫혀도 다음 모달에 영향이 없도록 초기화
        openedInAppRef.current = false
        setSelectedProjectId(null)
      }
    }

    handleHashChange()
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  const handleOpenModal = (id: string) => {
    openedInAppRef.current = true
    window.location.hash = `project-${id}`
  }

  const handleCloseModal = () => {
    if (!window.location.hash.startsWith("#project-")) return
    if (openedInAppRef.current) {
      window.history.back()
      return
    }
    // 공유 링크로 바로 들어온 경우: 뒤로가면 사이트를 벗어나므로 현재 항목의 해시만 제거
    window.history.replaceState(null, "", window.location.pathname + window.location.search)
    setSelectedProjectId(null)
  }

  return (
    <section id="projects" className="container mx-auto max-w-7xl px-4 scroll-mt-20">
      <h2 className="section-heading">Projects</h2>

      {/* 기술 스택 카테고리 필터 바 */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mt-8 md:mt-10 px-4 max-w-5xl mx-auto py-2">
        {categories.map((category) => {
          const isActive = activeCategory === category.id
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`relative shrink-0 whitespace-nowrap px-3 md:px-4 py-1.5 md:py-2 text-[11px] sm:text-xs md:text-sm font-semibold rounded-full transition-all duration-300 border border-border/40 select-none ${
                isActive
                  ? "text-background border-transparent"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategoryTab"
                  className="absolute inset-0 bg-foreground rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {category.label}
              <span className={isActive ? "ml-1 opacity-70" : "ml-1 opacity-50"}>
                {projectCounts[category.id]}
              </span>
            </button>
          )
        })}
      </div>

      {/* 캐러셀 버전을 메인으로 사용 */}
      <ProjectCarousel onProjectClick={handleOpenModal} activeCategory={activeCategory} />

      <NotionModal
        isOpen={!!selectedProjectId}
        onClose={handleCloseModal}
        notionId={selectedProjectId}
      />

    </section>
  )
}
