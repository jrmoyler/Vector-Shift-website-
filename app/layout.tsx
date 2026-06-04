import type { Metadata } from 'next'
import './globals.css'
import { LoadingProvider } from './components/LoadingProvider'

export const metadata: Metadata = {
  title: 'Vector Shift — Autonomous Logistics & Aerial Mobility',
  description:
    'Move everything. Ground and sky. Autonomous logistics and aerial mobility platform built for scale, resilience, and operational superiority. A division of Collective AI Inc.',
  keywords: ['autonomous logistics', 'aerial mobility', 'drone delivery', 'fleet routing', 'Vector Shift'],
  icons: {
    icon: '/assets/vector-shift-emblem.svg',
  },
  openGraph: {
    title: 'Vector Shift — Autonomous Logistics & Aerial Mobility',
    description: 'A Collective AI Inc. division for autonomous logistics, aerial mobility, fleet routing, and mission command.',
    images: ['/assets/drone-logistics-panel.svg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-void text-text-primary font-grotesk antialiased">
        <LoadingProvider>
          {children}
        </LoadingProvider>
      </body>
    </html>
  )
}
