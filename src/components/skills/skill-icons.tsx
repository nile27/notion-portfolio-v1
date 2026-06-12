import React from "react";
import Image from "next/image";

// devicon(devicon.dev)에서 가져온 기술 스택 로고 아이콘 (public/icons/devicon)
const icon = (file: string, className = "w-5 h-5 shrink-0") => (
  <Image
    src={`/icons/devicon/${file}`}
    alt=""
    width={20}
    height={20}
    unoptimized
    className={className}
  />
);

export const SKILL_LOGOS: Record<string, React.ReactNode> = {
  "C#": icon("csharp-original.svg"),
  "TypeScript": icon("typescript-original.svg"),
  "JavaScript": icon("javascript-original.svg"),
  "React": icon("react-original.svg"),
  // 모노톤 로고: 다크모드에서 색 반전(흰색)으로 가독성 확보
  "Next.js": icon("nextjs-original.svg", "w-5 h-5 shrink-0 dark:invert"),
  "Tailwind CSS": icon("tailwindcss-original.svg"),
  "Express.js": icon("express-original.svg", "w-5 h-5 shrink-0 dark:invert"),
  "MongoDB": icon("mongodb-original.svg"),
  "Git": icon("git-original.svg"),
  "Figma": icon("figma-original.svg"),
};
