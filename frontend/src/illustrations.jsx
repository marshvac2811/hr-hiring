// Original flat-design HR illustrations (no external/stock images —
// keeps the app fast, licence-free, and independent of hotlinked assets).

export function ManagerInterview() {
  return (
    <svg viewBox="0 0 500 200" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="roomG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="100%" stopColor="#eff6ff" />
        </linearGradient>
      </defs>
      <rect width="500" height="200" rx="16" fill="url(#roomG)" />

      {/* table */}
      <rect x="130" y="140" width="240" height="12" rx="4" fill="#cbd5e1" />
      <rect x="150" y="152" width="8" height="28" fill="#94a3b8" />
      <rect x="342" y="152" width="8" height="28" fill="#94a3b8" />

      {/* manager (interviewer) - seated, blazer */}
      <circle cx="180" cy="100" r="26" fill="#fcd34d" />
      <circle cx="180" cy="90" r="13" fill="#78350f" />
      <rect x="150" y="112" width="60" height="34" rx="10" fill="#1e3a8a" />
      <rect x="168" y="112" width="24" height="30" fill="#f1f5f9" />
      {/* clipboard */}
      <rect x="158" y="130" width="26" height="18" rx="2" fill="#f8fafc" stroke="#94a3b8" />
      <line x1="162" y1="135" x2="180" y2="135" stroke="#64748b" strokeWidth="1.4" />
      <line x1="162" y1="140" x2="176" y2="140" stroke="#64748b" strokeWidth="1.4" />

      {/* candidate - across the table */}
      <circle cx="320" cy="100" r="26" fill="#93c5fd" />
      <circle cx="320" cy="90" r="13" fill="#1e293b" />
      <rect x="290" y="112" width="60" height="34" rx="10" fill="#047857" />

      {/* speech bubble = active conversation */}
      <path d="M245 55 h50 a8 8 0 0 1 8 8 v14 a8 8 0 0 1 -8 8 h-18 l-8 10 v-10 h-24 a8 8 0 0 1 -8 -8 v-14 a8 8 0 0 1 8 -8 z" fill="#ffffff" stroke="#c7d2fe" />
      <circle cx="258" cy="70" r="2.4" fill="#818cf8" />
      <circle cx="270" cy="70" r="2.4" fill="#818cf8" />
      <circle cx="282" cy="70" r="2.4" fill="#818cf8" />

      {/* window light */}
      <rect x="20" y="20" width="60" height="90" rx="4" fill="#bfdbfe" opacity="0.5" />
    </svg>
  );
}

export function ManagerSection() {
  return (
    <svg viewBox="0 0 400 130" width="100%" height="120" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="130" rx="16" fill="#fdf4ff" />
      <circle cx="100" cy="60" r="30" fill="#f0abfc" />
      <circle cx="100" cy="48" r="14" fill="#701a75" />
      <rect x="68" y="82" width="64" height="36" rx="14" fill="#a21caf" />
      <rect x="82" y="82" width="8" height="18" fill="#fbcfe8" />
      {/* badge/tie icon = "manager" */}
      <rect x="95" y="90" width="10" height="16" rx="2" fill="#facc15" />

      <text x="160" y="55" fontSize="15" fontWeight="700" fill="#701a75" fontFamily="sans-serif">Hiring Managers</text>
      <text x="160" y="78" fontSize="12" fill="#a21caf" fontFamily="sans-serif">Review candidates &amp; run interviews</text>
      <text x="160" y="98" fontSize="12" fill="#a21caf" fontFamily="sans-serif">directly from the pipeline board</text>
    </svg>
  );
}

export function HeroOffice() {
  return (
    <svg viewBox="0 0 500 200" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e0e7ff" />
          <stop offset="100%" stopColor="#eef2ff" />
        </linearGradient>
      </defs>
      <rect width="500" height="200" rx="16" fill="url(#skyG)" />

      {/* window */}
      <rect x="20" y="20" width="120" height="80" rx="6" fill="#c7d2fe" opacity="0.5" />
      <line x1="80" y1="20" x2="80" y2="100" stroke="#a5b4fc" strokeWidth="3" />
      <line x1="20" y1="60" x2="140" y2="60" stroke="#a5b4fc" strokeWidth="3" />

      {/* desk */}
      <rect x="150" y="150" width="320" height="10" rx="3" fill="#d1d5db" />
      <rect x="170" y="120" width="120" height="30" rx="4" fill="#f9fafb" stroke="#d1d5db" />
      <rect x="182" y="128" width="96" height="14" rx="2" fill="#93c5fd" />
      <rect x="160" y="160" width="6" height="30" fill="#9ca3af" />
      <rect x="284" y="160" width="6" height="30" fill="#9ca3af" />

      {/* laptop */}
      <rect x="330" y="118" width="70" height="34" rx="4" fill="#fff" stroke="#d1d5db" />
      <rect x="336" y="124" width="58" height="22" fill="#4338ca" />

      {/* person at desk */}
      <circle cx="220" cy="95" r="20" fill="#fbbf24" />
      <circle cx="220" cy="88" r="10" fill="#78350f" />
      <rect x="196" y="100" width="48" height="24" rx="12" fill="#1d4ed8" />

      {/* second person standing */}
      <circle cx="440" cy="105" r="18" fill="#f87171" />
      <circle cx="440" cy="96" r="9" fill="#7c2d12" />
      <rect x="420" y="112" width="40" height="42" rx="16" fill="#047857" />

      {/* plant */}
      <rect x="460" y="150" width="16" height="20" rx="3" fill="#a16207" />
      <circle cx="468" cy="140" r="14" fill="#4ade80" />
    </svg>
  );
}

