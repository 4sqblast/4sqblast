"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Copy,
  Heart,
  Landmark,
  Sparkles,
} from "lucide-react";

type Account = {
  name: string;
  accountNumber: string;
  bank: string;
};

type GiveCardsProps = {
  accounts: Account[];
};

const themes = [
  {
    card: "from-[#30204F] via-[#52357D] to-[#7652A8]",
    text: "text-white",
    muted: "text-white/65",
    accent: "text-[#E6D8FF]",
    orb: "bg-[#C4A5FF]/30",
    label: "border-white/20 bg-white/10",
    tag: "BUILD THE VISION",
  },
  {
    card: "from-[#F0E7FF] via-[#E2D3FF] to-[#C6ACF5]",
    text: "text-[#30204F]",
    muted: "text-[#30204F]/65",
    accent: "text-[#7045B4]",
    orb: "bg-white/70",
    label: "border-[#7045B4]/15 bg-white/40",
    tag: "FUEL THE MISSION",
  },
  {
    card: "from-[#6D3BA2] via-[#8B51C1] to-[#BA83E8]",
    text: "text-white",
    muted: "text-white/70",
    accent: "text-[#F2E6FF]",
    orb: "bg-[#F4C9FF]/30",
    label: "border-white/20 bg-white/10",
    tag: "MAKE ROOM FOR MORE",
  },
];

const entrances = [
  { x: -55, y: 30, rotate: -3 },
  { x: 55, y: 30, rotate: 3 },
  { x: -55, y: 30, rotate: -3 },
];

export default function GiveCards({ accounts }: GiveCardsProps) {
  const reduceMotion = useReducedMotion();
  const [copied, setCopied] = useState<string | null>(null);

  async function copyAccountNumber(accountNumber: string) {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(accountNumber);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {accounts.map((account, i) => {
        const theme = themes[i % themes.length];
        const entrance = entrances[i % entrances.length];
        const isCopied = copied === account.accountNumber;

        return (
          <motion.article
            key={`${account.name}-${i}`}
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: entrance.x,
                    y: entrance.y,
                    rotate: entrance.rotate,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
              y: 0,
              rotate: 0,
            }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.75,
              delay: reduceMotion ? 0 : (i % 3) * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={
              reduceMotion ? undefined : { y: -7, rotate: i % 2 ? -1 : 1 }
            }
            className={`group relative isolate flex min-h-[310px] flex-col overflow-hidden rounded-[2rem] border border-white/30 bg-gradient-to-br ${theme.card} p-6 shadow-xl shadow-[#30204F]/10 sm:min-h-[335px] sm:p-7`}
          >
            {/* Ambient glow and decorative orbit */}
            <div
              className={`pointer-events-none absolute -right-16 -top-16 -z-10 size-56 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-125 ${theme.orb}`}
            />

            <div className="pointer-events-none absolute -right-12 top-16 -z-10 size-48 rounded-full border border-current/15" />
            <div className="pointer-events-none absolute -right-5 top-24 -z-10 size-32 rounded-full border border-current/15" />
            <div className="pointer-events-none absolute -bottom-16 -left-10 -z-10 size-40 rounded-full bg-black/[0.04] blur-2xl" />

            <span className="pointer-events-none absolute -right-2 bottom-12 -z-10 select-none text-[9rem] font-black leading-none tracking-tighter opacity-[0.07]">
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Card header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span
                  className={`grid size-12 place-items-center rounded-2xl border backdrop-blur-md ${theme.label}`}
                >
                  {i === 0 ? (
                    <Heart size={21} strokeWidth={1.7} />
                  ) : i === 1 ? (
                    <Sparkles size={21} strokeWidth={1.7} />
                  ) : (
                    <Landmark size={21} strokeWidth={1.7} />
                  )}
                </span>

                <div>
                  <p className={`text-[9px] font-black tracking-[0.2em] ${theme.accent}`}>
                    {theme.tag}
                  </p>
                  <p className={`mt-1 text-xs font-semibold ${theme.muted}`}>
                    Giving account · {String(i + 1).padStart(2, "0")}
                  </p>
                </div>
              </div>

              <span
                className={`grid size-9 shrink-0 place-items-center rounded-full border backdrop-blur-sm transition duration-300 group-hover:rotate-45 ${theme.label}`}
              >
                <ArrowUpRight size={17} />
              </span>
            </div>

            {/* Account details */}
            <div className="relative mt-auto pt-12">
              <h3 className={`max-w-[18rem] text-xl font-black leading-tight tracking-tight sm:text-2xl ${theme.text}`}>
                {account.name}
              </h3>

              <div className={`mt-5 rounded-2xl border p-4 backdrop-blur-md ${theme.label}`}>
                <p className={`mb-2 text-[9px] font-black uppercase tracking-[0.18em] ${theme.muted}`}>
                  Account number
                </p>

                <div className="flex items-center justify-between gap-3">
                  <p className={`min-w-0 break-all font-mono text-xl font-black tracking-wider sm:text-2xl ${theme.text}`}>
                    {account.accountNumber}
                  </p>

                  <button
                    type="button"
                    onClick={() => copyAccountNumber(account.accountNumber)}
                    aria-label={
                      isCopied ? "Account number copied" : "Copy account number"
                    }
                    className={`grid size-10 shrink-0 place-items-center rounded-xl border border-current/15 transition duration-200 hover:scale-105 active:scale-95 ${theme.text}`}
                  >
                    {isCopied ? <Check size={17} /> : <Copy size={17} />}
                  </button>
                </div>

                <div className={`mt-3 flex items-center justify-between gap-2 border-t border-current/15 pt-3 text-xs ${theme.muted}`}>
                  <span className="truncate font-semibold">{account.bank}</span>
                  <span className="shrink-0">
                    {isCopied ? "Copied!" : "Tap to copy"}
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative bottom highlight */}
            <div className="pointer-events-none absolute bottom-0 left-7 right-7 h-1 origin-left scale-x-0 rounded-full bg-current/50 transition-transform duration-500 group-hover:scale-x-100" />
          </motion.article>
        );
      })}
    </div>
  );
}
