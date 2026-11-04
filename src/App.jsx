import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import CoupleSection from "./components/CoupleSection"
import FamilySection from "./components/FamilySection"
import WeddingDateButton from "./components/WeddingDateButton"
import FloatingPetals from "./components/FloatingPetals"
import { startMusic } from "./lib/music"
import FooterSection from "./components/FooterSection"
import GaneshSection from "./components/GaneshSection"
import HeroSection from "./components/HeroSection"
import InvitationCover from "./components/InvitationCover"
import InvitationMessage from "./components/InvitationMessage"
import { MarginFlora } from "./components/Ornaments"
import VenueSection from "./components/VenueSection"
import WeddingCalendar from "./components/WeddingCalendar"
import WeddingIntro from "./components/WeddingIntro"

export default function App() {
  const [phase, setPhase] = useState("cover")
  const [petals, setPetals] = useState(false)
  const burstStarted = useRef(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const locked = phase !== "open"
    document.body.style.overflow = locked ? "hidden" : ""
    if (locked) {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [phase])

  useEffect(() => {
    if (phase !== "opening") return undefined
    window.scrollTo(0, 0)
    const timer = window.setTimeout(() => setPhase("open"), reduce ? 380 : 1450)
    return () => window.clearTimeout(timer)
  }, [phase, reduce])

  useEffect(() => {
    if (phase !== "open") return undefined
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    document.getElementById("invitation")?.focus({ preventScroll: true })
    // Focus can still nudge scroll in some browsers — pin top again after.
    requestAnimationFrame(() => window.scrollTo(0, 0))
  }, [phase])

  useEffect(() => {
    if (phase === "cover" || burstStarted.current || reduce) return undefined
    burstStarted.current = true
    setPetals(true)
    const timer = window.setTimeout(() => setPetals(false), 3600)
    return () => window.clearTimeout(timer)
  }, [phase, reduce])

  const openInvitation = () => {
    let shouldOpen = false
    setPhase((current) => {
      if (current !== "cover") return current
      shouldOpen = true
      return "opening"
    })
    if (shouldOpen) {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      startMusic()
    }
  }

  return (
    <div className="relative min-h-svh overflow-x-hidden bg-ivory text-ink">
      <MarginFlora />
      <motion.main
        id="invitation"
        tabIndex={-1}
        className="relative z-10 outline-none"
        initial={false}
        animate={{ opacity: phase === "cover" ? 0 : 1 }}
        transition={{
          duration: reduce ? 0.25 : 0.8,
          delay: phase === "opening" && !reduce ? 0.18 : 0,
        }}
      >
        <HeroSection revealed={phase !== "cover"} />
        <GaneshSection />
        <WeddingIntro />
        {/* <CoupleSection /> */}
        <WeddingCalendar />
        <VenueSection />
        <InvitationMessage />
        <FamilySection />
        <FooterSection />
      </motion.main>

      <FloatingPetals active={petals} />

      <AnimatePresence>
        {phase !== "open" && (
          <InvitationCover
            key="cover"
            opening={phase === "opening"}
            reduced={Boolean(reduce)}
            onOpen={openInvitation}
          />
        )}
      </AnimatePresence>

      {phase === "open" && <WeddingDateButton />}
    </div>
  )
}
