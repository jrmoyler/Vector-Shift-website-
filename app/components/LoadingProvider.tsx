'use client'

import { useState, useEffect, ReactNode } from 'react'
import { LoadingScreen } from './LoadingScreen'

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [showLoader, setShowLoader] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)

  useEffect(() => {
    const alreadyLoaded = sessionStorage.getItem('vs-site-loaded')
    if (alreadyLoaded) {
      setContentVisible(true)
    } else {
      setShowLoader(true)
    }
  }, [])

  const handleLoadComplete = () => {
    sessionStorage.setItem('vs-site-loaded', '1')
    setShowLoader(false)
    setContentVisible(true)
  }

  return (
    <>
      {showLoader && <LoadingScreen onComplete={handleLoadComplete} />}
      <div
        style={{
          opacity: contentVisible ? 1 : 0,
          transition: contentVisible ? 'opacity 0.35s ease' : 'none',
        }}
      >
        {children}
      </div>
    </>
  )
}
