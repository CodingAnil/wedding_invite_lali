import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import weddingData from "../data/weddingData"

const CORNER_PETALS = [
  { left: "4%", top: "6%", size: 14, color: "#e6cf8e", delay: 0.1, rotate: -18 },
  { left: "10%", top: "3%", size: 10, color: "#fffaf3", delay: 0.25, rotate: 22 },
  { left: "86%", top: "5%", size: 12, color: "#c6a15b", delay: 0.15, rotate: 14 },
  { left: "92%", top: "9%", size: 9, color: "#6e8458", delay: 0.3, rotate: -26 },
  { left: "5%", top: "88%", size: 11, color: "#f6efe2", delay: 0.2, rotate: 16 },
  { left: "11%", top: "93%", size: 13, color: "#e6cf8e", delay: 0.35, rotate: -12 },
  { left: "88%", top: "90%", size: 10, color: "#f3e4bc", delay: 0.18, rotate: 28 },
  { left: "93%", top: "85%", size: 12, color: "#102348", delay: 0.28, rotate: -20 },
]

function Petal({ color, size }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 20 30" aria-hidden="true">
      <path
        d="M10 1.5c3.8 5.2 7.2 10.2 7.2 15.2C17.2 24 14 28.2 10 28.2S2.8 24 2.8 16.7C2.8 11.7 6.2 6.7 10 1.5z"
        fill={color}
      />
    </svg>
  )
}

function HeartMotif({ color = "#102348", size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 20s-7-4.4-7-9.2C5 8 6.8 6.2 9 6.2c1.3 0 2.4.6 3 1.6.6-1 1.7-1.6 3-1.6 2.2 0 4 1.8 4 4.6C19 15.6 12 20 12 20z"
        fill={color}
      />
    </svg>
  )
}

function MarigoldMotif({ className = "h-5 w-5" }) {
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

function RoseCluster({ className = "" }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <path d="M22 102c18-8 28-24 34-44" fill="none" stroke="#6e8458" strokeWidth="1.3" />
      <path d="M34 78c-14-1-20-14-10-22 7 7 14 7 19-2-5 10-4 17-9 24z" fill="#7d9464" />
      <path d="M52 58c11-9 22-7 26 4-10 2-17 7-21 16-4-6-6-13-5-20z" fill="#5f7348" />
      <g transform="translate(74 38)">
        <ellipse cx="0" cy="4" rx="15" ry="17" fill="#fffaf3" transform="rotate(-16)" />
        <ellipse cx="-1" cy="3" rx="12" ry="14" fill="#f4ead6" transform="rotate(24)" />
        <ellipse cx="1" cy="2" rx="8" ry="10" fill="#fffdf8" />
        <circle cx="0" cy="2" r="3.2" fill="#e6cf8e" />
      </g>
      <circle cx="26" cy="104" r="3.2" fill="#fffaf3" />
      <circle cx="36" cy="110" r="2.1" fill="#f3e4bc" />
    </svg>
  )
}

