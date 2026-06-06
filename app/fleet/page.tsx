'use client'

import { useState } from 'react'
import {
  Activity,
  AlertCircle,
  Battery,
  CheckCircle2,
  Navigation2,
  Settings,
  Wind,
  Zap,
} from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

type FleetStatus = 'EN ROUTE' | 'ON-MISSION' | 'ASCENDING' | 'HOLDING' | 'CHARGING' | 'MAINTENANCE' | 'STANDBY' | 'TRANSIT'

interface FleetUnit {
  id: string
  type: 'Aerial' | 'Ground'
  model: string
  status: FleetStatus
  battery: number
  location: string
  totalMissions: number
  uptime: string
}

const fleetUnits: FleetUnit[] = [
  { id: 'VS-DRN-1042', type: 'Aerial', model: 'Sky Vector SV-7', status: 'EN ROUTE',    battery: 71, location: 'SEA → PDX',   totalMissions: 2847, uptime: '99.4%' },
  { id: 'VS-DRN-0887', type: 'Aerial', model: 'Sky Vector SV-7', status: 'ON-MISSION',  battery: 58, location: 'SFO → OAK',   totalMissions: 3210, uptime: '99.1%' },
  { id: 'VS-DRN-1103', type: 'Aerial', model: 'Sky Vector SV-9', status: 'ASCENDING',   battery: 84, location: 'LAX Corridor', totalMissions: 1442, uptime: '99.7%' },
  { id: 'VS-DRN-0992', type: 'Aerial', model: 'Sky Vector SV-7', status: 'EN ROUTE',    battery: 62, location: 'DEN → BOU',   totalMissions: 2103, uptime: '98.8%' },
  { id: 'VS-DRN-1211', type: 'Aerial', model: 'Sky Vector SV-9', status: 'HOLDING',     battery: 77, location: 'ORD Hold',    totalMissions: 988,  uptime: '99.2%' },
  { id: 'VS-DRN-0744', type: 'Aerial', model: 'Sky Vector SV-7', status: 'CHARGING',    battery: 24, location: 'HUB-A Bay 3', totalMissions: 3891, uptime: '98.6%' },
  { id: 'VS-DRN-0556', type: 'Aerial', model: 'Sky Vector SV-7', status: 'MAINTENANCE', battery: 0,  location: 'HUB-B Svc',  totalMissions: 4122, uptime: '97.9%' },
  { id: 'VS-DRN-1387', type: 'Aerial', model: 'Sky Vector SV-9', status: 'ASCENDING',   battery: 89, location: 'PHX Corridor',totalMissions: 644,  uptime: '99.9%' },
  { id: 'VS-GRD-0341', type: 'Ground', model: 'Ground Vector GV-3', status: 'TRANSIT',  battery: 45, location: 'HUB-A → D42',totalMissions: 1288, uptime: '99.5%' },
  { id: 'VS-GRD-0187', type: 'Ground', model: 'Ground Vector GV-3', status: 'STANDBY',  battery: 100,location: 'HUB-B Dock',  totalMissions: 1047, uptime: '99.8%' },
  { id: 'VS-GRD-0092', type: 'Ground', model: 'Ground Vector GV-5', status: 'CHARGING', battery: 67, location: 'HUB-A Bay 1', totalMissions: 2314, uptime: '99.0%' },
]

const statusConfig: Record<FleetStatus, { label: string; color: string; dot: string }> = {
  'EN ROUTE':    { label: 'En Route',    color: 'text-silver border-silver/40 bg-silver/10',           dot: 'bg-silver' },
  'ON-MISSION':  { label: 'On Mission',  color: 'text-silver border-silver/50 bg-silver/15',           dot: 'bg-silver' },
  'ASCENDING':   { label: 'Ascending',   color: 'text-silver-light border-silver-light/40 bg-silver-light/10', dot: 'bg-silver-light' },
  'HOLDING':     { label: 'Holding',     color: 'text-text-secondary border-border-dark bg-border-dark/60', dot: 'bg-text-secondary' },
  'CHARGING':    { label: 'Charging',    color: 'text-text-secondary border-border-dark bg-border-dark/60', dot: 'bg-text-secondary' },
  'MAINTENANCE': { label: 'Maintenance', color: 'text-text-secondary border-border-dark/60 bg-border-dark/40', dot: 'bg-border-dark' },
  'STANDBY':     { label: 'Standby',     color: 'text-text-secondary border-border-dark bg-border-dark/60', dot: 'bg-text-secondary' },
  'TRANSIT':     { label: 'Transit',     color: 'text-text-secondary border-border-dark bg-border-dark/60', dot: 'bg-text-secondary' },
}

