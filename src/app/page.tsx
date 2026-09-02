import NextImage from "next/image";
import { portfolioData } from "@/data/data";
import { ProjectSection } from "@/components/projects/project-section";
import { Section } from "@/components/layout/section";
import { HeroSection } from "@/components/hero/hero-section";
import { SkillsSection } from "@/components/skills/skills-section";

import { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site";
import { ContactSection } from "@/components/contact/contact-section";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getAllProjectRecordMaps } from "@/lib/notion-server";
import { cn } from "@/lib/utils";
import { GraduationCap, Trophy, Compass, Sparkles, BookOpen } from "lucide-react";

// 스킬 카드에 정의된 컬러를 재사용해 Career 태그에 시각적 앵커를 부여합니다.
// Next.js/Express.js는 스킬 카드에서 테마에 따라 흑백으로 동적 처리되는 무채색 로고라 정적 색상(#ffffff)이 라이트 모드에서 텍스트로 쓰이면 보이지 않으므로 제외합니다.
const NEUTRAL_SKILLS = ["Next.js", "Express.js"];

function getTagColor(tag: string): string | undefined {
  if (NEUTRAL_SKILLS.includes(tag)) return undefined;
  for (const skill of portfolioData.skills || []) {
    if (skill.name === tag) return skill.color;
    if (skill.subSkills) {
      const sub = skill.subSkills.find((s) => s.name === tag);
      if (sub) return sub.color;
    }
  }
  return undefined;
}

