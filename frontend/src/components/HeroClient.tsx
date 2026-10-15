"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Heart,
  Play,
  Sparkles,
  Users,
} from "lucide-react";

type HeroClientProps = {
  images: string[];
};

const tickerItems = [
  "Worship",
  "The Word",
  "Real Community",
  "Bold Faith",
  "Purpose",
  "A Place to Become",
];

export default function HeroClient({ images }: HeroClientProps) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (images.length <= 1) return;

    const id = setInterval(() => {
      setActive((previous) => (previous + 1) % images.length);
    }, 5500);

    return () => clearInterval(id);
  }, [images.length]);

  const primaryImage = images.length ? images[active % images.length] : null;

  const secondaryImage =
    images.length > 1 ? images[(active + 1) % images.length] : null;

  const renderLetters = (text: string, offset = 0) =>
    Array.from(text).map((character, index) => {
      const letterIndex = offset + index;
      const tilt = letterIndex % 2 === 0 ? -16 : 16;

      return (
        <motion.span
          key={`${offset}-${index}`}
          aria-hidden="true"
          className="inline-block"
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 28 + (letterIndex % 3) * 8,
                  rotate: tilt,
                  scale: 0.55,
                }
          }
          animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
          transition={{
            duration: 0.7,
            delay: reduceMotion ? 0 : letterIndex * 0.045,
            type: "spring",
            stiffness: 180,
            damping: 12,
          }}
        >
          <motion.span
            className="inline-block"
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, -3, 0, 2, 0],
                    rotate: [
                      0,
                      letterIndex % 2 === 0 ? 3 : -3,
                      0,
                      letterIndex % 2 === 0 ? -2 : 2,
                      0,
                    ],
                  }
            }
            transition={{
              duration: 2.6 + (letterIndex % 5) * 0.18,
              delay: 1.2 + (letterIndex % 7) * 0.07,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {character === " " ? "\u00A0" : character}
          </motion.span>
        </motion.span>
      );
    });

  return (
    <section className="relative isolate overflow-hidden bg-[#F0E7FF] pt-28 sm:pt-32">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-20 size-[30rem] rounded-full bg-[#C6ACF5]/45 blur-3xl" />
        <div className="absolute -right-40 top-32 size-[32rem] rounded-full bg-white/80 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 size-72 rounded-full bg-[#BA83E8]/15 blur-3xl" />

        <span className="absolute -left-8 top-32 select-none text-[15rem] font-black leading-none tracking-tighter text-[#7045B4]/[0.035] sm:text-[23rem]">
          BLAST
        </span>

        <div className="absolute right-[8%] top-36 size-20 rounded-full border border-[#7045B4]/10" />
        <div className="absolute right-[10%] top-40 size-12 rounded-full border border-[#7045B4]/10" />
      </div>

      <div className="container-wide relative grid items-center gap-12 pb-16 pt-8 sm:pb-20 lg:min-h-[690px] lg:grid-cols-[0.92fr_1.08fr] lg:gap-8 lg:py-16">
        {/* Hero copy */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20"
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#7045B4]/15 bg-white/65 px-4 py-2.5 shadow-sm shadow-[#30204F]/5 backdrop-blur-md">
            <span className="grid size-6 place-items-center rounded-full bg-[#E2D3FF] text-[#7045B4]">
              <Sparkles size={13} />
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.17em] text-[#7045B4] sm:text-xs">
              A church for the becoming
            </span>
          </div>

          <h1
            aria-label="Faith that moves. People who make a difference."
            className="max-w-2xl text-[4rem] font-black leading-[0.88] tracking-[-0.075em] text-[#30204F] sm:text-7xl lg:text-[6.5rem]"
          >
            {renderLetters("Faith that", 0)}
            <br />

            <span className="blast-pulse-slow relative inline-block text-[#8B51C1]">
              {renderLetters("moves.", 11)}

              <svg
                viewBox="0 0 290 20"
                fill="none"
                aria-hidden="true"
                className="absolute -bottom-3 left-0 w-full"
              >
                <path
                  d="M5 13C70 2 187 3 284 11"
                  stroke="#BA83E8"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </span>

            <br />

            <motion.div
              className="relative mt-5 block text-[0.53em] font-bold leading-tight tracking-[-0.045em] text-[#30204F]/75"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="block">People who make a</span>

              <motion.span
                className="relative mt-2 inline-block py-3 pr-5 font-black leading-[0.95] tracking-[-0.085em]"
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, scale: 0.8, rotate: -5, x: -14 }
                }
                animate={
                  reduceMotion
                    ? { opacity: 1 }
                    : {
                        opacity: 1,
                        scale: [0.8, 1.06, 0.98, 1],
                        rotate: [-5, 2, -1, 0],
                        x: [-14, 5, -3, 0],
                      }
                }
                transition={{
                  duration: 0.9,
                  delay: 0.55,
                  times: [0, 0.45, 0.75, 1],
                  ease: "easeOut",
                }}
              >
                {/* Loose, irregular storm energy, not a background panel */}
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-x-8 -inset-y-5 -z-10"
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: [0.05, 0.8, 0.12, 0.65, 0.08],
                          scaleX: [0.8, 1.15, 0.95, 1.2, 0.9],
                          skewX: [0, -12, 7, -5, 0],
                        }
                  }
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    repeatDelay: 1.2,
                    ease: "easeInOut",
                  }}
                  style={{
                    background:
                      "radial-gradient(ellipse at 48% 55%, rgba(255,45,64,0.35), transparent 58%)",
                    filter: "blur(13px)",
                  }}
                />

                {/* Red glitch layer */}
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-3 z-0 select-none whitespace-nowrap text-[#FF2948]"
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          x: [0, -7, 5, -3, 0],
                          y: [0, 2, -2, 1, 0],
                          skewX: [0, -9, 5, -3, 0],
                          opacity: [0, 0.9, 0.15, 0.75, 0],
                          clipPath: [
                            "inset(0 0 85% 0)",
                            "inset(15% 0 55% 0)",
                            "inset(55% 0 20% 0)",
                            "inset(25% 0 45% 0)",
                            "inset(0 0 85% 0)",
                          ],
                        }
                  }
                  transition={{
                    duration: 0.55,
                    repeat: Infinity,
                    repeatDelay: 2.1,
                    ease: "linear",
                  }}
                >
                  difference.
                </motion.span>

                {/* Violet glitch layer */}
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-3 z-0 select-none whitespace-nowrap text-[#8B51C1]"
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          x: [0, 6, -4, 0],
                          y: [0, -2, 3, 0],
                          skewX: [0, 8, -4, 0],
                          opacity: [0, 0.8, 0.2, 0],
                          clipPath: [
                            "inset(75% 0 0 0)",
                            "inset(45% 0 25% 0)",
                            "inset(10% 0 65% 0)",
                            "inset(75% 0 0 0)",
                          ],
                        }
                  }
                  transition={{
                    duration: 0.45,
                    repeat: Infinity,
                    repeatDelay: 2.7,
                    ease: "linear",
                  }}
                >
                  difference.
                </motion.span>

                {/* Main word, deliberately oversized and unstable */}
                <motion.span
                  className="relative z-10 inline-block bg-gradient-to-b from-[#30204F] via-[#8B51C1] to-[#FF3D4F] bg-clip-text text-transparent"
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          filter: [
                            "drop-shadow(0 0 0px rgba(255,45,64,0))",
                            "drop-shadow(2px 0 7px rgba(255,45,64,0.85))",
                            "drop-shadow(-2px 0 2px rgba(139,81,193,0.65))",
                            "drop-shadow(0 0 0px rgba(255,45,64,0))",
                          ],
                        }
                  }
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    repeatDelay: 0.8,
                    ease: "easeInOut",
                  }}
                >
                  difference.
                </motion.span>

                {/* Lightning slash cutting through the word */}
                <motion.svg
                  aria-hidden="true"
                  viewBox="0 0 300 100"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute -left-8 top-[-20%] z-20 h-[145%] w-[115%] overflow-visible"
                  animate={
                    reduceMotion
                      ? { opacity: 0.65 }
                      : {
                          opacity: [0, 0, 1, 0.9, 0, 0, 0.7, 0],
                          x: [0, 0, 3, -2, 0, 0, -3, 0],
                          scaleY: [1, 1, 1.12, 0.95, 1, 1, 1.05, 1],
                        }
                  }
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 0.45,
                    times: [0, 0.18, 0.22, 0.27, 0.34, 0.72, 0.76, 0.84],
                    ease: "linear",
                  }}
                >
                  <path
                    d="M-12 66 L45 48 L70 18 L92 52 L126 8 L142 40 L184 22 L166 53 L220 35 L250 8 L232 48 L315 23"
                    fill="none"
                    stroke="#FF263F"
                    strokeWidth="7"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    opacity="0.8"
                  />
                  <path
                    d="M-12 66 L45 48 L70 18 L92 52 L126 8 L142 40 L184 22 L166 53 L220 35 L250 8 L232 48 L315 23"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2.1"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                  />
                </motion.svg>

                {/* A second bolt, branching outside the word */}
                <motion.svg
                  aria-hidden="true"
                  viewBox="0 0 90 150"
                  className="pointer-events-none absolute -right-8 -top-9 z-20 h-28 w-16 overflow-visible"
                  animate={
                    reduceMotion
                      ? { opacity: 0.8 }
                      : {
                          opacity: [0, 0, 1, 0, 0, 0.9, 0],
                          rotate: [0, -4, 3, 0, 0, 5, 0],
                        }
                  }
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    repeatDelay: 0.7,
                    ease: "linear",
                  }}
                >
                  <path
                    d="M65 -10 L30 45 L53 42 L7 100 L32 65 L17 68 L48 15"
                    fill="none"
                    stroke="#FF263F"
                    strokeWidth="8"
                    strokeLinejoin="miter"
                  />
                  <path
                    d="M65 -10 L30 45 L53 42 L7 100 L32 65 L17 68 L48 15"
                    fill="none"
                    stroke="#FFF7F4"
                    strokeWidth="2.5"
                    strokeLinejoin="miter"
                  />
                  <path
                    d="M31 98 L20 119 L36 113 L28 146"
                    fill="none"
                    stroke="#FF5260"
                    strokeWidth="3"
                    strokeLinejoin="miter"
                  />
                </motion.svg>

                {/* Broken electric scar instead of a neat underline */}
                <motion.svg
                  aria-hidden="true"
                  viewBox="0 0 310 28"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute -bottom-2 -left-3 z-20 h-5 w-[112%] overflow-visible"
                  animate={
                    reduceMotion
                      ? { opacity: 1 }
                      : {
                          opacity: [0.75, 1, 0.55, 1, 0.8],
                          x: [0, 2, -1, 1, 0],
                          skewX: [0, -2, 1, -1, 0],
                        }
                  }
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatDelay: 0.2,
                    ease: "easeInOut",
                  }}
                >
                  <path
                    d="M-8 17 L35 12 L48 19 L76 7 L90 16 L124 5 L143 14 L169 8 L183 17 L216 4 L233 13 L257 7 L271 14 L320 2"
                    fill="none"
                    stroke="#FF2948"
                    strokeWidth="5"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                  />
                  <path
                    d="M-8 17 L35 12 L48 19 L76 7 L90 16 L124 5 L143 14 L169 8 L183 17 L216 4 L233 13 L257 7 L271 14 L320 2"
                    fill="none"
                    stroke="#FFF7F4"
                    strokeWidth="1.3"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                  />
                </motion.svg>

                {/* Escaping fragments */}
                {!reduceMotion && (
                  <>
                    <motion.span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-2 top-0 z-30 h-2 w-2 bg-[#FF2948]"
                      animate={{
                        x: [0, 17, 29],
                        y: [0, -14, -23],
                        rotate: [0, 80, 160],
                        opacity: [0, 1, 0],
                        scale: [0.4, 1, 0],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatDelay: 1.1,
                        ease: "easeOut",
                      }}
                    />

                    <motion.span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-[45%] -top-2 z-30 h-1.5 w-3 rotate-45 bg-[#8B51C1]"
                      animate={{
                        x: [0, -20, -33],
                        y: [0, -17, -30],
                        rotate: [45, 110, 190],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 0.7,
                        repeat: Infinity,
                        repeatDelay: 1.8,
                        ease: "easeOut",
                      }}
                    />

                    <motion.span
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-1 left-[70%] z-30 h-1.5 w-1.5 bg-[#FF684B]"
                      animate={{
                        x: [0, 14, 25],
                        y: [0, 12, 20],
                        rotate: [0, 90, 180],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 0.65,
                        repeat: Infinity,
                        repeatDelay: 1.4,
                        ease: "easeOut",
                      }}
                    />
                  </>
                )}
              </motion.span>
            </motion.div>
          </h1>

          <p className="mt-8 max-w-lg text-base leading-8 text-[#30204F]/70 sm:text-lg sm:leading-9">
            A vibrant community raising bold disciples, building real
            friendships and making Jesus known. Come as you are, discover who
            you can become.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/connect"
              className="group inline-flex items-center gap-3 rounded-full bg-[#30204F] px-6 py-4 text-sm font-black text-white shadow-xl shadow-[#30204F]/20 transition duration-300 hover:-translate-y-1 hover:bg-[#7045B4] hover:shadow-[#7045B4]/25"
            >
              Join the movement
              <span className="grid size-7 place-items-center rounded-full bg-white/15 transition group-hover:rotate-45">
                <ArrowUpRight size={16} />
              </span>
            </a>

            <a
              href="#programmes"
              className="group inline-flex items-center gap-2 rounded-full border border-[#7045B4]/20 bg-white/45 px-6 py-4 text-sm font-black text-[#30204F] backdrop-blur-sm transition hover:-translate-y-1 hover:border-[#7045B4]/40 hover:bg-white"
            >
              Explore BLAST
              <ArrowDown
                size={16}
                className="transition-transform group-hover:translate-y-1"
              />
            </a>
          </div>

          {/* Community indicators */}
          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[#7045B4]/15 pt-6">
            <div className="flex -space-x-2">
              {[
                "bg-[#8B51C1]",
                "bg-[#D6B9F5]",
                "bg-[#7045B4]",
                "bg-[#BA83E8]",
              ].map((color, index) => (
                <span
                  key={index}
                  className={`grid size-9 place-items-center rounded-full border-2 border-[#F0E7FF] ${color} text-white`}
                >
                  {index === 0 ? (
                    <Heart size={13} />
                  ) : index === 1 ? (
                    <Sparkles size={13} />
                  ) : index === 2 ? (
                    <Users size={13} />
                  ) : (
                    <span className="text-xs font-black">+</span>
                  )}
                </span>
              ))}
            </div>

            <div>
              <p className="text-xs font-black text-[#30204F]">
                More than a gathering.
              </p>
              <p className="mt-1 text-xs text-[#30204F]/55">
                A family growing together in faith.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Layered image composition */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mx-auto h-[440px] w-full max-w-[600px] sm:h-[560px] lg:h-[620px]"
        >
          {/* Decorative orbit */}
          <div className="pointer-events-none absolute right-3 top-6 aspect-square w-[75%] rounded-full border border-[#7045B4]/15 sm:right-8" />
          <div className="pointer-events-none absolute right-9 top-12 aspect-square w-[63%] rounded-full border border-[#7045B4]/10 sm:right-14" />

          <div className="absolute right-8 top-0 size-28 rounded-full bg-[#C6ACF5]/60 blur-3xl sm:right-16 sm:size-40" />

          {/* Main photo */}
          <div className="absolute right-4 top-8 h-[76%] w-[76%] rotate-[3deg] rounded-[2.4rem] bg-gradient-to-br from-[#7045B4] via-[#BA83E8] to-[#30204F] p-1.5 shadow-2xl shadow-[#30204F]/20 transition-transform duration-700 hover:rotate-0 sm:right-8 sm:top-10 sm:rounded-[3rem] sm:p-2">
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-[#D6B9F5] sm:rounded-[2.4rem]">
              {primaryImage ? (
                <AnimatePresence mode="wait">
                  <motion.img
                    key={primaryImage}
                    src={primaryImage}
                    alt="BLAST church community"
                    initial={reduceMotion ? false : { opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 size-full object-cover"
                  />
                </AnimatePresence>
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#30204F] via-[#7045B4] to-[#BA83E8] p-6 text-center text-white">
                  <Sparkles size={40} />
                  <p className="text-3xl font-black tracking-tight">BLAST.</p>
                  <p className="text-sm text-white/70">A place to become.</p>
                </div>
              )}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#30204F]/70 via-transparent to-[#30204F]/10" />

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 sm:bottom-7 sm:left-7 sm:right-7">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/70">
                    Believers Living And
                  </p>
                  <p className="mt-1 text-xl font-black tracking-tight text-white sm:text-2xl">
                    Succeeding Together.
                  </p>
                </div>

                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md">
                  <ArrowUpRight size={19} />
                </span>
              </div>
            </div>
          </div>

          {/* Secondary overlapping photo */}
          {secondaryImage && (
            <motion.div
              animate={
                reduceMotion
                  ? undefined
                  : { y: [0, -8, 0], rotate: [-5, -4, -5] }
              }
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-6 left-0 z-10 h-[37%] w-[43%] -rotate-[5deg] overflow-hidden rounded-[1.8rem] border-[5px] border-white bg-[#D6B9F5] shadow-2xl shadow-[#30204F]/20 sm:bottom-10 sm:left-1 sm:h-[40%] sm:w-[44%] sm:rounded-[2.2rem] sm:border-[7px]"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={secondaryImage}
                  src={secondaryImage}
                  alt="Another moment from the BLAST community"
                  initial={reduceMotion ? false : { opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 size-full object-cover"
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-[#30204F]/45 to-transparent" />
              <span className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-[#30204F]/40 px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-white backdrop-blur-md sm:bottom-4 sm:left-4">
                Life at BLAST
              </span>
            </motion.div>
          )}

          {/* Floating information card */}
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1 right-0 z-20 max-w-[190px] rounded-2xl border border-white/70 bg-white/85 p-4 shadow-xl shadow-[#30204F]/10 backdrop-blur-xl sm:bottom-4 sm:right-1 sm:max-w-[220px] sm:rounded-3xl sm:p-5"
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-xl bg-[#E2D3FF] text-[#7045B4]">
                <Heart size={15} />
              </span>
              <span className="text-[9px] font-black uppercase tracking-[0.15em] text-[#7045B4]">
                Find your people
              </span>
            </div>
            <p className="text-sm font-black leading-6 text-[#30204F] sm:text-base">
              Faith grows better together.
            </p>
          </motion.div>

          {/* Carousel navigation */}
          {images.length > 1 && (
            <div className="absolute right-0 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2 rounded-full border border-white/60 bg-white/65 p-2 shadow-lg backdrop-blur-xl sm:-right-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Show image ${index + 1}`}
                  aria-current={index === active ? "true" : undefined}
                  className={`w-2 rounded-full transition-all duration-300 ${
                    index === active
                      ? "h-7 bg-[#7045B4]"
                      : "h-2 bg-[#7045B4]/25 hover:bg-[#7045B4]/60"
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Moving brand ticker */}
      <div className="relative overflow-hidden border-y border-[#7045B4]/15 bg-white/45 py-4 backdrop-blur-md">
        <div className="marquee-track flex w-max items-center gap-6 whitespace-nowrap">
          {[0, 1, 2, 3].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy > 0 ? true : undefined}
              className="flex shrink-0 items-center gap-6"
            >
              {tickerItems.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#7045B4] sm:text-xs"
                >
                  {item}
                  <Sparkles size={13} className="text-[#BA83E8]" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
