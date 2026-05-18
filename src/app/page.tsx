import NextImage from "next/image";
import { portfolioData } from "@/data/data";
import { ProjectSection } from "@/components/projects/project-section";
import { Section } from "@/components/layout/section";
import { HeroSection } from "@/components/hero/hero-section";

import { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site";
import { ContactSection } from "@/components/contact/contact-section";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getAllProjectRecordMaps } from "@/lib/notion-server";

export const metadata: Metadata = {
  title: "임민규 | 프론트엔드 개발자 포트폴리오",
  description: "사용자 중심의 가치를 실현하는 프론트엔드 개발자 임민규입니다. 한남대학교 컴퓨터무인기술학과 전공.",
  keywords: ["임민규", "mingyu-portfolio", "프론트엔드 개발자 포트폴리오", "임민규 포트폴리오", "프론트엔드 개발자 임민규", "Mingyu's Portfolio", "프론트엔드", "개발자", "포트폴리오", "한남대학교", "컴퓨터무인기술학과", "Next.js", "React"],
  openGraph: {
    title: "임민규 | 프론트엔드 개발자 포트폴리오",
    description: "사용자 중심의 가치를 실현하는 프론트엔드 개발자 임민규입니다.",
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
            <div className="aspect-3/4 relative overflow-hidden rounded-2xl border border-border shadow-lg">
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
            <h3 className="text-3xl font-bold tracking-tight">안녕하세요!<br />프론트엔드 개발자 임민규입니다.</h3>

            <div className="space-y-8">
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-accent-foreground">🚀 이런 개발자를 지향합니다</h4>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  사용자의 불편을 해소하는 데서 서비스 개발이 시작된다고 믿습니다. 특히 웹 프론트엔드는 사용자가 처음 마주하는 접점인 만큼, 직관적이고 편리한 UI/UX를 통해 가치 있는 경험을 전달하는 개발자를 지향합니다.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-bold text-accent-foreground">✨ 이럴 때 성취감을 느껴요</h4>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  팀을 위해 스스로 해야 할 일을 찾아 실행하고, 원활한 소통을 통해 실질적인 기여를 해냈을 때 가장 큰 보람을 느낍니다. 함께 목표를 이루며 성취를 공유하는 개발자로 성장하고자 합니다.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-bold text-accent-foreground">📚 이런 경험을 해보았습니다</h4>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Next.js와 React 기반의 프론트엔드 교육 과정을 수료하고, 실제 프로젝트를 통해 실무 감각을 키웠습니다. 협업 이해를 높이기 위해 Figma를 활용한 화면 설계부터, Express 기반의 서버 개발 및 배포까지 직접 경험하며 역할 간의 흐름을 이해하려 노력했습니다.
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
                    {job.tags?.map((tag, i) => (
                      <span key={i} className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right side: Detailed Info */}
                <div className="space-y-10">
                  {job.details?.map((detail, i) => (
                    <div key={i} className="space-y-4">
                      <h4 className="text-lg font-bold flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-foreground" />
                        {detail.title}
                      </h4>
                      <ul className="space-y-2.5 ml-3.5 border-l border-border pl-6">
                        {detail.items.map((item, j) => (
                          <li key={j} className="text-muted-foreground leading-relaxed relative">
                            <span className="absolute left-[-27px] top-[10px] w-1.5 h-px bg-border" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
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
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-primary text-xl">🎓</span> Education
            </h3>
            
            <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
              {/* Academic Sub-section */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60 px-1 border-l-2 border-primary/30 ml-1">Academic</h4>
                <div className="space-y-4">
                  {portfolioData.education.academic.map((edu, index) => (
                    <div key={index} className="rounded-2xl border border-border p-6 bg-card/50 shadow-sm transition-all hover:shadow-md flex flex-col">
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
                    <div key={index} className="rounded-2xl border border-border p-6 bg-card/50 shadow-sm transition-all hover:shadow-md">
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
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-primary text-xl">🏆</span> Awards
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {portfolioData.awards.map((award, index) => (
                <div key={index} className="flex gap-4 p-5 rounded-2xl border border-border bg-card/50 shadow-sm items-center transition-all hover:shadow-md">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 text-sm">
                    🏆
                  </div>
                  <div>
                    <h4 className="text-sm font-bold leading-tight tracking-tight break-keep">{award.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{award.organization} · {award.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>


      <ContactSection />
    </div>
  );
}
