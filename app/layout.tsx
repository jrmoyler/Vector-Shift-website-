import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vector Shift — Autonomous Logistics & Aerial Mobility',
  description:
    'Move everything. Ground and sky. Autonomous logistics and aerial mobility platform built for scale, resilience, and operational superiority. A division of Collective AI Inc.',
  keywords: ['autonomous logistics', 'aerial mobility', 'drone delivery', 'fleet routing', 'Vector Shift'],
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
      </head>
      <body className="bg-void text-text-primary font-grotesk antialiased">
        {children}
      </body>
    </html>
  )
}
