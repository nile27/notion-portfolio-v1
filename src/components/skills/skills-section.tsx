"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/layout/section";
import { portfolioData } from "@/data/data";
import { useTheme } from "next-themes";
import { SKILL_LOGOS } from "./skill-icons";

export function SkillsSection() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // 하이드레이션 오류 방지를 위해 마운트 전에는 스켈레톤 렌더링
    return (
      <Section id="skills" className="container mx-auto max-w-7xl px-4 scroll-mt-20 py-16 min-h-[400px]">
        <div className="mb-12">
          <h2 className="section-heading text-left mb-2">Skills</h2>
          <p className="text-muted-foreground text-lg">
            보유하고 있는 프로그래밍 언어 및 프레임워크 기술 스택입니다.
          </p>
        </div>
        <div className="space-y-10">
          <div className="h-24 bg-secondary/5 rounded-2xl animate-pulse" />
        </div>
      </Section>
    );
  }

  const isDark = resolvedTheme === "dark";

  // Next.js와 Express.js의 컬러 값을 테마 모드에 맞춰 동적으로 설정 (CSR 기반)
  const skills = (portfolioData.skills || []).map(skill => {
    if (skill.name === "Next.js" || skill.name === "Express.js") {
      return {
        ...skill,
        color: isDark ? "#ffffff" : "#000000",
        glowColor: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.1)"
      };
    }
    return skill;
  });

  const categoriesList = ["Languages", "Frameworks", "Backend & Database", "Tools & Cooperation"];

  return (
    <Section id="skills" className="container mx-auto max-w-7xl px-4 scroll-mt-20 py-16">
      {/* 타이틀 영역 */}
      <div className="mb-12">
        <h2 className="section-heading text-left mb-2">Skills</h2>
        <p className="text-muted-foreground text-lg">
          보유하고 있는 프로그래밍 언어 및 프레임워크 기술 스택입니다.
        </p>
      </div>

      {/* 카테고리별 그룹화된 배지 리스트 */}
      <div className="space-y-10">
        {categoriesList.map((categoryName) => {
          const categorySkills = skills.filter(s => s.category === categoryName);
          if (categorySkills.length === 0) return null;

          return (
            <div key={categoryName} className="space-y-4">
              {/* 카테고리명 헤더 */}
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/85">
                  {categoryName}
                </h3>
                <div className="h-[1px] flex-1 bg-border/40" />
              </div>

              {/* 배지 목록 */}
              <div className="flex flex-wrap gap-3">
                {categorySkills.map((skill, index) => {
                  const isNeutral = skill.name === "Next.js" || skill.name === "Express.js";
                  
                  // Next.js와 Express.js는 호버 시 글자 가독성을 위해 테마별 그레이/실버 계열로 전환
                  const hoverColor = isNeutral
                    ? (isDark ? "#e4e4e7" : "#3f3f46")
                    : skill.color;

                  // 스킬 이름 텍스트는 호버 시 항상 테마 대비색(다크: 흰색, 라이트: 검정)으로 통일
                  const hoverTextColor = isDark ? "#ffffff" : "#000000";

                  const iconColor = isNeutral ? (isDark ? "#ffffff" : "#000000") : skill.color;
                  const iconBg = isNeutral 
                    ? (isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)") 
                    : `${skill.color}15`;

                  return (
                    <motion.div
                      key={index}
                      className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl border border-transparent bg-secondary/20 backdrop-blur-xs cursor-pointer select-none text-foreground font-semibold text-sm transition-all"
                      whileHover={{
                        scale: 1.05,
                        borderColor: hoverColor,
                        color: hoverTextColor,
                        boxShadow: `0 8px 20px -8px ${skill.glowColor}`,
                      }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <div 
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                        style={{ 
                          backgroundColor: iconBg,
                          color: iconColor
                        }}
                      >
                        {SKILL_LOGOS[skill.name] ? (
                          SKILL_LOGOS[skill.name]
                        ) : (
                          <span className="text-[10px] font-bold">{skill.name.substring(0, 2)}</span>
                        )}
                      </div>
                      <span>{skill.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
