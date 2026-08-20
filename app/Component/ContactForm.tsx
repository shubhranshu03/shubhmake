"use client";

import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });

  const [hasContent, setHasContent] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    
    // Check if any field has content
    const hasAnyContent = Object.values(newFormData).some(field => field.trim() !== '');
    setHasContent(hasAnyContent);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleInputChange}
          className="w-full px-4 py-3 sm:py-4 border border-[#1d1d1f]/20 rounded-xl bg-white/50 focus:bg-white focus:border-[#c84b2f] focus:outline-none transition-all duration-300 text-sm sm:text-base"
          required
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-3 sm:py-4 border border-[#1d1d1f]/20 rounded-xl bg-white/50 focus:bg-white focus:border-[#c84b2f] focus:outline-none transition-all duration-300 text-sm sm:text-base"
          required
        />
      </div>
      <div>
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleInputChange}
          rows={5}
          className="w-full px-4 py-3 sm:py-4 border border-[#1d1d1f]/20 rounded-xl bg-white/50 focus:bg-white focus:border-[#c84b2f] focus:outline-none transition-all duration-300 resize-none text-sm sm:text-base"
          required
        />
      </div>
      <button
        type="submit"
        className={`group w-full px-6 py-3 sm:py-4 rounded-xl font-medium text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 font-montserrat ${
          hasContent 
            ? 'bg-[#c84b2f] text-white hover:bg-[#c84b2f]/90' 
            : 'bg-[#1d1d1f]/8 text-[#1d1d1f] hover:bg-[#c84b2f] hover:text-white'
        }`}
      >
        Send Message
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
          <path d="M5 12h14"/>
          <path d="m12 5 7 7-7 7"/>
        </svg>
      </button>
    </form>
  );
}