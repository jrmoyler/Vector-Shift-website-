export function VectorShiftLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const scale = size === 'sm' ? 0.7 : size === 'lg' ? 1.3 : 1
  return (
    <div
      className="flex items-center gap-3"
      style={{ transform: `scale(${scale})`, transformOrigin: 'left center' }}
    >
      <div className="relative">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M2 20 Q8 10 16 18 Q10 16 6 22Z" fill="#CBD5E1" opacity="0.9" />
          <path d="M38 20 Q32 10 24 18 Q30 16 34 22Z" fill="#CBD5E1" opacity="0.9" />
          <ellipse cx="20" cy="20" rx="8" ry="10" fill="#CBD5E1" opacity="0.15" />
          <text x="20" y="24" textAnchor="middle" fill="#CBD5E1" fontSize="11" fontWeight="700" fontFamily="Space Grotesk">VS</text>
          <circle cx="20" cy="10" r="4" fill="#CBD5E1" opacity="0.9" />
          <path d="M22 10 L25 9 L23 11Z" fill="#CBD5E1" />
          <path d="M16 28 L20 32 L24 28" stroke="#CBD5E1" strokeWidth="1.5" fill="none" opacity="0.7" />
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
