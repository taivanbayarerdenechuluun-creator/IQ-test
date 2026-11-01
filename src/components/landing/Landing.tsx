"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import {
  Brain, Shapes, Calculator, BookOpen, Box, MemoryStick, Zap, Clock, ShieldCheck, ChevronDown,
  Trophy, Flame, Target, Compass, Sparkles, Award,
} from "lucide-react";
import { useApp } from "../Providers";
import { HeroVisual } from "./HeroVisual";
import { SampleQuestions } from "./SampleQuestions";
import type { Key } from "@/lib/i18n";

// The charting library is only needed below the fold, so it is loaded lazily.
const ExampleRadar = dynamic(() => import("./ExampleRadar"), { ssr: false, loading: () => <div className="h-full animate-pulse rounded-xl bg-deep" aria-hidden="true" /> });

const fade = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" }, transition: { duration: 0.6 } };

const CATS = [
  { k: "logical", icon: Brain, color: "#8B5CF6" },
  { k: "abstract", icon: Shapes, color: "#3B82F6" },
  { k: "numerical", icon: Calculator, color: "#22D3EE" },
  { k: "verbal", icon: BookOpen, color: "#8B5CF6" },
  { k: "spatial", icon: Box, color: "#3B82F6" },
  { k: "memory", icon: MemoryStick, color: "#22D3EE" },
  { k: "speed", icon: Zap, color: "#8B5CF6" },
] as const;

const FEATURED = [
  { slug: "full-battery", en: "Full Cognitive Battery", mn: "Бүрэн танин мэдэхүйн багц", de: "Balanced across all seven domains", dm: "Долоон чадварыг тэнцвэртэй хамарна", mins: 35 },
  { slug: "reasoning-core", en: "Reasoning Core", mn: "Сэтгэлгээний цөм", de: "Logical, abstract and numerical", dm: "Логик, хийсвэр, тооллын", mins: 20 },
  { slug: "memory-speed", en: "Memory & Speed", mn: "Ой ба хурд", de: "Working memory and processing speed", dm: "Ажлын ой ба боловсруулах хурд", mins: 10 },
  { slug: "quick-check", en: "Quick Check", mn: "Хурдан шалгалт", de: "Ten adaptive questions", dm: "Арван дасан зохицох асуулт", mins: 5 },
];

const BADGES = [
  { icon: Sparkles, en: "First Assessment", mn: "Анхны тест" },
  { icon: Target, en: "Perfect Accuracy", mn: "Төгс нарийвчлал" },
  { icon: Brain, en: "Logical Thinker", mn: "Логик сэтгэгч" },
  { icon: Flame, en: "Seven-Day Streak", mn: "7 хоногийн цуваа" },
  { icon: Compass, en: "Cognitive Explorer", mn: "Танин мэдэхүйн судлаач" },
  { icon: Trophy, en: "Memory Champion", mn: "Ойн аварга" },
];

