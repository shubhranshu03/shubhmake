"use client";

import { useState } from 'react'

export default function NewsletterSubscription() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted with email:', email)
    
    if (!email || !email.includes('@')) {
      console.log('Invalid email validation failed')
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    console.log('Setting status to loading')
    setStatus('loading')

    try {
      console.log('Sending request to /api/newsletter')
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)

      if (response.ok) {
        setStatus('success')
        setMessage(data.message)
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Failed to subscribe')
      }
    } catch (error) {
      console.error('Fetch error:', error)
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
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
            disabled={status === 'loading'}
            className="flex-1 px-4 py-3 rounded-xl border border-[#1d1d1f]/20 bg-white/80 backdrop-blur-sm text-[#1d1d1f] placeholder-[#6e6e73] focus:outline-none focus:ring-2 focus:ring-[#c84b2f] focus:border-transparent transition-all duration-200 disabled:opacity-50"
          />
          <button 
            type="submit"
            disabled={status === 'loading'}
            className="bg-[#1d1d1f] hover:bg-[#1d1d1f]/90 disabled:bg-[#1d1d1f]/50 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:transform-none"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        
        {status !== 'idle' && (
          <p className={`text-sm mt-3 ${
            status === 'success' ? 'text-green-600' : 
            status === 'error' ? 'text-red-600' : 'text-[#6e6e73]'
          }`}>
            {message}
          </p>
        )}
        
        {status === 'idle' && (
          <p className="text-xs text-[#6e6e73] mt-3">
            No spam, unsubscribe anytime. Join 0+ builders getting real insights.
          </p>
        )}
      </div>
    </div>
  )
}