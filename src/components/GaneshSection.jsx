import weddingData from "../data/weddingData"
import { PetalDrift } from "./FloatingPetals"
import { FloralDivider, Reveal } from "./Ornaments"

export default function GaneshSection() {
  return (
    <section className="relative overflow-hidden bg-ivory px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
      <PetalDrift />
      <Reveal className="relative mx-auto flex w-full max-w-xl flex-col items-center text-center lg:max-w-3xl">
        <div className="relative">
          <span
            className="pointer-events-none absolute top-1/2 left-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/25"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute top-1/2 left-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gold/20"
            aria-hidden="true"
          />
          <p className="relative font-gurmukhi text-6xl leading-none text-gold-deep">ੴ</p>
        </div>
        <p className="mt-5 font-gurmukhi text-xl text-navy sm:text-2xl">{weddingData.blessing}</p>
        <div className="mt-4 space-y-1">
          {weddingData.doha.map((line) => (
            <p key={line} className="font-gurmukhi text-[0.95rem] leading-relaxed text-ink/80 sm:text-base">
              {line}
            </p>
          ))}
        </div>
        <FloralDivider className="mt-8" />
        <h2 className="foil mt-8 font-display text-[clamp(1.35rem,4.6vw,2rem)] uppercase tracking-[0.22em]">
          {weddingData.invitationTitle}
        </h2>
        <FloralDivider className="mt-6" />
        <p className="mt-8 max-w-sm whitespace-pre-line font-serif text-[1.45rem] italic leading-snug text-ink sm:max-w-md sm:text-3xl lg:max-w-2xl lg:text-4xl">
          {weddingData.quote}
        </p>
      </Reveal>
    </section>
  )
}
