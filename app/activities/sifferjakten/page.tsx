
"use client";

import { useState } from "react";
import Link from "next/link";

type Question = {
  type: "recognize" | "count";
  answer: number;
  choices: number[];
  emoji: string;
};

const TOTAL_QUESTIONS = 10;

function shuffle(numbers: number[]) {
  return [...numbers].sort(() => Math.random() - 0.5);
}

function makeQuestion(): Question {
  const type = Math.random() < 0.5 ? "recognize" : "count";
  const answer = Math.floor(Math.random() * 10) + 1;

  const distractors = new Set<number>();

  while (distractors.size < 2) {
    const number = Math.floor(Math.random() * 10) + 1;

    if (number !== answer) {
      distractors.add(number);
    }
  }

  const emojis = [
  "⭐", "🌟", "✨", "☁️", "🌈",
  "🦋", "💎", "💖", "🌸", "🌼",
  "🎈", "🫧", "🌙", "☀️", "🪄",
  "🦄", "🍀", "💫", "🔮", "🎀",
  "🩵", "💜", "🩷", "🧚", "🌺",
  "❄️", "🪷", "🪽", "🎆", "🌠",
];

  return {
    type,
    answer,
    choices: shuffle([answer, ...distractors]),
    emoji: emojis[Math.floor(Math.random() * emojis.length)],
  };
}

