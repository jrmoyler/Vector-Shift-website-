import { VectorShiftLogo } from './VectorShiftLogo'

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

export function Footer() {
  return (
    <footer className="bg-input-bg border-t border-border-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
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
              VS-SITE-<span className="text-text-secondary">v2.4.1</span>
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
