"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, CheckCircle2, Circle, Search, RotateCcw, ExternalLink,
  BookOpen, ArrowDownUp, Layers, SearchCode, Type, Link, Repeat, Cpu,
  Database, AppWindow, Triangle, Zap, TreePine, Network, Share2, Activity, GitBranch
} from "lucide-react";
import { DSA_DATA, type Step } from "@/lib/data";
import { useTracker, getProblemId } from "@/lib/tracker-context";

const ICON_MAP: Record<string, React.ReactNode> = {
  s1: <BookOpen className="w-4 h-4 text-black/40" />,
  s2: <ArrowDownUp className="w-4 h-4 text-black/40" />,
  s3: <Layers className="w-4 h-4 text-black/40" />,
  s4: <SearchCode className="w-4 h-4 text-black/40" />,
  s5: <Type className="w-4 h-4 text-black/40" />,
  s6: <Link className="w-4 h-4 text-black/40" />,
  s7: <Repeat className="w-4 h-4 text-black/40" />,
  s8: <Cpu className="w-4 h-4 text-black/40" />,
  s9: <Database className="w-4 h-4 text-black/40" />,
  s10: <AppWindow className="w-4 h-4 text-black/40" />,
  s11: <Triangle className="w-4 h-4 text-black/40" />,
  s12: <Zap className="w-4 h-4 text-black/40" />,
  s13: <TreePine className="w-4 h-4 text-black/40" />,
  s14: <Network className="w-4 h-4 text-black/40" />,
  s15: <Share2 className="w-4 h-4 text-black/40" />,
  s16: <Activity className="w-4 h-4 text-black/40" />,
  s17: <GitBranch className="w-4 h-4 text-black/40" />,
};

// ─── Icon Components ────────────────────────────────────────────
function LCIcon({ dim = false }: { dim?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/leetcode.svg"
      alt="LeetCode"
      width={13}
      height={13}
      className={dim ? "grayscale opacity-25" : ""}
    />
  );
}

function GFGIcon({ dim = false }: { dim?: boolean }) {
  return (
    <svg width="13" height="13" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="6" fill={dim ? "#333" : "#2ea44f"} />
      <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle"
        fontSize="18" fontWeight="800" fill="white" fontFamily="Arial">G</text>
    </svg>
  );
}

// ─── Link Buttons ───────────────────────────────────────────────
function LCButton({ url }: { url: string }) {
  const isNA = !url || url === "N/A";
  if (isNA) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium
        bg-black/[0.03] text-black/50 border border-black/[0.06] cursor-not-allowed select-none">
        <LCIcon dim />
        LC
      </span>
    );
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold
        border transition-all duration-150 group hover:-translate-y-px active:translate-y-0"
      style={{
        background: "rgba(255,161,22,0.08)",
        borderColor: "rgba(255,161,22,0.25)",
        color: "#FFA116",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "rgba(255,161,22,0.16)";
        el.style.borderColor = "rgba(255,161,22,0.5)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "rgba(255,161,22,0.08)";
        el.style.borderColor = "rgba(255,161,22,0.25)";
      }}
    >
      <LCIcon />
      LC
      <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-60 transition-opacity" />
    </a>
  );
}

function GFGButton({ url }: { url: string }) {
  const isNA = !url || url === "N/A";
  if (isNA) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium
        bg-black/[0.03] text-black/50 border border-black/[0.06] cursor-not-allowed select-none">
        <GFGIcon dim />
        GFG
      </span>
    );
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold
        border transition-all duration-150 group hover:-translate-y-px active:translate-y-0"
      style={{
        background: "rgba(46,164,79,0.08)",
        borderColor: "rgba(46,164,79,0.25)",
        color: "#2ea44f",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "rgba(46,164,79,0.16)";
        el.style.borderColor = "rgba(46,164,79,0.5)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "rgba(46,164,79,0.08)";
        el.style.borderColor = "rgba(46,164,79,0.25)";
      }}
    >
      <GFGIcon />
      GFG
      <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-60 transition-opacity" />
    </a>
  );
}

// ─── Progress Ring ──────────────────────────────────────────────
function ProgressRing({ pct, size = 40 }: { pct: number; size?: number }) {
  const r = (size - 5) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke="rgba(0,0,0,0.07)" strokeWidth="2.5" />
      <motion.circle
        cx={size/2} cy={size/2} r={r} fill="none"
        stroke={pct === 100 ? "#4ade80" : "rgba(0,0,0,0.7)"}
        strokeWidth="2.5" strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
      />
      <text x="50%" y="50%" textAnchor="middle" dy="0.35em"
        fontSize={size * 0.2} fill={pct === 100 ? "#4ade80" : "rgba(0,0,0,0.75)"}
        fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
        {pct}%
      </text>
    </svg>
  );
}

