import { getGrowthGroups } from "@/lib/queries";
import type { GrowthGroup } from "@/lib/types";
import { ArrowUpRight, AtSign, Heart, Sparkles, Users } from "lucide-react";

const groupThemes = [
  {
    card: "from-[#E2D3FF] via-[#D6B9F5] to-[#BA83E8]/80",
    accent: "text-[#7045B4]",
    icon: "bg-[#30204F] text-white",
    glow: "bg-[#8B51C1]/30",
  },
  {
    card: "from-[#FFF0D9] via-[#F5D8B0] to-[#E7B67F]/80",
    accent: "text-[#B66A24]",
    icon: "bg-[#E47A52] text-white",
    glow: "bg-[#F5D8B0]/70",
  },
];

const entranceClasses = [
  "blast-enter-left",
  "blast-enter-right",
  "blast-enter-down",
  "blast-enter-up",
];

export default async function GrowthGroups() {
  const result = await getGrowthGroups();
  const growthGroupsList = result.page?.acfhomefg?.growthGroups;

  const growthGroups: GrowthGroup[] = growthGroupsList
    ? Object.values(growthGroupsList).filter(
        (group): group is GrowthGroup => group !== null,
      )
    : [];

  return (
    <section className="relative isolate overflow-hidden bg-[#FBF8FF] py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="blast-float absolute -left-28 top-20 size-80 rounded-full bg-[#D6B9F5]/40 blur-[100px]" />
        <div className="blast-float-slow absolute -right-32 bottom-0 size-96 rounded-full bg-[#F5D8B0]/40 blur-[100px]" />

        <span className="absolute -right-8 top-28 select-none text-[12rem] font-black leading-none tracking-tighter text-[#7045B4]/[0.035] sm:text-[18rem]">
          TOGETHER
        </span>

        <div className="absolute left-[8%] top-[45%] size-10 rounded-full border border-[#7045B4]/15" />
        <div className="absolute right-[7%] top-[60%] size-16 rounded-full border border-[#E7B67F]/30" />
      </div>

      <div className="container-wide relative">
        <header className="blast-enter-up mb-12 sm:mb-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#7045B4]/15 bg-white/75 px-4 py-2.5 shadow-sm backdrop-blur-md">
            <Users size={14} className="text-[#7045B4]" />
            <span className="text-[10px] font-black uppercase tracking-[.2em] text-[#7045B4]">
              Growth groups
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <h2 className="text-5xl font-black leading-[0.9] tracking-[-.075em] text-[#30204F] sm:text-7xl lg:text-8xl">
              Small circles.
              <br />
              <span className="text-[#8B51C1]">Big belonging.</span>
            </h2>

            <p className="max-w-sm text-sm leading-7 text-[#30204F]/65 sm:text-base">
              Faith gets deeper when life is shared. Find a circle where you can
              ask questions, build friendships, and become all God has called
              you to be.
            </p>
          </div>
        </header>

        {growthGroups.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {growthGroups.map((group, index) => {
              const theme = groupThemes[index % groupThemes.length];
              const entrance = entranceClasses[index % entranceClasses.length];

              const groupImage = group.image?.node?.mediaItemUrl;
              const coordinator = group.coordinator;
              const coordinatorImage = coordinator?.image?.node?.mediaItemUrl;

              return (
                <article
                  key={`${group.title}-${index}`}
                  className={`blast-growth-card ${entrance} group relative isolate overflow-hidden rounded-[2rem] border border-white/80 bg-gradient-to-br ${theme.card} p-4 shadow-lg shadow-[#30204F]/[0.05] transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#30204F]/10 sm:rounded-[2.5rem] sm:p-6`}
                  style={{ animationDelay: `${index * 180}ms` }}
                >
                  {/* Floating background shapes */}
                  <div
                    className={`blast-float pointer-events-none absolute -right-10 -top-10 -z-10 size-44 rounded-full ${theme.glow} blur-2xl`}
                  />
                  <div className="blast-float-slow pointer-events-none absolute -bottom-12 -left-8 -z-10 size-40 rounded-full bg-white/40 blur-2xl" />

                  <div className="flex items-center justify-between px-2 pb-4 pt-2">
                    <span
                      className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[.18em] ${theme.accent}`}
                    >
                      <Sparkles size={13} />
                      Growth group
                    </span>

                    <span className="text-xs font-black text-[#30204F]/40">
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(growthGroups.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Main group image */}
                  <div className="relative h-56 overflow-hidden rounded-[1.6rem] bg-white/30 sm:h-72 sm:rounded-[2rem]">
                    {groupImage ? (
                      <img
                        src={groupImage}
                        alt={group.title}
                        loading={index < 2 ? "eager" : "lazy"}
                        className="size-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center bg-gradient-to-br from-[#7045B4] to-[#BA83E8] text-white">
                        <Users size={52} />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#241638]/80 via-[#241638]/10 to-transparent" />

                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 sm:bottom-6 sm:left-6 sm:right-6">
                      <div className="min-w-0">
                        <p className="mb-2 text-[9px] font-black uppercase tracking-[.2em] text-white/70">
                          Your people. Your journey.
                        </p>
                        <h3 className="text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl">
                          {group.title}
                        </h3>
                      </div>

                      <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md transition group-hover:rotate-45 group-hover:bg-white/25">
                        <ArrowUpRight size={20} />
                      </span>
                    </div>
                  </div>

                  {/* Group details */}
                  <div className="px-2 pb-2 pt-6 sm:px-3 sm:pt-7">
                    <p className="text-[10px] font-black uppercase tracking-[.18em] text-[#30204F]/45">
                      What brings us together
                    </p>

                    <p className="mt-3 text-sm leading-7 text-[#30204F]/75 sm:text-base sm:leading-8">
                      {group.details}
                    </p>

                    {/* Coordinator profile */}
                    <div className="mt-7 rounded-[1.5rem] border border-white/70 bg-white/55 p-4 backdrop-blur-md sm:p-5">
                      <div className="flex items-center gap-4">
                        <div className="relative size-[4.25rem] shrink-0">
                          <div className="absolute -inset-1 rounded-[1.4rem] bg-gradient-to-br from-[#7045B4] to-[#BA83E8] opacity-60 blur-sm" />

                          <div className="relative size-full overflow-hidden rounded-[1.2rem] border-2 border-white bg-[#E2D3FF]">
                            {coordinatorImage ? (
                              <img
                                src={coordinatorImage}
                                alt={coordinator?.name || "Group coordinator"}
                                loading="lazy"
                                className="size-full object-cover"
                              />
                            ) : (
                              <div className="flex size-full items-center justify-center bg-gradient-to-br from-[#7045B4] to-[#BA83E8] text-xl font-black text-white">
                                {coordinator?.name?.charAt(0).toUpperCase() ||
                                  "?"}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-[9px] font-black uppercase tracking-[.18em] text-[#7045B4]">
                            Your coordinator
                          </p>

                          <p className="mt-1 truncate text-base font-black text-[#30204F] sm:text-lg">
                            {coordinator?.name || "Coordinator to be announced"}
                          </p>

                          {coordinator?.title && (
                            <p className="mt-1 text-xs leading-5 text-[#30204F]/60">
                              {coordinator.title}
                            </p>
                          )}
                        </div>

                        <Heart size={17} className="shrink-0 text-[#8B51C1]" />
                      </div>

                      {coordinator?.email && (
                        <a
                          href={`mailto:${coordinator.email}`}
                          className="mt-4 flex min-w-0 items-center gap-2 rounded-xl border border-[#7045B4]/10 bg-white/60 px-3 py-3 text-xs font-bold text-[#7045B4] transition hover:border-[#7045B4]/30 hover:bg-white"
                        >
                          <AtSign size={15} className="shrink-0" />
                          <span className="min-w-0 flex-1 truncate">
                            {coordinator.email}
                          </span>
                          <ArrowUpRight size={15} className="shrink-0" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-[#7045B4]/10 bg-white/70 p-10 text-center">
            <Users className="mx-auto mb-4 text-[#7045B4]" size={32} />
            <h3 className="text-2xl font-black text-[#30204F]">
              Your circle is taking shape.
            </h3>
            <p className="mt-2 text-sm text-[#30204F]/60">
              Growth group information will be available here soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
