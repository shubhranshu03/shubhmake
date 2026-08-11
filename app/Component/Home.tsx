"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { RandomizedTextEffect } from "./RandomizedTextEffect";

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
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

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
    if (!level) return "bg-[#1d1d1f]/8 hover:bg-[#1d1d1f]/14 cursor-pointer";
    return [
      "",
      "bg-[#c84b2f]/20 hover:bg-[#c84b2f]/30 cursor-pointer",
      "bg-[#c84b2f]/40 hover:bg-[#c84b2f]/50 cursor-pointer",
      "bg-[#c84b2f]/65 hover:bg-[#c84b2f]/75 cursor-pointer",
      "bg-[#c84b2f]/90 hover:bg-[#c84b2f] cursor-pointer",
    ][level];
  };

  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

  return (
    <div className="space-y-3">
      {/* Month labels */}
      <div className="flex gap-1 pl-8 overflow-x-auto no-scrollbar">
        {weeks.map((week, wi) => {
          const label = monthLabels.find((m) => m.col === wi);
          return (
            <div key={wi} className="flex-shrink-0 w-[14px] text-[10px] text-[#6e6e73] font-medium font-montserrat">
              {label ? label.label : ""}
            </div>
          );
        })}
      </div>

      {/* Grid */}
      <div className="flex gap-1 overflow-x-auto no-scrollbar">
        {/* Day labels */}
        <div className="flex flex-col gap-1 flex-shrink-0 pr-2">
          {dayLabels.map((label, i) => (
            <div key={i} className="h-[14px] text-[10px] text-[#6e6e73] font-medium font-montserrat flex items-center">
              {label}
            </div>
          ))}
        </div>

        {/* Week columns */}
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1 flex-shrink-0">
            {week.map(({ date, key }) => {
              const inYear = date.getFullYear() === 2026;
              const isToday = key === todayKey;
              const level = activeDays[key];
              const d = new Date(key + "T00:00:00");
              const todayDate = new Date(); todayDate.setHours(0,0,0,0);
              const clickable = inYear && d <= todayDate;

              return (
                <div
                  key={key}
                  title={inYear && !isToday ? `${key}${level ? ` · Level ${level}` : ""}` : isToday ? `Today · ${key}` : ""}
                  onClick={() => {
                    if (clickable) {
                      setSelectedDate(key === selectedDate ? null : key);
                    }
                  }}
                  className={`w-[14px] h-[14px] rounded-[3px] transition-all duration-150 flex-shrink-0 relative
                    ${isToday ? "ring-1 ring-offset-[2px] ring-[#c84b2f] ring-offset-[#f0eee6]" : cellStyle(key, inYear)}
                    ${selectedDate === key ? "ring-2 ring-[#1d1d1f] scale-110 z-10" : ""}
                  `}
                  style={isToday ? {
                    backgroundColor: "#c84b2f",
                    boxShadow: "0 0 8px 1px rgba(200,75,47,0.55)",
                  } : {}}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend & selected date details */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="min-h-[20px] flex items-center">
          {selectedDate ? (
            <p className="text-[11px] font-bold text-[#c84b2f] font-montserrat tracking-wide transition-all duration-200">
              {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
              <span className="text-[#6e6e73] font-normal">
                {activeDays[selectedDate]
                  ? ` · Shipped ${activeDays[selectedDate]} times`
                  : " · No shipments"}
              </span>
            </p>
          ) : (
            <p className="text-[11px] text-[#6e6e73] font-medium font-montserrat italic">
              Click any cell to see date and shipping activity
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#6e6e73] font-medium font-montserrat">Less</span>
          <div className="flex gap-1">
            {["bg-[#1d1d1f]/8","bg-[#c84b2f]/20","bg-[#c84b2f]/40","bg-[#c84b2f]/65","bg-[#c84b2f]/90"].map((c, i) => (
              <div key={i} className={`w-[14px] h-[14px] rounded-[3px] ${c}`} />
            ))}
          </div>
          <span className="text-[11px] text-[#6e6e73] font-medium font-montserrat">More</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f0eee6] flex flex-col items-center justify-start pt-8 sm:pt-12 md:pt-16 lg:pt-20 px-4 sm:px-8 md:px-16 lg:px-32 pb-16 sm:pb-24 selection:bg-[#c84b2f]/20 selection:text-[#c84b2f]">
      
      {/* Navigation Header */}
      <nav className="max-w-4xl w-full text-left mb-12 sm:mb-16 md:mb-24 animate-fade-in">
        <ul className="flex items-center gap-4 sm:gap-6 md:gap-8 text-base sm:text-lg md:text-xl font-medium font-sans">
          <li>
            <a href="/" className="text-[#1d1d1f] transition-colors cursor-pointer">Home</a>
          </li>
          <li>
            <a href="/about" className="text-[#6e6e73] hover:text-[#1d1d1f] transition-colors cursor-pointer">About</a>
          </li>
          <li>
            <a href="/skills" className="text-[#6e6e73] hover:text-[#1d1d1f] transition-colors cursor-pointer">Skills</a>
          </li>
        </ul>
      </nav>

      <div className="max-w-4xl w-full text-left space-y-8 sm:space-y-10 md:space-y-12 animate-fade-in">
        {/* Profile Section with Image and Name */}
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
          {/* Profile Image (circular) */}
          <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-[#1d1d1f] shadow-md flex-shrink-0">
            <Image src="/shubhranshu.jpg" alt="Shubhranshu" fill sizes="(max-width: 640px) 80px, (max-width: 768px) 112px, 144px" className="object-cover" priority />
          </div>
          
          {/* Name and Title */}
          <div className="flex flex-col justify-center">
            <h1 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-[#1d1d1f] leading-[1.1]">
              Hey, I'm <span className="underline decoration-[#c84b2f] decoration-2 underline-offset-4">Shubhranshu</span>.
            </h1>
            <p className="font-sans text-sm sm:text-base md:text-lg text-[#6e6e73] font-normal mt-2">
              Full Stack Developer
            </p>
          </div>
        </div>

        {/* Bio Text Group */}
        <div className="space-y-3 sm:space-y-4">
          <p className="font-sans text-sm sm:text-base md:text-lg lg:text-xl text-[#1d1d1f] font-normal leading-relaxed opacity-95 max-w-3xl">
            I build full products, front to back, and I'm annoyingly obsessive about the small details most people skip, the ones that quietly decide whether software actually feels good to use or just technically works.
          </p>
          <p className="font-sans text-sm sm:text-base md:text-lg lg:text-xl text-[#1d1d1f] font-normal leading-relaxed opacity-95 max-w-3xl">
            Currently living in TypeScript, React, Next.js, and Tailwind.
          </p>
        </div>

        {/* Tech Stack */}
        <div className="space-y-4">
          <p className="text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-[#c84b2f] font-montserrat">Tech Stack</p>
          <div className="grid grid-cols-4 gap-1 sm:flex sm:flex-wrap sm:items-center sm:gap-3 md:gap-4">
            {[
              { src: "/a1 (1).png", alt: "TypeScript" },
              { src: "/a1 (2).png", alt: "JavaScript" },
              { src: "/github1.png", alt: "GitHub New" },
              { src: "/git1.png", alt: "Git New" },
              { src: "/a1 (3).png", alt: "React" },
              { src: "/a1 (4).png", alt: "Next.js" },
              { src: "/a1 (5).png", alt: "Tailwind CSS" },
              { src: "/a1 (6).png", alt: "Node.js" },
              { src: "/a1 (7).png", alt: "Git Original" },
              { src: "/a1 (8).png", alt: "GitHub Original" },
              { src: "/a1 (9).png", alt: "MongoDB" },
              { src: "/a1 (10).png", alt: "Supabase" },
            ].map((tech) => (
              <div
                key={tech.alt}
                className="relative w-16 h-16 sm:w-22 sm:h-22 md:w-24 md:h-24 hover:scale-110 transition-all duration-300 cursor-pointer flex items-center justify-center"
                title={tech.alt}
              >
                <Image src={tech.src} alt={tech.alt} fill sizes="(max-width: 640px) 64px, (max-width: 768px) 88px, 96px" className="object-contain" />
              </div>
            ))}
          </div>
        </div>

        {/* Featured Projects */}
        <div className="space-y-6 pt-10 border-t border-[#1d1d1f]/10">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-[#c84b2f] font-montserrat">Featured Projects</p>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-[#1d1d1f]">What I've built.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project 1 - webstudioorg.net */}
            <div className="group relative rounded-2xl overflow-hidden border border-[#1d1d1f]/10 bg-white hover:shadow-lg transition-all duration-500 cursor-pointer">
              {/* Project Image */}
              <div className="relative w-full h-48 sm:h-56 bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
                <Image 
                  src="/p1.png" 
                  alt="webstudioorg.net project preview" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
              </div>
              
              {/* Project Info */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-sans font-bold text-xl text-[#1d1d1f] tracking-tight">webstudioorg.net</h3>
                  <div className="flex items-center gap-2">
                    <a 
                      href="https://github.com/shubhranshu03" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-full bg-[#1d1d1f]/5 hover:bg-[#1d1d1f]/10 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                        <path d="M9 18c-4.51 2-5-2-7-2"/>
                      </svg>
                    </a>
                    <a 
                      href="https://webstudioorg.net" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-full bg-[#1d1d1f]/5 hover:bg-[#1d1d1f]/10 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15,3 21,3 21,9"/>
                        <line x1="10" x2="21" y1="14" y2="3"/>
                      </svg>
                    </a>
                  </div>
                </div>
                
                <p className="text-sm text-[#6e6e73] leading-relaxed">
                  Turn ideas into websites, graphics, and marketing assets through simple prompts. A comprehensive design platform built with modern web technologies.
                </p>
                
                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2">
                  {["Next.js", "React", "TypeScript", "Tailwind"].map((tech) => (
                    <span 
                      key={tech} 
                      className="text-xs font-medium px-3 py-1 rounded-full bg-[#1d1d1f]/8 text-[#1d1d1f] font-montserrat"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Project 2 - Coming Soon */}
            <div className="group relative rounded-2xl overflow-hidden border border-[#1d1d1f]/10 bg-gradient-to-br from-[#1d1d1f]/5 to-[#1d1d1f]/10 hover:shadow-lg transition-all duration-500 cursor-pointer">
              {/* Project Image Placeholder */}
              <div className="relative w-full h-48 sm:h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden flex items-center justify-center">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-[#1d1d1f]/10 flex items-center justify-center mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#6e6e73]">
                      <path d="M12 2v20M2 12h20"/>
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-[#6e6e73] font-montserrat">Coming Soon</p>
                </div>
              </div>
              
              {/* Project Info */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-sans font-bold text-xl text-[#1d1d1f] tracking-tight">Next Project</h3>
                  <div className="flex items-center gap-2 opacity-50">
                    <div className="p-1.5 rounded-full bg-[#1d1d1f]/5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                        <path d="M9 18c-4.51 2-5-2-7-2"/>
                      </svg>
                    </div>
                    <div className="p-1.5 rounded-full bg-[#1d1d1f]/5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15,3 21,3 21,9"/>
                        <line x1="10" x2="21" y1="14" y2="3"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-[#6e6e73] leading-relaxed">
                  Something exciting is brewing. A new project that will showcase innovative solutions and cutting-edge design patterns.
                </p>
                
                {/* Status Tag */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#c84b2f]/10 text-[#c84b2f] font-montserrat border border-[#c84b2f]/20">
                    In Development
                  </span>
                </div>
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

        {/* Let's Work Together Section */}
        <div className="space-y-8 sm:space-y-10 pt-10 border-t border-[#1d1d1f]/10">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-[#6e6e73] font-montserrat">Let's Work Together</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left Side - Get in Touch */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#1d1d1f]">
                  Get in Touch
                </h3>
                <p className="text-sm sm:text-base text-[#6e6e73] leading-relaxed max-w-md">
                  Choose your preferred method to connect and let's discuss your project.
                </p>
              </div>

              {/* Contact Options */}
              <div className="space-y-4">
                {/* Schedule a Call */}
                <a href="https://cal.com/shubhranshu-2003/30min" target="_blank" rel="noopener noreferrer" className="group bg-[#1d1d1f]/8 hover:bg-[#c84b2f] rounded-xl p-4 sm:p-6 transition-all duration-300 cursor-pointer block">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-6 h-6 flex-shrink-0 text-[#1d1d1f] group-hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                          <line x1="16" x2="16" y1="2" y2="6"/>
                          <line x1="8" x2="8" y1="2" y2="6"/>
                          <line x1="3" x2="21" y1="10" y2="10"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-base sm:text-lg text-[#1d1d1f] group-hover:text-white">Schedule a free call</h4>
                        <p className="text-xs sm:text-sm text-[#1d1d1f]/70 group-hover:text-white/70">30-minute strategy session</p>
                      </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform text-[#1d1d1f] group-hover:text-white">
                      <path d="M5 12h14"/>
                      <path d="m12 5 7 7-7 7"/>
                    </svg>
                  </div>
                </a>

                {/* Email Contact */}
                <a href="mailto:shubhranshukhatua@gmail.com" className="group block bg-[#1d1d1f]/8 hover:bg-[#c84b2f] rounded-xl p-4 sm:p-6 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-6 h-6 flex-shrink-0 text-[#1d1d1f] group-hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="20" height="16" x="2" y="4" rx="2"/>
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-base sm:text-lg text-[#1d1d1f] group-hover:text-white">shubhranshukhatua@gmail.com</h4>
                        <p className="text-xs sm:text-sm text-[#1d1d1f]/70 group-hover:text-white/70">Quick inquiries & questions</p>
                      </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform text-[#1d1d1f] group-hover:text-white">
                      <path d="M5 12h14"/>
                      <path d="m12 5 7 7-7 7"/>
                    </svg>
                  </div>
                </a>

                {/* X/Twitter Contact */}
                <a href="https://x.com/shubhranshu2009" target="_blank" rel="noopener noreferrer" className="group block bg-[#1d1d1f]/8 hover:bg-[#c84b2f] rounded-xl p-4 sm:p-6 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-6 h-6 flex-shrink-0 text-[#1d1d1f] group-hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-base sm:text-lg text-[#1d1d1f] group-hover:text-white">Connect on X</h4>
                        <p className="text-xs sm:text-sm text-[#1d1d1f]/70 group-hover:text-white/70">Follow for updates & insights</p>
                      </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform text-[#1d1d1f] group-hover:text-white">
                      <path d="M5 12h14"/>
                      <path d="m12 5 7 7-7 7"/>
                    </svg>
                  </div>
                </a>
              </div>

              {/* Additional Info */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-3 text-sm text-[#6e6e73]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                  <span>Replies within 24 hours</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#6e6e73]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v6m0 6v6"/>
                    <path d="m21 12-6-3-6 3-6-3"/>
                  </svg>
                  <span>Open to remote, freelance & full-time</span>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#1d1d1f]">
                  Send a Message
                </h3>
                <p className="text-sm sm:text-base text-[#6e6e73] leading-relaxed max-w-md">
                  Prefer to write? Fill out the form and I'll get back to you within 24 hours.
                </p>
              </div>

              {/* Contact Form */}
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-3 sm:py-4 border border-[#1d1d1f]/20 rounded-xl bg-white/50 focus:bg-white focus:border-[#c84b2f] focus:outline-none transition-all duration-300 text-sm sm:text-base"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 sm:py-4 border border-[#1d1d1f]/20 rounded-xl bg-white/50 focus:bg-white focus:border-[#c84b2f] focus:outline-none transition-all duration-300 text-sm sm:text-base"
                    required
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    rows={5}
                    className="w-full px-4 py-3 sm:py-4 border border-[#1d1d1f]/20 rounded-xl bg-white/50 focus:bg-white focus:border-[#c84b2f] focus:outline-none transition-all duration-300 resize-none text-sm sm:text-base"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="group w-full bg-[#1d1d1f]/8 hover:bg-[#c84b2f] text-[#1d1d1f] hover:text-white px-6 py-3 sm:py-4 rounded-xl font-medium text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Send Message
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14"/>
                    <path d="m12 5 7 7-7 7"/>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>

      {/* Footer */}
        <div className="pt-16 border-t border-[#1d1d1f]/10 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
          {/* Copyright and Navigation */}
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <p className="text-sm text-[#6e6e73] font-medium">© 2026 Shubhranshu.</p>
            <nav className="flex items-center gap-6">
              <a href="/about" className="text-sm text-[#6e6e73] hover:text-[#1d1d1f] transition-colors font-medium">About</a>
              <a href="#" className="text-sm text-[#6e6e73] hover:text-[#1d1d1f] transition-colors font-medium">Services</a>
              <a href="/skills" className="text-sm text-[#6e6e73] hover:text-[#1d1d1f] transition-colors font-medium">Skills</a>
            </nav>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {/* X Profile */}
            <a
              href="https://x.com/shubhranshu2009"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
              title="X Profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>
              </svg>
            </a>

            {/* Email */}
            <a
              href="mailto:shubhranshukhatua@gmail.com"
              className="text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
              title="Email Me"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/shubhranshu03"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
              title="GitHub Profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg>
            </a>
          </div>
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
