"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CalendarDays, Clock3, Sparkles } from "lucide-react";

type Programme = {
  title: string;
  day: string;
  time: string;
};

type Props = {
  programmes: Programme[];
};

const themes = [
  {
    card: "bg-gradient-to-br from-[#24574B] via-[#183F37] to-[#102D28] text-white",
    glow: "bg-[#B8CBB0]/30",
    accent: "text-[#B8CBB0]",
    border: "border-white/15",
    tag: "THE COMMUNITY",
  },
  {
    card: "bg-gradient-to-br from-[#D8E4D0] via-[#B8CBB0] to-[#91AD8C] text-[#183F37]",
    glow: "bg-white/50",
    accent: "text-[#315D4D]",
    border: "border-[#183F37]/15",
    tag: "THE PRAYER ROOM",
  },
  {
    card: "bg-gradient-to-br from-[#F08060] via-[#D96849] to-[#B94934] text-white",
    glow: "bg-[#FFD6A6]/35",
    accent: "text-[#FFE0B8]",
    border: "border-white/20",
    tag: "THE BREAKTHROUGH",
  },
  {
    card: "bg-gradient-to-br from-white via-[#F5F2E9] to-[#DCE8D8] text-[#183F37]",
    glow: "bg-[#B8CBB0]/45",
    accent: "text-[#547A61]",
    border: "border-[#183F37]/15",
    tag: "THE ENCOUNTER",
  },
];

const entranceVariants = [
  { x: -110, y: 25, rotate: -10, scale: 0.75 },
  { x: 110, y: 35, rotate: 10, scale: 0.75 },
  { x: -35, y: 110, rotate: -7, scale: 0.8 },
  { x: 35, y: -100, rotate: 7, scale: 0.8 },
];

export default function ProgrammeCards({ programmes }: Props) {
  const reduceMotion = useReducedMotion();

  if (!programmes?.length) {
    return null;
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {programmes.map((programme, i) => {
        const theme = themes[i % themes.length];
        const entrance = entranceVariants[i % entranceVariants.length];

        return (
          <motion.div
            key={`${programme.title}-${i}`}
            className="h-full"
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    ...entrance,
                    filter: "blur(10px)",
                  }
            }
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{
              duration: reduceMotion ? 0 : 1,
              delay: reduceMotion ? 0 : i * 0.18,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* The inner card handles its own pulse, independently */}
            <motion.article
              className={`group relative isolate flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-[2rem] border p-6 shadow-lg shadow-black/10 sm:min-h-[320px] ${theme.border} ${theme.card}`}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      scale: [1, 1.018, 1],
                      y: [0, -3, 0],
                    }
              }
              transition={{
                duration: 2.8,
                delay: 1.2 + i * 0.2,
                repeat: Infinity,
                repeatDelay: 0.25,
                ease: "easeInOut",
              }}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -8,
                      scale: 1.035,
                      rotate: i % 2 === 0 ? 1 : -1,
                      transition: { duration: 0.25 },
                    }
              }
            >
              {/* Animated gradient atmosphere */}
              <motion.div
                aria-hidden="true"
                className={`pointer-events-none absolute -right-14 -top-16 -z-10 size-48 rounded-full blur-3xl ${theme.glow}`}
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        x: [0, -18, 12, 0],
                        y: [0, 16, -8, 0],
                        scale: [0.8, 1.2, 0.95, 0.8],
                        opacity: [0.5, 0.95, 0.65, 0.5],
                      }
                }
                transition={{
                  duration: 6 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-20 -left-12 -z-10 size-48 rounded-full bg-white/10 blur-3xl"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        x: [0, 18, -8, 0],
                        y: [0, -12, 8, 0],
                        opacity: [0.15, 0.5, 0.2, 0.15],
                      }
                }
                transition={{
                  duration: 7 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4,
                }}
              />

              {/* Decorative rings */}
              <div className="pointer-events-none absolute -bottom-20 -left-12 -z-10 size-48 rounded-full border border-current/10" />
              <div className="pointer-events-none absolute -bottom-14 -left-5 -z-10 size-32 rounded-full border border-current/10" />

              {/* Large background number */}
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute right-2 top-10 -z-10 select-none text-[8rem] font-black leading-none tracking-tighter opacity-[0.07]"
                animate={
                  reduceMotion
                    ? undefined
                    : { y: [0, -7, 0], rotate: [0, 3, 0] }
                }
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </motion.span>

              {/* Header */}
              <div className="relative flex items-start justify-between gap-3">
                <motion.div
                  className="grid size-11 place-items-center rounded-2xl border border-current/15 bg-white/10 backdrop-blur-sm"
                  animate={
                    reduceMotion
                      ? undefined
                      : { rotate: [0, 8, -5, 0], scale: [1, 1.08, 1] }
                  }
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles size={19} strokeWidth={1.7} />
                </motion.div>

                <span className="rounded-full border border-current/15 bg-white/10 px-3 py-1.5 text-[9px] font-black tracking-[0.15em] backdrop-blur-sm">
                  {String(i + 1).padStart(2, "0")} /{" "}
                  {String(programmes.length).padStart(2, "0")}
                </span>
              </div>

              {/* Programme details */}
              <div className="relative mt-10">
                <p
                  className={`mb-3 text-[9px] font-black tracking-[0.2em] ${theme.accent}`}
                >
                  {theme.tag}
                </p>

                <h3 className="max-w-[17rem] text-2xl font-black leading-[1.08] tracking-[-0.045em] sm:text-[1.65rem]">
                  {programme.title}
                </h3>

                <div className="mt-5 space-y-2.5 border-t border-current/15 pt-4">
                  <p className="flex items-start gap-2.5 text-xs font-medium leading-relaxed opacity-85">
                    <CalendarDays className="mt-0.5 shrink-0" size={14} />
                    <span>{programme.day}</span>
                  </p>

                  <p className="flex items-center gap-2.5 text-xs font-medium opacity-85">
                    <Clock3 className="shrink-0" size={14} />
                    <span>{programme.time}</span>
                  </p>
                </div>
              </div>

              {/* Floating action icon */}
              <motion.div
                className="absolute right-5 top-[4.35rem] grid size-9 place-items-center rounded-full border border-current/15 bg-white/10"
                whileHover={
                  reduceMotion ? undefined : { rotate: 45, scale: 1.15 }
                }
                transition={{ duration: 0.25 }}
              >
                <ArrowUpRight size={17} />
              </motion.div>

              {/* Hover accent */}
              <div className="pointer-events-none absolute bottom-0 left-6 right-6 h-1 origin-left scale-x-0 rounded-full bg-current/50 transition-transform duration-500 group-hover:scale-x-100" />
            </motion.article>
          </motion.div>
        );
      })}
    </div>
  );
}
