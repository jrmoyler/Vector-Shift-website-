'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Navigation2,
  Zap,
  Map,
  BarChart2,
  Shield,
  Wind,
  Activity,
  Package,
  ArrowUpRight,
  ChevronRight,
  Radio,
  Cpu,
  Globe,
  AlertCircle,
  CheckCircle2,
  Clock,
  TrendingUp,
  Layers,
  Target,
} from 'lucide-react'

// ─── Logo ───────────────────────────────────────────────────────────────────

function VectorShiftLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const scale = size === 'sm' ? 0.7 : size === 'lg' ? 1.3 : 1
  return (
    <div className="flex items-center gap-3" style={{ transform: `scale(${scale})`, transformOrigin: 'left center' }}>
      {/* Eagle + VS mark */}
      <div className="relative">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          {/* Wing left */}
          <path d="M2 20 Q8 10 16 18 Q10 16 6 22Z" fill="#CBD5E1" opacity="0.9" />
          {/* Wing right */}
          <path d="M38 20 Q32 10 24 18 Q30 16 34 22Z" fill="#CBD5E1" opacity="0.9" />
          {/* Body */}
          <ellipse cx="20" cy="20" rx="8" ry="10" fill="#CBD5E1" opacity="0.15" />
          {/* VS monogram */}
          <text x="20" y="24" textAnchor="middle" fill="#CBD5E1" fontSize="11" fontWeight="700" fontFamily="Space Grotesk">VS</text>
          {/* Eagle head */}
          <circle cx="20" cy="10" r="4" fill="#CBD5E1" opacity="0.9" />
          <path d="M22 10 L25 9 L23 11Z" fill="#CBD5E1" />
          {/* Tail feathers */}
          <path d="M16 28 L20 32 L24 28" stroke="#CBD5E1" strokeWidth="1.5" fill="none" opacity="0.7" />
          {/* Collective AI diamond star ✦ */}
          <text x="35" y="38" textAnchor="middle" fill="#CBD5E1" fontSize="8" opacity="0.8">✦</text>
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-silver font-grotesk font-bold text-lg leading-none tracking-wider">
          VECTOR SHIFT
        </span>
        <span className="text-text-secondary font-mono text-[10px] tracking-[0.2em] uppercase leading-tight">
          Autonomous Logistics / Aerial Mobility
        </span>
      </div>
    </div>
  )
}

// ─── Nav ────────────────────────────────────────────────────────────────────

const navLinks = ['Overview', 'Missions', 'Fleet', 'Routes', 'Analytics']

