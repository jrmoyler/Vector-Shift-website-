'use client'

import { useState } from 'react'
import {
  Activity,
  BarChart2,
  CheckCircle2,
  Package,
  Target,
  TrendingUp,
  Wind,
  Navigation2,
  AlertCircle,
  Clock,
} from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

function ProgressGauge({ value, max = 100, label }: { value: number; max?: number; label: string }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-xs text-text-secondary">{label}</span>
        <span className="font-mono text-xs text-silver">{value}{max === 100 ? '%' : ''}</span>
      </div>
      <div className="h-1.5 bg-border-dark rounded-full overflow-hidden">
        <div
          className="h-full bg-silver rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<'7d' | '30d' | '12m'>('12m')

  const monthlyData = {
    '12m': {
      labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      deliveries: [31200, 34800, 33100, 41600, 46200, 42800, 52400, 50900, 58700, 56100, 61300, 62400],
      efficiency: [82, 84, 81, 87, 90, 86, 92, 91, 94, 93, 95, 94],
    },
    '30d': {
      labels: ['W1', 'W2', 'W3', 'W4'],
      deliveries: [14200, 15800, 16100, 16300],
      efficiency: [93, 94, 95, 94],
    },
    '7d': {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      deliveries: [2100, 2340, 2280, 2510, 2430, 1920, 1820],
      efficiency: [93, 95, 94, 96, 95, 92, 91],
    },
  }

  const data = monthlyData[period]
  const maxDel = Math.max(...data.deliveries)

  const kpis = [
    { label: 'Total Deliveries', value: '4.2M+', sub: 'all time', icon: Package, trend: '+18% YoY' },
    { label: 'On-Time Rate', value: '99.2%', sub: 'SLA compliance', icon: CheckCircle2, trend: '+0.4% MoM' },
    { label: 'Fleet Utilization', value: '87.3%', sub: 'average active', icon: Activity, trend: '+2.1% WoW' },
    { label: 'Avg. Delivery Time', value: '07:24', sub: 'minutes', icon: Clock, trend: '−1:12 vs avg' },
  ]

  const topRoutes = [
    { id: 'RT-0022', name: 'SFO → OAK', missions: 66, efficiency: 96.8, trend: '+1.2%' },
    { id: 'RT-0099', name: 'MIA → FLL', missions: 48, efficiency: 97.9, trend: '+0.8%' },
    { id: 'RT-0041', name: 'SEA → PDX', missions: 42, efficiency: 97.2, trend: '+0.4%' },
    { id: 'RT-0073', name: 'LAX → LGB', missions: 54, efficiency: 95.4, trend: '+1.6%' },
    { id: 'RT-0014', name: 'DEN → BOU', missions: 24, efficiency: 98.1, trend: '+0.2%' },
  ]

  const incidentLog = [
    { id: 'INC-2847', date: '2026-06-03', unit: 'VS-DRN-1211', type: 'Weather Hold', resolved: true, duration: '42 min' },
    { id: 'INC-2841', date: '2026-06-02', unit: 'VS-DRN-0556', type: 'Maintenance Req.', resolved: false, duration: 'Ongoing' },
    { id: 'INC-2839', date: '2026-06-01', unit: 'VS-GRD-0341', type: 'Route Deviation', resolved: true, duration: '8 min' },
    { id: 'INC-2834', date: '2026-05-31', unit: 'VS-DRN-0744', type: 'Battery Warning', resolved: true, duration: '3 min' },
  ]

  return (
    <main className="min-h-screen bg-void">
      <Navbar />

      {/* Page hero */}
      <section className="pt-32 pb-12 px-6 md:px-8 bg-void border-b border-border-dark relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 60% 40%, rgba(203,213,225,0.03) 0%, transparent 70%)' }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="font-mono text-xs text-text-secondary tracking-widest uppercase mb-3">Operational Intelligence</div>
          <h1 className="font-grotesk font-bold text-4xl md:text-5xl text-text-primary mb-3">Analytics</h1>
          <p className="text-text-secondary text-base max-w-xl">
            Comprehensive performance intelligence across fleet operations, route efficiency, and system health.
          </p>
        </div>
      </section>

      {/* KPI cards */}
      <section className="py-8 bg-void border-b border-border-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map(({ label, value, sub, icon: Icon, trend }) => (
              <div key={label} className="card-vs p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-text-secondary text-xs uppercase tracking-widest">{label}</span>
                  <Icon size={14} strokeWidth={1.5} className="text-text-secondary" />
                </div>
                <div className="font-mono text-2xl md:text-3xl font-semibold text-silver leading-none">{value}</div>
                <div className="text-text-secondary text-[11px] mt-1">{sub}</div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp size={10} strokeWidth={1.5} className="text-silver" />
                  <span className="font-mono text-[10px] text-silver">{trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charts section */}
      <section className="py-12 bg-void">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-grotesk font-bold text-2xl text-text-primary">Delivery Volume</h2>
            <div className="flex gap-1">
              {(['7d', '30d', '12m'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1.5 rounded-pill text-xs font-mono transition-all ${
                    period === p ? 'bg-silver text-void' : 'text-text-secondary border border-border-dark hover:border-silver/30'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main delivery chart */}
            <div className="lg:col-span-2 card-vs p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="font-mono text-[10px] text-text-secondary uppercase tracking-widest">Total Deliveries</div>
                  <div className="font-mono text-2xl font-semibold text-text-primary mt-1">
                    {period === '12m' ? '557,500' : period === '30d' ? '62,400' : '15,400'}
                  </div>
                </div>
                <span className="badge-vs">{period === '12m' ? '12-Month' : period === '30d' ? '30-Day' : '7-Day'}</span>
              </div>
              <div className="flex items-end gap-2" style={{ height: '160px' }}>
                {data.deliveries.map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                    <div
                      className="w-full rounded-sm transition-all duration-500"
                      style={{
                        height: `${(val / maxDel) * 140}px`,
                        background: i === data.deliveries.length - 1
                          ? '#CBD5E1'
                          : `rgba(203,213,225,${0.12 + (val / maxDel) * 0.3})`,
                      }}
                    />
                    <span className="font-mono text-[9px] text-text-secondary">{data.labels[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Efficiency chart */}
            <div className="card-vs p-6">
              <div className="mb-6">
                <div className="font-mono text-[10px] text-text-secondary uppercase tracking-widest">Route Efficiency</div>
                <div className="font-mono text-2xl font-semibold text-text-primary mt-1">
                  {data.efficiency[data.efficiency.length - 1]}%
                </div>
              </div>
              <div className="flex items-end gap-1.5" style={{ height: '100px' }}>
                {data.efficiency.map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                    <div
                      className="w-full rounded-sm transition-all duration-500"
                      style={{
                        height: `${((val - 75) / 25) * 90}px`,
                        background: i === data.efficiency.length - 1
                          ? '#CBD5E1'
                          : `rgba(203,213,225,${0.2 + ((val - 75) / 25) * 0.35})`,
                      }}
                    />
                    <span className="font-mono text-[8px] text-text-secondary">{data.labels[i]}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-3">
                <ProgressGauge value={93.6} label="Current Period" />
                <ProgressGauge value={91.4} label="Prior Period" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet type breakdown + top routes */}
      <section className="py-12 bg-surface/20 border-y border-border-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Fleet performance breakdown */}
            <div className="card-vs p-6">
              <div className="flex items-center gap-2 mb-6">
                <BarChart2 size={16} strokeWidth={1.5} className="text-silver" />
                <span className="font-grotesk font-semibold text-sm text-text-primary">Performance by Fleet Type</span>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Wind size={14} strokeWidth={1.5} className="text-silver" />
                    <span className="font-mono text-xs text-silver uppercase tracking-widest">Sky Vector (Aerial)</span>
                  </div>
                  <div className="space-y-2.5">
                    <ProgressGauge value={94.2} label="On-Time Rate" />
                    <ProgressGauge value={89.1} label="Fleet Utilization" />
                    <ProgressGauge value={97.4} label="Mission Success Rate" />
                    <ProgressGauge value={312} max={400} label="Avg Altitude (m)" />
                  </div>
                </div>

                <div className="h-px bg-border-dark" />

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Navigation2 size={14} strokeWidth={1.5} className="text-silver" />
                    <span className="font-mono text-xs text-silver uppercase tracking-widest">Ground Vector</span>
                  </div>
                  <div className="space-y-2.5">
                    <ProgressGauge value={98.8} label="On-Time Rate" />
                    <ProgressGauge value={82.4} label="Fleet Utilization" />
                    <ProgressGauge value={99.2} label="Mission Success Rate" />
                    <ProgressGauge value={43} max={50} label="Avg Payload Load (kg)" />
                  </div>
                </div>
              </div>
            </div>

            {/* Top routes */}
            <div className="card-vs p-6">
              <div className="flex items-center gap-2 mb-6">
                <Target size={16} strokeWidth={1.5} className="text-silver" />
                <span className="font-grotesk font-semibold text-sm text-text-primary">Top Performing Routes</span>
              </div>
              <div className="space-y-4">
                {topRoutes.map((route, i) => (
                  <div key={route.id} className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-border-dark w-4 shrink-0">#{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-text-secondary">{route.id}</span>
                          <span className="font-mono text-xs text-text-primary">{route.name}</span>
                        </div>
                        <span className="font-mono text-[10px] text-silver">{route.missions} /day</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-border-dark rounded-full overflow-hidden">
                          <div className="h-full bg-silver rounded-full" style={{ width: `${route.efficiency}%` }} />
                        </div>
                        <span className="font-mono text-[10px] text-silver w-10 text-right shrink-0">{route.efficiency}%</span>
                        <span className="font-mono text-[10px] text-text-secondary w-10 shrink-0">{route.trend}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Fleet split donut (simplified bar) */}
              <div className="mt-6 pt-4 border-t border-border-dark">
                <div className="font-mono text-[10px] text-text-secondary uppercase tracking-widest mb-3">Mission Type Split</div>
                <div className="flex rounded-full overflow-hidden h-3">
                  <div className="bg-silver" style={{ width: '74%' }} title="Aerial 74%" />
                  <div className="bg-silver/30" style={{ width: '26%' }} title="Ground 26%" />
                </div>
                <div className="flex justify-between mt-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-silver" />
                    <span className="font-mono text-[10px] text-text-secondary">Aerial 74%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-silver/30" />
                    <span className="font-mono text-[10px] text-text-secondary">Ground 26%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Incident log */}
      <section className="py-12 bg-void">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-grotesk font-bold text-2xl text-text-primary">Incident Log</h2>
            <span className="badge-vs text-[10px]">&lt; 0.1% incident rate</span>
          </div>
          <div className="bg-surface border border-border-dark rounded-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-dark">
                    {['Incident ID', 'Date', 'Unit', 'Type', 'Duration', 'Status'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-mono text-[10px] text-text-secondary uppercase tracking-widest font-medium whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {incidentLog.map((inc, i) => (
                    <tr key={inc.id} className={`border-b border-border-dark/50 ${i % 2 === 0 ? '' : 'bg-void/20'}`}>
                      <td className="px-4 py-3"><span className="font-mono text-xs text-silver">{inc.id}</span></td>
                      <td className="px-4 py-3"><span className="font-mono text-xs text-text-secondary">{inc.date}</span></td>
                      <td className="px-4 py-3"><span className="font-mono text-xs text-text-primary">{inc.unit}</span></td>
                      <td className="px-4 py-3"><span className="font-mono text-xs text-text-secondary">{inc.type}</span></td>
                      <td className="px-4 py-3"><span className="font-mono text-xs text-text-secondary">{inc.duration}</span></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          {inc.resolved
                            ? <CheckCircle2 size={12} strokeWidth={1.5} className="text-silver" />
                            : <AlertCircle size={12} strokeWidth={1.5} className="text-text-secondary" />
                          }
                          <span className={`font-mono text-[10px] ${inc.resolved ? 'text-silver' : 'text-text-secondary'}`}>
                            {inc.resolved ? 'RESOLVED' : 'OPEN'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary strip */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Total Incidents (30d)', value: '14', icon: AlertCircle },
              { label: 'Avg. Resolution Time', value: '18 min', icon: Clock },
              { label: 'Open Incidents', value: '1', icon: Activity },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-input-bg/40 border border-border-dark rounded-card px-5 py-4 flex items-center justify-between">
                <div>
                  <div className="text-text-secondary text-xs mb-1">{label}</div>
                  <div className="font-mono text-xl font-semibold text-silver">{value}</div>
                </div>
                <Icon size={16} strokeWidth={1.5} className="text-text-secondary" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