const FAQ = [
  {
    q: { en: "Is this a real IQ test?", mn: "Энэ жинхэнэ IQ тест мөн үү?" },
    a: {
      en: "No. INTELLIQ is a cognitive practice and self-reflection tool. A valid IQ score needs a professionally administered, norm-referenced test. We never present an invented IQ number.",
      mn: "Үгүй. INTELLIQ нь танин мэдэхүйн дасгал болон өөрийгөө таних хэрэгсэл. Хүчинтэй IQ оноо нь мэргэжлийн хүн хөтөлсөн, норм-д суурилсан тестээр гарна. Бид зохиомол IQ тоо харуулдаггүй.",
    },
  },
  {
    q: { en: "How does adaptive difficulty work?", mn: "Хүндрэл хэрхэн дасан зохицдог вэ?" },
    a: {
      en: "A staircase rule moves difficulty up after two consecutive correct answers and down after an incorrect one, while keeping coverage across categories. Scores are weighted by the difficulty of each question you actually saw.",
      mn: "Дараалан хоёр зөв хариулбал хүндрэл нэмэгдэж, нэг буруу хариулбал буурна. Мөн ангилал бүрийг тэнцвэртэй хамарна. Оноо нь таны харсан асуулт бүрийн хүндрэлээр жинлэгдэнэ.",
    },
  },
  {
    q: { en: "Do I need an account?", mn: "Бүртгэл шаардлагатай юу?" },
    a: {
      en: "No. You can take an assessment as a guest. An account saves history, XP, achievements and reports.",
      mn: "Үгүй. Зочноор тест өгч болно. Бүртгэл нь түүх, XP, амжилт, тайланг хадгална.",
    },
  },
  {
    q: { en: "Are my answers checked fairly?", mn: "Хариултыг шударгаар шалгадаг уу?" },
    a: {
      en: "Answer keys stay on the server and are never sent to your browser during a test. Scores are computed server-side.",
      mn: "Зөв хариулт сервер дээр хадгалагдаж, тест үед хөтөч рүү хэзээ ч илгээгддэггүй. Оноог сервер тооцдог.",
    },
  },
  {
    q: { en: "Can I hide from leaderboards?", mn: "Тэргүүлэгчдийн жагсаалтаас нуугдаж болох уу?" },
    a: {
      en: "Yes. Rankings are opt-in and you can hide your profile at any time. We never expose personal information publicly.",
      mn: "Тийм. Жагсаалт нь сайн дурын бөгөөд профайлаа хүссэн үедээ нууж болно. Хувийн мэдээллийг олон нийтэд ил болгохгүй.",
    },
  },
];

// Clearly an illustration, not user data.
const EXAMPLE = [
  { d: { en: "Logical", mn: "Логик" }, v: 78 },
  { d: { en: "Abstract", mn: "Хийсвэр" }, v: 64 },
  { d: { en: "Numerical", mn: "Тооллын" }, v: 71 },
  { d: { en: "Verbal", mn: "Хэл зүйн" }, v: 82 },
  { d: { en: "Spatial", mn: "Орон зай" }, v: 58 },
  { d: { en: "Memory", mn: "Ой" }, v: 69 },
  { d: { en: "Speed", mn: "Хурд" }, v: 75 },
];

function Section({ id, title, sub, children }: { id?: string; title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6">
      <motion.div {...fade} className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        {sub && <p className="mt-3 text-muted">{sub}</p>}
      </motion.div>
      {children}
    </section>
  );
}