export const metadata: Metadata = {
  title: "임민규 | 개발자 포트폴리오",
  description: "지속적인 성장과 효율적인 문제 해결을 지향하는 개발자 임민규입니다. React, Next.js, C# 등을 다룹니다. 한남대학교 컴퓨터무인기술학과 전공.",
  keywords: ["임민규", "개발자 포트폴리오", "임민규 포트폴리오", "개발자 임민규", "소프트웨어 엔지니어", "Mingyu's Portfolio", "프론트엔드", "백엔드", "개발자", "포트폴리오", "한남대학교", "컴퓨터무인기술학과", "C#", "C# 개발자", "C# Developer", "C샵", "Csharp", "WPF", "WPF 개발자", "Next.js", "React"],
  openGraph: {
    title: "임민규 | 개발자 포트폴리오",
    description: "지속적인 성장과 효율적인 문제 해결을 지향하는 개발자 임민규입니다. React, Next.js, C# 등을 다룹니다.",
    url: SITE_CONFIG.url,
    siteName: "임민규 포트폴리오",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
  verification: {
    google: "mRz3HOQXLPv6SratisvhC6jMRzSydo_JSs7JEzIZl5g",
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
};

export default async function Home() {
  const queryClient = new QueryClient();

  // 서버 사이드 프리페칭 (진짜 0초 지연을 위한 캐싱)
  await queryClient.prefetchQuery({
    queryKey: ["projects-data"],
    queryFn: async () => {
      const data = await getAllProjectRecordMaps();
      return JSON.parse(JSON.stringify(data)); // 직렬화 에러 방지
    },
  });

  return (
    <div className="flex flex-col gap-20 pb-20 overflow-hidden">
      <HeroSection />

      {/* About Section */}
      <Section id="about" className="container mx-auto max-w-7xl px-4 scroll-mt-20">
        <h2 className="section-heading">About Me</h2>
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          <div className="space-y-4">
            <div className="aspect-3/4 relative overflow-hidden rounded-2xl shadow-tinted">
              <NextImage
                src={portfolioData.about.image}
                alt={portfolioData.about.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
                priority
              />
            </div>
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-bold">{portfolioData.about.name}</h3>
              <p className="text-muted-foreground">{portfolioData.about.email}</p>
              <p className="text-sm font-medium text-muted-foreground/80">{portfolioData.about.university}</p>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-10">
            <h3 className="text-3xl font-bold tracking-tight">안녕하세요!<br />개발자 임민규입니다.</h3>

            <div className="space-y-8">
              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-accent-foreground flex items-center gap-2">
                  <Compass className="h-4.5 w-4.5" /> 이런 개발자를 지향합니다
                </h4>
                <p className="text-lg leading-relaxed text-muted-foreground prose-copy">
                  사용자의 불편을 해소하는 데서 모든 개발이 시작된다고 믿습니다. 직관적인 UI/UX부터 안정적인 시스템 구조까지 서비스 전반의 완성도를 높여 사용자에게 최선의 경험을 전달하고자 합니다.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-accent-foreground flex items-center gap-2">
                  <Sparkles className="h-4.5 w-4.5" /> 이럴 때 성취감을 느껴요
                </h4>
                <p className="text-lg leading-relaxed text-muted-foreground prose-copy">
                  팀을 위해 스스로 해야 할 일을 찾아 실행하고, 원활한 소통을 통해 실질적인 기여를 해냈을 때 가장 큰 보람을 느낍니다. 함께 목표를 이루며 성취를 공유하는 개발자로 성장하고자 합니다.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-accent-foreground flex items-center gap-2">
                  <BookOpen className="h-4.5 w-4.5" /> 이런 경험을 해보았습니다
                </h4>
                <p className="text-lg leading-relaxed text-muted-foreground prose-copy">
                  웹 서비스부터 데스크톱 애플리케이션 개발까지 다양한 기술을 다뤄왔습니다. 화면 설계부터 서버/클라이언트 개발 및 배포까지 서비스의 라이프사이클 전반을 경험하며 역할 간의 흐름을 유기적으로 이해하려 노력했습니다.
                </p>
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-border">
              <a href={portfolioData.about.github} target="_blank" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-accent-foreground transition-colors group">
                <span>GitHub</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* Skills Section */}
      <SkillsSection />

      {/* Career Section */}
      <Section id="career" className="bg-secondary/30 py-24 scroll-mt-20">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="section-heading">Career</h2>
          <div className="space-y-16">
            {portfolioData.careers.map((job, index) => (
              <div key={index} className="grid md:grid-cols-[1fr_2.5fr] gap-8 md:gap-16">
                {/* Left side: Basic Info */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold tracking-tighter">{job.company}</h3>
                    <p className="text-xl font-medium text-accent-foreground">{job.role}</p>
                  </div>
                  <div className="inline-flex text-sm font-semibold text-muted-foreground bg-secondary/50 px-4 py-1 rounded-full border border-border">
                    {job.period}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {job.tags?.map((tag, i) => {
                      const color = getTagColor(tag)
                      return (
                        <span
                          key={i}
                          className={cn(
                            "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded",
                            !color && "text-muted-foreground bg-muted"
                          )}
                          style={color ? { color, backgroundColor: `${color}18` } : undefined}
                        >
                          {tag}
                        </span>
                      )
                    })}
                  </div>
                </div>

                {/* Right side: Detailed Info */}
                <div className="space-y-10">
                  {job.details?.map((detail, i) => {
                    const dotColors = ["bg-accent-foreground", "bg-emerald-500", "bg-sky-500"]
                    return (
                      <div key={i} className="space-y-4">
                        <h4 className="text-lg font-semibold flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${dotColors[i % dotColors.length]}`} />
                          {detail.title}
                        </h4>
                        <ul className="space-y-2.5 ml-3.5 border-l-2 border-border/60 pl-6">
                          {detail.items.map((item, j) => (
                            <li key={j} className="text-muted-foreground leading-relaxed relative">
                              <span className={`absolute left-[-27px] top-[10px] w-1.5 h-1.5 -translate-y-1/2 rounded-full ${dotColors[i % dotColors.length]} opacity-60`} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" className="container mx-auto max-w-7xl px-4 scroll-mt-20">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ProjectSection />
        </HydrationBoundary>
      </Section>

      {/* Activity (Education & Awards) Section */}
      <Section id="activity" className="container mx-auto max-w-7xl px-4 scroll-mt-20">
        <h2 className="section-heading">Activity</h2>
        
        <div className="mt-12 space-y-20">
          {/* 1st Row: Education */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-foreground/10 text-accent-foreground">
                <GraduationCap className="h-4.5 w-4.5" />
              </span>
              Education
            </h3>
            
            <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
              {/* Academic Sub-section */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60 px-1 border-l-2 border-primary/30 ml-1">Academic</h4>
                <div className="space-y-4">
                  {portfolioData.education.academic.map((edu, index) => (
                    <div key={index} className="rounded-2xl bg-secondary/20 p-6 shadow-tinted transition-all hover:-translate-y-0.5 flex flex-col">
                      <div className="flex flex-col gap-1 mb-3">
                        <h4 className="text-lg font-bold tracking-tight">{edu.institution}</h4>
                        <span className="text-sm font-medium text-muted-foreground">{edu.period}</span>
                      </div>
                      <p className="text-muted-foreground font-medium">{edu.program}</p>
                      {edu.description && (
                        <p className="text-sm text-muted-foreground/80 mt-2 leading-relaxed border-t border-border/50 pt-2 italic whitespace-pre-line">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bootcamps Sub-section */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60 px-1 border-l-2 border-primary/30 ml-1">Bootcamps & Training</h4>
                <div className="space-y-4">
                  {portfolioData.education.bootcamps.map((edu, index) => (
                    <div key={index} className="rounded-2xl bg-secondary/20 p-6 shadow-tinted transition-all hover:-translate-y-0.5">
                      <div className="flex flex-col gap-1 mb-3">
                        <h4 className="text-lg font-bold tracking-tight">{edu.institution}</h4>
                        <span className="text-sm font-medium text-muted-foreground">{edu.period}</span>
                      </div>
                      <p className="text-muted-foreground font-medium">{edu.program}</p>
                      {edu.description && (
                        <p className="text-sm text-muted-foreground/80 mt-2 leading-relaxed border-t border-border/50 pt-2 italic">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 2nd Row: Awards */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-foreground/10 text-accent-foreground">
                <Trophy className="h-4.5 w-4.5" />
              </span>
              Awards
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {portfolioData.awards.map((award, index) => {
                const badgeStyles = [
                  "bg-amber-500/10 text-amber-600 dark:text-amber-400",
                  "bg-sky-500/10 text-sky-600 dark:text-sky-400",
                  "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                ]
                return (
                  <div key={index} className="flex gap-4 p-5 rounded-2xl bg-secondary/20 shadow-tinted items-center transition-all hover:-translate-y-0.5">
                    <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shrink-0", badgeStyles[index % badgeStyles.length])}>
                      <Trophy className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold leading-tight tracking-tight break-keep">{award.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{award.organization} · {award.date}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Section>


      <ContactSection />
    </div>
  );
}
