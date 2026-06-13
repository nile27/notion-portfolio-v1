"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/data";
import { Section } from "@/components/layout/section";

export function HeroSection() {
  const { hero } = portfolioData;

  return (
    <Section className="relative flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4 overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-primary/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-accent/20 blur-[120px] animate-pulse [animation-delay:2s]" />
      </div>

      <div className="container max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 text-left"
        >
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="display-hero font-bold tracking-tight text-foreground text-5xl sm:text-7xl leading-[1.1]"
            >
              {hero.title.split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-3 last:mr-0">
                  {word}
                </span>
              ))}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl font-medium text-muted-foreground leading-relaxed"
            >
              {hero.subtitle}
            </motion.p>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="max-w-[500px] text-lg text-muted-foreground/80 border-0 outline-none border-primary/30 "
          >
            {hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <a
              href="#projects"
              className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-10 text-sm font-bold text-background transition-all hover:scale-105 hover:shadow-lg active:scale-95"
            >
              View Projects
            </a>
            <a
              href="#about"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-background px-10 text-sm font-bold transition-all hover:bg-secondary hover:scale-105 active:scale-95"
            >
              About Me
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="h-12 w-px bg-linear-to-b from-primary to-transparent animate-shimmer" />
      </motion.div>
    </Section>
  );
}
