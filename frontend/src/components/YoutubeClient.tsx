"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Play, Radio, Sparkles } from "lucide-react";
import type { Sermon } from "./Youtube";

type YoutubeClientProps = {
  sermons: Sermon[];
};

const sermonStyles = [
  {
    tag: "CHARACTER & PURPOSE",
    accent: "from-violet-500 via-purple-500 to-fuchsia-400",
  },
  {
    tag: "FAITH & FINANCES",
    accent: "from-orange-400 via-pink-500 to-purple-500",
  },
  {
    tag: "WISDOM & GROWTH",
    accent: "from-indigo-400 via-violet-500 to-purple-400",
  },
  {
    tag: "FAITH IN ACTION",
    accent: "from-cyan-400 via-blue-500 to-violet-500",
  },
  {
    tag: "LIFE & PURPOSE",
    accent: "from-rose-400 via-fuchsia-500 to-indigo-500",
  },
];

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.replace(/^www\./, "");

    let videoId: string | null = null;

    if (hostname === "youtu.be") {
      videoId = parsedUrl.pathname.slice(1).split("/")[0];
    } else if (hostname === "youtube.com" || hostname === "m.youtube.com") {
      const segments = parsedUrl.pathname.split("/").filter(Boolean);

      if (parsedUrl.pathname === "/watch") {
        videoId = parsedUrl.searchParams.get("v");
      } else if (["live", "embed", "shorts"].includes(segments[0])) {
        videoId = segments[1] ?? null;
      }
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
}

