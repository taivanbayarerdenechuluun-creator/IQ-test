"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useApp } from "../Providers";

type Q = { cat: { en: string; mn: string }; prompt: { en: string; mn: string }; options: { en: string; mn: string }[]; answer: number };

// Landing-page demo questions only. The real bank lives in the database and
// answers are verified on the server; these are public by design.
const SAMPLES: Q[] = [
  {
    cat: { en: "Numerical", mn: "Тооллын" },
    prompt: { en: "What comes next?  2, 6, 18, 54, ?", mn: "Дараагийн тоо юу вэ?  2, 6, 18, 54, ?" },
    options: [
      { en: "108", mn: "108" }, { en: "162", mn: "162" }, { en: "148", mn: "148" }, { en: "72", mn: "72" },
    ],
    answer: 1,
  },
  {
    cat: { en: "Verbal", mn: "Хэл зүйн" },
    prompt: { en: "Book is to Reading as Fork is to …", mn: "Ном нь Унших-тай адил Сэрээ нь …" },
    options: [
      { en: "Eating", mn: "Идэх" }, { en: "Cooking", mn: "Хоол хийх" }, { en: "Metal", mn: "Төмөр" }, { en: "Kitchen", mn: "Гал тогоо" },
    ],
    answer: 0,
  },
  {
    cat: { en: "Logical", mn: "Логик" },
    prompt: {
      en: "All Bloops are Razzies. All Razzies are Lazzies. Which statement must be true?",
      mn: "Бүх Блүүп нь Раззи. Бүх Раззи нь Лаззи. Аль мэдэгдэл заавал үнэн вэ?",
    },
    options: [
      { en: "All Bloops are Lazzies", mn: "Бүх Блүүп нь Лаззи" },
      { en: "All Lazzies are Bloops", mn: "Бүх Лаззи нь Блүүп" },
      { en: "No Bloops are Lazzies", mn: "Ямар ч Блүүп Лаззи биш" },
      { en: "Some Razzies are not Lazzies", mn: "Зарим Раззи нь Лаззи биш" },
    ],
    answer: 0,
  },
];

export function SampleQuestions() {
  const { t, lang } = useApp();
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const q = SAMPLES[i];
  const right = picked === q.answer;

  function go(n: number) {
    setI(n);
    setPicked(null);
  }

  return (
    <div className="card mx-auto max-w-2xl p-6 sm:p-8">
      <div className="mb-5 flex items-center justify-between text-xs text-muted">
        <span className="rounded-full border border-line px-3 py-1">{q.cat[lang]}</span>
        <span>{i + 1} / {SAMPLES.length}</span>
      </div>
      <motion.h3 key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="font-display text-xl font-semibold sm:text-2xl">
        {q.prompt[lang]}
      </motion.h3>
      <div className="mt-6 grid gap-3 sm:grid-cols-2" role="radiogroup">
        {q.options.map((o, n) => {
          const chosen = picked === n;
          const state = chosen ? (n === q.answer ? "border-emerald-400 bg-emerald-400/10" : "border-rose-400 bg-rose-400/10") : "border-line hover:border-violet";
          return (
            <button
              key={n}
              role="radio"
              aria-checked={chosen}
              onClick={() => setPicked(n)}
              className={`flex min-h-12 items-center justify-between rounded-xl border bg-deep px-4 py-3 text-left transition ${state}`}
            >
              <span>{o[lang]}</span>
              {chosen && (n === q.answer ? <Check size={18} className="text-emerald-700 dark:text-emerald-400" /> : <X size={18} className="text-rose-700 dark:text-rose-400" />)}
            </button>
          );
        })}
      </div>
      <div className="mt-5 flex min-h-10 items-center justify-between">
        <p className={`text-sm font-medium ${picked === null ? "invisible" : right ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"}`} role="status">
          {right ? t("sample.correct") : t("sample.wrong")}
        </p>
        <div className="flex gap-2">
          {SAMPLES.map((_, n) => (
            <button key={n} onClick={() => go(n)} aria-label={`Question ${n + 1}`} className={`h-2.5 rounded-full transition-all ${n === i ? "w-7 bg-violet" : "w-2.5 bg-line"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
