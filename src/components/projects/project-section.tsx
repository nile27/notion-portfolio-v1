"use client"

import { useState, useEffect } from "react"
import { portfolioData } from "@/data/data"
import { useQuery } from "@tanstack/react-query"
import dynamic from "next/dynamic"

const NotionModal = dynamic(() => import("./notion-modal").then(mod => mod.NotionModal), {
  ssr: false,
})
import { ProjectCarousel } from "./project-carousel"

export function ProjectSection() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

  // 백그라운드 프리페칭: 컴포넌트 마운트 시 모든 노션 데이터를 미리 가져와 캐싱
  const { data: allRecordMaps } = useQuery({
    queryKey: ["projects-data"],
    queryFn: async () => {
      const res = await fetch("/api/projects")
      if (!res.ok) throw new Error("Failed to fetch")
      return res.json()
    },
    staleTime: 60 * 60 * 1000, // 1시간 동안 신선함 유지
  })

  // URL 해시 변경 감지하여 모달 열기/닫기
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash.startsWith("#project-")) {
        const id = hash.replace("#project-", "")
        setSelectedProjectId(id)
      } else {
        setSelectedProjectId(null)
      }
    }

    handleHashChange()
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  const handleOpenModal = (id: string) => {
    window.location.hash = `project-${id}`
  }

  const handleCloseModal = () => {
    if (window.location.hash.startsWith("#project-")) {
      window.history.back()
    }
  }

  const selectedProjectData = portfolioData.projects.find(p => p.notionId === selectedProjectId)

  return (
    <section id="projects" className="container mx-auto max-w-7xl px-4 scroll-mt-20">
      <h2 className="section-heading">Projects</h2>

      {/* 캐러셀 버전을 메인으로 사용 */}
      <div className="bg-secondary/10 rounded-3xl py-10 mt-12">
        <ProjectCarousel onProjectClick={handleOpenModal} />
      </div>

      <NotionModal
        isOpen={!!selectedProjectId}
        onClose={handleCloseModal}
        notionId={selectedProjectId}
        title={selectedProjectData?.title || ""}
      />

    </section>
  )
}
