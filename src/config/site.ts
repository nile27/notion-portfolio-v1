export const SITE_CONFIG = {
  name: "임민규 | 개발자 포트폴리오",
  description: "지속적인 성장과 효율적인 문제 해결을 지향하는 개발자 임민규의 포트폴리오입니다. (Developer Portfolio)",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://mingyu-portfolio.vercel.app",
  ogImage: "/my_meta_img.png",
  links: {
    github: "https://github.com/nile27",
    blog: "",
  },
};

export type SiteConfig = typeof SITE_CONFIG;
