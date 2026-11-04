import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import weddingData from "../data/weddingData"

const RECEPTION = Date.parse(weddingData.countdown.target)
const SLIDE_MS = 4500

function timeLeft() {
  const remaining = Math.max(0, RECEPTION - Date.now())
  const hoursTotal = Math.floor(remaining / 3600000)
  return {
    days: Math.floor(hoursTotal / 24),
    hours: hoursTotal % 24,
  }
}

function ReceptionCountdown() {
  const [left, setLeft] = useState(timeLeft)

  useEffect(() => {
    const timer = window.setInterval(() => setLeft(timeLeft()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4" aria-label={weddingData.countdown.label}>
      {[
        ["Days", left.days],
        ["Hours", left.hours],
      ].map(([label, value]) => (
        <div
          key={label}
          className="min-w-[4.25rem] border border-gold bg-navy px-3 py-2 shadow-[0_8px_18px_rgba(0,0,0,0.28)] sm:min-w-[5.25rem] sm:px-4 sm:py-2.5 lg:min-w-[5.75rem]"
        >
          <p className="font-display text-[1.45rem] leading-none text-gold-bright tabular-nums sm:text-[1.75rem] lg:text-3xl">{value}</p>
          <p className="mt-1 font-display text-[0.62rem] tracking-[0.2em] text-gold-light uppercase">{label}</p>
        </div>
      ))}
    </div>
  )
}

export default function HeroSection({ revealed }) {
  const reduce = useReducedMotion()
  const slides = weddingData.couple.heroSlides
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduce || slides.length < 2 || !revealed) return undefined
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length)
    }, SLIDE_MS)
    return () => window.clearInterval(timer)
  }, [reduce, revealed, slides.length])

  const slide = slides[active] ?? slides[0]

  return (
    <section className="relative bg-ivory lg:flex lg:min-h-[100svh] lg:items-center lg:justify-center lg:px-8 lg:py-6">
      <div className="relative min-h-[100svh] w-full overflow-hidden bg-navy lg:h-[min(94svh,940px)] lg:min-h-0 lg:w-[min(52vh,480px)] lg:shadow-[0_24px_70px_rgba(16,35,72,0.28)] lg:ring-1 lg:ring-gold/60">
        <AnimatePresence initial={false} mode="sync">
          <motion.img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fetchPriority={active === 0 ? "high" : "low"}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: reduce ? 0 : 1.1, ease: "easeInOut" }}
          />
        </AnimatePresence>
        {slides.map((item, index) =>
          index === active ? null : (
            <img key={`preload-${item.src}`} src={item.src} alt="" className="hidden" aria-hidden="true" />
          ),
        )}
        <div className="pointer-events-none absolute inset-[10px] z-[2] border border-gold/75" />
        <div className="pointer-events-none absolute inset-[16px] z-[2] border border-gold/35" />
        <div className="absolute inset-x-0 top-0 z-[1] h-48 bg-gradient-to-b from-navy-soft/80 via-navy-soft/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 z-[1] h-72 bg-gradient-to-t from-navy-soft/90 via-navy-soft/45 to-transparent" />

        <div className="relative z-10 flex min-h-[100svh] flex-col items-center lg:h-full lg:min-h-0">
          <div className="flex flex-col items-center px-6 pt-[max(1.5rem,env(safe-area-inset-top))] text-center lg:pt-8">
            <p className="font-gurmukhi text-4xl text-gold-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] lg:text-5xl" aria-hidden="true">
              ੴ
            </p>
            <p className="mt-1 font-gurmukhi text-sm text-gold-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] lg:text-base">
              {weddingData.blessing}
            </p>
          </div>

          <div className="mt-auto w-full px-4 pb-[calc(6.75rem+env(safe-area-inset-bottom))] text-center sm:px-6 lg:pb-10">
            <ReceptionCountdown />
            <p className="mx-auto mt-7 font-script text-[clamp(3.2rem,12vw,4.6rem)] leading-none text-gold-light drop-shadow-[0_3px_12px_rgba(0,0,0,0.55)]">
              {weddingData.couple.groom}
              <span className="mx-2 inline-block font-serif text-[0.45em] text-gold-bright">♥</span>
              {weddingData.couple.bride}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
