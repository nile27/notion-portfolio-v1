"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { FolderRoot } from "lucide-react"

interface ProjectCardProps {
  project: {
    title: string
    description: string
    tags: string[]
    image: string
    notionId: string
    categories?: string[]
  }
  onClick: () => void
  className?: string
}

export function ProjectCard({ project, onClick, className }: ProjectCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-b-2xl rounded-t-sm border border-border bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer h-full shadow-sm",
        className
      )}
      onClick={onClick}
    >
      {/* 이미지 영역: p-6과 object-contain으로 이미지 잘림 방지 */}
      <div className="relative aspect-video overflow-hidden border-b border-border">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted/50">
            <FolderRoot className="h-12 w-12 text-muted-foreground/50" />
          </div>
        )}
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col flex-1 p-8">
        <h3 className="text-2xl font-bold mb-4 transition-colors group-hover:text-accent-foreground tracking-tight">
          {project.title}
        </h3>
        <p className="text-muted-foreground mb-8 line-clamp-3 text-base leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="rounded-full bg-secondary/80 border border-border/50 px-3 py-1 text-[11px] font-semibold text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <button
          className="mt-auto inline-flex items-center justify-center text-sm font-bold text-white bg-black dark:bg-white dark:text-black px-5 py-2.5 rounded-lg hover:opacity-90 transition-all active:scale-95 shadow-sm"
        >
          상세 내용 확인
        </button>
      </div>
    </div>
  )
}
