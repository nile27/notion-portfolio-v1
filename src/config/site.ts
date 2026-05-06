export const SITE_CONFIG = {
  name: "임민규 | Dev Portfolio",
  description: "효율과 사용자 경험을 지향하는 프론트엔드 개발자 임민규의 포트폴리오입니다.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://your-portfolio-domain.com", // 실제 배포될 도메인으로 나중에 수정하세요.
  ogImage: "/og-image.png",
  links: {
    github: "https://github.com/your-id",
    blog: "https://your-blog.com",
  },
};

export type SiteConfig = typeof SITE_CONFIG;
