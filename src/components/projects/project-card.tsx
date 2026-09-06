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
  priority?: boolean
}

export function ProjectCard({ project, onClick, className, priority }: ProjectCardProps) {
  // "이름 - 소개" 형식의 타이틀을 두 줄로 분리 (소개가 없는 타이틀도 있음)
  const [name, ...rest] = project.title.split(" - ")
  const subtitle = rest.length > 0 ? rest.join(" - ") : null

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-b-2xl rounded-t-sm border border-border bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer h-full shadow-sm",
        className
      )}
      onClick={onClick}
    >
      {/* 이미지 영역: p-6과 object-contain으로 이미지 잘림 방지 */}
      <div className="relative aspect-video overflow-hidden border-b border-border dark:border-white/15">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500"
            priority={priority}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted/50">
            <FolderRoot className="h-12 w-12 text-muted-foreground/50" />
          </div>
        )}
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col flex-1 p-8">
        <h3 className={cn(
          "text-2xl font-bold transition-colors group-hover:text-accent-foreground tracking-tight",
          subtitle ? "mb-1" : "mb-4"
        )}>
          {name}
        </h3>
        {subtitle && (
          <p className="text-sm font-semibold text-muted-foreground/80 mb-4">
            - {subtitle}
          </p>
        )}
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
