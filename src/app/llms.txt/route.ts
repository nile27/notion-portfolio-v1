import { SITE_CONFIG } from "@/config/site"
import { portfolioData } from "@/data/data"

// GEO/LLMO 대응: AI 검색·요약 엔진(ChatGPT, Perplexity 등)이 사이트를 빠르게
// 파악할 수 있도록 llms.txt 스펙(https://llmstxt.org)에 맞춰 요약을 제공합니다.
function buildLlmsTxt(): string {
  const { about, hero, projects, skills } = portfolioData

  const lines: string[] = []

  lines.push(`# ${about.name} — ${SITE_CONFIG.name}`)
  lines.push("")
  lines.push(`> ${hero.subtitle}`)
  lines.push("")
  lines.push(hero.description)
  lines.push("")

  lines.push("## About")
  lines.push(`- Name: ${about.name}`)
  lines.push(`- Email: ${about.email}`)
  lines.push(`- University: ${about.university}`)
  lines.push(`- GitHub: ${about.github}`)
  lines.push(`- Site: ${SITE_CONFIG.url}`)
  lines.push("")

  const skillNames = (skills ?? [])
    .flatMap((s) => (s.type === "group" ? s.subSkills?.map((sub) => sub.name) ?? [] : [s.name]))
    .filter(Boolean)
  if (skillNames.length > 0) {
    lines.push("## Skills")
    lines.push(skillNames.join(", "))
    lines.push("")
  }

  lines.push("## Projects")
  for (const project of projects) {
    const [name, ...rest] = project.title.split(" - ")
    const subtitle = rest.length > 0 ? rest.join(" - ") : null
    lines.push(`### ${name}`)
    if (subtitle) lines.push(subtitle)
    lines.push(project.description)
    lines.push(`Tech: ${project.tags.join(", ")}`)
    lines.push("")
  }

  lines.push("## Pages")
  lines.push(`- [About](${SITE_CONFIG.url}/#about)`)
  lines.push(`- [Career](${SITE_CONFIG.url}/#career)`)
  lines.push(`- [Projects](${SITE_CONFIG.url}/#projects)`)
  lines.push(`- [Activity](${SITE_CONFIG.url}/#activity)`)
  lines.push(`- [Contact](${SITE_CONFIG.url}/#contact)`)

  return lines.join("\n")
}

export async function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  })
}
