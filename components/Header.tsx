
"use client";

import { useState } from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";

const links = [
  { label: "Äventyr", href: "/#aventyr" },
  { label: "Om mig", href: "/om-mig" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isPlaying = pathname.startsWith("/activities/") || pathname.startsWith("/om-mig/");

  return (
    <header className="sticky top-0 z-50 border-b border-[#E9E4DA] bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-[68px] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href={isPlaying ? "/" : "#hem"}
          aria-label="Matteäventyret – till startsidan"
          className="flex shrink-0 items-center gap-2.5 rounded-lg"
        >
          <img
            src="/images/faviconfox.png"
            alt="Matteäventyret logotyp"
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="flex flex-col leading-tight">
            <span className="text-base font-extrabold tracking-tight text-forest sm:text-lg">
              Matteäventyret
            </span>
            <span className="mt-0.5 text-[11px] font-semibold text-muted">
              Upptäck matematik tillsammans!
            </span>
          </span>
        </Link>

        <nav
          aria-label="Huvudmeny"
          className="hidden items-center gap-6 md:flex"
        >
          {links.map((link) => (
            <Link
                key={link.href}
                    href={isPlaying ? `/${link.href}` : link.href}

                    className="rounded-lg px-2 py-2 text-sm font-bold text-ink transition-colors hover:text-forest"

>
    {link.label}
  </Link>
))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {!isPlaying && (<Link
             href={!isPlaying ? "/" : "#aventyr"}
            className="hidden rounded-full bg-forest px-5 py-2.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#105347] sm:inline-flex"
          >
            Börja spela <span aria-hidden="true" className="ml-1">→</span>
          </Link>)}

          <button
            type="button"
            aria-label={menuOpen ? "Stäng menyn" : "Öppna menyn"}
            aria-expanded={menuOpen}
            aria-controls="mobilmeny"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex size-10 items-center justify-center rounded-xl border border-[#E9E4DA] text-xl text-forest hover:bg-cream md:hidden"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobilmeny"
          aria-label="Mobilmeny"
          className="border-t border-[#E9E4DA] bg-white px-4 py-3 md:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {links.map((link) => (
                <Link
                    key={link.href}
                        href={isPlaying ? `/${link.href}` : link.href}
                        onClick={() => setMenuOpen(false)}
                        className="rounded-xl px-4 py-3 font-bold text-ink hover:bg-cream hover:text-forest">
                          {link.label}
                          </Link>
                        ))}

            {!isPlaying && (
                <Link
                     href={!isPlaying ? "/" : "/#aventyr"}
                    onClick={() => setMenuOpen(false)}
                    className="mt-2 rounded-xl bg-forest px-4 py-3 text-center font-extrabold text-white"
                >
                    Börja spela →
                </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
