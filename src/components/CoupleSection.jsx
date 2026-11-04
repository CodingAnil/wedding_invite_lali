import { motion, useReducedMotion } from "framer-motion";
import weddingData from "../data/weddingData";
import { Reveal } from "./Ornaments";

export default function CoupleSection() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-ivory px-5 py-16 sm:px-8 sm:py-24">
      <Reveal className="mx-auto max-w-[460px]">
        <div className="relative border border-gold/70 p-2.5 sm:p-3">
          <div className="pointer-events-none absolute inset-[7px] border border-gold/30" />
          <div className="relative aspect-[3/4] overflow-hidden">
            <motion.img
              src={weddingData.couple.portrait}
              alt={weddingData.couple.portraitAlt}
              width="900"
              height="2609"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-[center_20%]"
              initial={reduce ? false : { scale: 1.05, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
        <p className="mt-6 text-center font-display text-xs tracking-[0.28em] text-gold-deep uppercase">
          {weddingData.coupleMoment.caption}
        </p>
        <p className="mt-2 text-center font-script text-5xl text-navy">
          {weddingData.couple.groom}
          <span className="mx-2 text-3xl text-gold">♥</span>
          {weddingData.couple.bride}
        </p>
      </Reveal>
    </section>
  );
}
