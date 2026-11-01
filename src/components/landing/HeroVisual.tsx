"use client";
import { motion, useReducedMotion } from "framer-motion";

const NODES = [
  [200, 40], [340, 120], [340, 280], [200, 360], [60, 280], [60, 120],
  [200, 130], [275, 200], [200, 270], [125, 200],
];
const EDGES = [[0, 6], [1, 7], [2, 7], [3, 8], [4, 9], [5, 9], [6, 7], [7, 8], [8, 9], [9, 6], [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]];
const DIGITS = [
  { v: "3", x: "6%", y: "12%", d: 0 },
  { v: "7", x: "88%", y: "18%", d: 1 },
  { v: "11", x: "92%", y: "66%", d: 2 },
  { v: "18", x: "4%", y: "72%", d: 1.5 },
  { v: "29", x: "50%", y: "-2%", d: 0.5 },
  { v: "47", x: "52%", y: "96%", d: 2.5 },
];

export function HeroVisual() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]" aria-hidden="true">
      <div className="absolute inset-8 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.35),transparent_65%)] blur-2xl" />
      {DIGITS.map((d) => (
        <span
          key={d.v}
          className="float absolute font-display text-xl font-semibold text-cyan-fg/70"
          style={{ left: d.x, top: d.y, animationDelay: `${d.d}s` }}
        >
          {d.v}
        </span>
      ))}
      <svg viewBox="0 0 400 400" className="relative h-full w-full">
        <defs>
          <linearGradient id="hv" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8B5CF6" />
            <stop offset="0.55" stopColor="#3B82F6" />
            <stop offset="1" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
        <motion.g
          style={{ transformOrigin: "200px 200px" }}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="200" cy="200" r="185" fill="none" stroke="url(#hv)" strokeOpacity="0.25" strokeDasharray="2 10" />
        </motion.g>
        <motion.g
          style={{ transformOrigin: "200px 200px" }}
          animate={reduce ? undefined : { rotate: -360 }}
          transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
        >
          <polygon points="200,40 340,120 340,280 200,360 60,280 60,120" fill="none" stroke="url(#hv)" strokeOpacity="0.5" />
        </motion.g>
        {EDGES.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]}
            stroke="url(#hv)" strokeWidth="1.2" strokeOpacity="0.6"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, delay: 0.1 * i }}
          />
        ))}
        {NODES.map(([x, y], i) => (
          <motion.circle
            key={i} cx={x} cy={y} r={i < 6 ? 6 : 8} fill="url(#hv)"
            animate={reduce ? undefined : { r: [i < 6 ? 6 : 8, i < 6 ? 8 : 11, i < 6 ? 6 : 8], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </svg>
    </div>
  );
}
