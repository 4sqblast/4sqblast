"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Heart, Quote, Sparkles } from "lucide-react";

import { Father } from "@/lib/types";

type FathersProps = {
  fathers: Father[];
};

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 100 : -100,
    rotateY: direction > 0 ? 8 : -8,
    scale: 0.96,
  }),
  center: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    scale: 1,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -100 : 100,
    rotateY: direction > 0 ? -8 : 8,
    scale: 0.96,
  }),
};

export default function Fathers({ fathers }: FathersProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (fathers.length < 2) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((previous) => (previous + 1) % fathers.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [fathers.length]);

  if (fathers.length === 0) return null;

  const currentFather = fathers[currentIndex];

  const goTo = (index: number) => {
    if (index === currentIndex) return;

    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((previous) => (previous + 1) % fathers.length);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex(
      (previous) => (previous - 1 + fathers.length) % fathers.length,
    );
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#F0E7FF] py-20 sm:py-28">
      {/* Atmospheric background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-10 size-[28rem] rounded-full bg-[#C6ACF5]/45 blur-3xl" />
        <div className="absolute -right-32 bottom-0 size-[30rem] rounded-full bg-white/90 blur-3xl" />

        <div className="absolute right-[12%] top-[15%] size-28 rounded-full border border-[#7045B4]/10" />
        <div className="absolute right-[14%] top-[17%] size-20 rounded-full border border-[#7045B4]/10" />

        <span className="absolute -left-5 top-24 select-none text-[13rem] font-black leading-none tracking-tighter text-[#7045B4]/[0.035] sm:text-[20rem]">
          LEGACY
        </span>
      </div>

      <div className="container-wide relative">
        {/* Section introduction */}
        <div className="mb-12 grid gap-8 lg:mb-16 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#7045B4]/15 bg-white/60 px-4 py-2 backdrop-blur-md">
              <Sparkles size={14} className="text-[#8B51C1]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#7045B4]">
                A legacy of faith
              </span>
            </div>

            <h2 className="text-5xl font-black leading-[0.95] tracking-[-0.065em] text-[#30204F] sm:text-7xl lg:text-8xl">
              Honouring
              <br />
              <span className="text-[#8B51C1]">our fathers.</span>
            </h2>
          </div>

          <div className="max-w-md lg:justify-self-end">
            <p className="text-base leading-8 text-[#30204F]/70 sm:text-lg">
              Celebrating the lives, leadership, and faithful service of the men
              whose devotion has helped shape our family of faith. Their impact
              lives on in every generation.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#8B51C1]/50" />
              <span className="text-xs font-black uppercase tracking-[0.18em] text-[#7045B4]">
                Faith. Service. Legacy.
              </span>
            </div>
          </div>
        </div>

        {/* Main tribute carousel */}
        <div className="relative mx-auto max-w-6xl">
          <div className="relative" style={{ perspective: "1600px" }}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.article
                key={currentFather.name}
                custom={direction}
                variants={slideVariants}
                initial={reduceMotion ? false : "enter"}
                animate="center"
                exit={reduceMotion ? { opacity: 0 } : "exit"}
                transition={{
                  duration: reduceMotion ? 0.15 : 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative grid overflow-hidden rounded-[2rem] border border-white/80 bg-white/75 shadow-2xl shadow-[#30204F]/10 backdrop-blur-xl md:min-h-[520px] md:grid-cols-[0.9fr_1.1fr] md:rounded-[2.5rem]"
              >
                {/* Portrait panel */}
                <div className="relative min-h-[330px] overflow-hidden bg-gradient-to-br from-[#30204F] via-[#52357D] to-[#8B51C1] sm:min-h-[410px] md:min-h-[520px]">
                  {/* Decorative glow */}
                  <div className="pointer-events-none absolute -left-16 top-0 size-64 rounded-full bg-[#C6ACF5]/30 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-20 -right-10 size-72 rounded-full bg-[#8B51C1]/50 blur-3xl" />

                  {/* Fine decorative rings */}
                  <div className="pointer-events-none absolute left-1/2 top-[43%] aspect-square w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15" />
                  <div className="pointer-events-none absolute left-1/2 top-[43%] aspect-square w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15" />

                  <span className="pointer-events-none absolute left-6 top-6 text-[10px] font-black uppercase tracking-[0.24em] text-white/65">
                    THE LEGACY COLLECTION
                  </span>

                  <span className="pointer-events-none absolute right-6 top-5 text-7xl font-black leading-none text-white/[0.08] sm:text-8xl">
                    {String(currentIndex + 1).padStart(2, "0")}
                  </span>

                  {/* Portrait frame */}
                  <div className="absolute inset-x-0 bottom-0 top-14 flex items-center justify-center px-8 pb-12 pt-5 sm:px-12">
                    <div className="relative aspect-[4/5] w-full max-w-[300px] overflow-hidden rounded-t-[10rem] rounded-b-[2rem] border border-white/40 bg-white/10 p-2 shadow-2xl shadow-black/20 sm:max-w-[330px]">
                      <div className="relative h-full w-full overflow-hidden rounded-t-[9.5rem] rounded-b-[1.5rem] bg-[#E2D3FF]">
                        <Image
                          src={
                            currentFather.image?.node?.mediaItemUrl ||
                            "/placeholder.svg"
                          }
                          alt={currentFather.name}
                          fill
                          priority
                          unoptimized
                          sizes="(max-width: 768px) 80vw, 330px"
                          className="object-cover object-center"
                        />

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#30204F]/35 via-transparent to-white/5" />
                      </div>
                    </div>
                  </div>

                  {/* Portrait caption */}
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3 sm:bottom-7 sm:left-7 sm:right-7">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#30204F]/35 px-3 py-2 text-[9px] font-black uppercase tracking-[0.17em] text-white backdrop-blur-md">
                      <Heart size={12} />
                      Forever remembered
                    </span>

                    <span className="text-[10px] font-bold tracking-widest text-white/60">
                      BLAST · LEGACY
                    </span>
                  </div>
                </div>

                {/* Biography panel */}
                <div className="relative flex flex-col justify-center overflow-hidden p-6 sm:p-10 md:p-12 lg:p-14">
                  <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-[#C6ACF5]/25 blur-3xl" />

                  <div className="relative">
                    <div className="mb-7 flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7045B4] to-[#A675DB] px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-white shadow-lg shadow-[#7045B4]/15">
                        <Sparkles size={12} />
                        {currentFather.tenure}
                      </span>

                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#7045B4]/65">
                        A life of service
                      </span>
                    </div>

                    <Quote
                      size={38}
                      strokeWidth={1.5}
                      className="mb-3 text-[#8B51C1]/40"
                    />

                    <h3 className="max-w-xl text-3xl font-black leading-[1.02] tracking-[-0.055em] text-[#30204F] sm:text-4xl lg:text-5xl">
                      {currentFather.name}
                    </h3>

                    <div className="my-6 h-1 w-16 rounded-full bg-gradient-to-r from-[#7045B4] to-[#C6ACF5]" />

                    <p className="text-base leading-8 text-[#30204F]/75 sm:text-lg sm:leading-9">
                      {currentFather.bio}
                    </p>

                    <div className="mt-8 border-t border-[#7045B4]/15 pt-6">
                      <div className="flex items-start gap-3">
                        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#E2D3FF] text-[#7045B4]">
                          <Heart size={18} />
                        </span>

                        <div>
                          <p className="text-sm font-black text-[#30204F]">
                            Their service made a difference.
                          </p>
                          <p className="mt-1 text-xs leading-6 text-[#30204F]/55">
                            Remembering a legacy of faith, love, and dedication
                            to God&apos;s work.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative index */}
                  <span className="pointer-events-none absolute bottom-2 right-5 select-none text-8xl font-black leading-none tracking-tighter text-[#7045B4]/[0.045] sm:bottom-3 sm:right-8 sm:text-9xl">
                    {String(currentIndex + 1).padStart(2, "0")}
                  </span>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Carousel controls */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-5 sm:mt-8">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#7045B4]/65">
                Remembering with gratitude
              </p>
              <p className="mt-1 text-sm font-bold text-[#30204F]">
                {String(currentIndex + 1).padStart(2, "0")}
                <span className="mx-2 text-[#8B51C1]/40">/</span>
                {String(fathers.length).padStart(2, "0")}
                <span className="ml-2 font-medium text-[#30204F]/50">
                  {fathers.length === 1 ? "Father" : "Fathers"}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="mr-2 flex items-center gap-2">
                {fathers.map((father, index) => (
                  <button
                    key={`${father.name}-${index}`}
                    type="button"
                    onClick={() => goTo(index)}
                    aria-label={`View ${father.name}`}
                    aria-current={index === currentIndex ? "true" : undefined}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "w-9 bg-[#7045B4]"
                        : "w-2 bg-[#7045B4]/25 hover:bg-[#7045B4]/55"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={goToPrev}
                aria-label="Previous father"
                className="grid size-12 place-items-center rounded-full border border-[#7045B4]/20 bg-white/70 text-[#7045B4] shadow-sm transition hover:-translate-x-1 hover:bg-[#7045B4] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7045B4] focus-visible:ring-offset-2"
              >
                <ArrowLeft size={19} />
              </button>

              <button
                type="button"
                onClick={goToNext}
                aria-label="Next father"
                className="grid size-12 place-items-center rounded-full bg-[#30204F] text-white shadow-lg shadow-[#30204F]/20 transition hover:translate-x-1 hover:bg-[#7045B4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7045B4] focus-visible:ring-offset-2"
              >
                <ArrowRight size={19} />
              </button>
            </div>
          </div>
        </div>

        {/* Closing tribute */}
        <div className="mt-12 flex flex-col gap-4 rounded-[2rem] border border-white/80 bg-white/50 p-6 backdrop-blur-md sm:mt-16 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="text-lg font-black tracking-tight text-[#30204F] sm:text-xl">
              A legacy that lives beyond a lifetime.
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-[#30204F]/60">
              We honour those who have gone before us, celebrating their
              devotion and the enduring impact of their service.
            </p>
          </div>

          <div className="flex size-12 shrink-0 items-center justify-center self-start rounded-2xl bg-[#30204F] text-[#E2D3FF] sm:self-center">
            <Heart size={21} />
          </div>
        </div>
      </div>
    </section>
  );
}