export function Landing() {
  const { t, lang } = useApp();
  const example = EXAMPLE.map((e) => ({ name: e.d[lang], value: e.v }));
  const exampleLabel = lang === "en" ? "Illustrative example profile — not real user data" : "Жишээ профайл — жинхэнэ хэрэглэгчийн өгөгдөл биш";

  return (
    <main id="main">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 sm:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.18),transparent_60%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted">
              <span className="h-2 w-2 rounded-full bg-cyan" /> {t("hero.badge")}
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              {t("hero.title1")} <span className="grad-text">{t("hero.title2")}</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted">{t("hero.sub")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/assessments/quick-check" className="btn btn-primary">{t("hero.cta1")}</Link>
              <Link href="/assessments" className="btn btn-ghost">{t("hero.cta2")}</Link>
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm text-muted">
              <Clock size={16} className="text-cyan-fg" /> {t("hero.meta")}
            </p>
          </motion.div>
          <HeroVisual />
        </div>
      </section>

      {/* How it works */}
      <Section id="how" title={t("how.title")} sub={t("how.sub")}>
        <div className="grid gap-5 md:grid-cols-3">
          {([1, 2, 3] as const).map((n) => (
            <motion.div key={n} {...fade} transition={{ duration: 0.6, delay: n * 0.1 }} className="card p-6">
              <span className="grad-text font-display text-5xl font-bold">0{n}</span>
              <h3 className="mt-3 text-lg font-semibold">{t(`how.${n}.t` as Key)}</h3>
              <p className="mt-2 text-sm text-muted">{t(`how.${n}.d` as Key)}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Categories */}
      <div className="bg-deep">
        <Section id="categories" title={t("cat.title")} sub={t("cat.sub")}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CATS.map((c, i) => (
              <motion.div key={c.k} {...fade} transition={{ duration: 0.5, delay: i * 0.05 }} whileHover={{ y: -4 }} className="card p-5">
                <div className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: `${c.color}22`, color: c.color }}>
                  <c.icon size={22} />
                </div>
                <h3 className="mt-4 font-semibold">{t(`cat.${c.k}` as Key)}</h3>
                <p className="mt-1 text-sm text-muted">{t(`cat.${c.k}.d` as Key)}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>

      {/* Featured assessments */}
      <Section id="assessments" title={t("feat.title")} sub={t("feat.sub")}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED.map((a, i) => (
            <motion.div key={a.en} {...fade} transition={{ duration: 0.5, delay: i * 0.07 }} whileHover={{ y: -4 }} className="card flex flex-col p-6">
              <h3 className="font-display text-lg font-semibold">{a[lang]}</h3>
              <p className="mt-2 flex-1 text-sm text-muted">{lang === "en" ? a.de : a.dm}</p>
              <p className="mt-4 flex items-center gap-1.5 text-xs text-muted">
                <Clock size={14} className="text-cyan-fg" /> ~{a.mins} {lang === "en" ? "min" : "мин"}
              </p>
              <Link href={`/assessments/${a.slug}`} className="btn btn-ghost mt-4 w-full">{t("hero.cta1")}</Link>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Sample questions */}
      <div className="bg-deep">
        <Section title={t("sample.title")} sub={t("sample.sub")}>
          <SampleQuestions />
        </Section>
      </div>

      {/* Analytics preview */}
      <Section title={t("analytics.title")} sub={t("analytics.sub")}>
        <motion.div {...fade} className="card mx-auto max-w-3xl p-4 sm:p-8">
          <div className="h-72 w-full sm:h-96">
            <ExampleRadar data={example} />
          </div>
          <p className="mt-2 text-center text-xs text-muted">{exampleLabel}</p>
        </motion.div>
      </Section>

      {/* Achievements preview */}
      <div className="bg-deep">
        <Section title={t("ach.title")} sub={t("ach.sub")}>
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3">
            {BADGES.map((b, i) => (
              <motion.div key={b.en} {...fade} transition={{ duration: 0.4, delay: i * 0.05 }} whileHover={{ scale: 1.04 }} className="card flex flex-col items-center p-6 text-center">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-violet to-cyan text-white shadow-[var(--glow)]">
                  <b.icon size={26} />
                </div>
                <p className="mt-3 text-sm font-semibold">{b[lang]}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>

      {/* Trust */}
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <motion.div {...fade} className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:p-8">
          <ShieldCheck size={32} className="shrink-0 text-cyan-fg" />
          <div>
            <h2 className="font-display text-xl font-bold">{t("trust.title")}</h2>
            <p className="mt-2 text-muted">{t("trust.body")}</p>
          </div>
        </motion.div>
      </section>

      {/* FAQ */}
      <div className="bg-deep">
        <Section id="faq" title={t("faq.title")}>
          <div className="mx-auto max-w-3xl space-y-3">
            {FAQ.map((f) => (
              <details key={f.q.en} className="card group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                  {f.q[lang]}
                  <ChevronDown size={18} className="shrink-0 text-muted transition group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm text-muted">{f.a[lang]}</p>
              </details>
            ))}
          </div>
        </Section>
      </div>

      <div className="mx-auto flex max-w-7xl justify-center px-4 py-16">
        <Link href="/assessments/quick-check" className="btn btn-primary"><Award size={18} /> {t("hero.cta1")}</Link>
      </div>
    </main>
  );
}