function Navbar() {
  const [active, setActive] = useState('Overview')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 nav-glass transition-shadow duration-300 ${scrolled ? 'shadow-lg shadow-black/40' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
        <VectorShiftLogo size="sm" />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => setActive(link)}
              className={`relative text-sm font-medium transition-colors duration-200 pb-1 ${
                active === link
                  ? 'text-silver'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {link}
              {active === link && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-silver" />
              )}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button className="btn-ghost text-sm py-2 px-5">Sign In</button>
          <button className="btn-secondary text-sm py-2 px-5">Request Access</button>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2 text-text-secondary hover:text-silver">
          <div className="w-5 h-0.5 bg-current mb-1" />
          <div className="w-5 h-0.5 bg-current mb-1" />
          <div className="w-3 h-0.5 bg-current" />
        </button>
      </div>
    </nav>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function TrajectoryArcs() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1440 800"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Horizontal grid lines */}
      {[150, 300, 450, 600, 750].map((y) => (
        <line key={y} x1="0" y1={y} x2="1440" y2={y} stroke="rgba(203,213,225,0.04)" strokeWidth="1" />
      ))}
      {/* Vertical grid lines */}
      {[180, 360, 540, 720, 900, 1080, 1260].map((x) => (
        <line key={x} x1={x} y1="0" x2={x} y2="800" stroke="rgba(203,213,225,0.04)" strokeWidth="1" />
      ))}
      {/* Trajectory arcs */}
      <path d="M0 600 Q360 100 720 400 Q1080 700 1440 200" className="trajectory-arc" />
      <path d="M0 400 Q480 50 960 350 Q1200 500 1440 300" className="trajectory-arc" strokeOpacity="0.08" />
      <path d="M200 800 Q600 300 1000 500 Q1200 600 1440 400" className="trajectory-arc" strokeOpacity="0.06" />
      {/* Route nodes */}
      {[[150, 520], [420, 210], [720, 398], [1020, 340], [1290, 220]].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="4" fill="rgba(203,213,225,0.15)" />
          <circle cx={cx} cy={cy} r="8" stroke="rgba(203,213,225,0.08)" strokeWidth="1" fill="none" />
        </g>
      ))}
      {/* Animated flight path dot */}
      <circle r="3" fill="#CBD5E1" opacity="0.6">
        <animateMotion dur="8s" repeatCount="indefinite">
          <mpath xlinkHref="#flight-path" />
        </animateMotion>
      </circle>
      <path id="flight-path" d="M0 600 Q360 100 720 400 Q1080 700 1440 200" fill="none" />
    </svg>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-void grid-dot-bg">
      <TrajectoryArcs />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(203,213,225,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Division badge */}
          <div className="inline-flex items-center gap-2 mb-8">
            <span className="badge-vs">A Division of Collective AI Inc. ✦</span>
          </div>

          {/* Headline */}
          <h1 className="font-grotesk font-bold text-5xl md:text-7xl lg:text-8xl text-text-primary leading-[1.05] tracking-tight mb-6">
            Move everything.
            <br />
            <span className="text-silver">Ground and sky.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Autonomous logistics and aerial mobility platform built for scale,
            resilience, and operational superiority.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="btn-primary text-base px-8 py-3 gap-2">
              <Zap size={16} strokeWidth={1.5} />
              Launch Mission
            </button>
            <button className="btn-ghost text-base px-8 py-3 gap-2">
              <Map size={16} strokeWidth={1.5} />
              View Fleet Routing
            </button>
          </div>

          {/* Stat strip */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-border-dark rounded-card overflow-hidden border border-border-dark">
            {[
              { label: 'Active Missions', value: '86', unit: '' },
              { label: 'Deliveries Today', value: '1,248', unit: '' },
              { label: 'Route Efficiency', value: '93.6', unit: '%' },
              { label: 'Fleet Units Online', value: '214', unit: '' },
            ].map(({ label, value, unit }) => (
              <div key={label} className="bg-surface/60 px-6 py-5 text-center">
                <div className="font-mono text-2xl font-semibold text-silver">
                  {value}
                  <span className="text-sm text-text-secondary ml-1">{unit}</span>
                </div>
                <div className="text-text-secondary text-xs mt-1 tracking-wide uppercase">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-void to-transparent pointer-events-none" />
    </section>
  )
}

// ─── Live Telemetry ──────────────────────────────────────────────────────────

const missionFeed = [
  { id: 'VS-DRN-1042', route: 'SEA-04 → PDX-12', status: 'EN ROUTE', alt: '312m', eta: '04:22', cargo: '2.4kg' },
  { id: 'VS-DRN-0887', route: 'SFO-01 → OAK-07', status: 'ON-MISSION', alt: '280m', eta: '02:11', cargo: '1.8kg' },
  { id: 'VS-DRN-1103', route: 'LAX-09 → LGB-03', status: 'ASCENDING', alt: '145m', eta: '06:40', cargo: '3.1kg' },
  { id: 'VS-GRD-0341', route: 'HUB-A → DROP-42', status: 'TRANSIT', alt: '0m', eta: '11:05', cargo: '12.0kg' },
  { id: 'VS-DRN-0992', route: 'DEN-02 → BOU-08', status: 'EN ROUTE', alt: '394m', eta: '03:58', cargo: '0.9kg' },
  { id: 'VS-DRN-1211', route: 'ORD-11 → EVA-06', status: 'HOLDING', alt: '220m', eta: '—', cargo: '2.2kg' },
]

const statusColor: Record<string, string> = {
  'EN ROUTE': 'text-silver border-silver/40 bg-silver/10',
  'ON-MISSION': 'text-silver border-silver/50 bg-silver/15',
  'ASCENDING': 'text-silver-light border-silver-light/40 bg-silver-light/10',
  'TRANSIT': 'text-text-secondary border-border-dark bg-border-dark/60',
  'HOLDING': 'text-text-secondary border-border-dark bg-border-dark/60',
}

function MetricCard({
  label,
  value,
  unit,
  delta,
  icon: Icon,
}: {
  label: string
  value: string
  unit?: string
  delta?: string
  icon: React.ElementType
}) {
  return (
    <div className="card-vs p-6 flex flex-col justify-between gap-4 min-h-[120px]">
      <div className="flex items-start justify-between">
        <span className="text-text-secondary text-xs uppercase tracking-widest">{label}</span>
        <Icon size={16} strokeWidth={1.5} className="text-text-secondary" />
      </div>
      <div>
        <div className="flex items-end gap-1">
          <span className="font-mono text-3xl font-semibold text-text-primary">{value}</span>
          {unit && <span className="text-text-secondary text-sm mb-1">{unit}</span>}
        </div>
        {delta && (
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp size={12} strokeWidth={1.5} className="text-silver" />
            <span className="text-silver text-xs font-mono">{delta}</span>
          </div>
        )}
      </div>
    </div>
  )
}

function SparkLine({ points }: { points: number[] }) {
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const w = 120
  const h = 32
  const coords = points
    .map((p, i) => `${(i / (points.length - 1)) * w},${h - ((p - min) / range) * h}`)
    .join(' ')
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline
        points={coords}
        fill="none"
        stroke="rgba(203,213,225,0.5)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={(points.length - 1) / (points.length - 1) * w}
        cy={h - ((points[points.length - 1] - min) / range) * h}
        r="3"
        fill="#CBD5E1"
      />
    </svg>
  )
}

function LiveTelemetry() {
  const [tick, setTick] = useState(0)
  const [activeMissions, setActiveMissions] = useState(86)
  const historyRef = useRef<number[]>([78, 80, 83, 85, 84, 86, 87, 86])

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1)
      const jitter = Math.floor(Math.random() * 5) - 2
      setActiveMissions((prev) => {
        const next = Math.max(80, Math.min(95, prev + jitter))
        historyRef.current = [...historyRef.current.slice(1), next]
        return next
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-24 bg-void">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="pulse-dot" />
              <span className="font-mono text-xs text-text-secondary tracking-widest uppercase">Live Telemetry</span>
            </div>
            <h2 className="font-grotesk font-bold text-3xl md:text-4xl text-text-primary">
              Dispatch Console
            </h2>
          </div>
          <span className="badge-vs hidden md:inline-flex">
            <span className="font-mono text-[10px]">SYS-UPTIME 99.97%</span>
          </span>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Active missions — live updating */}
          <div className="card-vs p-6 flex flex-col justify-between gap-4 min-h-[120px]">
            <div className="flex items-start justify-between">
              <span className="text-text-secondary text-xs uppercase tracking-widest">Active Missions</span>
              <Activity size={16} strokeWidth={1.5} className="text-text-secondary" />
            </div>
            <div>
              <div className="flex items-end justify-between">
                <div>
                  <span className="font-mono text-3xl font-semibold text-text-primary">{activeMissions}</span>
                </div>
                <SparkLine points={historyRef.current} />
              </div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp size={12} strokeWidth={1.5} className="text-silver" />
                <span className="text-silver text-xs font-mono">+3 last hour</span>
              </div>
            </div>
          </div>

          <MetricCard label="Deliveries Today" value="1,248" delta="+12.4% vs yesterday" icon={Package} />
          <MetricCard label="Route Efficiency" value="93.6" unit="%" delta="+0.8% this week" icon={Target} />
          <MetricCard label="Average Altitude" value="312" unit="m" delta="Optimal band" icon={Wind} />
        </div>

        {/* Wide row: mission feed + mini map */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Mission feed — spans 2 cols */}
          <div className="lg:col-span-2 bg-surface border border-border-dark rounded-card overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-dark">
              <div className="flex items-center gap-2">
                <Radio size={14} strokeWidth={1.5} className="text-silver" />
                <span className="font-grotesk font-semibold text-sm text-text-primary">Mission Feed</span>
              </div>
              <span className="font-mono text-xs text-text-secondary">{new Date().toUTCString().slice(0, 25)} UTC</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-dark">
                    {['Unit ID', 'Route', 'Status', 'Alt', 'ETA', 'Cargo'].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left font-mono text-[10px] text-text-secondary uppercase tracking-widest font-medium"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {missionFeed.map((row, i) => (
                    <tr
                      key={row.id}
                      className={`border-b border-border-dark/50 hover:bg-void/40 transition-colors ${
                        i % 2 === 0 ? '' : 'bg-void/20'
                      }`}
                    >
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs text-silver">{row.id}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs text-text-secondary">{row.route}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`badge-vs text-[10px] ${statusColor[row.status] || ''}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs text-text-secondary">{row.alt}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs text-text-primary">{row.eta}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs text-text-secondary">{row.cargo}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* System status card */}
          <div className="flex flex-col gap-4">
            <div className="card-vs p-6 flex-1">
              <div className="flex items-center gap-2 mb-5">
                <Globe size={14} strokeWidth={1.5} className="text-silver" />
                <span className="font-grotesk font-semibold text-sm text-text-primary">System Status</span>
              </div>
              <div className="space-y-3">
                {[
                  { sys: 'Navigation Core', ok: true },
                  { sys: 'Weather Intel', ok: true },
                  { sys: 'Swarm Coord.', ok: true },
                  { sys: 'Aegis-Hold Gate', ok: true },
                  { sys: 'Ground Uplink', ok: true },
                  { sys: 'Airspace Auth.', ok: false },
                ].map(({ sys, ok }) => (
                  <div key={sys} className="flex items-center justify-between">
                    <span className="text-xs text-text-secondary">{sys}</span>
                    <div className="flex items-center gap-1.5">
                      {ok ? (
                        <CheckCircle2 size={12} strokeWidth={1.5} className="text-silver" />
                      ) : (
                        <AlertCircle size={12} strokeWidth={1.5} className="text-text-secondary" />
                      )}
                      <span className={`font-mono text-[10px] ${ok ? 'text-silver' : 'text-text-secondary'}`}>
                        {ok ? 'NOMINAL' : 'REVIEW'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-vs p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={14} strokeWidth={1.5} className="text-silver" />
                <span className="font-grotesk font-semibold text-sm text-text-primary">Avg. Delivery Time</span>
              </div>
              <div className="font-mono text-4xl font-semibold text-text-primary">
                07:24
                <span className="text-sm text-text-secondary ml-1">min</span>
              </div>
              <div className="mt-2 text-xs text-text-secondary font-mono">
                −1:12 vs 30-day avg
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Capabilities ────────────────────────────────────────────────────────────

const capabilities = [
  {
    icon: Navigation2,
    category: 'Ground Vector Fleet',
    title: 'Autonomous Surface Delivery',
    description:
      'ROS2-powered ground units navigate complex urban environments with SLAM-based localization, real-time obstacle avoidance, and multi-agent path coordination. Zero-emissions, last-mile optimized.',
    specs: [
      { label: 'Nav Stack', value: 'ROS2 Humble' },
      { label: 'Localization', value: 'SLAM / LiDAR' },
      { label: 'Payload', value: '≤ 50 kg' },
      { label: 'Range', value: '120 km / charge' },
    ],
    tags: ['Autonomous', 'Ground', 'SLAM'],
  },
  {
    icon: Wind,
    category: 'Sky Vector Aerial Delivery',
    title: 'FAA-Compliant Drone Fleet',
    description:
      'Purpose-built delivery drones operating under FAA Part 135 certification. Swarm coordination protocols enable concurrent multi-unit dispatches across shared airspace corridors.',
    specs: [
      { label: 'Cert.', value: 'FAA Part 135' },
      { label: 'Altitude Band', value: '150–400m AGL' },
      { label: 'Payload', value: '≤ 5 kg' },
      { label: 'Speed', value: '72 km/h cruise' },
    ],
    tags: ['Aerial', 'Swarm', 'FAA'],
  },
  {
    icon: BarChart2,
    category: 'Route Intelligence',
    title: 'Real-Time Mission Planning',
    description:
      'Adaptive routing engine processes live weather feeds, airspace NOTAMs, traffic density, and energy budgets to continuously optimize mission paths. Weather-aware, latency-hardened.',
    specs: [
      { label: 'Latency', value: '< 40ms reroute' },
      { label: 'Data Feeds', value: 'METAR / SIGMET' },
      { label: 'Optimization', value: 'Multi-objective' },
      { label: 'Uptime', value: '99.97% SLA' },
    ],
    tags: ['AI', 'Weather-Aware', 'Real-Time'],
  },
]

function CapabilityCard({ cap }: { cap: (typeof capabilities)[0] }) {
  const Icon = cap.icon
  return (
    <div className="card-vs p-8 flex flex-col gap-6 group hover:border-silver/40 transition-colors duration-300">
      <div className="flex items-start justify-between">
        <div className="p-3 rounded-card bg-void border border-border-dark group-hover:border-silver/30 transition-colors">
          <Icon size={24} strokeWidth={1.5} className="text-silver" />
        </div>
        <ArrowUpRight
          size={16}
          strokeWidth={1.5}
          className="text-text-secondary group-hover:text-silver transition-colors"
        />
      </div>

      <div>
        <div className="font-mono text-[10px] text-text-secondary uppercase tracking-widest mb-2">
          {cap.category}
        </div>
        <h3 className="font-grotesk font-bold text-xl text-text-primary mb-3">{cap.title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed">{cap.description}</p>
      </div>

      {/* Spec grid */}
      <div className="grid grid-cols-2 gap-3">
        {cap.specs.map(({ label, value }) => (
          <div key={label} className="bg-input-bg/50 rounded-lg px-3 py-2">
            <div className="font-mono text-[10px] text-text-secondary uppercase tracking-widest">{label}</div>
            <div className="font-mono text-xs text-silver mt-0.5">{value}</div>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {cap.tags.map((tag) => (
          <span key={tag} className="badge-vs text-[10px]">{tag}</span>
        ))}
      </div>
    </div>
  )
}

function Capabilities() {
  return (
    <section className="py-24 bg-surface/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="font-mono text-xs text-text-secondary tracking-widest uppercase mb-3">
              Core Capabilities
            </div>
            <h2 className="font-grotesk font-bold text-3xl md:text-4xl text-text-primary">
              The Ecosystem.
              <br />
              <span className="text-silver">Ground. Sky. Intelligence.</span>
            </h2>
          </div>
          <button className="hidden md:flex items-center gap-2 btn-ghost text-sm">
            Full Platform Docs
            <ChevronRight size={14} strokeWidth={1.5} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {capabilities.map((cap) => (
            <CapabilityCard key={cap.category} cap={cap} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Mission Metrics ─────────────────────────────────────────────────────────

function MissionMetrics() {
  const bars = [65, 72, 68, 80, 85, 78, 90, 88, 93, 91, 94, 94]
  const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

  return (
    <section className="py-24 bg-void">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: headline stat block */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div>
              <div className="font-mono text-xs text-text-secondary tracking-widest uppercase mb-3">
                Operational Record
              </div>
              <h2 className="font-grotesk font-bold text-3xl md:text-4xl text-text-primary mb-4">
                Scale without<br />compromise.
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed">
                From first dispatch to fleet-wide deployment — Vector Shift
                delivers precision at any scale, in any environment.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '4.2M+', label: 'Packages Delivered' },
                { value: '99.2%', label: 'On-Time Rate' },
                { value: '128', label: 'Active Routes' },
                { value: '< 0.1%', label: 'Incident Rate' },
              ].map(({ value, label }) => (
                <div key={label} className="card-vs p-5">
                  <div className="font-mono text-2xl font-semibold text-silver">{value}</div>
                  <div className="text-text-secondary text-xs mt-1 tracking-wide">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: bar chart */}
          <div className="lg:col-span-3 card-vs p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="font-mono text-[10px] text-text-secondary uppercase tracking-widest">Route Efficiency</div>
                <div className="font-mono text-2xl font-semibold text-text-primary mt-1">93.6%</div>
              </div>
              <span className="badge-vs">12-Month Trend</span>
            </div>
            {/* Bar chart */}
            <div className="flex items-end gap-2 h-40">
              {bars.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-sm transition-all duration-500"
                    style={{
                      height: `${val}%`,
                      background:
                        i === bars.length - 1
                          ? '#CBD5E1'
                          : `rgba(203,213,225,${0.15 + (val / 100) * 0.25})`,
                    }}
                  />
                  <span className="font-mono text-[9px] text-text-secondary">{months[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Safety rail */}
        <div className="mt-6 flex items-center gap-4 p-4 rounded-card border border-border-dark bg-input-bg/40">
          <Shield size={16} strokeWidth={1.5} className="text-silver shrink-0" />
          <p className="text-text-secondary text-sm">
            <span className="text-silver font-medium">Aegis-Hold Safety Gate</span> — All physical autonomy operations
            are gated through the Aegis-Hold safety system, enforcing pre-flight validation, geofencing compliance,
            and real-time kill-switch authority across the entire fleet.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Tech Stack ───────────────────────────────────────────────────────────────

function TechStack() {
  const stack = [
    { label: 'Navigation', items: ['ROS2 Humble', 'SLAM Toolbox', 'Nav2'] },
    { label: 'Compute', items: ['NVIDIA Jetson', 'Edge TPU', 'ARM Cortex-A'] },
    { label: 'Comms', items: ['5G / LTE-M', 'ADS-B Out', 'Mesh Radio'] },
    { label: 'Intelligence', items: ['Route AI Engine', 'Swarm Coord.', 'Digital Twin'] },
    { label: 'Compliance', items: ['FAA Part 135', 'BVLOS Auth.', 'UTM / UAS'] },
    { label: 'Safety', items: ['Aegis-Hold', 'Geo-Fencing', 'Redundant IMU'] },
  ]

  return (
    <section className="py-24 bg-surface/20 border-y border-border-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <div className="font-mono text-xs text-text-secondary tracking-widest uppercase mb-3">Platform Architecture</div>
          <h2 className="font-grotesk font-bold text-3xl text-text-primary">
            Engineered for the mission.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stack.map(({ label, items }) => (
            <div key={label} className="bg-input-bg border border-border-dark rounded-card p-5">
              <div className="flex items-center gap-1.5 mb-4">
                <Cpu size={12} strokeWidth={1.5} className="text-silver" />
                <span className="font-mono text-[10px] text-silver uppercase tracking-widest">{label}</span>
              </div>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item} className="font-mono text-[11px] text-text-secondary">{item}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────

function CTABanner() {
  return (
    <section className="py-24 bg-void relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(203,213,225,0.05) 0%, transparent 70%)',
        }}
      />
      {/* Diagonal arc */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 400" preserveAspectRatio="xMidYMid slice">
        <path d="M-100 350 Q400 50 900 200 Q1200 300 1600 80" className="trajectory-arc" />
        <path d="M-100 300 Q500 0 1000 180 Q1300 320 1600 100" className="trajectory-arc" strokeOpacity="0.06" />
      </svg>

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-8 text-center">
        <div className="badge-vs mb-6">Operational. Now.</div>
        <h2 className="font-grotesk font-bold text-4xl md:text-5xl text-text-primary mb-6">
          Ready to command<br />
          <span className="text-silver">the full stack?</span>
        </h2>
        <p className="text-text-secondary text-lg mb-10 leading-relaxed">
          Deploy ground and aerial fleets from a single dispatch console.
          Built for operators who demand certainty.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="btn-secondary text-base px-10 py-3">
            Request Demo Access
          </button>
          <button className="btn-primary text-base px-10 py-3">
            View Documentation
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  const cols = [
    {
      heading: 'Platform',
      links: ['Ground Vector Fleet', 'Sky Vector Aerial', 'Route Intelligence', 'Analytics Dashboard', 'API Reference'],
    },
    {
      heading: 'Compliance',
      links: ['FAA Part 135 Cert.', 'BVLOS Authorization', 'Safety Gate (Aegis)', 'Privacy Policy', 'Terms of Use'],
    },
    {
      heading: 'Company',
      links: ['About Vector Shift', 'Collective AI Inc.', 'Careers', 'Press Kit', 'Contact'],
    },
  ]

  return (
    <footer className="bg-input-bg border-t border-border-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <VectorShiftLogo size="sm" />
            <p className="text-text-secondary text-sm mt-4 leading-relaxed max-w-xs">
              Autonomous logistics and aerial mobility platform. Built for
              operational superiority.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <div className="pulse-dot scale-75" />
              <span className="font-mono text-xs text-text-secondary">All systems nominal</span>
            </div>
          </div>

          {/* Link cols */}
          {cols.map(({ heading, links }) => (
            <div key={heading}>
              <div className="font-mono text-[10px] text-text-secondary uppercase tracking-widest mb-4">
                {heading}
              </div>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-text-secondary hover:text-silver transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-border-dark pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-silver text-sm font-semibold">Vector Shift</span>
              <span className="text-text-secondary text-sm">✦ A Division of Collective AI Inc.</span>
            </div>
            <p className="font-mono text-[11px] text-text-secondary leading-relaxed">
              All physical autonomy operates under the Aegis-Hold safety gate.
            </p>
          </div>
          <div className="text-right">
            <div className="font-mono text-[10px] text-border-dark">
              VS-SITE-
              <span className="text-text-secondary">v2.4.1</span>
            </div>
            <p className="font-mono text-[10px] text-text-secondary mt-0.5">
              © {new Date().getFullYear()} Collective AI Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function VectorShiftPage() {
  return (
    <main className="min-h-screen bg-void">
      <Navbar />
      <Hero />
      <LiveTelemetry />
      <Capabilities />
      <MissionMetrics />
      <TechStack />
      <CTABanner />
      <Footer />
    </main>
  )
}