function CoverDecor({ opening, reduced }) {
  const corners = [
    { className: "top-2 left-2 sm:top-3 sm:left-3", flip: "" },
    { className: "top-2 right-2 -scale-x-100 sm:top-3 sm:right-3", flip: "" },
    { className: "bottom-2 left-2 -scale-y-100 sm:bottom-3 sm:left-3", flip: "" },
    { className: "bottom-2 right-2 -scale-100 sm:bottom-3 sm:right-3", flip: "" },
  ]

  return (
    <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden" aria-hidden="true">
      {corners.map((corner, index) => (
        <motion.div
          key={corner.className}
          className={`absolute ${corner.className}`}
          initial={reduced ? false : { opacity: 0, scale: 0.7 }}
          animate={
            opening
              ? { opacity: 0, scale: 0.85 }
              : reduced
                ? { opacity: 1, scale: 1 }
                : { opacity: 1, scale: 1, rotate: [0, index % 2 === 0 ? 2 : -2, 0] }
          }
          transition={
            opening
              ? { duration: 0.35 }
              : reduced
                ? { duration: 0.2 }
                : {
                    opacity: { duration: 0.7, delay: 0.15 + index * 0.08 },
                    scale: { duration: 0.7, delay: 0.15 + index * 0.08 },
                    rotate: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 },
                  }
          }
        >
          <RoseCluster className="h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32" />
        </motion.div>
      ))}

      {[
        { className: "top-16 left-5 sm:top-20 sm:left-10", delay: 0.4 },
        { className: "top-20 right-6 sm:top-24 sm:right-12", delay: 0.55 },
        { className: "bottom-20 left-7 sm:bottom-24 sm:left-14", delay: 0.5 },
        { className: "bottom-16 right-5 sm:bottom-20 sm:right-10", delay: 0.65 },
      ].map((item) => (
        <motion.div
          key={item.className}
          className={`absolute text-gold-deep ${item.className}`}
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={
            opening
              ? { opacity: 0 }
              : reduced
                ? { opacity: 0.9, y: 0 }
                : { opacity: [0.55, 0.95, 0.55], y: [0, -4, 0] }
          }
          transition={
            opening
              ? { duration: 0.3 }
              : reduced
                ? { duration: 0.2 }
                : { duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: item.delay }
          }
        >
          <MarigoldMotif className="h-4 w-4 sm:h-5 sm:w-5" />
        </motion.div>
      ))}

      {CORNER_PETALS.map((petal) => (
        <motion.span
          key={`${petal.left}-${petal.top}`}
          className="absolute"
          style={{ left: petal.left, top: petal.top }}
          initial={reduced ? false : { opacity: 0, scale: 0.6 }}
          animate={
            opening
              ? { opacity: 0, y: -10 }
              : reduced
                ? { opacity: 0.85, rotate: petal.rotate }
                : {
                    opacity: [0.45, 0.9, 0.45],
                    y: [0, -6, 0],
                    rotate: [petal.rotate, petal.rotate + 10, petal.rotate],
                  }
          }
          transition={
            opening
              ? { duration: 0.3 }
              : reduced
                ? { duration: 0.2 }
                : {
                    duration: 3.8 + petal.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: petal.delay,
                  }
          }
        >
          {petal.size % 2 === 0 ? (
            <Petal color={petal.color} size={petal.size} />
          ) : (
            <HeartMotif color={petal.color} size={petal.size} />
          )}
        </motion.span>
      ))}
    </div>
  )
}

