import { getProgrammes } from "@/lib/queries";
import ProgrammeCards from "@/components/ProgrammesCards";

export default async function Programmes() {
  const result = await getProgrammes();

  const programmesCarousel = result.page?.acfhomefg?.programmesCarousel;

  const programmes = programmesCarousel
    ? Object.values(programmesCarousel).filter(
        (programme) => programme !== null,
      )
    : [];

  return (
    <section
      id="programmes"
      className="relative overflow-hidden bg-[#183F37] py-20 text-white sm:py-24"
    >
      <div className="container-wide relative z-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-14">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[.25em] text-[#B8CBB0]">
              Make room for more
            </p>

            <h2 className="text-5xl font-black tracking-[-.05em] sm:text-6xl">
              Your week,
              <br />
              <span className="text-[#B8CBB0]">reimagined.</span>
            </h2>
          </div>

          <p className="max-w-xs text-sm leading-7 text-white/65">
            There&apos;s always a place to plug in, pray loud and grow together.
          </p>
        </div>

        <ProgrammeCards programmes={programmes} />
      </div>
    </section>
  );
}
