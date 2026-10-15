import { getMinistries } from "@/lib/queries";
import type { Ministry } from "@/lib/types";
import { ArrowUpRight, Sparkles } from "lucide-react";

const cardThemes = [
  {
    card: "bg-[#E2D3FF] text-[#30204F]",
    accent: "bg-[#7045B4] text-white",
    glow: "bg-[#BA83E8]/40",
  },
  {
    card: "bg-[#30204F] text-white",
    accent: "bg-[#D6B9F5] text-[#30204F]",
    glow: "bg-[#8B51C1]/40",
  },
  {
    card: "bg-[#FFF0D9] text-[#30204F]",
    accent: "bg-[#E7B67F] text-[#30204F]",
    glow: "bg-[#F5D8B0]/60",
  },
  {
    card: "bg-[#7045B4] text-white",
    accent: "bg-white text-[#7045B4]",
    glow: "bg-[#BA83E8]/35",
  },
];

const entranceClasses = [
  "blast-enter-left",
  "blast-enter-up",
  "blast-enter-right",
  "blast-enter-down",
];

export default async function MinistriesPage() {
  const result = await getMinistries();
  const ministryData = result.page?.acfhomefg?.ministries;

  const ministries: Ministry[] = ministryData
    ? Object.values(ministryData).filter(
        (ministry): ministry is Ministry => ministry !== null,
      )
    : [];

  return (
    <main className="relative isolate overflow-hidden bg-[#F0E7FF] pt-32">
      {/* Dreamy background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="blast-float absolute -left-24 top-40 size-72 rounded-full bg-[#BA83E8]/30 blur-[90px]" />
        <div className="blast-float-slow absolute -right-24 top-[35%] size-96 rounded-full bg-white/80 blur-[100px]" />

        <span className="absolute -right-10 top-40 select-none text-[13rem] font-black leading-none tracking-tighter text-[#7045B4]/[0.045] sm:text-[20rem]">
          GIFTED
        </span>

        <div className="absolute left-[8%] top-[30rem] size-12 rounded-full border border-[#7045B4]/20" />
        <div className="absolute right-[10%] top-[48rem] size-20 rounded-full border border-[#7045B4]/15" />
      </div>

      <section className="container-wide relative pb-24 sm:pb-32">
        <div className="blast-enter-up relative max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#7045B4]/15 bg-white/60 px-4 py-2.5 shadow-sm backdrop-blur-md">
            <Sparkles size={14} className="text-[#7045B4]" />
            <span className="text-[10px] font-black uppercase tracking-[.2em] text-[#7045B4]">
              Discover your place
            </span>
          </div>

          <h1 className="text-6xl font-black leading-[0.88] tracking-[-.075em] text-[#30204F] sm:text-8xl lg:text-[7rem]">
            There&apos;s a place
            <br />
            <span className="relative inline-block text-[#8B51C1]">
              for your gift.
              <svg
                viewBox="0 0 430 18"
                fill="none"
                aria-hidden="true"
                className="absolute -bottom-3 left-0 w-full"
              >
                <path
                  d="M5 12C105 2 290 3 423 10"
                  stroke="#BA83E8"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-xl text-base leading-8 text-[#30204F]/70 sm:text-lg">
              You have something to bring to the table. Explore the ministries
              at BLAST, discover where your passion fits, and find people to
              grow and serve alongside.
            </p>

            <span className="shrink-0 text-sm font-black text-[#7045B4]">
              {String(ministries.length).padStart(2, "0")} ministries
              <span className="ml-2 text-[#30204F]/35">/ find your fit</span>
            </span>
          </div>
        </div>

        {ministries.length > 0 ? (
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ministries.map((ministry, index) => {
              const theme = cardThemes[index % cardThemes.length];
              const entrance = entranceClasses[index % entranceClasses.length];
              const imageUrl = ministry.image?.node?.mediaItemUrl;

              return (
                <article
                  key={`${ministry.title}-${index}`}
                  className={`blast-pulse blast-ministry-card ${entrance} group relative isolate overflow-hidden rounded-[2rem] ${theme.card} shadow-lg shadow-[#30204F]/[0.06] transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#30204F]/15 ${
                    index % 3 === 1 ? "lg:translate-y-10" : ""
                  }`}
                  style={{ animationDelay: `${index * 130}ms` }}
                >
                  {/* Decorative orbit */}
                  <div
                    className={`blast-float pointer-events-none absolute -right-10 -top-10 -z-10 size-44 rounded-full ${theme.glow} blur-2xl`}
                  />

                  <div className="flex items-center justify-between px-6 pb-2 pt-6">
                    <span className="text-xs font-black opacity-50">
                      VOL. {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="rounded-full border border-current/15 bg-white/20 px-3 py-1.5 text-[9px] font-black uppercase tracking-[.17em]">
                      Find your calling
                    </span>
                  </div>

                  {/* Ministry image */}
                  <div className="relative mx-4 mt-3 h-56 overflow-hidden rounded-[1.5rem] bg-[#7045B4]/15 sm:h-64">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={ministry.title}
                        loading={index < 3 ? "eager" : "lazy"}
                        className="size-full object-cover transition duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex size-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#7045B4] via-[#8B51C1] to-[#BA83E8] text-white">
                        <Sparkles size={32} />
                        <span className="text-xs font-black uppercase tracking-widest">
                          BLAST community
                        </span>
                      </div>
                    )}

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#201332]/65 via-transparent to-[#201332]/5" />

                    <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-[#201332]/35 px-3 py-1.5 text-[9px] font-black uppercase tracking-[.18em] text-white backdrop-blur-md">
                      Ministry {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={`absolute right-4 top-4 grid size-10 place-items-center rounded-full ${theme.accent} shadow-lg transition duration-300 group-hover:rotate-45`}
                    >
                      <ArrowUpRight size={18} />
                    </span>
                  </div>

                  <div className="p-6 pb-7">
                    <h2 className="text-2xl font-black leading-tight tracking-tight sm:text-3xl">
                      {ministry.title}
                    </h2>

                    <p className="mt-3 text-sm leading-7 opacity-70">
                      {ministry.details}
                    </p>

                    <div className="mt-6 flex items-center gap-2 border-t border-current/10 pt-4 text-[10px] font-black uppercase tracking-[.15em] opacity-60">
                      <Sparkles size={13} />
                      <span>Serve · Connect · Grow</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-14 rounded-[2rem] border border-[#7045B4]/10 bg-white/60 p-10 text-center">
            <Sparkles className="mx-auto mb-4 text-[#7045B4]" size={30} />
            <h2 className="text-2xl font-black text-[#30204F]">
              Something meaningful is taking shape.
            </h2>
            <p className="mt-2 text-sm text-[#30204F]/60">
              Check back soon to discover our ministries.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
