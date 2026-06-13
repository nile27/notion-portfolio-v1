"use client"

import { useState, useEffect } from "react"
import { NotionRenderer } from "react-notion-x"
import { ExtendedRecordMap } from "notion-types"
import { useTheme } from "next-themes"
import { useQuery } from "@tanstack/react-query"
import dynamic from "next/dynamic"

// Notion 관련 스타일 임포트 (모달 로드 시에만 로드됨)
import "react-notion-x/src/styles.css"
import "prismjs/themes/prism-tomorrow.css"
import "katex/dist/katex.min.css"

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Loader2, X, FolderRoot, ExternalLink } from "lucide-react"

// 노션 데이터베이스 및 코드 렌더링을 위한 컴포넌트 동적 임포트
const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then((m) => m.Collection)
)
const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then((m) => m.Code)
)
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
)

interface NotionModalProps {
  isOpen: boolean
  onClose: () => void
  notionId: string | null
  title: string
}

export function NotionModal({ isOpen, onClose, notionId, title }: NotionModalProps) {
  const { resolvedTheme } = useTheme()

  // SSR Hydration을 통해 서버에서 미리 렌더링된 캐시 데이터를 즉시 사용합니다.
  const { data: allRecordMaps, isLoading } = useQuery<Record<string, ExtendedRecordMap>>({
    queryKey: ["projects-data"],
    queryFn: async () => {
      const res = await fetch("/api/projects")
      if (!res.ok) throw new Error("Failed to fetch")
      return res.json()
    },
    enabled: isOpen, // 모달이 열릴 때만 쿼리 활성화 (이미 캐시되어 있다면 즉시 반환)
    staleTime: 60 * 60 * 1000,
  })

  const normalizedId = notionId?.replace(/-/g, "")
  const recordMap = normalizedId && allRecordMaps ? allRecordMaps[normalizedId] : null

  const notionUrl = notionId ? `https://notion.so/${notionId.replace(/-/g, "")}` : "#"


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        showCloseButton={false}
        className="max-w-4xl w-[95vw] h-[90vh] p-0 border-none bg-white dark:bg-[#191919] shadow-2xl flex flex-col focus:outline-none overflow-hidden rounded-2xl"
        style={{
          // @ts-ignore
          "--bg-color": resolvedTheme === "dark" ? "#191919" : "#ffffff",
          // @ts-ignore
          "--fg-color": resolvedTheme === "dark" ? "rgba(255, 255, 255, 0.9)" : "rgba(55, 53, 47, 0.9)",
        }}
      >
        {/* 우측 상단 플로팅 컨트롤러 (노션 디자인 일체감 극대화) */}
        <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
          <a
            href={notionUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="노션에서 열기"
            className="p-1.5 bg-white/80 dark:bg-[#191919]/80 backdrop-blur-md hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full border border-neutral-200/50 dark:border-neutral-800/50 transition-all text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white shadow-sm flex items-center justify-center focus:outline-none outline-none focus:ring-0"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
          <button
            onClick={onClose}
            title="닫기"
            className="p-1.5 bg-white/80 dark:bg-[#191919]/80 backdrop-blur-md hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full border border-neutral-200/50 dark:border-neutral-800/50 transition-all text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white shadow-sm flex items-center justify-center focus:outline-none outline-none focus:ring-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide bg-white dark:bg-[#191919]">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : recordMap ? (
            <div className="w-full h-full 
              [&_.notion]:font-sans [&_.notion]:text-base
              [&_.notion-page]:!px-6 md:[&_.notion-page]:!px-12 [&_.notion-page]:box-border [&_.notion-page]:w-full [&_.notion-page]:max-w-full
              [&_.notion-page-cover-wrapper]:h-[24vh] [&_.notion-page-cover-wrapper]:min-h-[150px]
              [&_.notion-page-icon-hero.notion-page-icon-image]:bg-white dark:[&_.notion-page-icon-hero.notion-page-icon-image]:bg-transparent
              [&_.notion-page-icon-hero.notion-page-icon-image]:border-4 [&_.notion-page-icon-hero.notion-page-icon-image]:border-white dark:[&_.notion-page-icon-hero.notion-page-icon-image]:border-transparent
              [&_.notion-page-icon-hero.notion-page-icon-image]:rounded-full
              [&_.notion-page-icon-hero.notion-page-icon-image]:shadow-sm dark:[&_.notion-page-icon-hero.notion-page-icon-image]:shadow-none
              [&_.notion-page-icon-hero.notion-page-icon-image]:!overflow-hidden
              [&_.notion-text]:w-full [&_.notion-text]:max-w-full [&_.notion-text]:wrap-break-word
              [&_.notion-callout]:w-full [&_.notion-callout]:max-w-full [&_.notion-callout]:box-border [&_.notion-callout]:wrap-break-word
              [&_.notion-column]:w-full [&_.notion-column]:max-w-full [&_.notion-column]:wrap-break-word
              [&_.notion-list]:w-full [&_.notion-list]:max-w-full
              [&_.notion-list-item]:wrap-break-word
              [&_.notion-h1]:wrap-break-word [&_.notion-h2]:wrap-break-word [&_.notion-h3]:wrap-break-word
              [&_.notion-asset-wrapper]:max-w-full
              [&_.notion-collection]:w-full [&_.notion-collection]:overflow-x-auto
              [&_.notion-simple-table]:!w-full
              [&_.notion-title]:text-3xl sm:[&_.notion-title]:text-4xl md:[&_.notion-title]:text-5xl [&_.notion-title]:font-bold [&_.notion-title]:tracking-tight [&_.notion-title]:wrap-break-word [&_.notion-title]:leading-tight
            ">
              <NotionRenderer
                recordMap={recordMap}
                fullPage={true}
                darkMode={resolvedTheme === "dark"}
                disableHeader={true}
                className="w-full"
                components={{
                  Collection,
                  Code,
                  Equation,
                  PageLink: (props: any) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" />
                  ),
                }}
                mapPageUrl={(pageId) => `https://notion.so/${pageId.replace(/-/g, "")}`}
              />
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              페이지를 불러올 수 없습니다.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
