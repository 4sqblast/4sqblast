import { getAccounts } from "@/lib/queries";
import GiveCards from "@/components/GiveCards";
import { ArrowDownRight, Heart, Sparkles } from "lucide-react";

export default async function Give() {
  const result = await getAccounts();

  const accountCards = result.page?.acfhomefg?.give;

  const accounts = accountCards
    ? Object.values(accountCards).filter((account) => account !== null)
    : [];

  return (
    <section
      id="give"
      className="relative isolate overflow-hidden bg-[#F0E7FF] py-20 sm:py-28"
    >
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-32 -top-24 size-[28rem] rounded-full bg-white/80 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 size-[32rem] rounded-full bg-[#C6ACF5]/40 blur-3xl" />

        <div className="absolute right-[12%] top-[18%] size-24 rounded-full border border-[#7045B4]/10" />
        <div className="absolute right-[14%] top-[20%] size-16 rounded-full border border-[#7045B4]/10" />

        <div className="absolute bottom-16 left-[8%] size-3 rounded-full bg-[#8B51C1]/30" />
        <div className="absolute right-[8%] top-[45%] size-2 rounded-full bg-[#8B51C1]/40" />
      </div>

      <div className="container-wide relative">
        {/* Section heading */}
        <div className="mb-12 grid gap-8 lg:mb-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#7045B4]/15 bg-white/60 px-4 py-2 backdrop-blur-md">
              <Heart size={14} className="fill-[#8B51C1] text-[#8B51C1]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#7045B4]">
                Generosity is a rhythm
              </span>
            </div>

            <h2 className="max-w-2xl text-5xl font-black leading-[0.95] tracking-[-0.065em] text-[#30204F] sm:text-7xl lg:text-8xl">
              Give with
              <br />
              <span className="relative inline-block text-[#8B51C1]">
                joy.
                <svg
                  viewBox="0 0 180 14"
                  fill="none"
                  className="absolute -bottom-3 left-0 w-full"
                  aria-hidden="true"
                >
                  <path
                    d="M3 9C43 2 111 2 177 8"
                    stroke="#BA83E8"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
          </div>

          <div className="max-w-md lg:justify-self-end">
            <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-[#30204F] text-[#E6D8FF] shadow-lg shadow-[#30204F]/15">
              <Sparkles size={22} />
            </div>

            <p className="text-base leading-8 text-[#30204F]/75 sm:text-lg">
              Your giving helps create spaces where people encounter God, find
              family and live on purpose. Every seed helps the vision reach
              further.
            </p>

            <div className="mt-5 flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#7045B4]">
              Give with purpose
              <ArrowDownRight size={16} />
            </div>
          </div>
        </div>

        {/* Dynamic account cards */}
        {accounts.length > 0 ? (
          <GiveCards
            accounts={accounts.map((account) => ({
              name: account.name ?? "",
              accountNumber: String(account.accountNumber ?? ""),
              bank: account.bank ?? "",
            }))}
          />
        ) : (
          <div className="rounded-[2rem] border border-[#7045B4]/10 bg-white/60 p-10 text-center">
            <p className="font-bold text-[#30204F]">
              Giving account details will be available here soon.
            </p>
          </div>
        )}

        {/* Closing message */}
        <div className="mt-8 flex flex-col gap-4 rounded-[2rem] border border-white/80 bg-white/50 p-6 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-start gap-4">
            <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#E2D3FF] text-[#7045B4]">
              <Heart size={20} />
            </div>

            <div>
              <p className="font-black text-[#30204F]">
                Giving is more than a transaction.
              </p>
              <p className="mt-1 text-sm leading-6 text-[#30204F]/60">
                It is a way to participate in something bigger than yourself.
              </p>
            </div>
          </div>

          <span className="self-start rounded-full bg-[#30204F] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white sm:self-center">
            Give joyfully
          </span>
        </div>
      </div>
    </section>
  );
}
