import { getAudioMessages } from "@/lib/queries";
import type { Message } from "@/lib/types";
import { ArrowUpRight, Headphones, Radio, Sparkles } from "lucide-react";

export default async function AudioMessagesSection() {
  const result = await getAudioMessages();
  const audioMessages = result.page?.acfhomefg?.audioMessages;

  const audios: Message[] = audioMessages
    ? Object.values(audioMessages).filter(
        (audio): audio is Message => audio !== null,
      )
    : [];

  return (
    <section className="relative isolate overflow-hidden bg-[#160D25] py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 top-10 size-96 rounded-full bg-[#7045B4]/25 blur-[100px]" />
        <div className="absolute -right-24 bottom-0 size-96 rounded-full bg-[#BA83E8]/15 blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0c_1px,transparent_1px)] [background-size:24px_24px]" />
        <span className="absolute -right-10 top-16 select-none text-[14rem] font-black leading-none tracking-tighter text-white/[0.025] sm:text-[20rem]">
          WORD
        </span>
      </div>

      <div className="container-wide relative">
        <div className="mb-12 flex flex-col justify-between gap-7 sm:mb-16 md:flex-row md:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#BA83E8]/20 bg-[#7045B4]/15 px-4 py-2 text-[#D6B9F5]">
              <Radio size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                Listen back · Grow deeper
              </span>
            </div>

            <h2 className="text-6xl font-black leading-[0.9] tracking-[-0.075em] sm:text-7xl lg:text-8xl">
              Feed your
              <br />
              <span className="bg-gradient-to-r from-[#D6B9F5] via-[#BA83E8] to-[#8B51C1] bg-clip-text text-transparent">
                spirit.
              </span>
            </h2>
          </div>

          <div className="max-w-sm md:pb-2">
            <p className="text-base leading-8 text-white/60 sm:text-lg">
              Take the Word beyond Sunday. Revisit a message, find fresh
              perspective, and carry what matters into your everyday life.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#D6B9F5]">
              <Sparkles size={14} />
              <span>Truth for your everyday journey</span>
            </div>
          </div>
        </div>

        {audios.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {audios.map((audio, index) => (
              <article
                key={`${audio.title}-${index}`}
                className="blast-pulse-slow group relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 transition duration-500 hover:-translate-y-2 hover:border-[#BA83E8]/40 hover:bg-white/[0.075] hover:shadow-2xl hover:shadow-[#7045B4]/10 sm:p-6"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 -z-10 size-36 rounded-full bg-[#7045B4]/20 blur-3xl transition duration-500 group-hover:bg-[#BA83E8]/30" />

                <div className="mb-8 flex items-start justify-between">
                  <div className="relative grid size-14 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#7045B4] to-[#30204F] shadow-lg shadow-[#7045B4]/20">
                    <Headphones size={23} className="text-white" />
                    <div className="absolute -bottom-3 -right-2 size-8 rounded-full bg-[#BA83E8]/40 blur-md" />
                  </div>

                  <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-bold text-white/60">
                    {audio.duration || "Audio"}
                  </span>
                </div>

                <div className="mb-5">
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#BA83E8]">
                    Message {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-xl font-black leading-snug tracking-tight text-white transition-colors group-hover:text-[#D6B9F5]">
                    {audio.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/50">{audio.preacher}</p>
                </div>

                <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-3">
                  {audio.audioLink ? (
                    <audio
                      className="w-full"
                      controls
                      preload="none"
                      src={audio.audioLink}
                      aria-label={`Listen to ${audio.title}`}
                    >
                      Your browser does not support audio playback.
                    </audio>
                  ) : (
                    <p className="py-2 text-sm text-white/50">
                      Audio is not available yet.
                    </p>
                  )}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-xs font-bold text-white/40">
                    BLAST Messages
                  </span>
                  <span className="grid size-8 place-items-center rounded-full border border-white/10 text-[#D6B9F5] transition group-hover:rotate-45 group-hover:bg-[#7045B4] group-hover:text-white">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] px-6 py-14 text-center">
            <Headphones className="mx-auto mb-4 text-[#BA83E8]" size={32} />
            <h3 className="text-xl font-black">Messages are on the way.</h3>
            <p className="mt-2 text-sm text-white/55">
              Check back soon for audio messages from BLAST.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
