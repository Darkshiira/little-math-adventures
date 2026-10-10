
"use client";

import { Link } from "lucide-react";
import { useState } from "react";

const fruits = [
  { emoji: "🍎", name: "äpplen" },
  { emoji: "🍊", name: "apelsiner" },
  { emoji: "🍐", name: "päron" },
  { emoji: "🍌", name: "bananer" },
  { emoji: "🍓", name: "jordgubbar" },
];

type Question = {
  first: number;
  second: number;
  firstFruit: (typeof fruits)[number];
  secondFruit: (typeof fruits)[number];
  choices: number[];
};

function shuffle<T,>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function createQuestion(): Question {
  // Slumpa antalet frukter i de två grupperna.
  const first = Math.floor(Math.random() * 5) + 1;
  const second = Math.floor(Math.random() * 5) + 1;
  const correctAnswer = first + second;

  // Slumpa två olika fruktsorter.
  const shuffledFruits = shuffle(fruits);
  const firstFruit = shuffledFruits[0];
  const secondFruit = shuffledFruits[1];

  // Skapa tre unika svar, inklusive rätt svar.
  const wrongAnswers = new Set<number>();

  while (wrongAnswers.size < 2) {
    const answer = Math.floor(Math.random() * 10) + 1;

    if (answer !== correctAnswer) {
      wrongAnswers.add(answer);
    }
  }

  const choices = shuffle([
    correctAnswer,
    ...Array.from(wrongAnswers),
  ]);

  return {
    first,
    second,
    firstFruit,
    secondFruit,
    choices,
  };
}