export function EmptyDesk() {
  return (
    <svg viewBox="0 0 200 150" width="180" height="135" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="110" width="170" height="8" rx="3" fill="#e5e7eb" />
      <rect x="30" y="65" width="140" height="46" rx="5" fill="#f9fafb" stroke="#d1d5db" />
      <rect x="42" y="74" width="45" height="28" rx="2" fill="#e0e7ff" />
      <path d="M60 74 h9 M60 82 h20 M60 90 h14" stroke="#a5b4fc" strokeWidth="2" strokeLinecap="round" />
      <circle cx="140" cy="88" r="12" fill="#fde68a" />
      <path d="M134 88 l4 4 l8 -8" stroke="#b45309" strokeWidth="2" fill="none" strokeLinecap="round" />
      <rect x="20" y="118" width="8" height="28" fill="#d1d5db" />
      <rect x="172" y="118" width="8" height="28" fill="#d1d5db" />
      <circle cx="100" cy="35" r="16" fill="#e5e7eb" />
      <path d="M92 35 h16 M96 30 v10" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Handshake() {
  return (
    <svg viewBox="0 0 400 140" width="100%" height="130" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="140" rx="16" fill="#fef3c7" />

      <circle cx="140" cy="60" r="28" fill="#fca5a5" />
      <circle cx="140" cy="48" r="14" fill="#7f1d1d" />
      <rect x="108" y="85" width="64" height="40" rx="18" fill="#b91c1c" />

      <circle cx="260" cy="60" r="28" fill="#93c5fd" />
      <circle cx="260" cy="48" r="14" fill="#1e3a8a" />
      <rect x="228" y="85" width="64" height="40" rx="18" fill="#1d4ed8" />

      {/* clasped hands */}
      <path d="M160 100 q40 -18 80 0" stroke="#78350f" strokeWidth="10" fill="none" strokeLinecap="round" />
      <circle cx="200" cy="94" r="9" fill="#fde68a" />

      {/* confetti */}
      <circle cx="90" cy="30" r="3" fill="#f59e0b" />
      <circle cx="310" cy="25" r="3" fill="#10b981" />
      <circle cx="330" cy="55" r="3" fill="#3b82f6" />
      <rect x="60" y="55" width="6" height="6" fill="#ec4899" transform="rotate(20 60 55)" />
      <rect x="340" y="85" width="6" height="6" fill="#8b5cf6" transform="rotate(-15 340 85)" />
    </svg>
  );
}

export function PipelineIcon() {
  return (
    <svg viewBox="0 0 340 110" width="100%" height="100" xmlns="http://www.w3.org/2000/svg">
      <rect width="340" height="110" rx="16" fill="#ede9fe" />
      {[
        { x: 40, color: '#a78bfa', label: 'A' },
        { x: 120, color: '#818cf8', label: 'S' },
        { x: 200, color: '#60a5fa', label: 'I' },
        { x: 280, color: '#34d399', label: 'H' },
      ].map((s, i, arr) => (
        <g key={s.x}>
          <circle cx={s.x} cy="55" r="20" fill={s.color} />
          <text x={s.x} y="61" textAnchor="middle" fill="white" fontSize="14" fontWeight="700" fontFamily="sans-serif">{s.label}</text>
          {i < arr.length - 1 && (
            <line x1={s.x + 20} y1="55" x2={arr[i + 1].x - 20} y2="55" stroke="#c4b5fd" strokeWidth="3" />
          )}
        </g>
      ))}
    </svg>
  );
}

// Small per-stage icons used in pipeline columns / badges
export function StageIcon({ stage, size = 20 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg' };
  switch (stage) {
    case 'applied':
      return (
        <svg {...common}><rect x="4" y="2" width="16" height="20" rx="2" fill="#c7d2fe" /><path d="M8 8h8M8 12h8M8 16h5" stroke="#4338ca" strokeWidth="1.6" strokeLinecap="round" /></svg>
      );
    case 'screening':
      return (
        <svg {...common}><circle cx="10" cy="10" r="7" fill="none" stroke="#0369a1" strokeWidth="2" /><line x1="15" y1="15" x2="21" y2="21" stroke="#0369a1" strokeWidth="2" strokeLinecap="round" /></svg>
      );
    case 'interview':
      return (
        <svg {...common}><path d="M4 5h16v10H9l-4 4V5z" fill="#a78bfa" /><circle cx="9" cy="10" r="1.3" fill="white" /><circle cx="12" cy="10" r="1.3" fill="white" /><circle cx="15" cy="10" r="1.3" fill="white" /></svg>
      );
    case 'offer':
      return (
        <svg {...common}><rect x="4" y="6" width="16" height="12" rx="2" fill="#fbbf24" /><path d="M4 8l8 5 8-5" stroke="#78350f" strokeWidth="1.6" fill="none" /></svg>
      );
    case 'hired':
      return (
        <svg {...common}><circle cx="12" cy="12" r="10" fill="#34d399" /><path d="M7 12l3 3 7-7" stroke="white" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
      );
    case 'rejected':
      return (
        <svg {...common}><circle cx="12" cy="12" r="10" fill="#fca5a5" /><path d="M8 8l8 8M16 8l-8 8" stroke="#7f1d1d" strokeWidth="2.2" strokeLinecap="round" /></svg>
      );
    default:
      return null;
  }
}
