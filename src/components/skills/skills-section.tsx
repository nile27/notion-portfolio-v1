"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/layout/section";
import { portfolioData } from "@/data/data";
import { useTheme } from "next-themes";
import { SKILL_LOGOS } from "./skill-icons";

export function SkillsSection() {
  const [mounted, setMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { resolvedTheme } = useTheme();

  const SOLID_LOGOS = ["JavaScript", "TypeScript", "Git"];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
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
  const rawSkills = portfolioData.skills || [];
  const skills = rawSkills.map(skill => {
    if (skill.name === "Next.js" || skill.name === "Express.js") {
      return {
        ...skill,
        color: isDark ? "#ffffff" : "#000000",
        glowColor: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.1)"
      };
    }
    
    // subSkills 내의 Next.js, Express.js 컬러 동적 수정
    if (skill.subSkills) {
      const updatedSubSkills = skill.subSkills.map(sub => {
        if (sub.name === "Next.js" || sub.name === "Express.js") {
          return {
            ...sub,
            color: isDark ? "#ffffff" : "#000000"
          };
        }
        return sub;
      });
      return {
        ...skill,
        subSkills: updatedSubSkills
      };
    }

    return skill;
  });

  // 카테고리 표시 순서 정의 (JS -> C# -> Python -> DB -> Tools/Cooperation)
  const categoryOrder: Record<string, number> = {
    "JavaScript & TypeScript": 1,
    "C# & .NET": 2,
    "Python": 3,
    "Database": 4,
    "Tools & Cooperation": 5,
  };

  // 데이터로부터 중복 없이 카테고리를 동적으로 추출하여 지정된 순서대로 정렬합니다.
  const categoriesList = Array.from(
    new Set((portfolioData.skills || []).map(s => s.category).filter(Boolean))
  ).sort((a, b) => {
    return (categoryOrder[a] || 99) - (categoryOrder[b] || 99);
  });

  return (
    <Section id="skills" className="container mx-auto max-w-7xl px-4 scroll-mt-20 py-16">
      {/* 타이틀 영역 */}
      <div className="mb-12">
        <h2 className="section-heading text-left mb-2">Skills</h2>
        <p className="text-muted-foreground text-lg">
          보유하고 있는 프로그래밍 언어 및 프레임워크 기술 스택입니다.
        </p>
      </div>

      {/* 카테고리별 세로 열(Column) 그리드 - 5개 이상의 카테고리가 등록되어도 자연스럽게 줄바꿈(Wrap)되어 정렬됩니다. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-start">
        {categoriesList.map((categoryName) => {
          const categorySkills = skills.filter(s => s.category === categoryName);
          if (categorySkills.length === 0) return null;

          return (
            <div key={categoryName} className="space-y-5">
              {/* 카테고리명 헤더 */}
              <div className="flex items-center gap-3 border-b border-border/30 pb-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/85">
                  {categoryName}
                </h3>
              </div>

              {/* 세로 스택 목록 */}
              <div className="flex flex-col gap-3.5">
                {categorySkills.map((skill) => {
                  const globalIndex = skills.indexOf(skill);
                  const isHovered = hoveredIndex === globalIndex;
                  const isGroup = skill.type === "group";

                  // Next.js 등 무채색 아이콘 예외 처리
                  const isNeutral = skill.name === "Next.js" || skill.name === "Express.js";
                  const hoverColor = isNeutral
                    ? (isDark ? "#e4e4e7" : "#3f3f46")
                    : skill.color;

                  const hoverTextColor = isDark ? "#ffffff" : "#000000";

                  return (
                    <motion.div
                      layout
                      key={skill.name}
                      onHoverStart={() => setHoveredIndex(globalIndex)}
                      onHoverEnd={() => setHoveredIndex(null)}
                      onClick={() => setHoveredIndex(isHovered ? null : globalIndex)} // 모바일 대응
                      className="relative flex flex-col p-4 rounded-2xl border border-border/30 bg-secondary/15 backdrop-blur-xs cursor-pointer select-none text-foreground font-semibold text-sm transition-all overflow-hidden"
                      animate={{
                        borderColor: isHovered ? hoverColor : "rgba(128, 128, 128, 0.15)",
                        boxShadow: isHovered 
                          ? `0 12px 30px -10px ${skill.glowColor}` 
                          : "0 4px 6px -1px rgba(0, 0, 0, 0.02)",
                        backgroundColor: isHovered
                          ? (isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)")
                          : (isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(0, 0, 0, 0.01)")
                      }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      {/* 카드 상단 영역 (기본 정보) */}
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3 min-w-0">
                          {/* 단일 스킬일 때만 아이콘 좌측 노출 */}
                          {!isGroup && (
                            <div 
                              className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors shrink-0 p-1"
                              style={{ 
                                backgroundColor: isDark
                                  ? (SOLID_LOGOS.includes(skill.name) ? "transparent" : "#ffffff")
                                  : `${skill.color}15`,
                                color: skill.color
                              }}
                            >
                              {SKILL_LOGOS[skill.name] ? (
                                SKILL_LOGOS[skill.name]
                              ) : (
                                <span className="text-[10px] font-bold">{skill.name.substring(0, 2)}</span>
                              )}
                            </div>
                          )}
                          <div className="flex flex-col min-w-0 justify-center">
                            <span className="truncate text-sm font-bold tracking-tight">{skill.name}</span>
                          </div>
                        </div>

                        {/* 그룹 스킬일 때 개수 뱃지 노출 */}
                        {isGroup && (
                          <div className="flex items-center justify-center px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-accent/15 text-accent-foreground border border-accent/20 shrink-0">
                            +{skill.subSkills?.length}
                          </div>
                        )}
                      </div>

                      {/* 단일 스킬 설명글 (기본 및 호버 시 노출) */}
                      {!isGroup && skill.description && (
                        <p className="text-xs text-muted-foreground font-normal leading-relaxed mt-2.5">
                          {skill.description}
                        </p>
                      )}

                      {/* 그룹 스킬의 디폴트 상태: 하단에 작은 로고 목록 보여주기 */}
                      {isGroup && skill.subSkills && (
                        <div className="mt-2.5">
                          {/* 접혔을 때의 로고들 미리보기: 호버 시 높이와 투명도가 0으로 수축 */}
                          <motion.div
                            animate={{
                              height: isHovered ? 0 : "auto",
                              opacity: isHovered ? 0 : 1,
                              marginTop: isHovered ? 0 : 10,
                            }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="overflow-hidden flex items-center gap-1.5"
                          >
                            {skill.subSkills.map((sub) => {
                              const subIsNeutral = sub.name === "Next.js" || sub.name === "Express.js";
                              const subIconColor = subIsNeutral ? (isDark ? "#ffffff" : "#000000") : sub.color;
                              const isSolid = SOLID_LOGOS.includes(sub.name);
                              const subIconBg = isDark
                                ? (isSolid ? "transparent" : "#ffffff")
                                : (subIsNeutral 
                                    ? "rgba(0, 0, 0, 0.08)" 
                                    : `${sub.color}15`);

                              return (
                                <div
                                  key={sub.name}
                                  className="w-6 h-6 rounded-md flex items-center justify-center p-0.5 border border-border/20 shrink-0"
                                  style={{ backgroundColor: subIconBg, color: subIconColor }}
                                  title={sub.name}
                                >
                                  {SKILL_LOGOS[sub.name] ? (
                                    SKILL_LOGOS[sub.name]
                                  ) : (
                                    <span className="text-[8px] font-bold">{sub.name.substring(0, 2)}</span>
                                  )}
                                </div>
                              );
                            })}
                          </motion.div>

                          {/* 호버/확장 시 상세 스킬 목록 애니메이션 펼침: 호버 시 높이와 투명도가 자동/1로 팽창 */}
                          <motion.div
                            initial={false}
                            animate={{
                              height: isHovered ? "auto" : 0,
                              opacity: isHovered ? 1 : 0,
                              marginTop: isHovered ? 12 : 0,
                            }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden space-y-3 pt-3"
                            style={{ 
                              borderTopWidth: isHovered ? 1 : 0,
                              borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
                              borderStyle: "solid"
                            }}
                          >
                            {(() => {
                              const rolesInSkill = Array.from(
                                new Set(
                                  skill.subSkills
                                    .map((sub: any) => sub.role)
                                    .filter(Boolean)
                                )
                              ) as string[];

                              rolesInSkill.sort((a, b) => {
                                const order: Record<string, number> = { FE: 1, BE: 2 };
                                return (order[a] || 99) - (order[b] || 99);
                              });

                              const hasRoles = rolesInSkill.length > 0;

                              if (hasRoles) {
                                return (
                                  <div className="space-y-4">
                                    {rolesInSkill.map((role) => {
                                      const subs = skill.subSkills.filter(
                                        (sub: any) => sub.role === role
                                      );
                                      if (subs.length === 0) return null;

                                      return (
                                        <div key={role} className="space-y-2.5">
                                          {/* FE / BE Badge Header */}
                                          <div className="flex items-center gap-2">
                                            <span className="text-[9px] font-extrabold tracking-wider px-1.5 py-0.5 rounded-md bg-accent/15 text-accent-foreground border border-accent/25">
                                              {role}
                                            </span>
                                            <div className="h-[1px] flex-grow bg-border/15" />
                                          </div>

                                          {/* Subskills under this role */}
                                          <div className="space-y-3">
                                            {subs.map((sub) => {
                                              const subIsNeutral = sub.name === "Next.js" || sub.name === "Express.js";
                                              const subIconColor = subIsNeutral ? (isDark ? "#ffffff" : "#000000") : sub.color;
                                              const isSolid = SOLID_LOGOS.includes(sub.name);
                                              const subIconBg = isDark
                                                ? (isSolid ? "transparent" : "#ffffff")
                                                : (subIsNeutral 
                                                    ? "rgba(0, 0, 0, 0.08)" 
                                                    : `${sub.color}15`);

                                              return (
                                                <div key={sub.name} className="flex flex-col gap-1.5 pl-1">
                                                  <div className="flex items-center gap-2">
                                                    <div 
                                                      className="w-5 h-5 rounded-md flex items-center justify-center p-0.5 border border-border/10 shrink-0"
                                                      style={{ backgroundColor: subIconBg, color: subIconColor }}
                                                    >
                                                      {SKILL_LOGOS[sub.name] ? (
                                                        SKILL_LOGOS[sub.name]
                                                      ) : (
                                                        <span className="text-[8px] font-bold">{sub.name.substring(0, 2)}</span>
                                                      )}
                                                    </div>
                                                    <div className="flex items-center">
                                                      <span className="text-xs font-bold">{sub.name}</span>
                                                    </div>
                                                  </div>
                                                  <p className="text-[10px] text-muted-foreground/90 font-normal leading-relaxed pl-7">
                                                    {sub.description}
                                                  </p>
                                                </div>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                );
                              }

                              // Default layout (no roles)
                              return (
                                <div className="space-y-3">
                                  {skill.subSkills.map((sub) => {
                                    const subIsNeutral = sub.name === "Next.js" || sub.name === "Express.js";
                                    const subIconColor = subIsNeutral ? (isDark ? "#ffffff" : "#000000") : sub.color;
                                    const isSolid = SOLID_LOGOS.includes(sub.name);
                                    const subIconBg = isDark
                                      ? (isSolid ? "transparent" : "#ffffff")
                                      : (subIsNeutral 
                                          ? "rgba(0, 0, 0, 0.08)" 
                                          : `${sub.color}15`);

                                    return (
                                      <div key={sub.name} className="flex flex-col gap-1.5 pl-1">
                                        <div className="flex items-center gap-2">
                                          <div 
                                            className="w-5 h-5 rounded-md flex items-center justify-center p-0.5 border border-border/10 shrink-0"
                                            style={{ backgroundColor: subIconBg, color: subIconColor }}
                                          >
                                            {SKILL_LOGOS[sub.name] ? (
                                              SKILL_LOGOS[sub.name]
                                            ) : (
                                              <span className="text-[8px] font-bold">{sub.name.substring(0, 2)}</span>
                                            )}
                                          </div>
                                          <div className="flex items-center">
                                            <span className="text-xs font-bold">{sub.name}</span>
                                          </div>
                                        </div>
                                        <p className="text-[10px] text-muted-foreground/90 font-normal leading-relaxed pl-7">
                                          {sub.description}
                                        </p>
                                      </div>
                                    );
                                  })}
                                </div>
                              );
                            })()}
                          </motion.div>
                        </div>
                      )}
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