export default function YoutubeClient({ sermons }: YoutubeClientProps) {
  return (
    <section
      id="sermons"
      className="relative isolate overflow-hidden bg-[#10091c] px-4 py-20 text-white sm:px-6 sm:py-24 lg:px-10 lg:py-32"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-violet-600/20 blur-[110px]" />
        <div className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-fuchsia-500/15 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-indigo-500/15 blur-[100px]" />

        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "25px 25px",
          }}
        />

        <div className="absolute -right-20 -top-24 h-80 w-80 rotate-12 rounded-[4rem] border border-white/[0.07]" />
        <div className="absolute -right-8 -top-12 h-64 w-64 rotate-12 rounded-[3rem] border border-white/[0.06]" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 grid items-end gap-8 lg:mb-16 lg:grid-cols-[1fr_auto]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-white/[0.06] px-4 py-2 backdrop-blur-xl">
              <Sparkles size={15} className="text-violet-300" />

              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-violet-100 sm:text-xs">
                Faith for everyday life
              </span>

              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-fuchsia-400" />
            </div>

            <h2 className="max-w-3xl text-4xl font-black leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              More than a
              <br />
              <span className="relative inline-block bg-gradient-to-r from-violet-300 via-fuchsia-300 to-orange-200 bg-clip-text pb-2 text-transparent">
                Sunday feeling.
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 400 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8C93 2 247 2 397 7"
                    stroke="#C4B5FD"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
              Real conversations. Biblical wisdom. Truth you can carry into your
              Monday, your relationships, your work, and your purpose.
            </p>
          </motion.div>

          <motion.a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ y: -3 }}
            className="group inline-flex w-fit items-center gap-3 self-end rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-sm font-semibold backdrop-blur-xl transition hover:border-violet-300/40 hover:bg-white/10"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/15 text-red-400 transition group-hover:bg-red-500 group-hover:text-white">
              <Play size={21} fill="currentColor" />
            </span>

            <span>
              <span className="block">Explore on YouTube</span>
              <span className="mt-1 block text-xs font-normal text-white/45">
                More messages, more growth
              </span>
            </span>

            <ArrowUpRight
              size={17}
              className="ml-2 text-white/50 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
            />
          </motion.a>
        </div>

        {/* Message library heading */}
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="h-6 w-1 rounded-full bg-gradient-to-b from-violet-300 to-fuchsia-500" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/75 sm:text-sm">
              The message library
            </span>
          </div>

          <span className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-semibold tracking-widest text-white/45 sm:text-xs">
            {String(sermons.length).padStart(2, "0")} MESSAGES
          </span>
        </div>

        {/* Sermon cards */}
        {sermons.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {sermons.map((sermon, index) => {
              const videoUrl = getYouTubeEmbedUrl(sermon.link);
              const style = sermonStyles[index % sermonStyles.length];
              const number = String(index + 1).padStart(2, "0");

              return (
                <motion.article
                  key={`${sermon.title}-${index}`}
                  initial={{
                    opacity: 0,
                    y: 35,
                    rotate: index % 3 === 0 ? -1 : index % 3 === 1 ? 0 : 1,
                  }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.6,
                    delay: (index % 3) * 0.12,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -7 }}
                  className="group relative"
                >
                  {/* Gradient glow */}
                  <div
                    className={`absolute -inset-[1px] rounded-[1.7rem] bg-gradient-to-br ${style.accent} opacity-30 blur-sm transition duration-500 group-hover:opacity-75`}
                  />

                  <div className="relative h-full overflow-hidden rounded-[1.65rem] border border-white/10 bg-[#191127]">
                    {/* Video */}
                    <div className="relative aspect-video overflow-hidden bg-black">
                      {videoUrl ? (
                        <iframe
                          src={videoUrl}
                          title={sermon.title}
                          className="absolute inset-0 h-full w-full"
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center p-6 text-center text-sm text-white/60">
                          This video URL is invalid or unsupported.
                        </div>
                      )}

                      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/30 to-transparent" />

                      <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 backdrop-blur-md">
                        <span
                          className={`h-2 w-2 rounded-full bg-gradient-to-r ${style.accent}`}
                        />

                        <span className="text-[9px] font-bold tracking-[0.18em] text-white/90">
                          BLAST MESSAGES
                        </span>
                      </div>

                      <div className="pointer-events-none absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white/90 backdrop-blur-md transition group-hover:scale-110 group-hover:bg-violet-500">
                        <Play size={14} fill="currentColor" />
                      </div>
                    </div>

                    {/* Card content */}
                    <div className="relative p-5 sm:p-6">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <span
                          className={`bg-gradient-to-r ${style.accent} bg-clip-text text-[9px] font-extrabold tracking-[0.18em] text-transparent sm:text-[10px]`}
                        >
                          {style.tag}
                        </span>

                        <span className="font-mono text-sm font-bold text-white/20">
                          {number}
                        </span>
                      </div>

                      <h3 className="max-w-sm text-xl font-extrabold leading-snug tracking-tight text-white transition-colors group-hover:text-violet-200 sm:text-2xl">
                        {sermon.title}
                      </h3>

                      <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-4">
                        <div className="min-w-0">
                          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/35">
                            Speaking
                          </p>

                          <p className="mt-1 truncate text-sm font-medium text-white/75">
                            {sermon.preacher}
                          </p>
                        </div>

                        <a
                          href={sermon.link}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Watch ${sermon.title} on YouTube`}
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white/70 transition hover:border-violet-300/40 hover:bg-violet-500 hover:text-white"
                        >
                          <ArrowUpRight size={19} />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.04] px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-400/10 text-violet-200">
              <Radio size={25} />
            </div>

            <h3 className="mt-5 text-xl font-extrabold">
              New messages are on the way.
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/50">
              Check back soon for more messages to inspire your faith and
              everyday life.
            </p>
          </div>
        )}

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative mt-10 overflow-hidden rounded-[1.7rem] border border-violet-300/15 bg-gradient-to-r from-violet-500/15 via-fuchsia-500/10 to-orange-300/10 p-6 sm:mt-14 sm:p-8"
        >
          <div className="pointer-events-none absolute -right-8 -top-16 h-48 w-48 rounded-full border border-white/[0.08]" />
          <div className="pointer-events-none absolute -right-1 -top-9 h-32 w-32 rounded-full border border-white/[0.08]" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-200/15 bg-violet-300/10 text-violet-200">
                <Radio size={22} />
              </div>

              <div>
                <h3 className="text-lg font-extrabold tracking-tight sm:text-xl">
                  Keep feeding your faith.
                </h3>

                <p className="mt-2 max-w-lg text-sm leading-6 text-white/55">
                  Make room for the Word, revisit a message, and take something
                  meaningful with you.
                </p>
              </div>
            </div>

            <a
              href="https://www.youtube.com/@4sqblast_"
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-[#180d29] transition hover:bg-violet-100"
            >
              Find more messages
              <ArrowUpRight size={17} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
