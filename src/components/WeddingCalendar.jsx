import { useState } from "react"
import { Heart } from "lucide-react"
import weddingData from "../data/weddingData"
import { FloralDivider, Reveal } from "./Ornaments"
import WeddingDateSheet from "./WeddingDateSheet"

function buildDays() {
  const { startOffset, daysInMonth } = weddingData.calendar
  const cells = Array.from({ length: startOffset }, () => null)
  for (let day = 1; day <= daysInMonth; day += 1) cells.push(day)
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

const DAYS = buildDays()
const MARKS = Object.entries(weddingData.calendar.marks)
  .map(([day, mark]) => ({ day: Number(day), ...mark }))
  .sort((left, right) => left.day - right.day)

export default function WeddingCalendar() {
  const { saveTheDate, calendar } = weddingData
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <section className="bg-ivory px-4 py-16 sm:px-8 sm:py-24 lg:py-28">
      <Reveal className="mx-auto w-full max-w-xl lg:max-w-3xl" scale={0.98}>
        <div className="mx-auto mb-12 max-w-md">
          <p className="text-center font-display text-xs tracking-[0.28em] text-gold-deep uppercase">
            {weddingData.celebrationsTitle}
          </p>
          <div className="mt-6 space-y-4">
            {weddingData.celebrations.map((event) => (
              <div
                key={`${event.date}-${event.title}`}
                className={`flex items-end justify-between gap-4 border-b px-1 pb-3 ${
                  event.accent === "wedding" || event.accent === "reception"
                    ? "border-navy/40"
                    : "border-gold/30"
                }`}
              >
                <div>
                  <p className="font-display text-xs tracking-[0.16em] text-gold-deep uppercase">
                    {event.weekday}
                  </p>
                  <p className="font-serif text-[1.35rem] leading-tight text-navy sm:text-2xl">
                    {event.title}
                    {event.note && (
                      <span className="ml-2 font-serif text-base italic text-ink/70">{event.note}</span>
                    )}
                  </p>
                  <p className="font-serif text-base text-ink/70">{event.date}</p>
                </div>
                {event.time && (
                  <p className="shrink-0 font-display text-xs tracking-[0.14em] text-navy">{event.time}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="foil font-display text-[clamp(1.35rem,4.6vw,2.4rem)] uppercase tracking-[0.22em] sm:tracking-[0.28em]">
            {saveTheDate.title}
          </h2>
          <p className="mt-5 font-display text-[clamp(1.7rem,6vw,3rem)] uppercase tracking-[0.16em] text-navy sm:tracking-[0.22em]">
            {saveTheDate.month} {saveTheDate.year}
          </p>
          <FloralDivider className="mx-auto mt-4" />
        </div>

        <div className="relative mx-auto mt-10 w-full max-w-md border border-gold/60 bg-ivory px-1.5 py-5 sm:px-4 lg:max-w-2xl lg:px-6 lg:py-8">
          <div className="pointer-events-none absolute inset-[6px] border border-gold/25" />
          <div className="relative grid grid-cols-7 gap-x-0.5 gap-y-1 text-center sm:gap-x-1 lg:gap-x-2 lg:gap-y-2">
            {calendar.weekdays.map((day) => (
              <p
                key={day}
                className="pb-2 font-display text-[0.62rem] tracking-normal text-gold-deep uppercase sm:text-xs sm:tracking-[0.08em] lg:text-sm"
              >
                {day}
              </p>
            ))}
            {DAYS.map((day, index) => {
              const mark = day ? calendar.marks[day] : null
              const isReception = mark?.type === "reception"
              const isWedding = mark?.type === "wedding" || mark?.type === "event"
              const classes = `relative flex aspect-square w-full flex-col items-center justify-center ${
                isReception
                  ? "cursor-pointer bg-navy text-gold-bright shadow-[0_0_0_1px_#c6a15b]"
                  : isWedding
                    ? "bg-navy/15 text-navy shadow-[0_0_0_1px_#c6a15b]"
                    : "text-ink/80"
              }`
              return (
                <div key={`${day ?? "empty"}-${index}`} className="flex w-full min-w-0 items-center justify-center py-0.5">
                  {isReception ? (
                    <button
                      type="button"
                      className={classes}
                      aria-haspopup="dialog"
                      aria-expanded={sheetOpen}
                      aria-label={`${mark.caption}, ${mark.label}`}
                      onClick={() => setSheetOpen(true)}
                    >
                      <Heart
                        className="mark-glow absolute top-0.5 h-2.5 w-2.5 fill-gold-light text-gold-light lg:top-1 lg:h-4 lg:w-4"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      <span className="mt-1.5 font-serif text-base leading-none sm:text-lg lg:text-2xl">{day}</span>
                    </button>
                  ) : (
                    day && (
                      <div className={classes} aria-hidden={isWedding ? undefined : true}>
                        {isWedding && (
                          <Heart
                            className="mark-glow absolute top-0.5 h-2.5 w-2.5 fill-navy text-navy lg:top-1 lg:h-3.5 lg:w-3.5"
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />
                        )}
                        <span
                          className={`font-serif text-sm leading-none sm:text-base lg:text-xl ${
                            isWedding ? "mt-1.5" : ""
                          }`}
                        >
                          {day}
                        </span>
                      </div>
                    )
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="mx-auto mt-8 flex w-full max-w-md items-stretch justify-center gap-3 text-center sm:gap-5 lg:max-w-2xl">
          {MARKS.map((mark, index) => (
            <div key={mark.day} className="flex min-w-0 flex-1 items-stretch">
              {index > 0 && <div className="mr-3 w-px bg-gold/40 sm:mr-5" />}
              <div className="flex flex-1 flex-col items-center">
                <Heart className="mark-glow fill-navy text-navy" size={16} aria-hidden="true" />
                <p className="mt-2 font-display text-[0.62rem] tracking-[0.14em] text-gold-deep uppercase sm:text-xs">
                  {mark.caption}
                </p>
                <p className="font-serif text-xl text-navy sm:text-2xl">{mark.label}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
      <WeddingDateSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
    </section>
  )
}
