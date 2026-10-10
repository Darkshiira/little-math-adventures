
import { activities } from "../data/games";
import Link from "next/link";

const activityImages: Record<string, string> = {
  Sifferjakten: "/images/rainbowsticker.png",
  "Djurens värld": "/images/turtlesticker.png",
  Fruktlandet: "/images/applesticker.png",
  Skogsvandringen: "/images/foreststicker.png",
};

const activityStyles: Record<string, { card: string; badge: string }> = {
  Sifferjakten: {
    card: "bg-[#E3F1FF]",
    badge: "bg-[#C5E2FF] text-[#1765A8]",
  },
  "Djurens värld": {
    card: "bg-[#E1F5E5]",
    badge: "bg-[#BDEBD0] text-[#176B50]",
  },
  Fruktlandet: {
    card: "bg-[#FFF3D2]",
    badge: "bg-[#FFE39A] text-[#96520D]",
  },
  Skogsvandringen: {
    card: "bg-[#FCE8D7]",
    badge: "bg-[#FFD0A3] text-[#A64C16]",
  },
};

export default function Home() {
  return (
    <main
      id="hem"
      className="overflow-hidden bg-[#FFF9EB] text-[#12584D]"
    >
      {/* Welcome / Hero section */}
      <section className="px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-5 md:grid-cols-[0.95fr_1.15fr] lg:gap-8">
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#CFF0DB] px-4 py-2 text-sm font-extrabold text-[#14775F] sm:text-base">
                <span aria-hidden="true">✨</span>
                Matte för nyfikna barn
              </span>

              <h1 className="mt-5 text-4xl font-black leading-[1.08] tracking-tight text-[#12584D] sm:text-5xl lg:text-6xl xl:text-7xl">
                Små steg.
                <br />
                <span className="text-[#279F7D]">
                  Stora upptäckter!
                </span>
              </h1>

              <p className="mt-5 max-w-lg text-base leading-7 text-[#285F58] sm:text-lg sm:leading-8">
                Följ med på roliga äventyr där vi räknar,
                klurar och lär oss matematik tillsammans.
                Är du redo att börja?
              </p>

              <Link
                href="#aventyr"
                className="mt-6 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#087F68] px-7 py-3 text-base font-extrabold text-white shadow-sm transition hover:-translate-y-1 hover:bg-[#086753] sm:text-lg"
              >
                Hitta ett äventyr
                <span aria-hidden="true" className="text-2xl">
                  →
                </span>
              </Link>

              <p className="mt-4 font-bold text-[#178B70]">
                <span aria-hidden="true">⭐</span>{" "}
                Öva i din egen takt!
              </p>
            </div>

            {/* Fox illustration */}
            <div className="relative flex min-h-[280px] items-center justify-center sm:min-h-[380px] lg:min-h-[470px]">
              <img
                src="/images/landingfox.png"
                alt="En glad räv omgiven av siffror och matematiska tecken"
                className="relative z-10 h-auto w-full max-w-[680px] object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Adventure cards */}
      <section
        id="aventyr"
        className="bg-[#FFFEFC] px-5 pb-8 pt-8 sm:px-8 sm:pb-10 sm:pt-10 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <header className="text-center">
            <p className="text-sm font-extrabold uppercase tracking-wider text-[#279F7D] sm:text-base">
              Ditt nästa uppdrag
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-[#12584D] sm:text-4xl lg:text-5xl">
              Vart ska vi åka?
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-base leading-7 text-[#527C75] sm:text-lg">
              Välj en värld och upptäck hur roligt matte kan vara.
            </p>
          </header>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {activities.map((activity) => {
              const style = activityStyles[activity.title] ?? {
                card: "bg-[#EAF5EC]",
                badge: "bg-[#CFF0DB] text-[#176B50]",
              };

              const image = activityImages[activity.title];

              return (
                <article
                  key={activity.title}
                  className={`group flex h-full flex-col rounded-[24px] p-4 transition duration-200 hover:-translate-y-1 hover:shadow-md sm:p-5 ${style.card}`}
                >
                  {/* Activity illustration */}
                  <div className="flex h-28 items-center justify-center sm:h-32 lg:h-28 xl:h-32">
                    {image ? (
                      <img
                        src={image}
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full object-contain transition duration-200 group-hover:scale-105"
                      />
                    ) : (
                      <span className="text-6xl" aria-hidden="true">
                        {activity.emoji}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 text-xl font-black leading-tight text-[#12584D]">
                    {activity.title}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#32685F]">
                    {activity.description}
                  </p>

                  <div className="mt-auto pt-3">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-extrabold sm:text-sm ${style.badge}`}
                    >
                      {activity.tag}
                    </span>

                    <Link
                      href={activity.href}
                      aria-label={`Utforska ${activity.title}`}
                      className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-full px-1 text-sm font-extrabold text-[#12584D] transition hover:gap-3"
                    >
                      Utforska
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Learning through play banner */}
          <section
            id="sa-fungerar-det"
            className="mt-5 rounded-[28px] bg-[#FFF0C9] px-5 py-5 sm:px-8 sm:py-6"
          >
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:gap-5 sm:text-left">
              <div
                className="shrink-0 text-4xl sm:text-5xl"
                aria-hidden="true"
              >
                🌱
              </div>

              <div>
                <h2 className="text-xl font-black text-[#12584D] sm:text-2xl">
                  Här får man lära genom att leka
                </h2>

                <p className="mt-1 text-sm leading-6 text-[#32685F] sm:text-base">
                  Räkna saker, prova olika svar och upptäck nya
                  sätt att tänka. Det är okej att göra fel –
                  varje försök hjälper oss att lära oss mer!
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
