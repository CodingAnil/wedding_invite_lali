import { MapPin } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import weddingData from "../data/weddingData"
import { Stagger, StaggerItem } from "./Ornaments"

export default function VenueSection() {
  const { venue, venues } = weddingData
  const reduce = useReducedMotion()

  return (
    <section className="bg-ivory-deep px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-xl text-center lg:max-w-3xl">
        <Stagger>
          <StaggerItem>
            <h2 className="foil font-display text-[clamp(1.35rem,4.4vw,1.85rem)] tracking-[0.22em] uppercase">
              {venue.title}
            </h2>
          </StaggerItem>
          {venues.map((place) => (
            <StaggerItem key={place.name}>
              <motion.a
                href={place.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${place.lines.join(", ")} in Google Maps`}
                className="group relative mx-auto mt-8 block w-full max-w-md border border-gold/60 px-4 py-12 lg:max-w-xl lg:py-16"
                whileTap={reduce ? undefined : { scale: 0.985 }}
              >
                <span className="pointer-events-none absolute inset-[7px] border border-gold/30" />
                <MapPin className="relative mx-auto text-gold-deep" size={28} strokeWidth={1.4} aria-hidden="true" />
                <div className="relative mt-5">
                  {place.lines.map((line, index) => (
                    <p
                      key={line}
                      className={`font-display text-navy uppercase ${
                        index === 0
                          ? "text-[clamp(1.65rem,7vw,2.6rem)] tracking-[0.14em]"
                          : "mt-2 text-[clamp(1.15rem,4.2vw,1.55rem)] tracking-[0.18em]"
                      }`}
                    >
                      {line}
                    </p>
                  ))}
                </div>
                <p className="relative mt-7 font-serif text-lg text-gold-deep italic">{place.hint}</p>
              </motion.a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
