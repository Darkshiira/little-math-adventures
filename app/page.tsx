import { activities } from "../data/games";
import Link from "next/link";

export default function Home() {
  return (
    <div id="hem">
      {/* Välkomstsektion */}
      <section className="overflow-hidden px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C9E8D9] bg-white px-4 py-2 text-sm font-bold text-forest">
              <span aria-hidden="true">✨</span>
              Matte för nyfikna barn
            </span>

            <h1 className="mt-6 max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Små steg.
              <br />
              <span className="text-forest">Stora upptäckter!</span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-muted sm:text-lg">
              Följ med på roliga äventyr där vi räknar,
              klurar och lär oss matematik tillsammans.
              Är du redo att börja?
            </p>

            <Link
              href="#aventyr"
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-forest px-7 py-3 font-extrabold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#105347]"
            >
              Hitta ett äventyr
              <span aria-hidden="true">→</span>
            </Link>

            <p className="mt-4 text-sm font-semibold text-muted">
              🌟 Öva i din egen takt!
            </p>
          </div>

          <div className="relative flex min-h-64 items-center justify-center rounded-[2rem] bg-mint p-8 sm:min-h-80">
            <div
              aria-hidden="true"
              className="absolute left-8 top-8 text-4xl"
            >
              ✨
            </div>
            <div
              aria-hidden="true"
              className="absolute bottom-8 right-8 text-4xl"
            >
              🌼
            </div>

            <div className="relative rounded-[2rem] border-4 border-white bg-white p-8 text-center shadow-lg sm:p-10">
              <div className="text-7xl sm:text-8xl" aria-hidden="true">
                🦊
              </div>
              <p className="mt-3 text-xl font-extrabold text-forest">
                Hej, mattekompis!
              </p>
              <p className="mt-2 text-sm text-muted">
                Ska vi lösa en kluring?
              </p>

              <div className="mt-5 flex justify-center gap-3 text-3xl">
                <span aria-label="Två äpplen">🍎</span>
                <span aria-hidden="true">+</span>
                <span aria-label="Ett äpple">🍎</span>
                <span aria-hidden="true">=</span>
                <span aria-label="Tre äpplen">🍎</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Välj ett äventyr */}
      <section
        id="aventyr"
        className="border-y border-[#E9E4DA] bg-white px-4 py-12 sm:px-6 sm:py-16"
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-sm font-extrabold uppercase tracking-widest text-forest">
              Ditt nästa uppdrag
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Vart ska vi åka?
            </h2>
            <p className="mx-auto mt-3 max-w-xl leading-7 text-muted">
              Välj en värld och upptäck hur roligt matte kan vara.
            </p>
          </div>

          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => (
              <article
                key={activity.title}
                className="group rounded-3xl border border-[#E9E4DA] bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className={`flex min-h-36 items-center justify-center rounded-2xl text-6xl ${activity.color}`}
                >
                  <span aria-hidden="true">{activity.emoji}</span>
                </div>

                <p className="mt-5 text-xs font-extrabold uppercase tracking-wider text-forest">
                  {activity.tag}
                </p>
                <h3 className="mt-2 text-xl font-extrabold">
                  {activity.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {activity.description}
                </p>

                <a
                  href={activity.href}
                  className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-cream px-5 py-2 font-extrabold text-forest transition group-hover:bg-mint"
                >
                  Utforska <span aria-hidden="true">→</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Förklaring */}
      <section
        id="sa-fungerar-det"
        className="px-4 py-12 sm:px-6 sm:py-16"
      >
        <div className="mx-auto max-w-4xl rounded-3xl bg-[#FFF0D5] p-7 sm:p-10">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Här får man lära genom att leka
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-muted">
            Räkna saker, prova olika svar och upptäck nya
            sätt att tänka. Det är okej att göra fel – varje
            försök hjälper oss att lära oss mer!
          </p>
        </div>
      </section>

      <section id="for-vuxna" className="px-4 pb-12 sm:px-6">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm text-muted">
            En trygg och lekfull plats att öva matematik.
          </p>
        </div>
      </section>
    </div>
  );
}
