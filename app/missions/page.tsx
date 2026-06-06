'use client'

import { useState, useEffect } from 'react'
import {
  Activity,
  CheckCircle2,
  Clock,
  Filter,
  Package,
  Radio,
  Target,
  TrendingUp,
  Wind,
  Navigation2,
  AlertCircle,
} from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

const allMissions = [
  { id: 'VS-DRN-1042', type: 'Aerial', route: 'SEA-04 → PDX-12', status: 'EN ROUTE', alt: '312m', eta: '04:22', cargo: '2.4 kg', operator: 'AUTO', priority: 'STD' },
  { id: 'VS-DRN-0887', type: 'Aerial', route: 'SFO-01 → OAK-07', status: 'ON-MISSION', alt: '280m', eta: '02:11', cargo: '1.8 kg', operator: 'AUTO', priority: 'PRI' },
  { id: 'VS-DRN-1103', type: 'Aerial', route: 'LAX-09 → LGB-03', status: 'ASCENDING', alt: '145m', eta: '06:40', cargo: '3.1 kg', operator: 'AUTO', priority: 'STD' },
  { id: 'VS-GRD-0341', type: 'Ground', route: 'HUB-A → DROP-42', status: 'TRANSIT', alt: '0m', eta: '11:05', cargo: '12.0 kg', operator: 'AUTO', priority: 'STD' },
  { id: 'VS-DRN-0992', type: 'Aerial', route: 'DEN-02 → BOU-08', status: 'EN ROUTE', alt: '394m', eta: '03:58', cargo: '0.9 kg', operator: 'AUTO', priority: 'STD' },
  { id: 'VS-DRN-1211', type: 'Aerial', route: 'ORD-11 → EVA-06', status: 'HOLDING', alt: '220m', eta: '—', cargo: '2.2 kg', operator: 'MANUAL', priority: 'STD' },
  { id: 'VS-GRD-0187', type: 'Ground', route: 'HUB-B → DROP-17', status: 'TRANSIT', alt: '0m', eta: '08:30', cargo: '8.5 kg', operator: 'AUTO', priority: 'STD' },
  { id: 'VS-DRN-0744', type: 'Aerial', route: 'ATL-03 → BHM-01', status: 'EN ROUTE', alt: '360m', eta: '07:14', cargo: '1.2 kg', operator: 'AUTO', priority: 'PRI' },
  { id: 'VS-DRN-1387', type: 'Aerial', route: 'PHX-05 → TUS-02', status: 'ASCENDING', alt: '180m', eta: '09:50', cargo: '2.8 kg', operator: 'AUTO', priority: 'STD' },
  { id: 'VS-GRD-0092', type: 'Ground', route: 'HUB-A → DROP-61', status: 'TRANSIT', alt: '0m', eta: '14:20', cargo: '22.0 kg', operator: 'AUTO', priority: 'BULK' },
  { id: 'VS-DRN-0563', type: 'Aerial', route: 'BOS-02 → PVD-04', status: 'EN ROUTE', alt: '290m', eta: '05:33', cargo: '1.5 kg', operator: 'AUTO', priority: 'STD' },
  { id: 'VS-DRN-1098', type: 'Aerial', route: 'MIA-07 → FLL-03', status: 'ON-MISSION', alt: '175m', eta: '01:47', cargo: '0.7 kg', operator: 'AUTO', priority: 'PRI' },
]

const statusColor: Record<string, string> = {
  'EN ROUTE':   'text-silver border-silver/40 bg-silver/10',
  'ON-MISSION': 'text-silver border-silver/50 bg-silver/15',
  'ASCENDING':  'text-silver-light border-silver-light/40 bg-silver-light/10',
  'TRANSIT':    'text-text-secondary border-border-dark bg-border-dark/60',
  'HOLDING':    'text-text-secondary border-border-dark bg-border-dark/60',
}

const priorityColor: Record<string, string> = {
  'PRI':  'text-silver border-silver/40 bg-silver/10',
  'STD':  'text-text-secondary border-border-dark bg-border-dark/40',
  'BULK': 'text-text-secondary border-border-dark bg-border-dark/40',
}

type FilterType = 'All' | 'Aerial' | 'Ground'

