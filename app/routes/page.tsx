'use client'

import { useState } from 'react'
import {
  BarChart2,
  CheckCircle2,
  Cloud,
  Map,
  TrendingUp,
  Wind,
  Zap,
} from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

interface RouteData {
  id: string
  origin: string
  destination: string
  corridor: string
  units: number
  dailyMissions: number
  efficiency: number
  status: 'ACTIVE' | 'WEATHER-HOLD' | 'OPTIMIZING' | 'DEGRADED'
  avgAlt: string
  distance: string
}

const routes: RouteData[] = [
  { id: 'RT-0041', origin: 'SEA', destination: 'PDX', corridor: 'Pacific NW Air Corridor', units: 14, dailyMissions: 42, efficiency: 97.2, status: 'ACTIVE',       avgAlt: '312m', distance: '280 km' },
  { id: 'RT-0022', origin: 'SFO', destination: 'OAK', corridor: 'Bay Area Drone Lane 1', units: 22, dailyMissions: 66, efficiency: 96.8, status: 'ACTIVE',         avgAlt: '180m', distance: '18 km'  },
  { id: 'RT-0073', origin: 'LAX', destination: 'LGB', corridor: 'SoCal Urban Mesh',       units: 18, dailyMissions: 54, efficiency: 95.4, status: 'ACTIVE',         avgAlt: '220m', distance: '32 km'  },
  { id: 'RT-0014', origin: 'DEN', destination: 'BOU', corridor: 'Rockies Express',        units: 8,  dailyMissions: 24, efficiency: 98.1, status: 'ACTIVE',         avgAlt: '394m', distance: '45 km'  },
  { id: 'RT-0088', origin: 'ORD', destination: 'EVA', corridor: 'Midwest Link Alpha',     units: 11, dailyMissions: 33, efficiency: 94.7, status: 'WEATHER-HOLD',   avgAlt: '260m', distance: '22 km'  },
  { id: 'RT-0055', origin: 'ATL', destination: 'BHM', corridor: 'Southeast Express',      units: 9,  dailyMissions: 27, efficiency: 96.1, status: 'ACTIVE',         avgAlt: '340m', distance: '240 km' },
  { id: 'RT-0099', origin: 'MIA', destination: 'FLL', corridor: 'South Florida Drone Ln', units: 16, dailyMissions: 48, efficiency: 97.9, status: 'ACTIVE',         avgAlt: '150m', distance: '45 km'  },
  { id: 'RT-0031', origin: 'PHX', destination: 'TUS', corridor: 'Desert Southwest I',     units: 7,  dailyMissions: 21, efficiency: 93.8, status: 'OPTIMIZING',     avgAlt: '420m', distance: '180 km' },
  { id: 'RT-0067', origin: 'BOS', destination: 'PVD', corridor: 'New England Connector',  units: 6,  dailyMissions: 18, efficiency: 95.2, status: 'ACTIVE',         avgAlt: '290m', distance: '72 km'  },
  { id: 'RT-0043', origin: 'HUB-A', destination: 'GROUND', corridor: 'Urban Ground Mesh', units: 3,  dailyMissions: 12, efficiency: 98.8, status: 'ACTIVE',         avgAlt: '0m',   distance: 'Varies' },
]

const statusConfig = {
  'ACTIVE':       { color: 'text-silver border-silver/40 bg-silver/10' },
  'WEATHER-HOLD': { color: 'text-text-secondary border-border-dark bg-border-dark/60' },
  'OPTIMIZING':   { color: 'text-silver-light border-silver-light/40 bg-silver-light/10' },
  'DEGRADED':     { color: 'text-text-secondary border-border-dark bg-border-dark/60' },
}

