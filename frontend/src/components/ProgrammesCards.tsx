"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useAnimationControls,
  useInView,
} from "framer-motion";
import { ArrowUpRight, CalendarDays, Clock3, Sparkles } from "lucide-react";

type Programme = {
  title: string;
  day: string;
  time: string;
};

type Props = {
  programmes: Programme[];
};

type CardPose = {
  index: number;
  huddleX: number;
  huddleY: number;
  startX: number;
  startY: number;
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

// Each card has its own movement during the chaotic huddle.
const chaosA = [
  { x: -42, y: -30, rotate: -13 },
  { x: 35, y: -25, rotate: 15 },
  { x: -28, y: 30, rotate: 11 },
  { x: 40, y: 28, rotate: -14 },
];

const chaosB = [
  { x: 35, y: 24, rotate: 16 },
  { x: -40, y: 30, rotate: -18 },
  { x: 38, y: -32, rotate: -12 },
  { x: -35, y: -28, rotate: 19 },
];

const chaosC = [
  { x: -24, y: 34, rotate: -18 },
  { x: 28, y: -35, rotate: 20 },
  { x: 42, y: 20, rotate: 15 },
  { x: -42, y: -18, rotate: -20 },
];

const huddleVariants = {
  initial: (pose: CardPose) => ({
    x: pose.huddleX + pose.startX,
    y: pose.huddleY + pose.startY,
    rotate: pose.index % 2 === 0 ? -18 : 18,
    scale: 0.82,
    opacity: 0,
    filter: "blur(7px)",
  }),

  // Everyone rushes into a close, but imperfect, huddle.
  huddle: (pose: CardPose) => ({
    x: pose.huddleX,
    y: pose.huddleY,
    rotate: pose.index % 2 === 0 ? -8 : 8,
    scale: 0.91,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: "easeOut" as const,
    },
  }),

  // They start nudging and bumping into one another.
  chaosA: (pose: CardPose) => ({
    x: pose.huddleX + chaosA[pose.index % 4].x,
    y: pose.huddleY + chaosA[pose.index % 4].y,
    rotate: chaosA[pose.index % 4].rotate,
    scale: pose.index % 2 === 0 ? 0.94 : 0.87,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeInOut" as const,
    },
  }),

  // They shuffle around, trying to make room.
  chaosB: (pose: CardPose) => ({
    x: pose.huddleX + chaosB[pose.index % 4].x,
    y: pose.huddleY + chaosB[pose.index % 4].y,
    rotate: chaosB[pose.index % 4].rotate,
    scale: pose.index % 2 === 0 ? 0.86 : 0.95,
    opacity: 1,
    transition: {
      duration: 0.72,
      ease: "easeInOut" as const,
    },
  }),

  // One final, disorderly adjustment before they get caught.
  chaosC: (pose: CardPose) => ({
    x: pose.huddleX + chaosC[pose.index % 4].x,
    y: pose.huddleY + chaosC[pose.index % 4].y,
    rotate: chaosC[pose.index % 4].rotate,
    scale: 0.9,
    opacity: 1,
    transition: {
      duration: 0.65,
      ease: "easeInOut" as const,
    },
  }),

  // FREEZE! They have noticed someone watching.
  caught: (pose: CardPose) => ({
    x: pose.huddleX + chaosC[pose.index % 4].x,
    y: pose.huddleY + chaosC[pose.index % 4].y,
    rotate: chaosC[pose.index % 4].rotate * 0.65,
    scale: 0.91,
    opacity: 1,
    transition: {
      duration: 0.12,
      ease: "linear" as const,
    },
  }),

  // Panic! They attempt to return to their original positions.
  scramble: (pose: CardPose) => ({
    x: pose.huddleX * 0.3,
    y: pose.huddleY * 0.3,
    rotate: pose.index % 2 === 0 ? -5 : 5,
    scale: 0.97,
    opacity: 1,
    transition: {
      duration: 0.42,
      ease: "easeIn" as const,
    },
  }),

  // They land back in the correct grid positions.
  settle: (pose: CardPose) => ({
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 150,
      damping: 12,
      mass: 0.75,
      delay: pose.index * 0.055,
    },
  }),
};

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export default function ProgrammeCards({ programmes }: Props) {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const controls = useAnimationControls();
  const [poses, setPoses] = useState<CardPose[]>([]);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.15,
  });

  useEffect(() => {
    if (!programmes?.length || !isInView) return;

    if (reduceMotion) {
      controls.set("settle");
      return;
    }

    let cancelled = false;

    const playEntrance = async () => {
      const grid = sectionRef.current;

      if (!grid) return;

      const gridRect = grid.getBoundingClientRect();

      // Use the actual grid centre, regardless of screen size.
      const centreX = gridRect.left + gridRect.width / 2;
      const centreY = gridRect.top + gridRect.height / 2;

      // Keep the huddle slightly uneven so the cards feel alive.
      const clusterOffsets = [
        { x: -32, y: -24 },
        { x: 35, y: -18 },
        { x: -24, y: 26 },
        { x: 30, y: 28 },
      ];

      const nextPoses: CardPose[] = [];

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const cardCentreX = rect.left + rect.width / 2;
        const cardCentreY = rect.top + rect.height / 2;
        const offset = clusterOffsets[index % 4];

        // Move each card towards the common huddle point.
        // This also makes the animation work on mobile, where
        // the cards are stacked vertically rather than in a row.
        const huddleX = centreX - cardCentreX + offset.x;
        const huddleY = centreY - cardCentreY + offset.y;

        const starts = [
          { x: -90, y: -75 },
          { x: 90, y: -65 },
          { x: -75, y: 80 },
          { x: 80, y: 75 },
        ];

        nextPoses.push({
          index,
          huddleX,
          huddleY,
          startX: starts[index % 4].x,
          startY: starts[index % 4].y,
        });
      });

      if (cancelled) return;

      setPoses(nextPoses);

      // Let React apply the measured poses before starting.
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => resolve());
      });

      if (cancelled) return;

      // 1. Sneak into the huddle.
      await controls.start("huddle");
      if (cancelled) return;
      await wait(150);

      // 2. Bump and shuffle around.
      await controls.start("chaosA");
      if (cancelled) return;
      await wait(80);

      await controls.start("chaosB");
      if (cancelled) return;
      await wait(120);

      await controls.start("chaosC");
      if (cancelled) return;
      await wait(250);

      // 3. They suddenly realise they have been spotted.
      await controls.start("caught");
      if (cancelled) return;

      // Hold the awkward freeze so the joke actually lands.
      await wait(900);
      if (cancelled) return;

      // 4. Everyone scrambles back to their own place.
      await controls.start("scramble");
      if (cancelled) return;

      await controls.start("settle");
    };

    void playEntrance();

    return () => {
      cancelled = true;
    };
  }, [isInView, reduceMotion, controls, programmes]);

  if (!programmes?.length) {
    return null;
  }

  return (
    <div ref={sectionRef} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {programmes.map((programme, i) => {
        const theme = themes[i % themes.length];
        const pose = poses[i] ?? {
          index: i,
          huddleX: 0,
          huddleY: 0,
          startX: 0,
          startY: 0,
        };

        return (
          <motion.div
            key={`${programme.title}-${i}`}
            ref={(element) => {
              cardRefs.current[i] = element;
            }}
            className="relative h-full"
            custom={pose}
            variants={huddleVariants}
            initial={reduceMotion ? "settle" : "initial"}
            animate={controls}
            style={{ transformOrigin: "center center" }}
          >
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
                delay: 6.2 + i * 0.2,
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