export default function InvitationCover({ opening, reduced, onOpen }) {
  const [pressed, setPressed] = useState(false)
  const buttonRef = useRef(null)
  const preferReduce = useReducedMotion()
  const quiet = Boolean(reduced || preferReduce)

  useEffect(() => {
    buttonRef.current?.focus({ preventScroll: true })
  }, [])

  const open = () => {
    if (pressed || opening) return
    setPressed(true)
    onOpen()
  }

  const flap = opening && !quiet ? { rotateX: -168 } : { rotateX: 0 }

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden bg-ivory"
      exit={{ opacity: 0 }}
      transition={{ duration: quiet ? 0.2 : 0.3 }}
    >
      <motion.div
        className="absolute inset-0 bg-ivory"
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ delay: opening && !quiet ? 0.45 : 0, duration: quiet ? 0.2 : 0.55 }}
      />

      <CoverDecor opening={opening} reduced={quiet} />

      <div className="relative z-10 flex h-full items-center justify-center px-4 py-10 lg:p-10">
        <motion.div
          className="relative h-[min(76svh,36rem)] w-[min(calc(100vw-2rem),22rem)] lg:h-[min(56vh,420px)] lg:w-[min(78vw,720px)]"
          style={{ perspective: 1200 }}
          initial={quiet ? false : { opacity: 0, y: 18, scale: 0.96 }}
          animate={
            opening && !quiet
              ? { y: -8, scale: 1.02, opacity: 1 }
              : { y: 0, scale: pressed ? 0.985 : 1, opacity: 1 }
          }
          transition={{ duration: quiet ? 0.25 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute inset-0 bg-ivory-deep shadow-[0_16px_36px_rgba(16,35,72,0.22)]"
            animate={opening ? { opacity: 0, y: 16 } : { opacity: 1, y: 0 }}
            transition={{ delay: opening && !quiet ? 0.62 : 0, duration: quiet ? 0.2 : 0.4 }}
          />

          <div
            className="absolute inset-0 bg-navy"
            style={{ clipPath: "polygon(0 0, 0 100%, 50% 50%)" }}
          />
          <div
            className="absolute inset-0 bg-navy"
            style={{ clipPath: "polygon(100% 0, 100% 100%, 50% 50%)" }}
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-navy" />

          <motion.div
            className="absolute inset-x-0 top-0 z-10 h-1/2"
            style={{
              transformOrigin: "center top",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
            animate={flap}
            transition={
              quiet
                ? { duration: 0.2 }
                : { delay: 0.12, duration: 0.85, ease: [0.45, 0.02, 0.2, 1] }
            }
          >
            <div
              className="absolute inset-0"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background: "linear-gradient(180deg, #1a3264 0%, #102348 70%, #0a1834 100%)",
              }}
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 z-20"
            style={{ transformOrigin: "center top", transformStyle: "preserve-3d" }}
            animate={
              opening && !quiet
                ? { rotateX: -168, opacity: 0 }
                : { rotateX: 0, opacity: 1 }
            }
            transition={
              quiet
                ? { duration: 0.2 }
                : {
                    rotateX: { delay: 0.12, duration: 0.85, ease: [0.45, 0.02, 0.2, 1] },
                    opacity: { delay: 0.7, duration: 0.3 },
                  }
            }
          >
            <motion.p
              className="absolute inset-x-4 top-[6%] text-center font-gurmukhi text-[clamp(0.95rem,3.5vw,1.35rem)] text-gold-light lg:top-[4%] lg:text-base"
              initial={quiet ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: quiet ? 0 : 0.35, duration: 0.55 }}
            >
              {weddingData.blessing}
            </motion.p>

            <motion.img
              src={weddingData.couple.monogram}
              alt={weddingData.couple.monogramAlt}
              className="absolute top-[12%] left-1/2 h-[min(8.5rem,16svh)] w-auto -translate-x-1/2 object-contain [@media(max-height:500px)]:top-[4.25rem] [@media(max-height:500px)]:h-12 lg:top-[15%] lg:h-24"
              initial={quiet ? false : { opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: quiet ? 0 : 0.48, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.button
              ref={buttonRef}
              type="button"
              onClick={open}
              disabled={pressed || opening}
              aria-label="Open invitation"
              style={{ outline: "none" }}
              className="absolute top-1/2 left-1/2 w-[min(42vw,10.5rem,36svh)] -translate-x-1/2 -translate-y-[41.3%] drop-shadow-[0_14px_16px_rgba(0,0,0,0.4)] lg:w-[7.5rem]"
              initial={quiet ? false : { opacity: 0, scale: 0.82 }}
              animate={
                pressed && !opening
                  ? { scale: 0.94, opacity: 1 }
                  : quiet
                    ? { scale: 1, opacity: 1 }
                    : {
                        scale: [1, 1.045, 1],
                        opacity: 1,
                        filter: [
                          "drop-shadow(0 10px 14px rgba(0,0,0,0.28))",
                          "drop-shadow(0 12px 22px rgba(198,161,91,0.5))",
                          "drop-shadow(0 10px 14px rgba(0,0,0,0.28))",
                        ],
                      }
              }
              transition={
                pressed || quiet
                  ? { duration: 0.15 }
                  : {
                      opacity: { delay: 0.62, duration: 0.45 },
                      scale: { delay: 0.9, duration: 2.6, repeat: Infinity, ease: "easeInOut" },
                      filter: { delay: 0.9, duration: 2.6, repeat: Infinity, ease: "easeInOut" },
                    }
              }
              whileTap={{ scale: 0.94 }}
            >
              <img src="/images/wax-seal.png" alt="" className="h-auto w-full" />
              <span className="pointer-events-none absolute top-[41.3%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[clamp(1rem,4vw,1.35rem)] tracking-[0.16em] text-[#6b4e1e] lg:text-base lg:tracking-[0.14em]">
                Open
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
