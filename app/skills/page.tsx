"use client";

import React, { useState } from "react";
import Link from "next/link";

const skills = [
  {
    id: "content-writer",
    number: "01",
    title: "On-Brand Content Writer",
    savePath: "content-writer/SKILL.md",
    description: "Writes blog posts, social content, and articles that match a specific voice and tone, instead of generic AI phrasing that sounds like every other post.",
    whenToUse: "I use this whenever I am writing something meant to sound like me, not a template. Drops the corporate fluff immediately.",
    tags: ["Writing", "Content", "Voice"],
    accentColor: "#c84b2f",
    content: "---\nname: content-writer\ndescription: Writes blog posts, social content, and articles that match a specific voice, tone, and style instead of generic AI phrasing. Use whenever the task involves writing content meant to sound like a real person, not a template.\n---\n\n# Content Writer Skill\n\n## Voice Rules\n- No corporate phrases like in todays fast-paced world or unlock your potential\n- Vary sentence length deliberately: short punchy lines mixed with longer explanatory ones\n- Open with a specific claim or story, never a generic definition\n- Avoid em dashes in the middle of sentences\n- One clear idea per paragraph, no stacking multiple points together\n\n## Structure Rules\n- Hook in the first two sentences, no warm-up\n- Use real, specific examples over vague claims\n- Close with a clear takeaway, not a summary that just repeats the intro\n\n## What to Avoid\n- Triple-adjective lists like innovative, scalable, powerful\n- Hedging every claim with it depends unless genuinely necessary\n- Reproducing structure from source material almost word for word",
  },
  {
    id: "client-proposal",
    number: "02",
    title: "Client Proposal Generator",
    savePath: "client-proposal/SKILL.md",
    description: "Turns a rough project description into a clean, structured proposal that preempts the most common client questions before they are asked.",
    whenToUse: "I drop this in whenever I need to turn a messy client call into a clean scope doc. Saves hours of back-and-forth.",
    tags: ["Business", "Proposals", "Freelance"],
    accentColor: "#2563eb",
    content: "---\nname: client-proposal\ndescription: Generates a client proposal or scope document from a rough project description, structured for clarity and to preempt common client questions. Use when drafting proposals, scopes of work, or project pitches.\n---\n\n# Client Proposal Generator\n\n## Required Sections (in this order)\n1. The problem, stated in the clients own words, not yours\n2. The proposed solution, in plain language, no jargon\n3. What is included, as a clear bulleted list\n4. Timeline, broken into realistic phases\n5. Investment, framed around outcome, not hours\n6. Next steps, one clear call to action\n\n## Tone Rules\n- Confident, not salesy\n- Never pad language to sound more impressive than the actual scope\n- Always name the specific outcome the client cares about, not just the deliverable\n\n## What to Avoid\n- Generic filler like we look forward to working with you\n- Overpromising timelines to win the deal\n- Long paragraphs, use short, scannable sections throughout",
  },
  {
    id: "debug-helper",
    number: "03",
    title: "Bug Report Debugger",
    savePath: "debug-helper/SKILL.md",
    description: "Structures every bug report using the expected vs actual framework so AI debugging sessions are faster, more focused, and actually fix the root cause.",
    whenToUse: "I use this before every debugging session. Forces me to actually think through the problem before asking AI to fix it.",
    tags: ["Debugging", "Dev", "Engineering"],
    accentColor: "#16a34a",
    content: "---\nname: debug-helper\ndescription: Structures a bug report and fix request using the what I expected vs what happened framework, so AI-assisted debugging is faster and more accurate. Use whenever fixing a bug or unexpected behavior in a build.\n---\n\n# Debug Helper Skill\n\n## Required Format for Every Bug Report\n1. What I expected to happen\n2. What actually happened instead\n3. Where in the app or flow this occurred\n4. Any relevant error message, exact text\n5. What NOT to change while fixing this\n\n## Debugging Approach\n- Diagnose the root cause before proposing a fix, do not just patch symptoms\n- If uncertain, ask a clarifying question before changing code\n- After a fix, state clearly what was changed and why\n\n## What to Avoid\n- Vague reports like it is broken, fix it\n- Changing unrelated code while fixing one specific issue\n- Assuming the first visible symptom is the actual root cause",
  },
  {
    id: "seo-blog-post",
    number: "04",
    title: "SEO Blog Post Builder",
    savePath: "seo-blog-post/SKILL.md",
    description: "Builds search-optimized blog posts that still sound like a real person wrote them. No keyword stuffing, no boring intros, no sacrificing voice for rankings.",
    whenToUse: "I use this when writing posts that need to rank. It balances SEO requirements with keeping the writing actually readable.",
    tags: ["SEO", "Blog", "Marketing"],
    accentColor: "#7c3aed",
    content: "---\nname: seo-blog-post\ndescription: Builds a blog post optimized for on-page SEO while preserving a specific voice and personality, instead of producing generic SEO-stuffed content. Use when writing blog content meant to rank in search.\n---\n\n# SEO Blog Post Builder\n\n## Required On-Page Elements\n- Primary keyword in the first 100 words\n- One H1, clear H2/H3 hierarchy beneath it\n- 3-5 internal links, 2-3 external links to reputable sources\n- Meta title and description included at the end of the draft\n- 4-6 real questions answered directly within the content\n\n## Voice Preservation Rule\nApply all SEO requirements without losing personality, humor, or natural tone. A technically optimized post that is boring to read is a failed post. Balance both requirements equally.\n\n## What to Avoid\n- Keyword stuffing, natural keyword placement only\n- Copying structure from ranking competitors, use their structure as reference only\n- Long, generic introductions before getting to the actual point",
  },
  {
    id: "x-post-writer",
    number: "05",
    title: "X Post Generator",
    savePath: "x-post-writer/SKILL.md",
    description: "Writes short and long-form X (Twitter) posts with a strong hook, no filler, and a tone that does not read as AI-generated.",
    whenToUse: "Use when drafting posts, threads, or replies for X.",
    tags: ["X", "Twitter", "Social"],
    accentColor: "#c84b2f",
    content: "---\nname: x-post-writer\ndescription: Writes short and long-form X (Twitter) posts with a strong hook, no filler, and a tone that does not read as AI-generated. Use whenever drafting posts, threads, or replies for X.\n---\n\n# X Post Writer Skill\n\n## Hook Rules\n- First line must be the hook, no warm-up sentence before it\n- Use one of: bold claim, curiosity gap, or a specific number/result\n- Never open with a question unless the entire post is built around answering it\n\n## Structure Rules\n- Short posts: 1-4 lines max, one idea only\n- Long posts/threads: one core idea, broken into digestible lines, never more than 2-3 sentences per paragraph\n- Always end on a clear, quotable closing line, not a summary\n\n## Voice Rules\n- No em dashes mid-sentence\n- Contractions are fine and preferred, write like typing fast, not drafting an essay\n- Cut any sentence that could be deleted without losing meaning\n\n## What to Avoid\n- Generic engagement bait (agree?, thoughts?) unless it is a genuine question hook\n- Corporate or motivational-poster phrasing\n- More than one hashtag, ideally zero"
  },
  {
    id: "client-discovery",
    number: "06",
    title: "Client Discovery Call Prep",
    savePath: "client-discovery/SKILL.md",
    description: "Prepares a structured question list before a new client call, focused on uncovering the real problem behind the request instead of just the surface ask.",
    whenToUse: "Use before any new client discovery or scoping call.",
    tags: ["Business", "Client", "Discovery"],
    accentColor: "#c84b2f",
    content: "---\nname: client-discovery\ndescription: Prepares a structured question list before a new client call, focused on uncovering the real problem behind the request instead of just the surface ask. Use before any new client discovery or scoping call.\n---\n\n# Client Discovery Call Prep\n\n## Core Principle\nThe clients stated request is rarely the actual problem. Always dig one layer deeper before proposing a solution.\n\n## Required Questions to Prepare\n1. What is actually happening right now that made you reach out today?\n2. What have you already tried, and why did it not work?\n3. What does success actually look like, in a specific, measurable way?\n4. Who else is involved in this decision?\n5. What is the real cost of not fixing this?\n\n## During the Call\n- Ask why at least twice on the stated request before accepting it at face value\n- Note the clients exact language, use it back in the proposal later\n- Identify the metric they actually care about, not the one that sounds impressive\n\n## What to Avoid\n- Jumping straight to solutions before fully understanding the problem\n- Accepting a vague goal like make it look better without pushing for a specific outcome"
  },
  {
    id: "content-batch",
    number: "07",
    title: "Weekly Content Batch Planner",
    savePath: "content-batch/SKILL.md",
    description: "Turns one raw idea, transcript, or observation into a full week of varied content (short posts, long posts, one article idea) in a single pass.",
    whenToUse: "Use when batching content instead of writing one piece at a time.",
    tags: ["Marketing", "Content", "Planning"],
    accentColor: "#c84b2f",
    content: "---\nname: content-batch\ndescription: Turns one raw idea, transcript, or observation into a full week of varied content (short posts, long posts, one article idea) in a single pass. Use when batching content instead of writing one piece at a time.\n---\n\n# Weekly Content Batch Planner\n\n## Input\nOne raw source: a transcript, a personal story, an observation, or a rough idea.\n\n## Output Required\n- 3 short posts (1-4 lines each), different angles on the same core idea\n- 2 medium posts (4-8 lines), more developed\n- 1 long-form post or thread\n- 1 article topic suggestion, with a one-line hook\n\n## Rules\n- Every piece must use a different hook style, no repeating the same opening structure twice\n- Pull specific, concrete details from the source material, avoid generic restatements\n- Flag which pieces are strongest for immediate posting vs which need more personal detail added before publishing\n\n## What to Avoid\n- Producing 7 versions of the same sentence reworded slightly\n- Losing the original voice/tone of the source material in the rewrite"
  }
];

