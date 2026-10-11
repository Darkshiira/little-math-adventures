
"use client";


import { useState } from "react";
import Link from "next/link";

type AnimalType =
  | "butterfly"
  | "bird"
  | "rabbit"
  | "hedgehog"
  | "ladybug"
  | "frog"
  | "squirrel"
  | "deer";

type Animal = {
  id: string;
  type: AnimalType;
  name: string;
  x: number;
  y: number;
};

type Round = {
  type: AnimalType;
  title: string;
  instruction: string;
  hint: string;
};


const animals: Animal[] = [
  // Animals in the trees
  { id: "bird-1", type: "bird", name: "Fågel", x: 16, y: 15 },
  { id: "squirrel-1", type: "squirrel", name: "Ekorre", x: 91, y: 36 },

  // Butterflies
  { id: "butterfly-1", type: "butterfly", name: "Fjäril", x: 22, y: 40 },
  { id: "butterfly-2", type: "butterfly", name: "Fjäril", x: 43, y: 47 },
  { id: "butterfly-3", type: "butterfly", name: "Fjäril", x: 81, y: 74 },

  // Rabbits
  { id: "rabbit-1", type: "rabbit", name: "Kanin", x: 10, y: 72 },
  { id: "rabbit-2", type: "rabbit", name: "Kanin", x: 25, y: 63 },
  { id: "rabbit-3", type: "rabbit", name: "Kanin", x: 61, y: 72 },

  // Hedgehog
  { id: "hedgehog-1", type: "hedgehog", name: "Igelkott", x: 38, y: 87 },

  // Ladybugs
  { id: "ladybug-1", type: "ladybug", name: "Nyckelpiga", x: 10, y: 88 },
  { id: "ladybug-2", type: "ladybug", name: "Nyckelpiga", x: 21, y: 83 },
  { id: "ladybug-3", type: "ladybug", name: "Nyckelpiga", x: 94, y: 88 },

  // Frogs
  { id: "frog-1", type: "frog", name: "Groda", x: 48, y: 81 },
  { id: "frog-2", type: "frog", name: "Groda", x: 88, y: 64 },

  // Squirrel on the ground
  { id: "squirrel-2", type: "squirrel", name: "Ekorre", x: 37, y: 72 },

  // Deer
  { id: "deer-1", type: "deer", name: "Rådjur", x: 37, y: 43 },
];



const rounds: Round[] = [
  {
    type: "butterfly",
    title: "Fjärilar",
    instruction: "Hitta och tryck på alla fjärilar i bilden.",
    hint: "Titta bland blommorna och ovanför bäcken!",
  },
  {
    type: "rabbit",
    title: "Kaniner",
    instruction: "Hur många kaniner hittar du?",
    hint: "Leta efter långa öron och mjuk päls!",
  },
  {
    type: "bird",
    title: "Fåglar",
    instruction: "Tryck på alla fåglar du kan hitta.",
    hint: "Titta uppe i träden och på grenarna!",
  },
  {
    type: "frog",
    title: "Grodor",
    instruction: "Nu ska vi räkna grodor!",
    hint: "Kika vid vattnet och på stenarna!",
  },
  {
    type: "ladybug",
    title: "Nyckelpigor",
    instruction: "Kan du hitta alla nyckelpigor?",
    hint: "Titta noga bland de gröna bladen!",
  },
  {
    type: "hedgehog",
    title: "Igelkottar",
    instruction: "Hur många igelkottar finns i skogen?",
    hint: "Leta efter små djur med taggig rygg!",
  },
  {
    type: "squirrel",
    title: "Ekorrar",
    instruction: "Dags att räkna ekorrar!",
    hint: "Titta uppe vid trädstammarna och nere på marken!",
  },
  {
    type: "deer",
    title: "Rådjur",
    instruction: "Kan du hitta rådjuret?",
    hint: "Titta bland träden och på ängen!",
  },
];


const typeNames: Record<AnimalType, string> = {
  butterfly: "fjäril",
  bird: "fågel",
  rabbit: "kanin",
  hedgehog: "igelkott",
  ladybug: "nyckelpiga",
  frog: "groda",
  squirrel: "ekorre",
  deer: "rådjur",
};


function shuffleRounds(items: Round[]): Round[] {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [
      shuffled[j],
      shuffled[i],
    ];
  }

  return shuffled;
}


