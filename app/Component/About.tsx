"use client";

import React from "react";
import Image from "next/image";

export default function About() {
  return (
    <main className="min-h-screen bg-[#f0eee6] flex flex-col items-center justify-start pt-8 sm:pt-12 md:pt-16 lg:pt-20 px-4 sm:px-8 md:px-16 lg:px-32 pb-16 sm:pb-24 selection:bg-[#c84b2f]/20 selection:text-[#c84b2f]">
      
      {/* Navigation Header */}
      <nav className="max-w-4xl w-full text-left mb-12 sm:mb-16 md:mb-24 animate-fade-in">
        <ul className="flex items-center gap-4 sm:gap-6 md:gap-8 text-base sm:text-lg md:text-xl font-medium font-sans">
          <li>
            <a href="/" className="text-[#6e6e73] hover:text-[#1d1d1f] transition-colors cursor-pointer">Home</a>
          </li>
          <li>
            <a href="/about" className="text-[#1d1d1f] transition-colors cursor-pointer">About</a>
          </li>
          <li>
            <a href="#" className="text-[#6e6e73] hover:text-[#1d1d1f] transition-colors cursor-pointer">Components</a>
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
              Hey, I'm Shubhranshu.
            </h1>
            <p className="font-sans text-sm sm:text-base md:text-lg text-[#6e6e73] font-normal mt-2">
              Full Stack Developer
            </p>
          </div>
        </div>

        {/* About Me Header */}
        <div className="space-y-4 sm:space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-[#1d1d1f] leading-[1.1]">
            About Me
          </h2>
        </div>

        {/* About Content */}
        <div className="space-y-6 sm:space-y-8">
          <div className="prose prose-lg max-w-none">
            <p className="font-sans text-sm sm:text-base md:text-lg text-[#1d1d1f] font-normal leading-relaxed opacity-95 mb-6">
              I'm Shubhranshu. Indian, born and raised in a small family, in a small village, where I did all my early schooling.
            </p>

            <p className="font-sans text-sm sm:text-base md:text-lg text-[#1d1d1f] font-normal leading-relaxed opacity-95 mb-6">
              I wasn't the student anyone pointed to as the smart one. I wasn't the one anyone worried about either. Just decent. Quiet. Genuinely shy, the kind of shy where I'd rather stay unnoticed in the back of a classroom than raise my hand for anything.
            </p>

            <p className="font-sans text-sm sm:text-base md:text-lg text-[#1d1d1f] font-normal leading-relaxed opacity-95 mb-6">
              In 2019, I passed my 10th with 70 percent. Nothing special, nothing to be ashamed of either. Around that time I had one clear goal: I wanted to become a doctor. I planned to take science in 12th and chase that path seriously.
            </p>

            <p className="font-sans text-sm sm:text-base md:text-lg text-[#1d1d1f] font-normal leading-relaxed opacity-95 mb-6">
              It didn't work out that way. For reasons outside my control, that door closed before I could really walk through it. So I ended up joining a diploma in Electrical Engineering instead, a path I hadn't chosen so much as landed in.
            </p>

            <p className="font-sans text-sm sm:text-base md:text-lg text-[#1d1d1f] font-normal leading-relaxed opacity-95 mb-6">
              I was the same quiet, shy student there too. Not brilliant, not struggling, just someone showing up, studying enough to pass, without any real spark attached to it.
            </p>

            <p className="font-sans text-sm sm:text-base md:text-lg text-[#1d1d1f] font-normal leading-relaxed opacity-95 mb-6">
              Then something small happened in my 4th semester that quietly changed everything.
            </p>

            <p className="font-sans text-sm sm:text-base md:text-lg text-[#1d1d1f] font-normal leading-relaxed opacity-95 mb-6">
              I was sitting with a friend from the Computer Science branch while he worked on his assignment. I leaned over, curious, and watched him write code on his laptop. I didn't understand a single line of it. But something about watching that screen, watching logic turn into something that actually worked, pulled at me in a way nothing academic ever had.
            </p>

            <p className="font-sans text-sm sm:text-base md:text-lg text-[#1d1d1f] font-normal leading-relaxed opacity-95 mb-6">
              I couldn't explain it then. I still find it hard to fully explain now. I just knew I wanted to understand how it worked.
            </p>

            <p className="font-sans text-sm sm:text-base md:text-lg text-[#1d1d1f] font-normal leading-relaxed opacity-95 mb-6">
              That curiosity took over completely. Every night after that I was on YouTube, watching coding videos, two or three hours at a time, not really learning in any structured way, just watching, absorbing, letting that curious feeling sit in my chest because it genuinely felt good. Looking back, most of that time wasn't productive in any measurable sense. But it was the first time in my life something pulled me in without anyone telling me to pay attention.
            </p>

            <p className="font-sans text-sm sm:text-base md:text-lg text-[#1d1d1f] font-normal leading-relaxed opacity-95 mb-6">
              By the time I finished my diploma, my mind was made up. I wanted to study Computer Science for my B.Tech. That decision came with a cost I hadn't fully thought through: because I'd already decided to switch fields, I didn't attend any of the placement drives during my final year of Electrical Engineering. I'd mentally already left that path behind.
            </p>

            <p className="font-sans text-sm sm:text-base md:text-lg text-[#1d1d1f] font-normal leading-relaxed opacity-95 mb-6">
              When I told my parents I wanted to pursue Computer Science, they said no. Not out of unkindness, but out of concern, the practical, protective kind of concern parents have when they've watched you head in one direction your entire life and suddenly announce you're changing course. They tried to guide me toward something more familiar, something safer.
            </p>

            <p className="font-sans text-sm sm:text-base md:text-lg text-[#1d1d1f] font-normal leading-relaxed opacity-95 mb-6">
              I understood where they were coming from. I also knew, quietly and firmly, that I had a different plan for my own life. So I made the decision anyway, and enrolled in B.Tech Computer Science.
            </p>

            <p className="font-sans text-sm sm:text-base md:text-lg text-[#1d1d1f] font-normal leading-relaxed opacity-95 mb-6">
              I bought my first laptop around that time. And for the first few months, I made the same mistake most beginners make. I watched three, four hours of coding videos a day and barely wrote a single line of real code myself. It took me longer than I'd like to admit to realize that watching wasn't the same as learning.
            </p>

            <p className="font-sans text-sm sm:text-base md:text-lg text-[#1d1d1f] font-normal leading-relaxed opacity-95 mb-6">
              Once that clicked, everything changed. I gave myself a month to properly learn HTML and CSS, no shortcuts, and actually built simple web pages with what I learned instead of just consuming more videos. From there I built an actual routine: going to college during the day, coming back and practicing web development, solving two to three DSA problems every single day, for five to six months straight, studying five to six hours daily on top of college itself.
            </p>

            <p className="font-sans text-sm sm:text-base md:text-lg text-[#1d1d1f] font-normal leading-relaxed opacity-95 mb-6">
              Then placements came. I was studying at a tier 3 college, the kind where only a couple of companies show up to recruit each year, not the kind with dozens of opportunities lined up. Only two companies came that year. I didn't clear either one.
            </p>

            <p className="font-sans text-sm sm:text-base md:text-lg text-[#1d1d1f] font-normal leading-relaxed opacity-95 mb-6">
              I won't pretend that didn't hurt. It did. I remember feeling genuinely emotional about it, wondering if everything I'd been doing actually meant anything.
            </p>

            <p className="font-sans text-sm sm:text-base md:text-lg text-[#1d1d1f] font-normal leading-relaxed opacity-95 mb-6">
              I didn't stop. I started applying directly, LinkedIn, Naukri, anywhere I could submit a resume. Silence, for close to two months. No interview calls, nothing. Then, finally, one came through. I interviewed, and I cracked a role as a Full Stack Developer.
            </p>

            <p className="font-sans text-sm sm:text-base md:text-lg text-[#1d1d1f] font-normal leading-relaxed opacity-95 mb-6">
              That job taught me more in a short amount of time than years of self-study ever could. Learning from senior developers, working inside a real production codebase, understanding how an actual project comes together under real constraints, that kind of learning is simply different from anything you can get watching tutorials alone.
            </p>

            <p className="font-sans text-sm sm:text-base md:text-lg text-[#1d1d1f] font-normal leading-relaxed opacity-95 mb-6">
              Alongside that job, in whatever spare time I had, I started building small tools just to satisfy my own curiosity. Nothing polished, nothing meant for anyone else. Just things I wanted to see work. And every time one of them actually worked, I felt something click that I hadn't felt since that day watching my friend code back in diploma.
            </p>

            <p className="font-sans text-sm sm:text-base md:text-lg text-[#1d1d1f] font-normal leading-relaxed opacity-95 mb-6">
              That's when I realized building wasn't just a skill I'd picked up. It was the thing I actually loved doing.
            </p>

            <p className="font-sans text-sm sm:text-base md:text-lg text-[#1d1d1f] font-normal leading-relaxed opacity-95 mb-6">
              So I stepped fully into what I now think of as my builder era. Since then I've built more than 20 projects. Most of them failed. Some never got past the first version. A few never got users at all. But every single one taught me something the successful ones alone never could have, and I'm still very much in that process today, still building, still failing sometimes, still learning from each attempt.
            </p>

            <p className="font-sans text-sm sm:text-base md:text-lg text-[#1d1d1f] font-normal leading-relaxed opacity-95 mb-6">
              If you're wondering what I actually want out of all this, it's simple. I want to become a genuinely good person, someone worth trusting and worth knowing. I want real peace in my life, not just the appearance of having things together. And yes, honestly, I want to build enough that money stops being something I have to worry about every month.
            </p>

            <p className="font-sans text-sm sm:text-base md:text-lg text-[#1d1d1f] font-normal leading-relaxed opacity-95">
              That's my story so far. Still being written, one project, one failure, one small win at a time.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-12 sm:pt-16 border-t border-[#1d1d1f]/10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-8">
          {/* Copyright and Navigation */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8">
            <p className="text-xs sm:text-sm text-[#6e6e73] font-medium">© 2026 Shubhranshu.</p>
            <nav className="flex items-center gap-4 sm:gap-6">
              <a href="/about" className="text-xs sm:text-sm text-[#6e6e73] hover:text-[#1d1d1f] transition-colors font-medium">About</a>
              <a href="#" className="text-xs sm:text-sm text-[#6e6e73] hover:text-[#1d1d1f] transition-colors font-medium">Services</a>
              <a href="#" className="text-xs sm:text-sm text-[#6e6e73] hover:text-[#1d1d1f] transition-colors font-medium">Components</a>
            </nav>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* X Profile */}
            <a
              href="https://x.com/shubhranshu2009"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
              title="X Profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>
              </svg>
            </a>

            {/* Email */}
            <a
              href="mailto:shubhranshukhatua@gmail.com"
              className="text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
              title="Email Me"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg>
            </a>
          </div>
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