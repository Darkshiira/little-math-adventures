
"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import {
  BriefcaseBusiness,
  ExternalLink,
} from "lucide-react";

export default function OmMigPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    const message = form.get("message");

    const subject = encodeURIComponent(`Meddelande från ${name}`);
    const body = encodeURIComponent(
      `Namn: ${name}\nE-post: ${email}\n\n${message}`
    );

    window.location.href =
      `mailto:hanna.arefi@outlook.com?subject=${subject}&body=${body}`;

    setSent(true);
  }

  return (
    <main className="min-h-screen bg-[#fffaf2] px-4 py-12 text-[#35443b] sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <section className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#57816b]">
              Bakom äventyren
            </p>

            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
              Hej, vad roligt att du hittat hit!
            </h1>

            <div className="space-y-4 text-base leading-8 text-[#58665c]">
              <p>
                Jag heter Hanna och är både utbildad lärare och
                webbutvecklare. Jag tycker om att hitta kreativa
                sätt att väcka barns nyfikenhet och lust att lära.
              </p>

              <p>
                Här kombinerar jag min erfarenhet av undervisning
                med mitt intresse för webbutveckling och skapar
                lekfulla digitala matematikaktiviteter för yngre barn.
              </p>

              <p>
                Min tanke är att lärande ska få vara roligt,
                nyfiket och fullt av upptäckter. Jag hoppas att
                ni hittar något ni tycker om att utforska!
              </p>
            </div>

            {/* Professional links */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="https://hanna-arefiportfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#426b55] px-5 py-3 font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#345540] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#426b55] focus:ring-offset-2"
              >
                <BriefcaseBusiness size={18} />
                Min utvecklarportfolio
                <ExternalLink size={15} className="opacity-75" />
              </a>

              <a
                href="https://www.linkedin.com/in/hanna-arefi/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#d9ded5] bg-white px-5 py-3 font-semibold text-[#426b55] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#426b55] hover:bg-[#f4f6ef] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#426b55] focus:ring-offset-2"
              >
                <span
                aria-hidden="true"
                className="flex h-[18px] w-[18px] items-center justify-center rounded-[3px] bg-[#426b55] text-[12px] font-bold leading-none text-white"
                >
                    in
                </span>
                Hitta mig på LinkedIn
                <ExternalLink size={15} className="opacity-75" />
              </a>
            </div>
          </div>

          <div className="mx-auto w-full max-w-sm">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#e7eadb] shadow-sm">
              <Image
                src="/images/profile.jpg"
                alt="Hanna"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
            <p className="mt-3 text-center text-sm text-[#758075]">
              En liten hälsning från mig 🌿
            </p>
          </div>
        </section>

        <section
          id="kontakt"
          className="mx-auto mt-20 max-w-2xl scroll-mt-24"
        >
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#57816b]">
              Hör gärna av dig
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl">
              Kontakta mig
            </h2>

            <p className="mt-3 leading-7 text-[#58665c]">
              Har du en fråga, en idé eller vill du bara säga hej?
              Du är varmt välkommen att skriva!
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-3xl border border-[#e9e5d9] bg-white p-6 shadow-sm sm:p-8"
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium"
              >
                Ditt namn
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-xl border border-[#d9ded5] bg-[#fffdf9] px-4 py-3 outline-none transition focus:border-[#57816b] focus:ring-2 focus:ring-[#57816b]/20"
                placeholder="Vad heter du?"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium"
              >
                Din e-postadress
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-[#d9ded5] bg-[#fffdf9] px-4 py-3 outline-none transition focus:border-[#57816b] focus:ring-2 focus:ring-[#57816b]/20"
                placeholder="namn@exempel.se"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium"
              >
                Meddelande
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full resize-y rounded-xl border border-[#d9ded5] bg-[#fffdf9] px-4 py-3 outline-none transition focus:border-[#57816b] focus:ring-2 focus:ring-[#57816b]/20"
                placeholder="Skriv ditt meddelande här..."
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#426b55] px-6 py-3 font-semibold text-white transition hover:bg-[#345540] focus:outline-none focus:ring-2 focus:ring-[#426b55] focus:ring-offset-2"
            >
              Öppna e-postprogrammet
            </button>

            {sent && (
              <p role="status" className="text-sm text-[#426b55]">
                Ditt e-postprogram ska nu öppnas. Meddelandet skickas
                inte förrän du skickar det där.
              </p>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}
