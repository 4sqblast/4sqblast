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
    glow: "bg-[#B8CBB0]/20",
    accent: "text-[#B8CBB0]",
    border: "border-white/15",
    tag: "THE COMMUNITY",
  },
  {
    card: "bg-gradient-to-br from-[#D8E4D0] via-[#B8CBB0] to-[#91AD8C] text-[#183F37]",
    glow: "bg-white/35",
    accent: "text-[#315D4D]",
    border: "border-[#183F37]/15",
    tag: "THE PRAYER ROOM",
  },
  {
    card: "bg-gradient-to-br from-[#F08060] via-[#D96849] to-[#B94934] text-white",
    glow: "bg-[#FFD6A6]/25",
    accent: "text-[#FFE0B8]",
    border: "border-white/20",
    tag: "THE BREAKTHROUGH",
  },
  {
    card: "bg-gradient-to-br from-white via-[#F5F2E9] to-[#DCE8D8] text-[#183F37]",
    glow: "bg-[#B8CBB0]/40",
    accent: "text-[#547A61]",
    border: "border-[#183F37]/15",
    tag: "THE ENCOUNTER",
  },
];

const directions = [
  { x: -65, y: 24, rotate: -3 },
  { x: 65, y: 24, rotate: 3 },
  { x: -65, y: 24, rotate: -3 },
  { x: 65, y: 24, rotate: 3 },
];

export default function ProgrammeCards({ programmes }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {programmes.map((programme, i) => {
        const theme = themes[i % themes.length];
        const direction = directions[i % directions.length];

        return (
          <motion.article
            key={`${programme.title}-${i}`}
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: direction.x,
                    y: direction.y,
                    rotate: direction.rotate,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
              y: 0,
              rotate: 0,
            }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.7,
              delay: reduceMotion ? 0 : (i % 4) * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={
              reduceMotion
                ? undefined
                : { y: -7, rotate: i % 2 === 0 ? 1 : -1 }
            }
            className={`group relative isolate flex min-h-[285px] flex-col justify-between overflow-hidden rounded-[2rem] border ${theme.border} ${theme.card} p-6 shadow-lg shadow-black/5 sm:min-h-[300px]`}
          >
            {/* Decorative background elements */}
            <div
              className={`pointer-events-none absolute -right-12 -top-14 -z-10 size-44 rounded-full blur-2xl transition duration-700 group-hover:scale-125 ${theme.glow}`}
            />

            <div className="pointer-events-none absolute -bottom-20 -left-12 -z-10 size-48 rounded-full border border-current/10" />
            <div className="pointer-events-none absolute -bottom-14 -left-6 -z-10 size-36 rounded-full border border-current/10" />

            <span className="pointer-events-none absolute right-3 top-12 -z-10 select-none text-[8rem] font-black leading-none tracking-tighter opacity-[0.07]">
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Card header */}
            <div className="flex items-start justify-between gap-3">
              <div className="grid size-11 place-items-center rounded-2xl border border-current/15 bg-white/10 backdrop-blur-sm">
                <Sparkles size={19} strokeWidth={1.7} />
              </div>

              <span className="rounded-full border border-current/15 bg-white/10 px-3 py-1.5 text-[9px] font-black tracking-[0.15em] backdrop-blur-sm">
                {String(i + 1).padStart(2, "0")} /{" "}
                {String(programmes.length).padStart(2, "0")}
              </span>
            </div>

            {/* Card content */}
            <div className="relative mt-10">
              <p className={`mb-3 text-[9px] font-black tracking-[0.2em] ${theme.accent}`}>
                {theme.tag}
              </p>

              <h3 className="max-w-[17rem] text-2xl font-black leading-[1.08] tracking-[-0.045em] sm:text-[1.65rem]">
                {programme.title}
              </h3>

              <div className="mt-5 space-y-2.5 border-t border-current/15 pt-4">
                <p className="flex items-start gap-2.5 text-xs font-medium leading-relaxed opacity-80">
                  <CalendarDays className="mt-0.5 shrink-0" size={14} />
                  <span>{programme.day}</span>
                </p>

                <p className="flex items-center gap-2.5 text-xs font-medium opacity-80">
                  <Clock3 className="shrink-0" size={14} />
                  <span>{programme.time}</span>
                </p>
              </div>
            </div>

            {/* Bottom accent */}
            <div className="absolute right-5 top-[4.35rem] grid size-9 place-items-center rounded-full border border-current/15 bg-white/10 transition duration-300 group-hover:rotate-45 group-hover:scale-110">
              <ArrowUpRight size={17} />
            </div>

            <div className="pointer-events-none absolute bottom-0 left-6 right-6 h-1 origin-left scale-x-0 rounded-full bg-current/40 transition-transform duration-500 group-hover:scale-x-100" />
          </motion.article>
        );
      })}
    </div>
  );
}