function CopyButton({ content, color }: { content: string; color: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border transition-all duration-300 font-montserrat"
      style={
        copied
          ? { backgroundColor: "rgba(22,163,74,0.1)", borderColor: "rgba(22,163,74,0.3)", color: "#16a34a" }
          : { backgroundColor: `${color}08`, borderColor: `${color}20`, color: color }
      }
    >
      {copied ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
          </svg>
          Copy SKILL.md
        </>
      )}
    </button>
  );
}

export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-[#f0eee6] flex flex-col items-center justify-start pt-8 sm:pt-12 md:pt-16 lg:pt-20 px-4 sm:px-8 md:px-16 lg:px-32 pb-24 selection:bg-[#c84b2f]/20 selection:text-[#c84b2f]">

      <nav className="max-w-4xl w-full text-left mb-12 sm:mb-16 md:mb-24 animate-fade-in">
        <ul className="flex items-center gap-4 sm:gap-6 md:gap-8 text-base sm:text-lg md:text-xl font-medium font-sans">
          <li><Link href="/" className="text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">Home</Link></li>
          <li><Link href="/about" className="text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">About</Link></li>
          <li><Link href="/skills" className="text-[#1d1d1f] transition-colors">Skills</Link></li>
        </ul>
      </nav>

      <div className="max-w-4xl w-full text-left animate-fade-in space-y-14">

        {/* Page header */}
        <div className="space-y-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c84b2f] font-montserrat">Claude AI Skills</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-[#1d1d1f] leading-tight">
            Skills I actually use.
          </h1>
          <p className="text-base sm:text-lg text-[#6e6e73] leading-relaxed max-w-2xl">
            Prompt skill files I built for Claude Projects. Each one solves a specific problem I kept running into. Copy any of them into your own Claude project skills folder.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#c84b2f] animate-pulse" />
            <span className="text-xs text-[#6e6e73] font-montserrat font-semibold uppercase tracking-wider">
              Drop into: <code className="normal-case lowercase bg-[#1d1d1f]/8 px-1.5 py-0.5 rounded text-[#1d1d1f]">.claude/skills/</code>
            </span>
          </div>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="group flex flex-col rounded-2xl overflow-hidden bg-white/40 hover:bg-white/70 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-400"
            >
              {/* Card body */}
              <div className="p-6 flex flex-col gap-4 flex-1">

                {/* Number row */}
                <span
                  className="text-[11px] font-black uppercase tracking-widest font-montserrat leading-none text-[#c84b2f]/80"
                >
                  {skill.number}
                </span>

                {/* Title + copy button */}
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-sans font-bold text-[20px] text-[#1d1d1f] tracking-tight leading-snug">
                    {skill.title}
                  </h2>
                  <div className="flex-shrink-0">
                    <CopyButton content={skill.content} color="#c84b2f" />
                  </div>
                </div>

              </div>

              {/* Code preview footer */}
              <div className="border-t border-[#1d1d1f]/6 bg-[#1d1d1f]/3">
                {/* Terminal bar */}
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#1d1d1f]/5">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="text-[10px] text-[#6e6e73]/70 font-mono ml-1">{skill.savePath}</span>
                </div>
                {/* Code snippet */}
                <pre className="text-[11px] leading-[1.7] text-[#6e6e73]/80 font-mono px-5 py-4 overflow-x-auto max-h-32 whitespace-pre-wrap">
                  {skill.content.split("\n").slice(0, 7).join("\n")}
                  {"\n"}<span style={{ color: "rgba(29,29,31,0.25)" }}>... {skill.content.split("\n").length - 7} more lines</span>
                </pre>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#1d1d1f]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <p className="text-sm text-[#6e6e73] max-w-md leading-relaxed">
            These work best inside <strong className="text-[#1d1d1f]">Claude Projects</strong>. Add them so Claude automatically applies the right behavior per task.
          </p>
          <Link
            href="/"
            className="flex-shrink-0 flex items-center gap-2 text-sm font-semibold text-[#c84b2f] hover:gap-3 transition-all duration-200"
          >
            Back home
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/>
              <path d="m12 5 7 7-7 7"/>
            </svg>
          </Link>
        </div>

        <div className="text-center pb-4">
          <p className="text-sm text-[#6e6e73]/80 font-serif italic">
            &quot;You have the right to perform your duty, but not to the fruits of your actions.&quot;
          </p>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />
    </main>
  );
}
