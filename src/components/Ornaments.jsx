import { motion, useReducedMotion } from "framer-motion"

export function GaneshMark({ className = "h-16 w-16" }) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="Ganesh Ji">
      <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="60" cy="60" r="51.5" fill="none" stroke="currentColor" strokeWidth="0.45" />
      <g fill="currentColor">
        <path d="M60 16l4.2 7.2h-8.4L60 16z" />
        <path d="M48 24.5c3.2-3.2 20.8-3.2 24 0 1.2 1.2.4 2.6-1.2 2.4-6.2-.8-15.4-.8-21.6 0-1.6.2-2.4-1.2-1.2-2.4z" />
        <path d="M31 48c-7.5 1.2-12 9.5-9.2 16.8 2.4 6.2 9.6 7.4 13.4 2.6 1.2-1.5 1.5-2.2 1.2-4.2-.6-4.2-2.2-8.6-5.4-15.2z" />
        <path d="M89 48c7.5 1.2 12 9.5 9.2 16.8-2.4 6.2-9.6 7.4-13.4 2.6-1.2-1.5-1.5-2.2-1.2-4.2.6-4.2 2.2-8.6 5.4-15.2z" />
        <path d="M42.5 40.5c1.2-9.2 8.2-14.8 17.5-14.8s16.3 5.6 17.5 14.8c1.1 8.4-2.2 16.2-8.6 20.2-2.2 1.4-3.4 1.6-8.9 1.6s-6.7-.2-8.9-1.6c-6.4-4-9.7-11.8-8.6-20.2z" />
        <path d="M58.2 62.5c-.4 6.2-3.6 10.2-6.6 13.4-2.6 2.8-3.2 6.4-1.2 8.8 2.2 2.6 6.2 2.2 8.8-.6 2.8-3 4.2-6.6 4.6-10.8.3-3.2.2-6.6-.2-10.8h-5.4z" />
        <path d="M46 88.5c1.8 7.2 7.4 13.2 14 14.6 6.6-1.4 12.2-7.4 14-14.6 1-4-2.2-6.4-6.2-7.2-4.6 2.4-11 2.4-15.6 0-4 .8-7.2 3.2-6.2 7.2z" />
        <path d="M38 104c6.5 5.2 37.5 5.2 44 0-2.2 6.4-10.6 9.6-22 9.6S40.2 110.4 38 104z" />
      </g>
      <g fill="none" stroke="#fbf6ea" strokeWidth="1.15" strokeLinecap="round">
        <path d="M50.5 46.5c1.6 1.5 4.2 1.5 5.6 0" />
        <path d="M64 46.5c1.6 1.5 4.2 1.5 5.6 0" />
        <path d="M57.5 51.5c1.4 1.6 3.8 1.6 5.2 0" />
      </g>
      <circle cx="52.2" cy="44.6" r="1" fill="#fbf6ea" />
      <circle cx="67.6" cy="44.6" r="1" fill="#fbf6ea" />
    </svg>
  )
}

export function FloralDivider({ className = "" }) {
  const reduce = useReducedMotion()

  return (
    <motion.svg
      viewBox="0 0 240 24"
      className={`mx-auto block h-6 w-56 text-gold sm:w-64 lg:h-7 lg:w-80 ${className}`}
      aria-hidden="true"
      style={{ transformOrigin: "center" }}
      initial={reduce ? false : { opacity: 0, scaleX: 0.35 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <line x1="8" y1="12" x2="112" y2="12" stroke="currentColor" strokeWidth="1" />
      <line x1="128" y1="12" x2="232" y2="12" stroke="currentColor" strokeWidth="1" />
      <path d="M120 4.5 128 12 120 19.5 112 12Z" fill="currentColor" />
    </motion.svg>
  )
}

function Flourish() {
  return (
    <svg viewBox="0 0 72 72" className="h-12 w-12" aria-hidden="true">
      <path
        d="M8 18c14 2 20 10 24 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M14 10c8 8 10 16 8 26"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <path
        d="M10 28c10 0 16 6 18 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <circle cx="18" cy="16" r="2.2" fill="currentColor" />
      <path d="M16 14c4-6 10-6 12-1" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <path d="M22 20c6 2 8 8 6 12" fill="none" stroke="currentColor" strokeWidth="0.7" />
      <path d="M28 12c2 4 2 8 0 10" fill="none" stroke="currentColor" strokeWidth="0.7" />
    </svg>
  )
}

export function CornerFlourishes({ className = "text-gold-light" }) {
  const places = [
    "top-2.5 left-2.5",
    "top-2.5 right-2.5 -scale-x-100",
    "bottom-2.5 left-2.5 -scale-y-100",
    "bottom-2.5 right-2.5 -scale-100",
  ]

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {places.map((place) => (
        <div key={place} className={`absolute ${place}`}>
          <Flourish />
        </div>
      ))}
    </div>
  )
}

export function Marigold({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {[0, 45, 90, 135].map((angle) => (
        <ellipse
          key={angle}
          cx="12"
          cy="6.2"
          rx="2.1"
          ry="4"
          fill="currentColor"
          transform={`rotate(${angle} 12 12)`}
        />
      ))}
      <circle cx="12" cy="12" r="2.4" fill="#fbf6ea" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  )
}

export function MarginFlora() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 hidden xl:block" aria-hidden="true">
      <svg viewBox="0 0 200 280" className="absolute left-4 top-10 h-72 w-48 text-leaf/45">
        <path
          d="M40 260c20-40 10-80 30-120 16-32 10-70 28-100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path d="M70 150c-18-8-24-24-16-36 10 8 22 8 30-2-8 16-6 28-14 38z" fill="currentColor" />
        <path d="M86 90c14-12 30-8 34 6-14 2-24 10-28 22-6-8-8-18-6-28z" fill="currentColor" />
        <circle cx="98" cy="48" r="6" fill="currentColor" />
      </svg>
      <svg viewBox="0 0 200 280" className="absolute bottom-8 right-4 h-72 w-48 rotate-180 text-leaf/45">
        <path
          d="M40 260c20-40 10-80 30-120 16-32 10-70 28-100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path d="M70 150c-18-8-24-24-16-36 10 8 22 8 30-2-8 16-6 28-14 38z" fill="currentColor" />
        <path d="M86 90c14-12 30-8 34 6-14 2-24 10-28 22-6-8-8-18-6-28z" fill="currentColor" />
        <circle cx="98" cy="48" r="6" fill="currentColor" />
      </svg>
    </div>
  )
}

export function Reveal({ children, className = "", delay = 0, scale = 1 }) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}

const staggerChild = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export function Stagger({ children, className = "" }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={staggerParent}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = "" }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div className={className} variants={staggerChild}>
      {children}
    </motion.div>
  )
}
