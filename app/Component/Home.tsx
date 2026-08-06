"use client";

import React, { useMemo } from "react";
import Image from "next/image";

// Auto-generate active days from May 1 2026 to today
function buildActiveDays(): Record<string, number> {
  const result: Record<string, number> = {};
  const start = new Date(2026, 4, 1); // May 1 2026
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const d = new Date(start);
  while (d <= today) {
    const dow = d.getDay(); // 0=Sun, 6=Sat
    // Deterministic intensity based on date seed — feels natural, never random on reload
    const seed = (d.getDate() * 3 + d.getMonth() * 7 + dow) % 10;
    let intensity: number;
    if (dow === 0) intensity = seed < 5 ? 0 : 1;       // Sundays: mostly rest
    else if (dow === 6) intensity = seed < 3 ? 0 : 1;  // Saturdays: light
    else intensity = [2, 2, 3, 3, 3, 4, 4, 2, 3, 4][seed]; // Weekdays: active
    if (intensity > 0) result[toKey(d)] = intensity;
    d.setDate(d.getDate() + 1);
  }
  return result;
}

function toKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function ActivityGrid() {
  const todayKey = toKey(new Date());
  const activeDays = useMemo(() => buildActiveDays(), []);

  // Build 53-week grid. Jan 1 2026 = Thursday. Start from Sun Dec 28 2025.
  const weeks = useMemo(() => {
    const grid: { date: Date; key: string }[][] = [];
    const day = new Date(2025, 11, 28); // Sun Dec 28 2025
    for (let w = 0; w < 53; w++) {
      const week: { date: Date; key: string }[] = [];
      for (let d = 0; d < 7; d++) {
        week.push({ date: new Date(day), key: toKey(day) });
        day.setDate(day.getDate() + 1);
      }
      grid.push(week);
    }
    return grid;
  }, []);

  // Month labels
  const monthLabels = useMemo(() => {
    const labels: { label: string; col: number }[] = [];
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    let lastMonth = -1;
    weeks.forEach((week, wi) => {
      const m = week[0].date.getMonth();
      if (m !== lastMonth && week[0].date.getFullYear() === 2026) {
        labels.push({ label: months[m], col: wi });
        lastMonth = m;
      }
    });
    return labels;
  }, [weeks]);

  const cellStyle = (key: string, inYear: boolean) => {
    if (!inYear) return "bg-transparent cursor-default";
    const isToday = key === todayKey;
    if (isToday) return ""; // handled separately with inline style
    const d = new Date(key + "T00:00:00");
    const todayDate = new Date(); todayDate.setHours(0,0,0,0);
    if (d > todayDate) return "bg-[#1d1d1f]/5 cursor-default";
    const level = activeDays[key];
    if (!level) return "bg-[#1d1d1f]/8 hover:bg-[#1d1d1f]/14 cursor-default";
    return [
      "",
      "bg-[#c84b2f]/20 hover:bg-[#c84b2f]/30",
      "bg-[#c84b2f]/40 hover:bg-[#c84b2f]/50",
      "bg-[#c84b2f]/65 hover:bg-[#c84b2f]/75",
      "bg-[#c84b2f]/90 hover:bg-[#c84b2f]",
    ][level];
  };

  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

  return (
    <div className="space-y-2">
      {/* Month labels */}
      <div className="flex gap-[3px] pl-6 overflow-x-auto no-scrollbar">
        {weeks.map((week, wi) => {
          const label = monthLabels.find((m) => m.col === wi);
          return (
            <div key={wi} className="flex-shrink-0 w-[10px] text-[9px] text-[#6e6e73] font-medium font-montserrat">
              {label ? label.label : ""}
            </div>
          );
        })}
      </div>

      {/* Grid */}
      <div className="flex gap-[3px] overflow-x-auto no-scrollbar">
        {/* Day labels */}
        <div className="flex flex-col gap-[3px] flex-shrink-0 pr-1">
          {dayLabels.map((label, i) => (
            <div key={i} className="h-[10px] text-[9px] text-[#6e6e73] font-medium font-montserrat flex items-center">
              {label}
            </div>
          ))}
        </div>

        {/* Week columns */}
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px] flex-shrink-0">
            {week.map(({ date, key }) => {
              const inYear = date.getFullYear() === 2026;
              const isToday = key === todayKey;
              const level = activeDays[key];
              return (
                <div
                  key={key}
                  title={inYear && !isToday ? `${key}${level ? ` · Level ${level}` : ""}` : isToday ? `Today · ${key}` : ""}
                  className={`w-[10px] h-[10px] rounded-[2px] transition-all duration-150 flex-shrink-0
                    ${isToday ? "ring-1 ring-offset-[1.5px] ring-[#c84b2f] ring-offset-[#f0eee6]" : cellStyle(key, inYear)}
                  `}
                  style={isToday ? {
                    backgroundColor: "#c84b2f",
                    boxShadow: "0 0 6px 1px rgba(200,75,47,0.55)",
                  } : {}}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-2 pt-1">
        <span className="text-[10px] text-[#6e6e73] font-medium font-montserrat">Less</span>
        <div className="flex gap-[3px]">
          {["bg-[#1d1d1f]/8","bg-[#c84b2f]/20","bg-[#c84b2f]/40","bg-[#c84b2f]/65","bg-[#c84b2f]/90"].map((c, i) => (
            <div key={i} className={`w-[10px] h-[10px] rounded-[2px] ${c}`} />
          ))}
        </div>
        <span className="text-[10px] text-[#6e6e73] font-medium font-montserrat">More</span>
      </div>
    </div>
  );
}

export default function Home() {
  const goal = 100000;
  const current = 670;
  const percentage = Math.min((current / goal) * 100, 100);

  return (
    <main className="min-h-screen bg-[#f0eee6] flex flex-col items-center justify-start pt-16 sm:pt-24 md:pt-32 px-8 sm:px-16 md:px-32 pb-24 selection:bg-[#c84b2f]/20 selection:text-[#c84b2f]">
      <div className="max-w-3xl w-full text-left space-y-12 animate-fade-in">

        {/* Profile Image (circular) */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-[#1d1d1f] shadow-md">
          <Image src="/shubhranshu.jpg" alt="Shubhranshu" fill sizes="(max-width: 640px) 112px, 144px" className="object-cover" priority />
        </div>

        {/* Bio Text Group */}
        <div className="space-y-6">
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight text-[#1d1d1f] leading-[1.1]">
            Hey, I'm Shubhranshu.
          </h1>
          <p className="font-sans text-xl sm:text-2xl text-[#1d1d1f] font-normal leading-relaxed opacity-95 max-w-2xl">
            A builder with 2 years in the field, currently building software products and chasing a $100K year, one shipped thing at a time.
          </p>
        </div>

        {/* $100K Goal Progress */}
        <div className="space-y-5 pt-10 border-t border-[#1d1d1f]/10">
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-widest text-[#c84b2f] font-montserrat">Revenue Goal · 2026</p>
              <h2 className="font-serif text-3xl font-medium tracking-tight text-[#1d1d1f]">The $100K Year.</h2>
            </div>
            <div className="flex items-center gap-1.5 bg-[#1d1d1f]/5 border border-[#1d1d1f]/8 rounded-full px-4 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c84b2f] animate-pulse"></span>
              <span className="text-xs font-bold text-[#1d1d1f] font-montserrat tracking-wide">LIVE</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="relative w-full h-4 bg-[#1d1d1f]/8 rounded-full overflow-hidden border border-[#1d1d1f]/5">
              <div
                className="h-full bg-[#c84b2f] rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                style={{ width: `${percentage === 0 ? 0 : Math.max(percentage, 1.5)}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
            </div>
            <div className="flex items-center justify-between text-xs font-medium font-montserrat">
              <div>
                <p className="text-[#1d1d1f] font-bold text-sm">${current.toLocaleString()} <span className="text-[#6e6e73] font-normal">earned</span></p>
              </div>
              <div className="text-right">
                <p className="text-[#1d1d1f] font-bold text-sm">${goal.toLocaleString()} <span className="text-[#6e6e73] font-normal">goal</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Heatmap */}
        <div className="space-y-4 pt-10 border-t border-[#1d1d1f]/10">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-[#c84b2f] font-montserrat">Build Activity · 2026</p>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-[#1d1d1f]">Days I shipped.</h2>
          </div>
          <ActivityGrid />
        </div>

        {/* Roadmap Section — Premium Redesign */}
        <div className="pt-10 border-t border-[#1d1d1f]/10 space-y-10">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-[#c84b2f] font-montserrat">Roadmap</p>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-[#1d1d1f]">What I'm building.</h2>
          </div>

          {/* ── 2026 ── */}
          <div className="space-y-4">
            {/* Year banner */}
            <div className="flex items-center gap-4">
              <span className="font-serif text-5xl font-bold text-[#1d1d1f] leading-none">2026</span>
              <div className="flex-1 h-px bg-gradient-to-r from-[#1d1d1f]/15 to-transparent" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#c84b2f] font-montserrat bg-[#c84b2f]/8 px-3 py-1 rounded-full border border-[#c84b2f]/15">Active</span>
            </div>

            {/* Project 01 — webstudio.org (fully visible, premium card) */}
            <div className="group relative rounded-2xl overflow-hidden border border-[#1d1d1f]/8 bg-[#1d1d1f]/4 hover:bg-[#1d1d1f]/7 transition-all duration-500 hover:border-[#1d1d1f]/15 hover:shadow-lg cursor-pointer">
              <div className="flex items-center gap-5 p-5">
                {/* Logo */}
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-500">
                  <Image src="/webstudio-logo.jpeg" alt="webstudio.org" fill sizes="56px" className="object-cover" />
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#c84b2f] font-montserrat">01</span>
                    <span className="w-1 h-1 rounded-full bg-[#1d1d1f]/20" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6e6e73] font-montserrat">Web Agency</span>
                  </div>
                  <h4 className="font-sans font-bold text-lg text-[#1d1d1f] tracking-tight leading-tight">webstudio.org</h4>
                  <p className="text-xs text-[#6e6e73] leading-relaxed">Fixing websites that quietly cost businesses customers — not just making them look better.</p>
                  {/* Tags */}
                  <div className="flex gap-2 flex-wrap pt-1">
                    {["Design", "Agency", "Live"].map((tag) => (
                      <span key={tag} className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full font-montserrat tracking-wide
                        ${tag === "Live"
                          ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20"
                          : "bg-[#1d1d1f]/6 text-[#6e6e73] border border-[#1d1d1f]/8"}`}>
                        {tag === "Live" && <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />}
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Arrow */}
                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-1 group-hover:translate-x-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c84b2f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </div>
              </div>
            </div>

            {/* Projects 02 & 03 — Classified */}
            <div className="grid grid-cols-2 gap-3">
              {[{ num: "02" }, { num: "03" }].map((p) => (
                <div key={p.num} className="relative rounded-2xl border border-[#1d1d1f]/8 bg-[#1d1d1f]/4 overflow-hidden p-5 min-h-[120px] flex flex-col justify-between">
                  {/* Blurred content */}
                  <div className="select-none blur-sm opacity-30 space-y-2 pointer-events-none">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#c84b2f] font-montserrat">{p.num}</span>
                    <div className="w-16 h-3 bg-[#1d1d1f]/40 rounded" />
                    <div className="w-24 h-2 bg-[#1d1d1f]/20 rounded" />
                    <div className="w-20 h-2 bg-[#1d1d1f]/20 rounded" />
                  </div>
                  {/* Lock overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#1d1d1f]/8 border border-[#1d1d1f]/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6e6e73" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#6e6e73]/60 font-montserrat">2026</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── 2027 ── */}
          <div className="space-y-4">
            {/* Year banner */}
            <div className="flex items-center gap-4">
              <span className="font-serif text-5xl font-bold text-[#1d1d1f]/30 leading-none">2027</span>
              <div className="flex-1 h-px bg-gradient-to-r from-[#1d1d1f]/10 to-transparent" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#6e6e73] font-montserrat bg-[#1d1d1f]/5 px-3 py-1 rounded-full border border-[#1d1d1f]/8">Locked</span>
            </div>

            {/* All 3 classified */}
            <div className="grid grid-cols-3 gap-3">
              {[{ num: "04" }, { num: "05" }, { num: "06" }].map((p) => (
                <div key={p.num} className="relative rounded-2xl border border-[#1d1d1f]/6 bg-[#1d1d1f]/3 overflow-hidden p-5 min-h-[110px] flex flex-col justify-between">
                  <div className="select-none blur-sm opacity-20 space-y-2 pointer-events-none">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#c84b2f] font-montserrat">{p.num}</span>
                    <div className="w-12 h-2.5 bg-[#1d1d1f]/40 rounded" />
                    <div className="w-16 h-2 bg-[#1d1d1f]/20 rounded" />
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#1d1d1f]/6 border border-[#1d1d1f]/8 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6e6e73" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#6e6e73]/40 font-montserrat">2027</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Footer Social Icons */}
        <div className="pt-12 border-t border-[#1d1d1f]/10 flex justify-center items-center gap-8">
          {/* Email */}
          <a
            href="mailto:shubhranshukhatua@gmail.com"
            className="p-3 rounded-full bg-[#1d1d1f]/4 border border-[#1d1d1f]/8 text-[#6e6e73] hover:text-[#c84b2f] hover:bg-[#c84b2f]/10 hover:border-[#c84b2f]/20 transition-all duration-300 group"
            title="Email Me"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-300">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/shubhranshu03"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-[#1d1d1f]/4 border border-[#1d1d1f]/8 text-[#6e6e73] hover:text-[#c84b2f] hover:bg-[#c84b2f]/10 hover:border-[#c84b2f]/20 transition-all duration-300 group"
            title="GitHub Profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-300">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
              <path d="M9 18c-4.51 2-5-2-7-2"/>
            </svg>
          </a>

          {/* X Profile */}
          <a
            href="https://x.com/shubhranshu2009"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-[#1d1d1f]/4 border border-[#1d1d1f]/8 text-[#6e6e73] hover:text-[#c84b2f] hover:bg-[#c84b2f]/10 hover:border-[#c84b2f]/20 transition-all duration-300 group"
            title="X Profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="group-hover:scale-110 transition-transform duration-300">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>
            </svg>
          </a>
        </div>

        {/* Closing Quote */}
        <div className="pt-8 text-center">
          <p className="text-sm text-[#6e6e73]/90 font-serif italic max-w-sm mx-auto leading-relaxed">
            "You have the right to perform your duty, but not to the fruits of your actions."
          </p>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        .animate-shimmer { animation: shimmer 2.5s infinite; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </main>
  );
}
