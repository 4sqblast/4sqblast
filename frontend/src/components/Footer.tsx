import Image from "next/image";
import { ArrowUpRight, Heart, Sparkles } from "lucide-react";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Connect", href: "/connect" },
  { label: "Ministries", href: "/ministries" },
];

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#241638] text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="blast-float absolute -right-32 -top-48 size-[35rem] rounded-full bg-[#7045B4]/35 blur-3xl" />
        <div className="blast-float-slow absolute -bottom-48 -left-32 size-[30rem] rounded-full bg-[#8B51C1]/20 blur-3xl" />
        <div className="absolute right-[15%] top-10 size-48 rounded-full border border-white/[0.06]" />
        <div className="absolute right-[18%] top-14 size-36 rounded-full border border-white/[0.06]" />

        <span className="absolute -bottom-10 left-1/4 select-none text-[15rem] font-black leading-none tracking-tighter text-white/[0.025] sm:text-[22rem]">
          BLAST
        </span>
      </div>

      <div className="container-wide relative">
        <div className="relative overflow-hidden border-b border-white/10 py-16 sm:py-20 lg:py-24">
          <div className="blast-float pointer-events-none absolute -right-8 top-0 size-48 rounded-full bg-[#BA83E8]/15 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 backdrop-blur-md">
                <Sparkles size={14} className="text-[#D6B9F5]" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D6B9F5]">
                  There is a place for you
                </span>
              </div>

              <h2 className="max-w-3xl text-5xl font-black leading-[0.92] tracking-[-0.065em] sm:text-6xl lg:text-8xl">
                Your story
                <br />
                <span className="text-[#C6ACF5]">belongs here.</span>
              </h2>

              <p className="mt-6 max-w-lg text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
                Faith, friendship, purpose, and a community growing together. We
                would love to have you be part of the story.
              </p>
            </div>

            <a
              href="/connect"
              className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#E2D3FF] px-6 py-4 text-sm font-black text-[#30204F] shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-1 hover:bg-white"
            >
              Find your place
              <span className="grid size-8 place-items-center rounded-full bg-[#30204F] text-white transition group-hover:rotate-45">
                <ArrowUpRight size={17} />
              </span>
            </a>
          </div>
        </div>

        <div className="grid gap-10 py-10 sm:py-12 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <a
              href="/"
              aria-label="BLAST Church home"
              className="group inline-flex items-center gap-4"
            >
              <span className="relative grid size-16 shrink-0 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.07] p-1.5 transition duration-300 group-hover:-rotate-3 group-hover:scale-105">
                <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[#BA83E8]/15 blur-xl" />
                <Image
                  src="/blastlogo.png"
                  alt="BLAST Church"
                  width={64}
                  height={64}
                  className="relative size-full object-contain"
                />
              </span>

              <span>
                <span className="block text-sm font-black text-[#E2D3FF]">
                  A place to become
                </span>
                <span className="mt-1 block max-w-xs text-xs leading-6 text-white/50">
                  Believers Living And Succeeding Together.
                </span>
              </span>
            </a>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap gap-2">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full border border-white/10 px-4 py-2.5 text-xs font-bold text-white/70 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </a>
            ))}

            <a
              href="#give"
              className="inline-flex items-center gap-2 rounded-full border border-[#C6ACF5]/25 bg-[#7045B4]/20 px-4 py-2.5 text-xs font-black text-[#E2D3FF] transition hover:bg-[#7045B4]/40"
            >
              Give
              <ArrowUpRight size={14} />
            </a>
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-white/40">
            © {new Date().getFullYear()} BLAST Church. All rights reserved.
          </p>

          <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white/45">
            Made with
            <Heart size={12} className="fill-[#BA83E8] text-[#BA83E8]" />
            for the community
          </p>
        </div>
      </div>
    </footer>
  );
}