export default function Sifferjakten() {
  const [started, setStarted] = useState(false);
  const [question, setQuestion] = useState<Question>({
  type: "recognize",
  answer: 3,
  choices: [2, 3, 5],
  emoji: "⭐",
  });
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [finished, setFinished] = useState(false);

  function startGame() {
    setQuestion(makeQuestion());
    setSelected(null);
    setScore(0);
    setRound(1);
    setFinished(false);
    setStarted(true);
  }

  function chooseAnswer(number: number) {
    if (selected !== null) return;

    setSelected(number);

    if (number === question.answer) {
      setScore((previous) => previous + 1);
    }
  }

  function nextQuestion() {
    if (round === TOTAL_QUESTIONS) {
      setFinished(true);
      return;
    }

    setQuestion(makeQuestion());
    setSelected(null);
    setRound((previous) => previous + 1);
  }

  return (
    <main className="min-h-screen bg-[#FFF9EB] px-4 py-8 text-[#124F46] sm:py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-bold transition hover:bg-white"
        >
          <span aria-hidden="true">←</span>
          Tillbaka till Matteäventyret
        </Link>

        <header className="mb-8 mt-8 text-center">
          <span className="inline-flex rounded-full bg-[#D5F3DF] px-4 py-2 text-sm font-bold">
            🌈 Sifferigenkänning
          </span>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Sifferjakten
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-base leading-7 text-[#47756E] sm:text-lg">
            Följ med på ett sifferäventyr! Titta noga,
            räkna och se hur många rätt du kan få.
          </p>
        </header>

        <section className="rounded-[2rem] border border-[#E9E4DA] bg-white p-5 shadow-sm sm:p-9">
          {!started ? (
            <div className="py-6 text-center sm:py-10">
              <img
                src="/images/rainbowsticker.png"
                alt="En färgglad regnbåge med moln"
                className="mx-auto mb-6 w-full max-w-xs object-contain"
              />

              <h2 className="text-2xl font-extrabold sm:text-3xl">
                Är du redo för jakten?
              </h2>

              <p className="mx-auto mt-3 max-w-md leading-7 text-[#47756E]">
                Vi ska leta efter siffror och räkna
                saker tillsammans. Du får tio frågor
                och kan ta det i din egen takt!
              </p>

              <button
                onClick={startGame}
                className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#087F68] px-8 py-3 font-extrabold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#105347]"
              >
                Börja spela <span aria-hidden="true">→</span>
              </button>
            </div>
          ) : finished ? (
            <div className="py-8 text-center sm:py-12">
              <div className="text-7xl" aria-hidden="true">
                {score >= 8 ? "🏆" : score >= 5 ? "🌟" : "🌈"}
              </div>

              <h2 className="mt-5 text-3xl font-extrabold">
                {score >= 8
                  ? "Fantastiskt jobbat!"
                  : score >= 5
                    ? "Bra kämpat!"
                    : "Vilket fint försök!"}
              </h2>

              <p className="mt-4 text-lg text-[#47756E]">
                Du fick
              </p>

              <p className="mt-1 text-5xl font-extrabold text-[#159B78]">
                {score} av {TOTAL_QUESTIONS}
              </p>

              <p className="mt-4 leading-7 text-[#47756E]">
                Varje gång du övar lär du dig något nytt.
                Vill du göra ett nytt försök?
              </p>

              <button
                onClick={startGame}
                className="mt-7 min-h-12 rounded-full bg-[#087F68] px-8 py-3 font-extrabold text-white transition hover:bg-[#105347]"
              >
                Spela igen ↻
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-8">
                <div className="mb-2 flex items-center justify-between gap-3 text-sm font-bold">
                  <span>Fråga {round} av {TOTAL_QUESTIONS}</span>
                  <span>⭐ Poäng: {score}</span>
                </div>

                <div
                  className="h-3 overflow-hidden rounded-full bg-[#E5F3EA]"
                  role="progressbar"
                  aria-label="Spelprogress"
                  aria-valuemin={0}
                  aria-valuemax={TOTAL_QUESTIONS}
                  aria-valuenow={round}
                >
                  <div
                    className="h-full rounded-full bg-[#27B58B] transition-all duration-300"
                    style={{
                      width: `${(round / TOTAL_QUESTIONS) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm font-bold uppercase tracking-wider text-[#159B78]">
                  {question.type === "recognize"
                    ? "Hitta rätt siffra"
                    : "Räkna sakerna"}
                </p>

                <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
                  {question.type === "recognize"
                    ? "Vilken siffra letar vi efter?"
                    : "Hur många saker ser du?"}
                </h2>

                {question.type === "recognize" ? (
                  <div className="mx-auto mt-7 flex h-36 w-36 items-center justify-center rounded-[2rem] bg-[#E2F3FF] text-8xl font-extrabold text-[#1689CB]">
                    {question.answer}
                  </div>
                ) : (
                  <div
                    className="mx-auto mt-7 flex min-h-36 max-w-md flex-wrap items-center justify-center gap-3 rounded-3xl bg-[#FFF4D7] p-5 text-4xl sm:gap-4 sm:text-5xl"
                    aria-label={`${question.answer} föremål`}
                  >
                    {Array.from(
                          { length: question.answer },
                            (_, index) => (
                                    <span
                                          key={index}
                                                aria-hidden="true"
                                                className="inline-block transition-transform hover:scale-125"
                                                style={{
                                                    transform: `rotate(${(index % 3 - 1) * 8}deg)`,
                                                }}
                                    >
                                        {question.emoji}
                                    </span>
                                    )
                                )}
                  </div>
                )}

                <p className="mt-6 font-bold text-[#47756E]">
                  Välj ditt svar!
                </p>

                <div className="mx-auto mt-4 grid max-w-md grid-cols-3 gap-3">
                  {question.choices.map((number, index) => {
                    const isSelected = selected === number;
                    const isCorrect = number === question.answer;

                    let buttonStyle =
                      "border-[#DCEBE3] bg-white hover:border-[#159B78] hover:bg-[#EAF8EF]";

                    if (selected !== null && isCorrect) {
                      buttonStyle =
                        "border-[#159B78] bg-[#D5F3DF] text-[#126B4F]";
                    } else if (isSelected && !isCorrect) {
                      buttonStyle =
                        "border-[#F2A39A] bg-[#FFF0ED] text-[#B43C30]";
                    }

                    return (
                      <button
                        key={`${round}-${number}`}
                        onClick={() => chooseAnswer(number)}
                        disabled={selected !== null}
                        aria-label={`Svarsalternativ ${number}`}
                        className={`flex min-h-20 items-center justify-center rounded-2xl border-2 text-3xl font-extrabold transition disabled:cursor-default ${buttonStyle}`}
                      >
                        {number}
                      </button>
                    );
                  })}
                </div>

                {selected !== null && (
                  <div
                    aria-live="polite"
                    className="mt-6 rounded-2xl bg-[#F3F9F3] p-4"
                  >
                    <p className="text-lg font-extrabold">
                      {selected === question.answer
                        ? "🎉 Helt rätt! Bra jobbat!"
                        : "🌱 Bra försök! Vi lär oss tillsammans."}
                    </p>

                    {selected !== question.answer && (
                      <p className="mt-2 text-sm text-[#47756E]">
                        Rätt svar var {question.answer}. Nu tar vi nästa!
                      </p>
                    )}

                    <button
                      onClick={nextQuestion}
                      className="mt-4 min-h-11 rounded-full bg-[#087F68] px-6 py-2 font-extrabold text-white transition hover:bg-[#105347]"
                    >
                      {round === TOTAL_QUESTIONS
                        ? "Se mitt resultat →"
                        : "Nästa fråga →"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        <p className="mt-6 text-center text-sm text-[#64867D]">
          🌼 Du behöver inte ha alla rätt. Det viktigaste är att prova!
        </p>
      </div>
    </main>
  );
}