// ─── Problem Row ────────────────────────────────────────────────
function ProblemRow({
  stepId, subId, idx, name, lc, gfg,
}: { stepId: string; subId: string; idx: number; name: string; lc: string; gfg: string }) {
  const { solved, toggle } = useTracker();
  const pid = getProblemId(stepId, subId, idx);
  const done = !!solved[pid];

  return (
    <tr
      className="border-b border-black/[0.04] transition-colors duration-100 hover:bg-black/[0.025]"
    >
      <td className="py-2.5 pl-5 pr-2 text-[11px] text-black/60 tabular-nums w-8 font-mono">
        {String(idx + 1).padStart(2, "0")}
      </td>
      <td className="py-2.5 px-3">
        <span className={`text-sm leading-snug transition-colors ${
          done ? "line-through text-black/60" : "text-black"
        }`}>
          {name}
        </span>
      </td>
      <td className="py-2.5 px-2 text-center">
        <LCButton url={lc} />
      </td>
      <td className="py-2.5 px-2 text-center">
        <GFGButton url={gfg} />
      </td>
      <td className="py-2.5 pl-2 pr-5 text-center">
        <button
          onClick={() => toggle(pid)}
          className="transition-all duration-150 hover:scale-110 active:scale-95"
          aria-label={done ? "Mark unsolved" : "Mark solved"}
        >
          {done
            ? <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            : <Circle className="w-4 h-4 text-black/50 hover:text-black/50 transition-colors" />
          }
        </button>
      </td>
    </tr>
  );
}