function BatteryBar({ level, showText = false }: { level: number; showText?: boolean }) {
  const color = level > 60 ? 'bg-silver' : level > 25 ? 'bg-silver/60' : 'bg-silver/30'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1 bg-border-dark rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${level}%` }} />
      </div>
      {showText && (
        <span className="font-mono text-[10px] text-text-secondary w-7 shrink-0 text-right">
          {level > 0 ? `${level}%` : '—'}
        </span>
      )}
    </div>
  )
}

function FleetCard({ unit }: { unit: FleetUnit }) {
  const cfg = statusConfig[unit.status]
  const isActive = ['EN ROUTE', 'ON-MISSION', 'ASCENDING', 'TRANSIT'].includes(unit.status)

  return (
    <div className={`card-vs p-5 group hover:border-silver/40 transition-colors duration-200 ${unit.status === 'MAINTENANCE' ? 'opacity-70' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg border ${isActive ? 'border-silver/30 bg-silver/10' : 'border-border-dark bg-input-bg'}`}>
            {unit.type === 'Aerial'
              ? <Wind size={14} strokeWidth={1.5} className={isActive ? 'text-silver' : 'text-text-secondary'} />
              : <Navigation2 size={14} strokeWidth={1.5} className={isActive ? 'text-silver' : 'text-text-secondary'} />
            }
          </div>
          <div>
            <div className="font-mono text-xs text-silver font-medium">{unit.id}</div>
            <div className="font-mono text-[10px] text-text-secondary mt-0.5">{unit.model}</div>
          </div>
        </div>
        <span className={`badge-vs text-[10px] ${cfg.color}`}>{cfg.label}</span>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-xs text-text-secondary">Location</span>
          <span className="font-mono text-xs text-text-primary truncate ml-4 max-w-[140px] text-right">{unit.location}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-text-secondary">Battery</span>
          <div className="flex items-center gap-2 w-28">
            <BatteryBar level={unit.battery} showText />
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-xs text-text-secondary">Missions</span>
          <span className="font-mono text-xs text-silver">{unit.totalMissions.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs text-text-secondary">Uptime</span>
          <span className="font-mono text-xs text-silver">{unit.uptime}</span>
        </div>
      </div>
    </div>
  )
}

type ViewFilter = 'All' | 'Aerial' | 'Ground'

export default function FleetPage() {
  const [view, setView] = useState<ViewFilter>('All')

  const displayed = view === 'All' ? fleetUnits : fleetUnits.filter((u) => u.type === view)
  const operational = fleetUnits.filter((u) => !['MAINTENANCE', 'CHARGING'].includes(u.status)).length
  const charging = fleetUnits.filter((u) => u.status === 'CHARGING').length
  const maintenance = fleetUnits.filter((u) => u.status === 'MAINTENANCE').length

  return (
    <main className="min-h-screen bg-void">
      <Navbar />

      {/* Page hero */}
      <section className="pt-32 pb-12 px-6 md:px-8 bg-void border-b border-border-dark relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 70% 50%, rgba(203,213,225,0.03) 0%, transparent 70%)' }}
        />
        <div className="max-w-7xl mx-auto relative z-10 flex items-end justify-between">
          <div>
            <div className="font-mono text-xs text-text-secondary tracking-widest uppercase mb-3">Fleet Command</div>
            <h1 className="font-grotesk font-bold text-4xl md:text-5xl text-text-primary mb-3">Fleet Registry</h1>
            <p className="text-text-secondary text-base max-w-xl">
              Complete view of all active, standby, and maintenance units across the Sky Vector and Ground Vector fleets.
            </p>
          </div>
          <div className="hidden md:flex flex-col items-end gap-1">
            <span className="font-mono text-3xl font-semibold text-silver">{fleetUnits.length}</span>
            <span className="font-mono text-xs text-text-secondary uppercase tracking-widest">Total Units</span>
          </div>
        </div>
      </section>

      {/* Summary cards */}
      <section className="py-8 bg-void border-b border-border-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Fleet', value: fleetUnits.length, icon: Activity, sub: 'registered units' },
              { label: 'Operational', value: operational, icon: CheckCircle2, sub: 'currently active' },
              { label: 'Charging', value: charging, icon: Zap, sub: 'in bay' },
              { label: 'Maintenance', value: maintenance, icon: Settings, sub: 'servicing' },
            ].map(({ label, value, icon: Icon, sub }) => (
              <div key={label} className="card-vs p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-text-secondary text-xs uppercase tracking-widest">{label}</span>
                  <Icon size={14} strokeWidth={1.5} className="text-text-secondary" />
                </div>
                <div className="font-mono text-3xl font-semibold text-silver">{value}</div>
                <div className="text-text-secondary text-[11px] mt-1">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet grid */}
      <section className="py-12 bg-void">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-grotesk font-bold text-2xl text-text-primary">Unit Directory</h2>
            <div className="flex gap-1">
              {(['All', 'Aerial', 'Ground'] as ViewFilter[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-4 py-1.5 rounded-pill text-xs font-mono font-medium transition-all ${
                    view === v
                      ? 'bg-silver text-void'
                      : 'text-text-secondary border border-border-dark hover:border-silver/30 hover:text-text-primary'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayed.map((unit) => <FleetCard key={unit.id} unit={unit} />)}
          </div>
        </div>
      </section>

      {/* Fleet health */}
      <section className="py-12 bg-surface/20 border-y border-border-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <h2 className="font-grotesk font-bold text-2xl text-text-primary mb-6">Fleet Health Aggregate</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Battery distribution */}
            <div className="card-vs p-6">
              <div className="flex items-center gap-2 mb-5">
                <Battery size={16} strokeWidth={1.5} className="text-silver" />
                <span className="font-grotesk font-semibold text-sm text-text-primary">Battery State Distribution</span>
              </div>
              <div className="space-y-3">
                {fleetUnits.filter(u => u.battery > 0).map((u) => (
                  <div key={u.id} className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-text-secondary w-28 shrink-0">{u.id}</span>
                    <BatteryBar level={u.battery} />
                    <span className="font-mono text-[10px] text-silver w-8 text-right shrink-0">{u.battery}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Uptime leaderboard */}
            <div className="card-vs p-6">
              <div className="flex items-center gap-2 mb-5">
                <Activity size={16} strokeWidth={1.5} className="text-silver" />
                <span className="font-grotesk font-semibold text-sm text-text-primary">Mission Uptime Leaderboard</span>
              </div>
              <div className="space-y-3">
                {[...fleetUnits]
                  .sort((a, b) => b.totalMissions - a.totalMissions)
                  .slice(0, 8)
                  .map((u, i) => (
                    <div key={u.id} className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-border-dark w-4 shrink-0">#{i + 1}</span>
                      <span className="font-mono text-[10px] text-text-secondary w-28 shrink-0">{u.id}</span>
                      <div className="flex-1 h-1 bg-border-dark rounded-full overflow-hidden">
                        <div
                          className="h-full bg-silver rounded-full"
                          style={{ width: `${(u.totalMissions / 4200) * 100}%` }}
                        />
                      </div>
                      <span className="font-mono text-[10px] text-silver w-12 text-right shrink-0">
                        {u.totalMissions.toLocaleString()}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Maintenance alert */}
          <div className="mt-4 flex items-center gap-4 p-4 rounded-card border border-border-dark bg-input-bg/40">
            <AlertCircle size={16} strokeWidth={1.5} className="text-text-secondary shrink-0" />
            <p className="text-text-secondary text-sm">
              <span className="text-silver font-medium">VS-DRN-0556</span> is currently under scheduled maintenance at HUB-B. Estimated return to service in <span className="text-silver font-medium">4 hours</span>. All Aegis-Hold certifications verified.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
