"use client";

import React from "react";
import Image from "next/image";

export default function Skills() {
  return (
    <main className="min-h-screen bg-[#f0eee6] flex flex-col items-center justify-start pt-8 sm:pt-12 md:pt-16 lg:pt-20 px-4 sm:px-8 md:px-16 lg:px-32 pb-16 sm:pb-24 selection:bg-[#c84b2f]/20 selection:text-[#c84b2f]">
      
      {/* Navigation Header */}
      <nav className="max-w-4xl w-full text-left mb-12 sm:mb-16 md:mb-24 animate-fade-in">
        <ul className="flex items-center gap-4 sm:gap-6 md:gap-8 text-base sm:text-lg md:text-xl font-medium font-sans">
          <li>
            <a href="/" className="text-[#6e6e73] hover:text-[#1d1d1f] transition-colors cursor-pointer">Home</a>
          </li>
          <li>
            <a href="/about" className="text-[#6e6e73] hover:text-[#1d1d1f] transition-colors cursor-pointer">About</a>
          </li>
          <li>
            <a href="/skills" className="text-[#1d1d1f] transition-colors cursor-pointer">Skills</a>
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

        {/* Skills Header */}
        <div className="space-y-4 sm:space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-[#1d1d1f] leading-[1.1]">
            My Skills
          </h2>
        </div>

        {/* Skills Content - Tech Stack */}
        <div className="space-y-4">
          <p className="text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-[#c84b2f] font-montserrat">Technical Skills</p>
          <div className="grid grid-cols-4 gap-1 sm:flex sm:flex-wrap sm:items-center sm:gap-3 md:gap-4">
            {[
              { src: "/a1 (1).png", alt: "TypeScript", skill: "TypeScript" },
              { src: "/a1 (2).png", alt: "JavaScript", skill: "JavaScript" },
              { src: "/github1.png", alt: "GitHub New", skill: "GitHub" },
              { src: "/git1.png", alt: "Git New", skill: "Git" },
              { src: "/a1 (3).png", alt: "React", skill: "React" },
              { src: "/a1 (4).png", alt: "Next.js", skill: "Next.js" },
              { src: "/a1 (5).png", alt: "Tailwind CSS", skill: "Tailwind CSS" },
              { src: "/a1 (6).png", alt: "Node.js", skill: "Node.js" },
              { src: "/a1 (7).png", alt: "Git Original", skill: "Git" },
              { src: "/a1 (8).png", alt: "GitHub Original", skill: "GitHub" },
              { src: "/a1 (9).png", alt: "MongoDB", skill: "MongoDB" },
              { src: "/a1 (10).png", alt: "Supabase", skill: "Supabase" },
            ].map((tech) => (
              <div key={tech.alt} className="flex flex-col items-center space-y-2">
                <div className="relative w-16 h-16 sm:w-22 sm:h-22 md:w-24 md:h-24 hover:scale-110 transition-all duration-300 cursor-pointer flex items-center justify-center">
                  <Image src={tech.src} alt={tech.alt} fill sizes="(max-width: 640px) 64px, (max-width: 768px) 88px, 96px" className="object-contain" />
                </div>
                <span className="text-xs text-[#6e6e73] font-medium text-center hidden sm:block">{tech.skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Description */}
        <div className="space-y-6 sm:space-y-8">
          <div className="prose prose-lg max-w-none">
            <p className="font-sans text-sm sm:text-base md:text-lg text-[#1d1d1f] font-normal leading-relaxed opacity-95 mb-6">
              I specialize in full-stack development with a focus on modern web technologies. My expertise spans from frontend frameworks like React and Next.js to backend development with Node.js and database management with MongoDB and Supabase.
            </p>

            <h3 className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-[#1d1d1f] mb-4">Frontend Development</h3>
            <p className="font-sans text-sm sm:text-base md:text-lg text-[#1d1d1f] font-normal leading-relaxed opacity-95 mb-6">
              Proficient in React, Next.js, TypeScript, and modern CSS frameworks like Tailwind CSS. I create responsive, accessible, and performant user interfaces with attention to detail and user experience.
            </p>

            <h3 className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-[#1d1d1f] mb-4">Backend Development</h3>
            <p className="font-sans text-sm sm:text-base md:text-lg text-[#1d1d1f] font-normal leading-relaxed opacity-95 mb-6">
              Experienced with Node.js, API development, and database design. I build scalable backend systems and RESTful APIs that power modern web applications.
            </p>

            <h3 className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-[#1d1d1f] mb-4">Tools & Technologies</h3>
            <p className="font-sans text-sm sm:text-base md:text-lg text-[#1d1d1f] font-normal leading-relaxed opacity-95">
              Comfortable with Git version control, GitHub workflows, MongoDB for database management, and Supabase for rapid development. I continuously learn and adapt to new technologies in the ever-evolving web development landscape.
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
              <a href="/skills" className="text-xs sm:text-sm text-[#6e6e73] hover:text-[#1d1d1f] transition-colors font-medium">Skills</a>
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