export default function FruktlandetPage() {
  const [question, setQuestion] = useState<Question>({
  first: 2,
  second: 3,
  firstFruit: fruits[0],
  secondFruit: fruits[1],
  choices: [4, 5, 6],
});

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const totalQuestions = 10;
  const correctAnswer = question.first + question.second;
  const isCorrect = selectedAnswer === correctAnswer;

  function handleAnswer(answer: number) {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answer);

    if (answer === correctAnswer) {
      setScore((previousScore) => previousScore + 1);
    }
  }

  function nextQuestion() {
    if (questionIndex === totalQuestions - 1) {
      setFinished(true);
      return;
    }

    setQuestion(createQuestion());
    setQuestionIndex((previousIndex) => previousIndex + 1);
    setSelectedAnswer(null);
  }

  function restartGame() {
    setQuestion(createQuestion());
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setFinished(false);
  }

  return (
    <div className="min-h-screen bg-cream px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-bold text-forest transition hover:bg-mint"
        >
          ←
          Till startsidan
        </Link>

        <section className="mt-6 overflow-hidden rounded-[2rem] border border-[#F0DFC3] bg-white shadow-sm">
          <div className="bg-[#FFF0D5] px-6 py-8 text-center sm:px-10 sm:py-10">
            <div className="text-5xl" aria-hidden="true">
              🍎 🍐 🍊
            </div>

            <p className="mt-4 text-sm font-extrabold uppercase tracking-[0.18em] text-forest">
              Matteäventyret presenterar
            </p>

            <h1 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
              Fruktlandet
            </h1>

            <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              Välkommen till fruktlandet! Räkna alla frukterna och se hur
              många det blir tillsammans.
            </p>
          </div>

          <div className="p-5 sm:p-10">
            {!finished ? (
              <>
                <div className="mb-8 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-mint px-4 py-2 text-sm font-bold text-forest">
                    Uppgift {questionIndex + 1} av {totalQuestions}
                  </span>

                  <span
                    className="rounded-full bg-[#FFF0D5] px-4 py-2 text-sm font-bold text-ink"
                    aria-live="polite"
                  >
                    ⭐ Poäng: {score}
                  </span>
                </div>

                <div className="mb-8 h-3 overflow-hidden rounded-full bg-[#F1EDE5]">
                  <div
                    className="h-full rounded-full bg-forest transition-all duration-500"
                    style={{
                      width: `${((questionIndex + 1) / totalQuestions) * 100}%`,
                    }}
                  />
                </div>

                <div className="rounded-3xl bg-cream px-4 py-8 text-center sm:px-8 sm:py-10">
                  <p className="text-lg font-bold text-muted">
                    Hur många frukter blir det tillsammans?
                  </p>

                  <div className="mt-8 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-6">
                    <div className="flex min-h-28 w-full max-w-48 flex-wrap items-center justify-center gap-1 rounded-2xl bg-white p-4 shadow-sm">
                      {Array.from({ length: question.first }).map((_, index) => (
                        <span
                          key={index}
                          className="text-3xl sm:text-4xl"
                          aria-hidden="true"
                        >
                          {question.firstFruit.emoji}
                        </span>
                      ))}

                      <span className="sr-only">
                        {question.first} {question.firstFruit.name}
                      </span>
                    </div>

                    <span className="text-4xl font-extrabold text-forest">
                      +
                    </span>

                    <div className="flex min-h-28 w-full max-w-48 flex-wrap items-center justify-center gap-1 rounded-2xl bg-white p-4 shadow-sm">
                      {Array.from({ length: question.second }).map((_, index) => (
                        <span
                          key={index}
                          className="text-3xl sm:text-4xl"
                          aria-hidden="true"
                        >
                          {question.secondFruit.emoji}
                        </span>
                      ))}

                      <span className="sr-only">
                        {question.second} {question.secondFruit.name}
                      </span>
                    </div>
                  </div>

                  <p className="mt-8 text-4xl font-extrabold text-ink sm:text-5xl">
                    {question.first} + {question.second} = ?
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
                  {question.choices.map((choice) => {
                    const isSelected = selectedAnswer === choice;
                    const isRightAnswer = choice === correctAnswer;

                    let buttonStyle =
                      "border-[#E9E4DB] bg-white text-ink hover:border-forest hover:bg-mint";

                    if (selectedAnswer !== null && isRightAnswer) {
                      buttonStyle = "border-forest bg-mint text-forest";
                    } else if (isSelected && !isRightAnswer) {
                      buttonStyle = "border-[#D97757] bg-[#FCE8DF] text-ink";
                    }

                    return (
                      <button
                        key={choice}
                        type="button"
                        onClick={() => handleAnswer(choice)}
                        disabled={selectedAnswer !== null}
                        className={`min-h-20 rounded-2xl border-2 text-3xl font-extrabold transition sm:min-h-24 sm:text-4xl ${buttonStyle} disabled:cursor-default`}
                        aria-label={`Svara ${choice}`}
                      >
                        {choice}
                      </button>
                    );
                  })}
                </div>

                {selectedAnswer !== null && (
                  <div
                    className="mt-6 rounded-2xl bg-cream p-5 text-center"
                    aria-live="polite"
                  >
                    <p className="text-lg font-extrabold text-ink">
                      {isCorrect
                        ? "🎉 Helt rätt! Snyggt räknat!"
                        : "🌱 Bra försök! Du lär dig för varje gång."}
                    </p>

                    {!isCorrect && (
                      <p className="mt-2 text-muted">
                        Räkna frukterna en gång till. Rätt svar är{" "}
                        {correctAnswer}.
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={nextQuestion}
                      className="mt-5 rounded-full bg-forest px-7 py-3 font-extrabold text-white transition hover:bg-[#10564C]"
                    >
                      {questionIndex === totalQuestions - 1
                        ? "Se mitt resultat"
                        : "Nästa uppgift →"}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="py-8 text-center sm:py-12">
                <div className="text-6xl" aria-hidden="true">
                  {score === totalQuestions ? "🏆" : score >= 7 ? "🌟" : "🍎"}
                </div>

                <h2 className="mt-5 text-3xl font-extrabold text-ink">
                  {score === totalQuestions
                    ? "Fantastiskt!"
                    : score >= 7
                      ? "Vilken mattehjälte!"
                      : "Bra kämpat!"}
                </h2>

                <p className="mt-3 text-lg text-muted">
                  Du klarade {score} av {totalQuestions} uppgifter rätt!
                </p>

                <p className="mt-2 text-muted">
                  Varje gång du övar blir du bättre på matte.
                </p>

                <button
                  type="button"
                  onClick={restartGame}
                  className="mt-8 rounded-full bg-forest px-8 py-4 font-extrabold text-white transition hover:bg-[#10564C]"
                >
                  Spela igen ↻
                </button>

                <div>
                  <Link
                    href="/"
                    className="mt-4 inline-block rounded-full px-6 py-3 font-bold text-forest hover:bg-mint"
                  >
                    Till startsidan
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        <p className="mt-6 text-center text-sm text-muted">
          🍏 Ta det lugnt, räkna frukterna och ha roligt!
        </p>
      </div>
    </div>
  );
}
