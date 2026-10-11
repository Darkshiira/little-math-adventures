
"use client";

import { useState } from "react";
import Link from "next/link";

type ForestObject = {
  emoji: string;
  name: string;
  plural: string;
};

type Challenge = {
  object: ForestObject;
  total: number;
  remove: number;
  options: number[];
};

const forestObjects: ForestObject[] = [
  { emoji: "🍄", name: "svamp", plural: "svampar" },
  { emoji: "🍂", name: "löv", plural: "löv" },
  { emoji: "🌰", name: "ekollon", plural: "ekollon" },
  { emoji: "🫐", name: "blåbär", plural: "blåbär" },
  { emoji: "🌼", name: "blomma", plural: "blommor" },
  { emoji: "🍁", name: "lönnlöv", plural: "lönnlöv" },
  { emoji: "🌿", name: "blad", plural: "blad" },
  { emoji: "🌱", name: "skott", plural: "skott" },
  { emoji: "🌻", name: "solros", plural: "solrosor" },
  { emoji: "🌷", name: "tulpan", plural: "tulpaner" },
  { emoji: "🪵", name: "vedträ", plural: "vedträn" },
  { emoji: "🪨", name: "sten", plural: "stenar" },
  { emoji: "🌾", name: "grässtrå", plural: "grässtrån" },
  { emoji: "🍓", name: "smultron", plural: "smultron" },
  { emoji: "🌲", name: "gran", plural: "granar" },
  { emoji: "🪺", name: "fågelbo", plural: "fågelbon" },
];

function shuffle<T,>(items: T[]): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function makeChallenge(): Challenge {
  const object =
    forestObjects[Math.floor(Math.random() * forestObjects.length)];

  // Choose a starting number between 4 and 10.
  const total = Math.floor(Math.random() * 7) + 4;

  // Remove at least one, but leave at least one behind.
  const remove = Math.floor(Math.random() * (total - 1)) + 1;

  const answer = total - remove;

  // Generate distinct answer choices without risking an infinite loop.
  const possibleAnswers = Array.from(
    { length: total + 1 },
    (_, index) => index
  ).filter((number) => number !== answer);

  const distractors = shuffle(possibleAnswers).slice(0, 2);

  return {
    object,
    total,
    remove,
    options: shuffle([answer, ...distractors]),
  };
}

const firstChallenge: Challenge = {
  object: forestObjects[0],
  total: 7,
  remove: 3,
  options: [3, 5, 4],
};

