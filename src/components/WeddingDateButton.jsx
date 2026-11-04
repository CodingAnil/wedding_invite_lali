import { useState } from "react"
import { Heart } from "lucide-react"
import weddingData from "../data/weddingData"
import WeddingDateSheet from "./WeddingDateSheet"

export default function WeddingDateButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={weddingData.dateBadge.label}
        className="fixed right-[max(0.75rem,env(safe-area-inset-right))] bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex h-16 w-16 flex-col items-center justify-center rounded-full border border-gold text-gold-bright shadow-[0_10px_24px_rgba(16,35,72,0.32)] lg:right-6 lg:bottom-6 lg:h-20 lg:w-20"
        style={{ background: "radial-gradient(circle at 35% 30%, #1a3264 0%, #0a1834 72%)" }}
      >
        <span className="pointer-events-none absolute inset-[5px] rounded-full border border-dashed border-gold/70" />
        <Heart className="relative fill-gold-bright text-gold-bright" size={14} strokeWidth={1.5} aria-hidden="true" />
        <span className="relative mt-0.5 text-center font-display text-[0.62rem] leading-tight tracking-[0.12em] uppercase">
          {weddingData.dateBadge.day}
          <br />
          {weddingData.dateBadge.month}
        </span>
      </button>
      <WeddingDateSheet open={open} onClose={() => setOpen(false)} />
    </>
  )
}
