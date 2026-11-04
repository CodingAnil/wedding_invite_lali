import { motion, useReducedMotion } from "framer-motion";

const BURST = [
  {
    left: "10%",
    delay: 0.05,
    duration: 3.1,
    size: 13,
    sway: 26,
    color: "#fffaf3",
    spin: 160,
  },
  {
    left: "24%",
    delay: 0.2,
    duration: 3.4,
    size: 9,
    sway: -18,
    color: "#e6cf8e",
    spin: -140,
  },
  {
    left: "42%",
    delay: 0.1,
    duration: 2.8,
    size: 12,
    sway: 16,
    color: "#c6a15b",
    spin: 180,
  },
  {
    left: "58%",
    delay: 0.28,
    duration: 3.2,
    size: 8,
    sway: -22,
    color: "#f6efe2",
    spin: 120,
  },
  {
    left: "72%",
    delay: 0.12,
    duration: 3.5,
    size: 14,
    sway: 20,
    color: "#6e8458",
    spin: -160,
  },
  {
    left: "86%",
    delay: 0.32,
    duration: 3,
    size: 10,
    sway: -14,
    color: "#e6cf8e",
    spin: 150,
  },
  {
    left: "33%",
    delay: 0.4,
    duration: 3.3,
    size: 7,
    sway: 12,
    color: "#c6a15b",
    spin: -100,
  },
  {
    left: "64%",
    delay: 0.18,
    duration: 2.9,
    size: 11,
    sway: -20,
    color: "#102348",
    spin: 130,
  },
];

const DRIFT = [
  { left: "14%", delay: 0.1, size: 11, sway: 14, color: "#fffaf3" },
  { left: "48%", delay: 0.35, size: 8, sway: -10, color: "#e6cf8e" },
  { left: "78%", delay: 0.2, size: 10, sway: 12, color: "#6e8458" },
];

function PetalShape({ color, size }) {
  return (
    <svg
      width={size}
      height={size * 1.45}
      viewBox="0 0 20 30"
      aria-hidden="true"
    >
      <path
        d="M10 1.5c3.8 5.2 7.2 10.2 7.2 15.2C17.2 24 14 28.2 10 28.2S2.8 24 2.8 16.7C2.8 11.7 6.2 6.7 10 1.5z"
        fill={color}
      />
    </svg>
  );
}

export default function FloatingPetals({ active }) {
  const reduce = useReducedMotion();
  if (!active || reduce) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
      aria-hidden="true"
    >
      {BURST.map((petal) => (
        <motion.span
          key={`${petal.left}-${petal.delay}`}
          className="absolute top-0"
          style={{ left: petal.left }}
          initial={{ y: "-8vh", x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: "108vh",
            x: [0, petal.sway, petal.sway * -0.4],
            rotate: [0, petal.spin * 0.45, petal.spin],
            opacity: [0, 0.75, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            ease: "easeIn",
          }}
        >
          <PetalShape color={petal.color} size={petal.size} />
        </motion.span>
      ))}
    </div>
  );
}

export function PetalDrift() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-36 overflow-hidden"
      aria-hidden="true"
    >
      {DRIFT.map((petal) => (
        <motion.span
          key={petal.left}
          className="absolute"
          style={{ left: petal.left }}
          initial={{ y: -24, x: 0, opacity: 0, rotate: 0 }}
          whileInView={{
            y: 120,
            x: petal.sway,
            opacity: [0, 0.7, 0],
            rotate: petal.sway > 0 ? 80 : -80,
          }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 2.4, delay: petal.delay, ease: "easeIn" }}
        >
          <PetalShape color={petal.color} size={petal.size} />
        </motion.span>
      ))}
    </div>
  );
}
