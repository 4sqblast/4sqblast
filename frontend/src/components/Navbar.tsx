"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  Menu,
  Sparkles,
  X,
} from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "Connect", href: "/connect" },
  { label: "Ministries", href: "/ministries" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4 lg:px-8">
      <div className="relative mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-3 rounded-full border border-white/75 bg-white/85 px-3 py-2 shadow-[0_12px_45px_rgba(48,32,78,0.12)] backdrop-blur-2xl transition-shadow duration-300 hover:shadow-[0_16px_55px_rgba(48,32,78,0.16)] sm:px-5 sm:py-2.5">
          {/* Logo carries the brand name, so no duplicate wordmark */}
          <a
            href="/"
            aria-label="BLAST Church home"
            onClick={() => setOpen(false)}
            className="group flex min-w-0 items-center gap-3"
          >
            <span className="relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-2xl bg-[#7045B4] p-1 transition duration-300 group-hover:-rotate-2 group-hover:scale-105 sm:size-14">
              <Image
                src="/blastlogo.png"
                alt="BLAST Church"
                width={56}
                height={56}
                priority
                className="size-full object-contain"
              />
            </span>

            <span className="hidden min-w-0 sm:block">
              <span className="block text-[9px] font-black uppercase tracking-[0.2em] text-[#7045B4]">
                A place to become
              </span>
              <span className="mt-1 block text-xs font-medium text-[#30204F]/55">
                Believers Living And Succeeding Together
              </span>
            </span>
          </a>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 md:flex"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2.5 text-sm font-bold text-[#30204F]/75 transition duration-200 hover:bg-[#F0E7FF] hover:text-[#7045B4]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href="#give"
              className="group hidden items-center gap-2 rounded-full bg-[#7045B4] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#7045B4]/20 transition duration-300 hover:-translate-y-0.5 hover:bg-[#30204F] sm:inline-flex"
            >
              <Heart size={15} />
              Give
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <button
              type="button"
              aria-label={
                open ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen((previous) => !previous)}
              className={`grid size-10 shrink-0 place-items-center rounded-full transition duration-300 md:hidden ${
                open
                  ? "bg-[#30204F] text-white"
                  : "bg-[#F0E7FF] text-[#7045B4] hover:bg-[#E2D3FF]"
              }`}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {open && (
          <div
            id="mobile-navigation"
            className="blast-menu-enter absolute inset-x-0 top-[calc(100%+10px)] overflow-hidden rounded-[2rem] border border-white/80 bg-[#FBF8FF]/95 p-3 shadow-[0_24px_70px_rgba(48,32,78,0.2)] backdrop-blur-2xl md:hidden"
          >
            <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#30204F] via-[#52357D] to-[#8B51C1] p-5 text-white">
              <div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-[#BA83E8]/25 blur-2xl" />

              <div className="relative mb-4 flex items-center gap-3">
                <Image
                  src="/blastlogo.png"
                  alt=""
                  width={44}
                  height={44}
                  className="size-11 rounded-xl bg-white/95 p-1 object-contain"
                />
                <div>
                  <span className="block text-[9px] font-black uppercase tracking-[0.2em] text-[#E2D3FF]">
                    A place to become
                  </span>
                  <span className="mt-1 block text-xs text-white/65">
                    Your next chapter starts here.
                  </span>
                </div>
              </div>

              <p className="relative max-w-xs text-2xl font-black leading-tight tracking-tight">
                Find your people. Grow your faith.
              </p>
            </div>

            <nav aria-label="Mobile navigation" className="mt-3 space-y-1">
              {links.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between rounded-2xl px-4 py-4 text-sm font-black text-[#30204F] transition hover:bg-[#F0E7FF]"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-[#8B51C1]/60">
                      0{index + 1}
                    </span>
                    {link.label}
                  </span>
                  <ArrowRight
                    size={17}
                    className="text-[#8B51C1] transition-transform group-hover:translate-x-1"
                  />
                </a>
              ))}
            </nav>

            <a
              href="#give"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-between rounded-2xl bg-[#30204F] px-5 py-4 text-sm font-black text-white transition hover:bg-[#7045B4]"
            >
              <span className="flex items-center gap-2">
                <Heart size={16} />
                Give with joy
              </span>
              <ArrowUpRight size={18} />
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
