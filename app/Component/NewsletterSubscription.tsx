"use client";

import { useState } from 'react'

export default function NewsletterSubscription() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-2xl p-6 sm:p-8 border border-[#1d1d1f]/10 mt-8">
        <p className="text-[#1d1d1f] font-medium text-lg">✅ We received your email!</p>
        <p className="text-[#6e6e73] text-sm mt-1">Thanks for subscribing. You&apos;ll hear from us soon.</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl p-6 sm:p-8 border border-[#1d1d1f]/10 mt-8">
      <div className="max-w-2xl">
        <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#1d1d1f] mb-2">
          Get behind-the-scenes insights from my building journey
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mt-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email..."
            required
            className="flex-1 px-4 py-3 rounded-xl border border-[#1d1d1f]/20 bg-white/80 backdrop-blur-sm text-[#1d1d1f] placeholder-[#6e6e73] focus:outline-none focus:ring-2 focus:ring-[#c84b2f] focus:border-transparent transition-all duration-200"
          />
          <button
            type="submit"
            className="bg-[#1d1d1f] hover:bg-[#1d1d1f]/90 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            Subscribe
          </button>
        </form>

        <p className="text-xs text-[#6e6e73] mt-3">
          No spam, unsubscribe anytime.
        </p>
      </div>
    </div>
  )
}
