export const SITE_CONFIG = {
  name: "임민규 | Dev Portfolio",
  description: "효율과 사용자 경험을 지향하는 프론트엔드 개발자 임민규의 포트폴리오입니다.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://mingyu-portfolio.vercel.app",
  ogImage: "/my_meta_img.png",
  links: {
    github: "https://github.com/nile27",
    blog: "",
  },
};

export type SiteConfig = typeof SITE_CONFIG;