export default function MissionsPage() {
  const [filter, setFilter] = useState<FilterType>('All')
  const [activeMissions, setActiveMissions] = useState(86)

  useEffect(() => {
    const interval = setInterval(() => {
      const jitter = Math.floor(Math.random() * 5) - 2
      setActiveMissions((prev) => Math.max(80, Math.min(95, prev + jitter)))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const filtered = filter === 'All' ? allMissions : allMissions.filter((m) => m.type === filter)

  const aerialCount = allMissions.filter((m) => m.type === 'Aerial').length
  const groundCount = allMissions.filter((m) => m.type === 'Ground').length

  const stats = [
    { label: 'Active Missions', value: String(activeMissions), icon: Activity, delta: '+3 last hour' },
    { label: 'Completed Today', value: '1,248', icon: CheckCircle2, delta: '+12.4%' },
    { label: 'Avg. ETA', value: '06:18', icon: Clock, delta: 'min' },
    { label: 'Fleet Utilization', value: '87.3', icon: Target, delta: '% efficiency' },
  ]

  return (
    <main className="min-h-screen bg-void">
      <Navbar />

      {/* Page hero */}
      <section className="pt-32 pb-12 px-6 md:px-8 bg-void border-b border-border-dark relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 30% 50%, rgba(203,213,225,0.03) 0%, transparent 70%)' }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="pulse-dot" />
            <span className="font-mono text-xs text-text-secondary tracking-widest uppercase">Live Ops</span>
          </div>
          <h1 className="font-grotesk font-bold text-4xl md:text-5xl text-text-primary mb-3">
            Mission Control
          </h1>
          <p className="text-text-secondary text-base max-w-xl">
            Real-time oversight of all active dispatch operations across ground and aerial fleet units.
          </p>
        </div>
      </section>

      {/* Stats row */}
      <section className="py-8 bg-void border-b border-border-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map(({ label, value, icon: Icon, delta }) => (
              <div key={label} className="card-vs p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-text-secondary text-xs uppercase tracking-widest">{label}</span>
                  <Icon size={14} strokeWidth={1.5} className="text-text-secondary" />
                </div>
                <div className="font-mono text-2xl font-semibold text-text-primary">{value}</div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp size={10} strokeWidth={1.5} className="text-silver" />
                  <span className="font-mono text-[10px] text-silver">{delta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission feed */}
      <section className="py-12 bg-void">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {/* Filter bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Filter size={14} strokeWidth={1.5} className="text-text-secondary" />
              <div className="flex gap-1">
                {(['All', 'Aerial', 'Ground'] as FilterType[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-1.5 rounded-pill text-xs font-mono font-medium transition-all ${
                      filter === f
                        ? 'bg-silver text-void'
                        : 'text-text-secondary border border-border-dark hover:border-silver/30 hover:text-text-primary'
                    }`}
                  >
                    {f}
                    {f === 'Aerial' && <span className="ml-1 opacity-60">{aerialCount}</span>}
                    {f === 'Ground' && <span className="ml-1 opacity-60">{groundCount}</span>}
                  </button>
                ))}
              </div>
            </div>
            <span className="font-mono text-xs text-text-secondary hidden md:block">
              {filtered.length} missions displayed
            </span>
          </div>

          {/* Table */}
          <div className="bg-surface border border-border-dark rounded-card overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-dark">
              <div className="flex items-center gap-2">
                <Radio size={14} strokeWidth={1.5} className="text-silver" />
                <span className="font-grotesk font-semibold text-sm text-text-primary">Active Mission Feed</span>
              </div>
              <span className="badge-vs text-[10px]">LIVE</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-dark">
                    {['Unit ID', 'Type', 'Route', 'Status', 'Priority', 'Alt', 'ETA', 'Cargo', 'Operator'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-mono text-[10px] text-text-secondary uppercase tracking-widest font-medium whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row, i) => (
                    <tr key={row.id} className={`border-b border-border-dark/50 hover:bg-void/40 transition-colors cursor-pointer ${i % 2 === 0 ? '' : 'bg-void/20'}`}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="font-mono text-xs text-silver">{row.id}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          {row.type === 'Aerial'
                            ? <Wind size={11} strokeWidth={1.5} className="text-text-secondary" />
                            : <Navigation2 size={11} strokeWidth={1.5} className="text-text-secondary" />
                          }
                          <span className="font-mono text-[10px] text-text-secondary">{row.type}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="font-mono text-xs text-text-secondary">{row.route}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`badge-vs text-[10px] ${statusColor[row.status] || ''}`}>{row.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`badge-vs text-[10px] ${priorityColor[row.priority] || ''}`}>{row.priority}</span>
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
                      <td className="px-4 py-3">
                        <span className="font-mono text-[10px] text-text-secondary">{row.operator}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Mission type breakdown */}
      <section className="py-12 bg-surface/20 border-y border-border-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <h2 className="font-grotesk font-bold text-2xl text-text-primary mb-6">Mission Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Aerial */}
            <div className="card-vs p-6">
              <div className="flex items-center gap-2 mb-4">
                <Wind size={16} strokeWidth={1.5} className="text-silver" />
                <span className="font-grotesk font-semibold text-sm text-text-primary">Aerial Fleet</span>
              </div>
              <div className="font-mono text-3xl font-semibold text-silver mb-2">{aerialCount}</div>
              <div className="text-text-secondary text-xs mb-4">active drone missions</div>
              <div className="space-y-2">
                {[
                  { label: 'En Route', count: allMissions.filter(m => m.type === 'Aerial' && m.status === 'EN ROUTE').length },
                  { label: 'On Mission', count: allMissions.filter(m => m.type === 'Aerial' && m.status === 'ON-MISSION').length },
                  { label: 'Ascending', count: allMissions.filter(m => m.type === 'Aerial' && m.status === 'ASCENDING').length },
                  { label: 'Holding', count: allMissions.filter(m => m.type === 'Aerial' && m.status === 'HOLDING').length },
                ].map(({ label, count }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-text-secondary text-xs">{label}</span>
                    <span className="font-mono text-xs text-silver">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ground */}
            <div className="card-vs p-6">
              <div className="flex items-center gap-2 mb-4">
                <Navigation2 size={16} strokeWidth={1.5} className="text-silver" />
                <span className="font-grotesk font-semibold text-sm text-text-primary">Ground Fleet</span>
              </div>
              <div className="font-mono text-3xl font-semibold text-silver mb-2">{groundCount}</div>
              <div className="text-text-secondary text-xs mb-4">active ground missions</div>
              <div className="space-y-2">
                {[
                  { label: 'In Transit', count: allMissions.filter(m => m.type === 'Ground' && m.status === 'TRANSIT').length },
                  { label: 'Standby', count: 1 },
                  { label: 'Loading', count: 0 },
                  { label: 'Returning', count: 0 },
                ].map(({ label, count }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-text-secondary text-xs">{label}</span>
                    <span className="font-mono text-xs text-silver">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* System health */}
            <div className="card-vs p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity size={16} strokeWidth={1.5} className="text-silver" />
                <span className="font-grotesk font-semibold text-sm text-text-primary">System Health</span>
              </div>
              <div className="space-y-3">
                {[
                  { sys: 'Aegis-Hold Gate', ok: true },
                  { sys: 'Navigation Core', ok: true },
                  { sys: 'Swarm Coordinator', ok: true },
                  { sys: 'Weather Intel Feed', ok: true },
                  { sys: 'Airspace Auth.', ok: false },
                  { sys: 'Ground Uplink', ok: true },
                ].map(({ sys, ok }) => (
                  <div key={sys} className="flex items-center justify-between">
                    <span className="text-xs text-text-secondary">{sys}</span>
                    <div className="flex items-center gap-1.5">
                      {ok
                        ? <CheckCircle2 size={12} strokeWidth={1.5} className="text-silver" />
                        : <AlertCircle size={12} strokeWidth={1.5} className="text-text-secondary" />
                      }
                      <span className={`font-mono text-[10px] ${ok ? 'text-silver' : 'text-text-secondary'}`}>
                        {ok ? 'OK' : 'REVIEW'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Completed missions log */}
      <section className="py-12 bg-void">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-grotesk font-bold text-2xl text-text-primary">Recent Completions</h2>
            <span className="font-mono text-xs text-text-secondary">Last 6 completed</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: 'VS-DRN-0904', route: 'SEA → PDX', duration: '08:14', weight: '2.1 kg', time: '14:22 UTC' },
              { id: 'VS-GRD-0201', route: 'HUB-A → DROP-38', duration: '22:45', weight: '18.4 kg', time: '14:18 UTC' },
              { id: 'VS-DRN-0731', route: 'LAX → LGB', duration: '06:07', weight: '1.4 kg', time: '14:11 UTC' },
              { id: 'VS-DRN-1044', route: 'SFO → OAK', duration: '04:52', weight: '0.8 kg', time: '14:05 UTC' },
              { id: 'VS-DRN-0819', route: 'DEN → BOU', duration: '09:23', weight: '2.9 kg', time: '13:58 UTC' },
              { id: 'VS-GRD-0088', route: 'HUB-B → DROP-11', duration: '19:34', weight: '11.2 kg', time: '13:51 UTC' },
            ].map(({ id, route, duration, weight, time }) => (
              <div key={id} className="bg-surface/40 border border-border-dark rounded-card p-4 flex items-center gap-4">
                <div className="p-2 bg-silver/10 rounded-lg shrink-0">
                  <Package size={16} strokeWidth={1.5} className="text-silver" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs text-silver">{id}</span>
                    <span className="font-mono text-[10px] text-text-secondary">{time}</span>
                  </div>
                  <div className="font-mono text-[10px] text-text-secondary truncate">{route}</div>
                  <div className="flex gap-3 mt-1">
                    <span className="font-mono text-[10px] text-text-secondary">{duration} min</span>
                    <span className="font-mono text-[10px] text-text-secondary">{weight}</span>
                  </div>
                </div>
                <CheckCircle2 size={14} strokeWidth={1.5} className="text-silver shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
