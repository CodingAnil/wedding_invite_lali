import weddingData from "../data/weddingData"
import { FloralDivider, Stagger, StaggerItem } from "./Ornaments"

export default function FamilySection() {
  const { family } = weddingData

  return (
    <section className="relative overflow-hidden bg-ivory-deep px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-xl text-center lg:max-w-3xl">
        <Stagger>
          <StaggerItem>
            <FloralDivider className="mx-auto" />
            <p className="mt-8 font-script text-[clamp(2rem,8vw,3rem)] leading-snug text-gold-deep">
              {family.withLove}
            </p>
            <p className="mt-4 font-serif text-xl leading-relaxed text-navy sm:text-2xl">
              {family.littleStars.join(", ")}
            </p>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-10 font-display text-xs tracking-[0.28em] text-gold-deep uppercase">
              {family.complimentsLabel}
            </p>
            <p className="mt-3 font-script text-[clamp(2.2rem,8vw,3.4rem)] leading-tight text-navy">
              {family.complimentsTitle}
            </p>
            <p className="mt-2 font-serif text-xl text-ink sm:text-2xl">{family.compliments}</p>
            <FloralDivider className="mx-auto mt-8" />
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  )
}
