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

          <h1 className="max-w-2xl text-[4rem] font-black leading-[0.88] tracking-[-0.075em] text-[#30204F] sm:text-7xl lg:text-[6.5rem]">
            Faith that
            <br />
            <span className="relative inline-block text-[#8B51C1]">
              moves.
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
            <span className="text-[0.53em] font-bold leading-none tracking-[-0.045em] text-[#30204F]/70">
              People who make a difference.
            </span>
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