export default function SkogsvandringenPage() {
  const [challenge, setChallenge] = useState<Challenge>(makeChallenge);
  const [removed, setRemoved] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [solved, setSolved] = useState(false);
const [message, setMessage] = useState(
  `Tryck på ${challenge.remove} ${
    challenge.remove === 1
      ? challenge.object.name
      : challenge.object.plural
  } för att plocka bort ${
    challenge.remove === 1 ? "den" : "dem"
  }!`
);
  const [showHint, setShowHint] = useState(false);

  const { object, total, remove, options } = challenge;
  const remaining = total - removed.length;
  const readyToAnswer = removed.length === remove;
  const correctAnswer = total - remove;
  const [oops, setOops] = useState(false);
  const [oopsIndex, setOopsIndex] = useState<number | null>(null);

function removeObject(index: number) {
  if (solved || removed.includes(index)) return;

  // The player has already removed the requested number.
  if (removed.length >= remove) {
    setOops(true);
    setOopsIndex(index);
    setMessage("Hoppsan! Du har plockat bort tillräckligt många. 🌿");

    // Vibrate briefly on supported devices.
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(100);
    }

    // Clear the red flash after a short moment.
    window.setTimeout(() => {
        setOops(false);
        setOopsIndex(null);
    }, 500);

    return;
  }

  const nextRemoved = [...removed, index];
  setRemoved(nextRemoved);

  if (nextRemoved.length === remove) {
    setMessage(
      `Bra jobbat! Nu har du plockat bort ${nextRemoved.length} ${
        nextRemoved.length === 1 ? object.name : object.plural
      }, hur många blev kvar?`
    );
  } else {
    setMessage(
      `Bra jobbat! Du har plockat bort ${nextRemoved.length} av ${remove} ${
        remove === 1 ? "sak" : "saker"
      }.`
    );
  }
}


  function chooseAnswer(answer: number) {
    if (!readyToAnswer || solved) return;

    setSelectedAnswer(answer);

    if (answer === correctAnswer) {
      setSolved(true);
      setMessage("Helt rätt! Vilken skicklig skogsvandrare! 🌟");
    } else {
      setMessage("Inte riktigt! Räkna de saker som finns kvar och försök igen.");
    }
  }

  function nextChallenge() {
    setChallenge(makeChallenge());
    setRemoved([]);
    setSelectedAnswer(null);
    setSolved(false);
    setShowHint(false);
    setMessage("Ta god tid på dig och räkna noga!");
  }

  function restartGame() {
    setChallenge(makeChallenge());
    setRemoved([]);
    setSelectedAnswer(null);
    setSolved(false);
    setShowHint(false);
    setMessage("Nu går vi ut på en ny skogsvandring!");
  }

  return (
    <main className="min-h-screen bg-[#FFFCF2] px-4 py-5 text-[#07594F] sm:px-6 sm:py-8">
      <div className="mx-auto max-w-6xl">
        {/* Navigation */}
        <header className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#FCE3C9] px-5 py-3 font-bold transition hover:bg-[#F8D5B2]"
          >
            ← Tillbaka till startsidan
          </Link>

          <Link
            href="/"
            className="text-xl font-extrabold tracking-tight sm:text-2xl"
          >
            🌲 Skogsvandringen
          </Link>
 
          <span className="rounded-full bg-[#FCE8D7] px-4 py-2 text-sm font-bold">
            Subtraktion 🌿
          </span>
        </header>

        {/* Introduction */}
        <section className="mt-8">

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Plocka och räkna bort!
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 sm:text-lg">
            Följ med ut i skogen. Plocka bort rätt antal saker och
            räkna hur många som finns kvar!
          </p>
        </section>

        {/* Game */}
        <section className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(300px,1fr)]">
          {/* Forest scene */}
          <div className="overflow-hidden rounded-[2rem] border border-[#EED5B9] bg-[#FCE8D7] shadow-sm">
            <div className="relative overflow-hidden bg-gradient-to-b from-[#DFF4F4] via-[#EFF7DB] to-[#9BCB78] px-4 pb-6 pt-5 sm:px-7">
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 rounded-t-[50%] bg-[#8FBE69]"
                aria-hidden="true"
              />

              <div className="relative flex items-center justify-between text-4xl sm:text-5xl" aria-hidden="true">
                <span>🌲</span>
                <span>☁️</span>
                <span>🌳</span>
              </div>

              <div className="relative mt-4 rounded-[1.5rem] border border-white/70 bg-[#F7F5D9]/90 p-4 shadow-sm sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-bold text-[#477044]">
                    På skogsstigen hittar du…
                  </p>
                  <span className="text-2xl" aria-hidden="true">🌿</span>
                </div>

                <div
                  className="mt-5 grid grid-cols-4 justify-items-center gap-2 sm:grid-cols-5 sm:gap-3"
                  aria-label={`${remaining} ${object.plural} kvar`}
                >
                  {Array.from({ length: total }, (_, index) => {
                    const isRemoved = removed.includes(index);

                    return (
                    <button
                    key={index}
                    type="button"
                    disabled={isRemoved || solved}
                    onClick={() => removeObject(index)}
                    aria-label={
                        isRemoved
                        ? `${object.name} bortplockad`
                        : `Plocka bort ${object.name} ${index + 1}`
                    }
                    className={`flex aspect-square w-full max-w-[76px] items-center justify-center rounded-2xl text-4xl transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D18B42] sm:text-5xl ${
                        oops && oopsIndex === index
                        ? "border-2 border-red-600 bg-red-400/90 shadow-[0_0_0_4px_rgba(220,38,38,0.3)] animate-[forestOops_450ms_ease-in-out]"
                        : isRemoved
                        ? "scale-75 border-2 border-dashed border-[#B9CBA5] bg-[#E4E9D4]/60 opacity-25 motion-safe:animate-pulse"
                        : "border-2 border-transparent bg-white/75 shadow-sm hover:-translate-y-1 hover:border-[#E6BA81] hover:bg-white active:scale-90"
                    }`}
                    >
                        {isRemoved ? (
                            <span aria-hidden="true">✨</span>
                        ) : (
                        <span aria-hidden="true">{object.emoji}</span>
                        )}
                        </button>
                        );
                  })}
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/80 px-4 py-3">
                  <span className="font-semibold text-[#477044]">
                    Kvar i skogen:
                  </span>
                  <span className="text-2xl font-extrabold tabular-nums">
                    {remaining} st
                  </span>
                </div>
              </div>

            </div>

            <div className="bg-[#F9E7D6] px-5 py-4 text-center text-sm font-medium text-[#6C624A]">
              🌳 Titta noga – varje sak du plockar bort räknas!
            </div>
          </div>

          {/* Activity panel */}
          <aside className="flex flex-col rounded-[2rem] bg-[#FCE8D7] p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-4xl">
                {object.emoji}
              </div>
              <div>
                <h2 className="text-2xl font-extrabold">
                  Dagens uppdrag
                </h2>
                <p className="mt-1 text-sm">Hjälp skogen!</p>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border-2 border-[#EED5B9] bg-white px-4 py-5 text-center">
              <p className="text-sm font-bold text-[#7B8062]">
                Hur många finns kvar?
              </p>
              <p className="mt-2 text-4xl font-extrabold tracking-wide sm:text-5xl">
                {total} − {remove} = ?
              </p>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between text-sm font-bold">
                <span>Plocka bort</span>
                <span>{removed.length} av {remove}</span>
              </div>
              <div className="mt-2 h-3 overflow-hidden rounded-full bg-[#E7CFB5]">
                <div
                  className="h-full rounded-full bg-[#6C9B54] transition-all duration-300"
                  style={{ width: `${(removed.length / remove) * 100}%` }}
                />
              </div>
            </div>

            <p
              className="mt-5 min-h-16 font-semibold leading-6"
              aria-live="polite"
            >
              {message}
            </p>

            {readyToAnswer && (
              <div className="mt-2">
                <p className="mb-3 font-bold">
                  Välj rätt svar:
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {options.map((answer) => (
                    <button
                      key={answer}
                      type="button"
                      onClick={() => chooseAnswer(answer)}
                      disabled={solved}
                      className={`rounded-2xl border-2 px-3 py-4 text-2xl font-extrabold transition hover:-translate-y-0.5 ${
                        selectedAnswer === answer && !solved
                          ? "border-[#C47C39] bg-[#F8D4AE]"
                          : solved && answer === correctAnswer
                            ? "border-[#6C9B54] bg-[#D8EDC9]"
                            : "border-[#EED5B9] bg-white hover:bg-[#FFF9EF]"
                      }`}
                    >
                      {answer}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowHint((current) => !current)}
              aria-expanded={showHint}
              className="mt-4 flex items-center gap-3 rounded-2xl px-2 py-3 text-left transition hover:bg-white/60"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-2xl">
                💡
              </span>
              <span className="font-bold">
                {showHint ? "Dölj ledtråden" : "Behöver du en ledtråd?"}
              </span>
            </button>

            {showHint && (
              <p className="rounded-2xl bg-white/80 p-4 text-sm leading-6">
                Räkna hur många {object.plural} du började med.
                Titta sedan på hur många du har plockat bort.
                Räkna de som fortfarande syns!
              </p>
            )}

            <div className="mt-auto pt-5">
              {solved ? (
                <button
                  type="button"
                  onClick={nextChallenge}
                  className="w-full rounded-full bg-[#6C9B54] px-5 py-4 font-extrabold text-white transition hover:bg-[#527E3E]"
                >
                  Nästa skogsuppdrag →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={restartGame}
                  className="w-full rounded-full bg-white px-5 py-3 font-bold transition hover:bg-[#FFF5E9]"
                >
                  Börja om ↻
                </button>
              )}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