export default function DjurensVarldPage() {

const [gameRounds, setGameRounds] = useState<Round[]>(() =>
  shuffleRounds(rounds)
);
const [roundIndex, setRoundIndex] = useState(0);
const [foundAnimals, setFoundAnimals] = useState<string[]>([]);
const [message, setMessage] = useState(
  "Ta god tid på dig och titta noga!"
);
const [showHint, setShowHint] = useState(false);
const round = gameRounds[roundIndex];
const targets = animals.filter(
  (animal) => animal.type === round.type
);
const complete = foundAnimals.length === targets.length;
const allComplete =
  roundIndex === gameRounds.length - 1 && complete;

  function handleAnimalClick(animal: Animal) {
    if (animal.type !== round.type) {
      setMessage(
        `Bra spanat! Men just nu letar vi efter ${typeNames[round.type]}ar.`
      );
      return;
    }

    if (foundAnimals.includes(animal.id)) {
      setMessage("Den har du redan räknat! Leta efter en till.");
      return;
    }

    const updated = [...foundAnimals, animal.id];
    setFoundAnimals(updated);

    if (updated.length === targets.length) {
      setMessage("Fantastiskt! Du hittade allihop! 🎉");
    } else {
      setMessage(
        `Bra jobbat! Du har hittat ${updated.length} av ${targets.length}.`
      );
    }
  }

  function nextRound() {
    if (!complete) return;

    if (roundIndex < gameRounds.length - 1) {
      setRoundIndex((current) => current + 1);
      setFoundAnimals([]);
      setMessage("Ta god tid på dig och titta noga!");
      setShowHint(false);
    }
  }

  
function restartGame() {
  setGameRounds(shuffleRounds(rounds));
  setRoundIndex(0);
  setFoundAnimals([]);
  setMessage("Ta god tid på dig och titta noga!");
  setShowHint(false);
}


  return (
    <main className="min-h-screen bg-[#FFFCF2] px-4 py-5 text-[#07594F] sm:px-6 sm:py-8">
      <div className="mx-auto max-w-7xl">
        {/* Top navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#D7F1E1] px-5 py-3 font-bold transition hover:bg-[#C3E9D4]"
          >
            <span aria-hidden="true">←</span>
            Tillbaka till startsidan
          </Link>

          <Link
            href="/"
            className="text-xl font-extrabold tracking-tight sm:text-2xl"
          >
            🐢 Djurens värld
          </Link>

          <div className="rounded-full bg-[#DDF2E4] px-5 py-3">
            <p className="text-sm font-bold">
              Uppdrag {roundIndex + 1} av {gameRounds.length}
            </p>
            <div
              className="mt-2 flex gap-1.5"
              aria-label={`${roundIndex + 1} av ${gameRounds.length} uppdrag`}
            >
              {gameRounds.map((item, index) => (
                <span
                  key={`${item.title}-${index}`}
                  className={`h-3 w-3 rounded-full ${
                    index <= roundIndex
                      ? "bg-[#159D76]"
                      : "bg-[#B9DCC9]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Activity introduction */}
        <section className="mt-8 grid items-center gap-5 lg:grid-cols-[1fr_auto]">
          <div>
            <span className="inline-flex rounded-full bg-[#CDEEDF] px-5 py-2 text-sm font-extrabold">
              Djurens värld
            </span>

            <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Räkna djuren
            </h1>

            <p className="mt-3 max-w-3xl text-base leading-7 sm:text-xl sm:leading-8">
              {round.instruction} Följ hur många du hittar!
            </p>
          </div>

          <div className="hidden items-center gap-3 rounded-full bg-[#E0F4E5] p-4 md:flex">
            <span className="text-6xl" aria-hidden="true">
              🐢
            </span>
            <p className="max-w-32 font-extrabold">
              Du klarar det! 💚
            </p>
          </div>
        </section>

        {/* Main game */}
        {allComplete ? (
          <section className="mt-8 rounded-[2rem] bg-[#DFF4E4] px-6 py-16 text-center shadow-sm sm:px-12">
            <p className="text-7xl" aria-hidden="true">
              🏆
            </p>
            <h2 className="mt-5 text-3xl font-extrabold sm:text-5xl">
              Du klarade det!
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-8">
              Vilken fantastisk djurspanare du är! Du har klarat
              alla åtta uppdrag i Djurens värld.
            </p>
            <button
              onClick={restartGame}
              className="mt-8 rounded-full bg-[#087C66] px-8 py-4 font-extrabold text-white transition hover:bg-[#07594F]"
            >
              Spela igen ↻
            </button>
          </section>
        ) : (
          <section className="mt-6 grid items-stretch gap-5 lg:grid-cols-[minmax(0,3fr)_minmax(280px,1fr)]">
            {/* Interactive illustration */}
            <div className="relative h-fit overflow-hidden rounded-3xl border border-[#CBE7D4] bg-[#DFF4E4] shadow-sm">
              <img
                src="/images/djurens-varld.png"
                alt="En färgglad skog med fåglar, fjärilar, rådjur, kaniner, grodor, ekorrar, igelkottar och nyckelpigor."
                className="block h-auto w-full"
                draggable={false}
              />

              {animals.map((animal) => {
                const isTarget = animal.type === round.type;
                const isFound = foundAnimals.includes(animal.id);

                return (
                  <button
                    key={animal.id}
                    type="button"
                    aria-label={
                      isFound
                        ? `${animal.name}, redan räknad`
                        : `Tryck för att räkna ${animal.name.toLowerCase()}`
                    }
                    aria-pressed={isFound}
                    onClick={() => handleAnimalClick(animal)}
                    style={{
                          left: `${animal.x}%`,
                          top: `${animal.y}%`,
                          width: "7%",
                          height: "auto",
                          aspectRatio: "1 / 1",
                          transform: "translate(-50%, -50%)",
                        }}
                    className={`absolute flex items-center justify-center rounded-full border-2 transition-all duration-200 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400 ${
                      isFound
                        ? "z-[2] scale-110 border-[#087C66] bg-[#A7E9C6]/65 shadow-[0_0_0_4px_rgba(8,124,102,0.35)]"
                        : "border-transparent bg-transparent hover:border-white/80 hover:bg-white/20"
                    }`}
                  >
                    {isFound && (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#087C66] text-sm font-black text-white shadow sm:h-8 sm:w-8 sm:text-base">
                        ✓
                      </span>
                    )}
                    {!isFound && isTarget && (
                      <span className="sr-only">Hitta mig</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Counting panel */}
            <aside className="flex flex-col rounded-3xl bg-[#E1F4E5] p-5 sm:p-7">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white text-4xl">
                  {round.type === "butterfly" && "🦋"}
                  {round.type === "bird" && "🐦"}
                  {round.type === "rabbit" && "🐰"}
                  {round.type === "hedgehog" && "🦔"}
                  {round.type === "ladybug" && "🐞"}
                  {round.type === "frog" && "🐸"}
                  {round.type === "squirrel" && "🐿️"}
                  {round.type === "deer" && "🦌"}

                </div>
                <div>
                  <h2 className="text-2xl font-extrabold sm:text-3xl">
                    {round.title}
                  </h2>
                  <p className="mt-1 leading-6">
                    Hitta och tryck på alla.
                  </p>
                </div>
              </div>

              <div
                className="mt-6 flex items-center justify-center gap-4 rounded-3xl border-2 border-[#C9E8D6] bg-white px-4 py-6"
                aria-live="polite"
                aria-atomic="true"
              >
                <span className="text-4xl" aria-hidden="true">
                  {round.type === "butterfly" && "🦋"}
                  {round.type === "bird" && "🐦"}
                  {round.type === "rabbit" && "🐰"}
                  {round.type === "hedgehog" && "🦔"}
                  {round.type === "ladybug" && "🐞"}
                  {round.type === "frog" && "🐸"}
                  {round.type === "squirrel" && "🐿️"}
                  {round.type === "deer" && "🦌"}
                </span>
                <p className="text-4xl font-extrabold tabular-nums sm:text-5xl">
                  {foundAnimals.length} / {targets.length}
                </p>
              </div>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#C7E4D1]">
                <div
                  className="h-full rounded-full bg-[#159D76] transition-all duration-300"
                  style={{
                    width: `${(foundAnimals.length / targets.length) * 100}%`,
                  }}
                />
              </div>

              <p className="mt-5 min-h-14 font-semibold leading-6" aria-live="polite">
                {message}
              </p>

              <button
                type="button"
                onClick={() => setShowHint((current) => !current)}
                className="mt-3 flex items-center gap-3 rounded-2xl px-2 py-3 text-left transition hover:bg-white/60"
                aria-expanded={showHint}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-2xl">
                  💡
                </span>
                <span className="font-bold">
                  {showHint ? "Dölj ledtråden" : "Behöver du en ledtråd?"}
                </span>
              </button>

              {showHint && (
                <p className="rounded-2xl bg-white/70 p-4 text-sm leading-6">
                  {round.hint}
                </p>
              )}

              <div className="mt-auto pt-6">
                <button
                  type="button"
                  onClick={nextRound}
                  disabled={!complete}
                  className="w-full rounded-full bg-[#087C66] px-5 py-4 font-extrabold text-white transition hover:bg-[#07594F] disabled:cursor-not-allowed disabled:bg-[#A5CDB9] disabled:text-[#315F50]"
                >
                  Nästa uppdrag →
                </button>

                {!complete && (
                  <p className="mt-3 text-center text-sm text-[#47776A]">
                    Hitta alla {targets.length} så kan du gå vidare!
                  </p>
                )}
              </div>
            </aside>
          </section>
        )}

        {/* Encouragement */}
        <footer className="py-8 text-center text-sm font-medium text-[#47776A]">
          🌿 En trygg och lekfull plats att öva matematik. 🌼
        </footer>
      </div>
    </main>
  );
}
