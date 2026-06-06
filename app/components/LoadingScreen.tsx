'use client'

import { useState, useEffect } from 'react'

interface LoadingScreenProps {
  onComplete: () => void
}

const STATUS_SEQUENCE = [
  'INITIALIZING DISPATCH SYSTEM...',
  'ESTABLISHING TELEMETRY LINK...',
  'LOADING FLEET CONFIGURATION...',
  'CALIBRATING ROUTE INTELLIGENCE...',
  'AEGIS-HOLD GATE ACTIVE...',
  'VECTOR SHIFT READY.',
]

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [statusIndex, setStatusIndex] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const DURATION = 2400

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const remaining = 100 - prev
        const increment = remaining * 0.07 + 0.4
        return Math.min(prev + increment, 97)
      })
    }, 40)

    const statusTimer = setInterval(() => {
      setStatusIndex((i) => Math.min(i + 1, STATUS_SEQUENCE.length - 1))
    }, DURATION / STATUS_SEQUENCE.length)

    const completeTimer = setTimeout(() => {
      setProgress(100)
      setStatusIndex(STATUS_SEQUENCE.length - 1)
      clearInterval(progressTimer)
      clearInterval(statusTimer)

      setTimeout(() => {
        setExiting(true)
        setTimeout(onComplete, 700)
      }, 280)
    }, DURATION)

    return () => {
      clearInterval(progressTimer)
      clearInterval(statusTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div
      className="loading-screen"
      style={{
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'scale(1.03)' : 'scale(1)',
        transition: 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: exiting ? 'none' : 'all',
      }}
      aria-label="Loading Vector Shift"
      role="status"
    >
      {/* Grid dot background */}
      <div className="absolute inset-0 grid-dot-bg opacity-40" />

      {/* Horizontal scan line */}
      <div className="loading-scan-line" />

      {/* Corner brackets */}
      <div className="loading-corner loading-corner--tl" />
      <div className="loading-corner loading-corner--tr" />
      <div className="loading-corner loading-corner--bl" />
      <div className="loading-corner loading-corner--br" />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center px-8">
        {/* Eagle Logo — large */}
        <div className="loading-logo mb-6">
          <svg width="96" height="96" viewBox="0 0 40 40" fill="none">
            <path d="M2 20 Q8 10 16 18 Q10 16 6 22Z" fill="#CBD5E1" opacity="0.9" />
            <path d="M38 20 Q32 10 24 18 Q30 16 34 22Z" fill="#CBD5E1" opacity="0.9" />
            <ellipse cx="20" cy="20" rx="8" ry="10" fill="#CBD5E1" opacity="0.12" />
            <text x="20" y="24" textAnchor="middle" fill="#CBD5E1" fontSize="11" fontWeight="700" fontFamily="Space Grotesk">VS</text>
            <circle cx="20" cy="10" r="4" fill="#CBD5E1" opacity="0.9" />
            <path d="M22 10 L25 9 L23 11Z" fill="#CBD5E1" />
            <path d="M16 28 L20 32 L24 28" stroke="#CBD5E1" strokeWidth="1.5" fill="none" opacity="0.7" />
            <text x="35" y="38" textAnchor="middle" fill="#CBD5E1" fontSize="8" opacity="0.7">✦</text>
          </svg>
        </div>

        {/* Brand name */}
        <div className="loading-text text-center mb-2">
          <div
            className="font-grotesk font-bold text-silver"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', letterSpacing: '0.18em' }}
          >
            VECTOR SHIFT
          </div>
        </div>

        <div className="loading-subtitle font-mono text-text-secondary text-xs tracking-[0.22em] uppercase mb-10">
          Autonomous Logistics / Aerial Mobility
        </div>

        {/* Progress bar */}
        <div className="loading-progress w-64 sm:w-80">
          <div className="relative h-px bg-border-dark overflow-hidden rounded-full">
            <div
              className="absolute inset-y-0 left-0 bg-silver rounded-full"
              style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
            />
            {/* Shimmer */}
            <div
              className="absolute inset-y-0 w-8 loading-shimmer"
              style={{ left: `${progress - 4}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-3">
            <span className="font-mono text-[10px] text-text-secondary tracking-wider">
              {STATUS_SEQUENCE[statusIndex]}
            </span>
            <span className="font-mono text-[11px] text-silver font-medium">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 h-px w-40 bg-border-dark loading-divider" />

        {/* Division mark */}
        <div className="loading-badge font-mono text-[10px] text-text-secondary tracking-[0.2em] uppercase mt-4">
          A Division of Collective AI Inc. ✦
        </div>
      </div>
    </div>
  )
}
