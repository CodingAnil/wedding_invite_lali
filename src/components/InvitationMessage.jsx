import weddingData from "../data/weddingData"
import { PetalDrift } from "./FloatingPetals"
import { FloralDivider, Reveal } from "./Ornaments"

export default function InvitationMessage() {
  const { message } = weddingData

  return (
    <section className="relative overflow-hidden bg-ivory px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
      <PetalDrift />
      <svg
        viewBox="0 0 120 160"
        className="pointer-events-none absolute -left-6 top-10 h-36 w-28 text-leaf/80"
        aria-hidden="true"
      >
        <path d="M60 150c10-30 8-60 18-90 8-24 6-48 16-70" fill="none" stroke="currentColor" />
        <circle cx="78" cy="28" r="8" fill="currentColor" />
        <path d="M70 70c-12-4-16-16-10-24 8 6 16 6 22-2-6 12-4 20-12 26z" fill="currentColor" />
      </svg>
      <svg
        viewBox="0 0 120 160"
        className="pointer-events-none absolute -right-6 bottom-6 h-36 w-28 rotate-180 text-gold/30"
        aria-hidden="true"
      >
        <path d="M60 150c10-30 8-60 18-90 8-24 6-48 16-70" fill="none" stroke="currentColor" />
        <circle cx="78" cy="28" r="8" fill="currentColor" />
        <path d="M70 70c-12-4-16-16-10-24 8 6 16 6 22-2-6 12-4 20-12 26z" fill="currentColor" />
      </svg>

      <Reveal className="relative mx-auto w-full max-w-md text-center lg:max-w-2xl">
        <p className="whitespace-pre-line font-serif text-[1.55rem] italic leading-snug text-ink sm:text-4xl lg:text-5xl">
          {message.lines.join("\n")}
        </p>
        {message.presence && (
          <>
            <FloralDivider className="mx-auto mt-8" />
            <p className="mt-8 font-serif text-xl leading-relaxed text-ink/80 sm:text-2xl">{message.presence}</p>
          </>
        )}
        {message.await && (
          <p className="foil mt-10 font-display text-sm tracking-[0.22em] uppercase">
            ♥ {message.await} ♥
          </p>
        )}
      </Reveal>
    </section>
  )
}
