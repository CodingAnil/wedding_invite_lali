import weddingData from "../data/weddingData"
import { FloralDivider, Stagger, StaggerItem } from "./Ornaments"

function Parents({ relation, father, mother, place }) {
  return (
    <p className="mt-3 font-serif text-lg leading-snug text-ink/80 sm:text-xl">
      {relation} {mother} & {father}
      {place && <span className="mt-1 block text-base italic text-gold-deep">{place}</span>}
    </p>
  )
}

export default function WeddingIntro() {
  const { groomFamily, brideFamily } = weddingData

  return (
    <section className="relative overflow-hidden bg-ivory-deep px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute -left-8 top-16 h-40 w-40 rounded-full bg-leaf/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-10 h-44 w-44 rounded-full bg-gold/20 blur-3xl" />

      <Stagger className="relative mx-auto w-full max-w-xl text-center lg:max-w-3xl">
        <StaggerItem>
          {/* <img
            src={weddingData.couple.monogram}
            alt=""
            width="1100"
            height="906"
            loading="lazy"
            decoding="async"
            className="mx-auto mb-6 w-32 sm:w-36"
          /> */}
          <p className="px-2 font-script text-[clamp(2rem,8vw,3rem)] leading-tight text-navy lg:text-5xl">{weddingData.host.name}</p>
          <p className="mx-auto mt-3 max-w-sm font-serif text-lg leading-snug text-ink/80 italic sm:max-w-md sm:text-xl lg:max-w-2xl lg:text-2xl">
            {weddingData.host.line}
          </p>
        </StaggerItem>

        <StaggerItem>
          <h2 className="mt-10 px-2 py-2 font-script text-[clamp(2.6rem,9vw,4.4rem)] leading-normal text-navy">
            {weddingData.vivah}
          </h2>
          <FloralDivider className="mx-auto mt-4" />
        </StaggerItem>

        <StaggerItem>
          <div className="relative mx-auto mt-10 max-w-md px-2 py-4">
            <p className="font-script text-[clamp(2.75rem,12vw,4.8rem)] leading-tight text-navy">
              {weddingData.couple.groom}
            </p>
            <Parents
              relation={groomFamily.relation}
              father={groomFamily.father}
              mother={groomFamily.mother}
            />
          </div>
        </StaggerItem>

        <StaggerItem>
          <p className="foil font-display text-sm tracking-[0.42em] uppercase">{weddingData.wedsLabel}</p>
        </StaggerItem>

        <StaggerItem>
          <p className="mt-6 font-script text-[clamp(2.75rem,12vw,4.8rem)] leading-tight text-navy">
            {weddingData.couple.bride}
          </p>
          <Parents
            relation={brideFamily.relation}
            father={brideFamily.father}
            mother={brideFamily.mother}
            place={brideFamily.place}
          />
        </StaggerItem>
      </Stagger>
    </section>
  )
}