function AbstractRouteMap() {
  const nodes = [
    { id: 'SEA', x: 120, y: 80 },
    { id: 'PDX', x: 160, y: 140 },
    { id: 'SFO', x: 80, y: 260 },
    { id: 'OAK', x: 110, y: 280 },
    { id: 'LAX', x: 100, y: 360 },
    { id: 'LGB', x: 135, y: 375 },
    { id: 'PHX', x: 200, y: 360 },
    { id: 'DEN', x: 300, y: 250 },
    { id: 'BOU', x: 290, y: 220 },
    { id: 'ORD', x: 480, y: 180 },
    { id: 'ATL', x: 500, y: 320 },
    { id: 'MIA', x: 530, y: 420 },
    { id: 'BOS', x: 610, y: 120 },
    { id: 'PVD', x: 625, y: 140 },
    { id: 'HUB', x: 350, y: 320 },
  ]

  const edges = [
    ['SEA', 'PDX'], ['SFO', 'OAK'], ['LAX', 'LGB'],
    ['DEN', 'BOU'], ['ORD', 'ATL'], ['MIA', 'BOS'],
    ['BOS', 'PVD'], ['PHX', 'DEN'], ['ATL', 'MIA'],
    ['ORD', 'BOS'], ['SEA', 'SFO'], ['LAX', 'PHX'],
  ]

  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]))

  return (
    <div className="relative w-full aspect-[16/7] bg-void border border-border-dark rounded-card overflow-hidden">
      <div className="absolute inset-0 grid-dot-bg opacity-30" />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 700 460" preserveAspectRatio="xMidYMid meet">
        {/* Route edges */}
        {edges.map(([a, b], i) => {
          const na = nodeMap[a], nb = nodeMap[b]
          if (!na || !nb) return null
          const mx = (na.x + nb.x) / 2
          const my = (na.y + nb.y) / 2 - 30
          return (
            <path
              key={i}
              d={`M${na.x} ${na.y} Q${mx} ${my} ${nb.x} ${nb.y}`}
              stroke="rgba(203,213,225,0.15)"
              strokeWidth="1"
              fill="none"
            />
          )
        })}

        {/* Active route highlight */}
        {[['SEA', 'PDX'], ['SFO', 'OAK'], ['MIA', 'BOS']].map(([a, b], i) => {
          const na = nodeMap[a], nb = nodeMap[b]
          if (!na || !nb) return null
          const mx = (na.x + nb.x) / 2
          const my = (na.y + nb.y) / 2 - 30
          return (
            <path
              key={`hl-${i}`}
              d={`M${na.x} ${na.y} Q${mx} ${my} ${nb.x} ${nb.y}`}
              stroke="rgba(203,213,225,0.45)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="4 3"
            />
          )
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            <circle cx={node.x} cy={node.y} r="5" fill="rgba(203,213,225,0.2)" stroke="rgba(203,213,225,0.4)" strokeWidth="1" />
            <circle cx={node.x} cy={node.y} r="2" fill="#CBD5E1" />
            <text x={node.x + 8} y={node.y + 4} fill="rgba(203,213,225,0.6)" fontSize="8" fontFamily="JetBrains Mono">{node.id}</text>
          </g>
        ))}

        {/* Animated flight dot */}
        <circle r="2.5" fill="#CBD5E1" opacity="0.8">
          <animateMotion dur="6s" repeatCount="indefinite">
            <mpath xlinkHref="#map-path" />
          </animateMotion>
        </circle>
        <path id="map-path" d="M120 80 Q140 110 160 140 Q130 200 80 260 Q95 270 110 280" fill="none" />

        {/* Second dot */}
        <circle r="2" fill="#CBD5E1" opacity="0.5">
          <animateMotion dur="9s" repeatCount="indefinite" begin="3s">
            <mpath xlinkHref="#map-path-2" />
          </animateMotion>
        </circle>
        <path id="map-path-2" d="M480 180 Q490 250 500 320 Q515 370 530 420" fill="none" />
      </svg>

      {/* Map legend */}
      <div className="absolute bottom-4 left-4 flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-px bg-silver/40" />
          <span className="font-mono text-[9px] text-text-secondary">ACTIVE ROUTE</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-px bg-silver/15" />
          <span className="font-mono text-[9px] text-text-secondary">INACTIVE</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-silver/40 border border-silver/40" />
          <span className="font-mono text-[9px] text-text-secondary">WAYPOINT</span>
        </div>
      </div>

      <div className="absolute top-4 right-4 badge-vs text-[10px]">LIVE MAP</div>
    </div>
  )
}