// ─── Subsection ─────────────────────────────────────────────────
function Subsection({ stepId, sub }: { stepId: string; sub: Step["subsections"][number] }) {
  const [open, setOpen] = useState(false);
  const { solved } = useTracker();
  const done = sub.problems.filter((_, i) => !!solved[getProblemId(stepId, sub.id, i)]).length;
  const total = sub.problems.length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="border-b border-black/[0.05] last:border-b-0">
      <button
        onClick={() => setOpen(p => !p)}
        className="w-full flex items-center justify-between px-5 py-3.5
          hover:bg-black/[0.025] transition-colors text-left"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-3.5 h-3.5 text-black/70 rotate-[-90deg]" />
          </motion.div>
          <span className="text-[13px] font-bold text-black truncate">{sub.title}</span>
        </div>
        <div className="flex items-center gap-3 shrink-0 ml-4">
          <div className="w-24 h-0.5 bg-black/[0.08] rounded-full overflow-hidden hidden sm:block">
            <motion.div
              className="h-full rounded-full bg-black/50"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.5 }}
              style={{ background: pct === 100 ? "#4ade80" : "rgba(0,0,0,0.5)" }}
            />
          </div>
          <span className="text-xs text-black/70 tabular-nums font-mono">{done}/{total}</span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="border-t border-black/[0.04] overflow-x-auto">
              <table>
                <thead>
                  <tr className="bg-black/[0.015]">
                    <th className="py-2 pl-5 pr-2 text-left text-[10px] font-semibold tracking-widest text-black/50 uppercase w-8">#</th>
                    <th className="py-2 px-3 text-left text-[10px] font-semibold tracking-widest text-black/50 uppercase">Problem</th>
                    <th className="py-2 px-2 text-center text-[10px] font-semibold tracking-widest text-black/50 uppercase">LeetCode</th>
                    <th className="py-2 px-2 text-center text-[10px] font-semibold tracking-widest text-black/50 uppercase">GFG</th>
                    <th className="py-2 pl-2 pr-5 text-center text-[10px] font-semibold tracking-widest text-black/50 uppercase">Done</th>
                  </tr>
                </thead>
                <tbody>
                  {sub.problems.map((p, i) => (
                    <ProblemRow key={i} stepId={stepId} subId={sub.id}
                      idx={i} name={p.name} lc={p.lc} gfg={p.gfg} />
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Step Card ──────────────────────────────────────────────────
function StepCard({ step, index }: { step: Step; index: number }) {
  const [open, setOpen] = useState(false);
  const { solved } = useTracker();

  const { done, total } = useMemo(() => {
    let d = 0, t = 0;
    step.subsections.forEach(sub => {
      t += sub.problems.length;
      sub.problems.forEach((_, i) => {
        if (solved[getProblemId(step.id, sub.id, i)]) d++;
      });
    });
    return { done: d, total: t };
  }, [solved, step]);

  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="step-card rounded-2xl border border-black/[0.08] overflow-hidden bg-black/[0.02]"
    >
      {/* Header */}
      <button
        onClick={() => setOpen(p => !p)}
        className="w-full flex items-center justify-between px-5 py-4
          hover:bg-black/[0.03] transition-colors text-left group"
      >
        <div className="flex items-center gap-4 min-w-0">
          {/* Step number */}
          <span className="text-[11px] font-mono font-bold text-black/50 tabular-nums w-6 shrink-0">
            {String(step.step).padStart(2, "0")}
          </span>
          {/* Icon */}
          <span className="shrink-0 mr-1.5 flex items-center justify-center w-6 h-6 rounded-md bg-black/[0.03] border border-black/[0.04]">
            {ICON_MAP[step.id] || <BookOpen className="w-4 h-4 text-black/40" />}
          </span>
          {/* Title */}
          <h2 className="text-sm sm:text-[15px] font-semibold text-black leading-snug truncate">
            {step.title}
          </h2>
        </div>

        <div className="flex items-center gap-4 shrink-0 ml-4">
          <ProgressRing pct={pct} />
          <span className="text-xs text-black/70 tabular-nums font-mono hidden sm:block">
            {done}/{total}
          </span>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 text-black/60 group-hover:text-black/50 transition-colors" />
          </motion.div>
        </div>
      </button>

      {/* Subsections */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="subs"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="border-t border-black/[0.06]">
              {step.subsections.map(sub => (
                <Subsection key={sub.id} stepId={step.id} sub={sub} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Stat Card ──────────────────────────────────────────────────
function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-2xl border border-black/[0.08] bg-black/[0.02] p-5">
      <p className="text-[11px] font-semibold tracking-widest uppercase text-black/70 mb-2">{label}</p>
      <motion.p
        key={String(value)}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="text-3xl font-bold tabular-nums text-black"
      >
        {value}
      </motion.p>
      {sub && <p className="text-xs text-black/60 mt-1">{sub}</p>}
    </div>
  );
}

// ─── Global Progress Bar ─────────────────────────────────────────
function GlobalBar({ done, total }: { done: number; total: number }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div className="rounded-2xl border border-black/[0.08] bg-black/[0.02] p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] font-semibold tracking-widest uppercase text-black/70">
          Overall Progress
        </p>
        <span className="text-xs font-mono text-black/80">{pct}%</span>
      </div>
      <div className="h-1.5 bg-black/[0.07] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: pct === 100 ? "#4ade80" : "rgba(0,0,0,0.6)" }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
      <p className="text-xs text-black/60 mt-2">
        {done} of {total} problems solved
      </p>
    </div>
  );
}

// ─── Main ───────────────────────────────────────────────────────
export function DSATracker() {
  const { solved, reset } = useTracker();
  const [query, setQuery] = useState("");

  const { totalProblems, totalSolved } = useMemo(() => {
    let t = 0, d = 0;
    DSA_DATA.forEach(step =>
      step.subsections.forEach(sub => {
        t += sub.problems.length;
        sub.problems.forEach((_, i) => {
          if (solved[getProblemId(step.id, sub.id, i)]) d++;
        });
      })
    );
    return { totalProblems: t, totalSolved: d };
  }, [solved]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return DSA_DATA;
    return DSA_DATA.map(step => ({
      ...step,
      subsections: step.subsections
        .map(sub => ({
          ...sub,
          problems: sub.problems.filter(p => p.name.toLowerCase().includes(q)),
        }))
        .filter(sub => sub.problems.length > 0),
    })).filter(step => step.subsections.length > 0);
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto px-4 pb-24">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <StatCard label="Total" value={totalProblems} sub="problems" />
        <StatCard label="Solved" value={totalSolved} sub="completed" />
        <StatCard label="Remaining" value={totalProblems - totalSolved} sub="to go" />
        <StatCard
          label="Rate"
          value={`${totalProblems ? Math.round((totalSolved / totalProblems) * 100) : 0}%`}
          sub="completion"
        />
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <GlobalBar done={totalSolved} total={totalProblems} />
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <p className="text-xs text-black/70">
          {filtered.reduce((a, s) => a + s.subsections.reduce((b, sub) => b + sub.problems.length, 0), 0)} problems
          {query && " found"}
        </p>
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black/60 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search problems…"
              className="w-44 sm:w-56 bg-black/[0.04] border border-black/[0.08]
                rounded-xl pl-8 pr-3 py-2 text-xs text-black/75 placeholder-black/20
                focus:outline-none focus:border-black/20 transition-colors"
            />
          </div>
          {/* Reset */}
          <button
            onClick={() => confirm("Reset all progress?") && reset()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs
              text-black/70 border border-black/[0.08] bg-transparent
              hover:text-black/60 hover:border-black/20 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Step list */}
      <div className="flex flex-col gap-2.5">
        {filtered.length === 0
          ? <p className="text-center text-black/60 py-20 text-sm">No problems match your search.</p>
          : filtered.map((step, i) => <StepCard key={step.id} step={step} index={i} />)
        }
      </div>
    </div>
  );
}
