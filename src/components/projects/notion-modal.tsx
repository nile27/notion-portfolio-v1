"use client"

import { useState, useEffect } from "react"
import { NotionRenderer } from "react-notion-x"
import { ExtendedRecordMap } from "notion-types"
import { useTheme } from "next-themes"
import dynamic from "next/dynamic"
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

interface NotionModalProps {
  isOpen: boolean
  onClose: () => void
  notionId: string | null
  title: string
  initialRecordMap?: ExtendedRecordMap
}

export function NotionModal({ isOpen, onClose, notionId, title, initialRecordMap }: NotionModalProps) {
  const [recordMap, setRecordMap] = useState<ExtendedRecordMap | null>(initialRecordMap || null)
  const [loading, setLoading] = useState(false)
  const { resolvedTheme } = useTheme()

  // 모달이 열릴 때마다 데이터를 가져오거나 초기 데이터 사용
  useEffect(() => {
    if (isOpen && notionId) {
      if (initialRecordMap) {
        setRecordMap(initialRecordMap)
      } else {
        fetchNotionData(notionId)
      }
    } else if (!isOpen) {
      // 모달이 닫히면 데이터 초기화 (다음 열릴 때 새 데이터를 받기 위함)
      setRecordMap(null)
    }
  }, [isOpen, notionId, initialRecordMap])

  async function fetchNotionData(id: string) {
    setLoading(true)
    try {
      const response = await fetch(`/api/notion?pageId=${id}`)
      if (!response.ok) throw new Error("Failed to fetch")
      const data = await response.json()
      setRecordMap(data)
    } catch (error) {
      console.error("Notion Fetch Error:", error)
      setRecordMap(null)
    } finally {
      setLoading(false)
    }
  }

  const notionUrl = notionId ? `https://notion.so/${notionId.replace(/-/g, "")}` : "#"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] h-[90vh] px-3 py-0 border-none bg-background shadow-2xl flex flex-col focus:outline-none overflow-hidden">
        {/* 상단 커스텀 네비게이션 바 */}
        <div className="flex items-center justify-between px-3 py-4 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium overflow-hidden">
            <span className="whitespace-nowrap">포트폴리오</span>
            <span className="opacity-50">/</span>
            <div className="flex items-center gap-2 text-foreground truncate">
              <FolderRoot className="h-4 w-4 text-blue-500 shrink-0" />
              <span className="truncate font-semibold">{title}</span>
              <a
                href={notionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:bg-accent rounded-md transition-colors text-muted-foreground hover:text-accent-foreground border-none bg-transparent outline-none ring-0 focus:outline-none focus:ring-0"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 hover:bg-accent transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : recordMap ? (
            <div className="w-full">
              <div className="px-6 pt-12 md:px-12 md:pt-16 max-w-full">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight wrap-break-word leading-tight">
                  {title}
                </h1>
                <div className="mt-8 h-px bg-border w-full opacity-50" />
              </div>

              <div className="w-full h-full 
                [&_.notion-page]:px-6 [&_.notion-page]:py-6 md:[&_.notion-page]:px-12 md:[&_.notion-page]:py-8 [&_.notion-page]:box-border 
                [&_.notion]:font-(--font-noto)! [&_.notion]:text-base
                [&_.notion-text]:w-full [&_.notion-text]:max-w-full [&_.notion-text]:wrap-break-word
                [&_.notion-callout]:w-full [&_.notion-callout]:max-w-full [&_.notion-callout]:box-border [&_.notion-callout]:wrap-break-word
                [&_.notion-column]:w-full [&_.notion-column]:max-w-full [&_.notion-column]:wrap-break-word
                [&_.notion-list]:w-full [&_.notion-list]:max-w-full
                [&_.notion-list-item]:wrap-break-word
                [&_.notion-h1]:wrap-break-word [&_.notion-h2]:wrap-break-word [&_.notion-h3]:wrap-break-word
                [&_.notion-asset-wrapper]:max-w-full
                [&_.notion-collection]:w-full [&_.notion-collection]:overflow-x-auto">
                <NotionRenderer
                  recordMap={recordMap}
                  fullPage={false}
                  darkMode={resolvedTheme === "dark"}
                  disableHeader={true}
                  className="w-full"
                  components={{
                    Collection,
                    Code,
                    PageLink: (props: any) => (
                      <a {...props} target="_blank" rel="noopener noreferrer" />
                    ),
                  }}
                  mapPageUrl={(pageId) => `https://notion.so/${pageId.replace(/-/g, "")}`}
                />
              </div>
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