export default function RoutesPage() {
  const [sortBy, setSortBy] = useState<'efficiency' | 'missions'>('missions')

  const sorted = [...routes].sort((a, b) =>
    sortBy === 'efficiency' ? b.efficiency - a.efficiency : b.dailyMissions - a.dailyMissions
  )

  const activeCount = routes.filter((r) => r.status === 'ACTIVE').length
  const totalDailyMissions = routes.reduce((s, r) => s + r.dailyMissions, 0)
  const avgEfficiency = (routes.reduce((s, r) => s + r.efficiency, 0) / routes.length).toFixed(1)

  return (
    <main className="min-h-screen bg-void">
      <Navbar />

      {/* Page hero */}
      <section className="pt-32 pb-12 px-6 md:px-8 bg-void border-b border-border-dark relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 80%, rgba(203,213,225,0.03) 0%, transparent 70%)' }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="font-mono text-xs text-text-secondary tracking-widest uppercase mb-3">Route Intelligence</div>
          <h1 className="font-grotesk font-bold text-4xl md:text-5xl text-text-primary mb-3">Route Command</h1>
          <p className="text-text-secondary text-base max-w-xl">
            Real-time corridor management, weather-aware routing, and adaptive path optimization across all active fleet corridors.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-void border-b border-border-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Active Corridors', value: String(activeCount), icon: Map, sub: 'of ' + routes.length + ' total' },
              { label: 'Daily Missions', value: String(totalDailyMissions), icon: Zap, sub: 'across all routes' },
              { label: 'Avg. Efficiency', value: `${avgEfficiency}%`, icon: TrendingUp, sub: 'route performance' },
              { label: 'Weather Holds', value: String(routes.filter(r => r.status === 'WEATHER-HOLD').length), icon: Cloud, sub: 'corridors paused' },
            ].map(({ label, value, icon: Icon, sub }) => (
              <div key={label} className="card-vs p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-text-secondary text-xs uppercase tracking-widest">{label}</span>
                  <Icon size={14} strokeWidth={1.5} className="text-text-secondary" />
                </div>
                <div className="font-mono text-2xl font-semibold text-silver">{value}</div>
                <div className="text-text-secondary text-[11px] mt-1">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Route map */}
      <section className="py-12 bg-void">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-grotesk font-bold text-2xl text-text-primary">Corridor Map</h2>
            <div className="flex items-center gap-2">
              <div className="pulse-dot scale-75" />
              <span className="font-mono text-xs text-text-secondary">Live positions</span>
            </div>
          </div>
          <AbstractRouteMap />
        </div>
      </section>

      {/* Routes table */}
      <section className="py-12 bg-surface/20 border-t border-border-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-grotesk font-bold text-2xl text-text-primary">Route Directory</h2>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-text-secondary">Sort:</span>
              <div className="flex gap-1">
                {([['missions', 'Daily Vol.'], ['efficiency', 'Efficiency']] as [typeof sortBy, string][]).map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => setSortBy(val)}
                    className={`px-3 py-1 rounded-pill text-xs font-mono transition-all ${
                      sortBy === val ? 'bg-silver text-void' : 'text-text-secondary border border-border-dark hover:border-silver/30'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border-dark rounded-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-dark">
                    {['Route ID', 'Corridor', 'Origin', 'Dest.', 'Units', 'Daily Vol.', 'Efficiency', 'Avg Alt', 'Distance', 'Status'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-mono text-[10px] text-text-secondary uppercase tracking-widest font-medium whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((route, i) => (
                    <tr key={route.id} className={`border-b border-border-dark/50 hover:bg-void/40 transition-colors ${i % 2 === 0 ? '' : 'bg-void/20'}`}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="font-mono text-xs text-silver">{route.id}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-[10px] text-text-secondary whitespace-nowrap">{route.corridor}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs text-text-primary">{route.origin}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs text-text-primary">{route.destination}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs text-text-secondary">{route.units}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs text-silver">{route.dailyMissions}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1 bg-border-dark rounded-full overflow-hidden">
                            <div className="h-full bg-silver rounded-full" style={{ width: `${route.efficiency}%` }} />
                          </div>
                          <span className="font-mono text-xs text-silver whitespace-nowrap">{route.efficiency}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs text-text-secondary">{route.avgAlt}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs text-text-secondary whitespace-nowrap">{route.distance}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`badge-vs text-[10px] ${statusConfig[route.status].color}`}>{route.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Weather integration */}
      <section className="py-12 bg-void border-t border-border-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <h2 className="font-grotesk font-bold text-2xl text-text-primary mb-6">Weather Integration</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card-vs p-6">
              <div className="flex items-center gap-2 mb-4">
                <Cloud size={16} strokeWidth={1.5} className="text-silver" />
                <span className="font-grotesk font-semibold text-sm text-text-primary">METAR Feed</span>
              </div>
              <div className="space-y-3">
                {[
                  { loc: 'SEA', condition: 'OVC 1500, VIS 6SM', ok: true },
                  { loc: 'SFO', condition: 'FEW 3000, VIS 10SM', ok: true },
                  { loc: 'LAX', condition: 'SKC, VIS 10SM', ok: true },
                  { loc: 'ORD', condition: 'BKN 800, VIS 3SM', ok: false },
                  { loc: 'DEN', condition: 'SCT 5000, VIS 9SM', ok: true },
                ].map(({ loc, condition, ok }) => (
                  <div key={loc} className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-mono text-xs text-silver">{loc}</span>
                      <div className="font-mono text-[10px] text-text-secondary mt-0.5">{condition}</div>
                    </div>
                    {ok
                      ? <CheckCircle2 size={12} strokeWidth={1.5} className="text-silver shrink-0 mt-0.5" />
                      : <Wind size={12} strokeWidth={1.5} className="text-text-secondary shrink-0 mt-0.5" />
                    }
                  </div>
                ))}
              </div>
            </div>

            <div className="card-vs p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart2 size={16} strokeWidth={1.5} className="text-silver" />
                <span className="font-grotesk font-semibold text-sm text-text-primary">Route Performance (7d)</span>
              </div>
              <div className="flex items-end gap-1.5 h-24 mb-3">
                {[88, 91, 94, 89, 96, 95, 94].map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-sm"
                      style={{
                        height: `${v}%`,
                        background: i === 6 ? '#CBD5E1' : `rgba(203,213,225,${0.15 + (v / 100) * 0.3})`,
                      }}
                    />
                    <span className="font-mono text-[8px] text-text-secondary">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-[10px] text-text-secondary">7-day avg</span>
                <span className="font-mono text-[10px] text-silver">93.9%</span>
              </div>
            </div>

            <div className="card-vs p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 size={16} strokeWidth={1.5} className="text-silver" />
                <span className="font-grotesk font-semibold text-sm text-text-primary">SIGMET Alerts</span>
              </div>
              <div className="space-y-3">
                {[
                  { id: 'SIGMET C7', region: 'Chicago ARTCC', type: 'Thunderstorms', active: true },
                  { id: 'SIGMET B2', region: 'Denver ARTCC', type: 'Turbulence', active: false },
                  { id: 'SIGMET A4', region: 'Seattle ARTCC', type: 'Icing Potential', active: false },
                ].map(({ id, region, type, active }) => (
                  <div key={id} className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-silver">{id}</span>
                        {active && <span className="badge-vs text-[9px] text-text-secondary">ACTIVE</span>}
                      </div>
                      <div className="font-mono text-[10px] text-text-secondary mt-0.5">{region}</div>
                      <div className="font-mono text-[10px] text-text-secondary">{type}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
