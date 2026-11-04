import { useEffect, useId, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import weddingData from "../data/weddingData"
import { downloadCalendarFile } from "../lib/calendarFile"

const FOCUSABLE = "button, a[href]"

export default function WeddingDateSheet({ open, onClose }) {
  const reduce = useReducedMotion()
  const dialogRef = useRef(null)
  const titleId = useId()
  const [notice, setNotice] = useState("")
  const event = weddingData.calendarEvent

  useEffect(() => {
    if (!open) return undefined
    const previousOverflow = document.body.style.overflow
    const previousFocus = document.activeElement
    document.body.style.overflow = "hidden"
    dialogRef.current?.focus()

    const onKey = (keyEvent) => {
      if (keyEvent.key === "Escape") {
        onClose()
        return
      }
      if (keyEvent.key !== "Tab") return
      const dialog = dialogRef.current
      if (!dialog) return
      const items = [...dialog.querySelectorAll(FOCUSABLE)]
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (keyEvent.shiftKey && document.activeElement === first) {
        keyEvent.preventDefault()
        last.focus()
      } else if (!keyEvent.shiftKey && document.activeElement === last) {
        keyEvent.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", onKey)
      if (previousFocus instanceof HTMLElement) previousFocus.focus()
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) setNotice("")
  }, [open])

  const addToCalendar = () => {
    const result = downloadCalendarFile(event)
    setNotice(
      result.ok
        ? "Calendar file ready. Open it, then save the event to add the wedding."
        : result.message,
    )
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.15 : 0.25 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-navy/45"
            aria-label="Close wedding details"
            onClick={onClose}
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className="relative max-h-[92svh] w-full max-w-md overflow-y-auto border border-gold bg-ivory px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center shadow-[0_-16px_40px_rgba(16,35,72,0.2)] outline-none sm:px-6 sm:pb-8 lg:max-w-lg"
            initial={reduce ? { opacity: 0 } : { y: 36, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: 24, opacity: 0 }}
            transition={{ duration: reduce ? 0.15 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pointer-events-none absolute inset-2 border border-gold/30" />
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 z-10 flex h-11 w-11 items-center justify-center font-serif text-2xl text-navy"
              aria-label="Close"
            >
              ×
            </button>
            <div className="relative">
              <p id={titleId} className="font-display text-sm tracking-[0.22em] text-gold-deep uppercase">
                ♥ {event.dateLabel}
              </p>
              <p className="mt-3 font-script text-5xl leading-none text-navy">{event.heading}</p>
              <p className="mt-3 font-display text-sm tracking-[0.28em] text-navy uppercase">
                {event.ceremony}
              </p>
              <p className="mt-6 font-display text-2xl tracking-[0.16em] text-navy uppercase">
                {event.place}
              </p>
              <p className="mt-1 font-display text-base tracking-[0.18em] text-ink uppercase">
                {event.region}
              </p>
              <button
                type="button"
                onClick={addToCalendar}
                className="mt-8 min-h-11 w-full border border-gold bg-navy px-4 py-3 font-display text-sm tracking-[0.22em] text-gold-light uppercase"
              >
                Add to calendar
              </button>
              <p className="mx-auto mt-1.5 max-w-xs font-serif text-xs leading-snug text-ink/75">
                Download the file, open it, and save the event.
              </p>
              <a
                href={event.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${event.location} in Google Maps`}
                className="mt-5 inline-flex min-h-11 items-center justify-center px-3 font-serif text-lg text-gold-deep underline decoration-gold/60 underline-offset-4"
              >
                Open in Google Maps
              </a>
              <p className="mx-auto mt-1.5 max-w-xs font-serif text-xs leading-snug text-ink/75">
                Open the map and add directions.
              </p>
              <p className="mt-3 min-h-12 font-serif text-base leading-snug text-ink" role="status" aria-live="polite">
                {notice}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
