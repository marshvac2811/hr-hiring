export function HeroPeople() {
  return (
    <svg viewBox="0 0 400 140" width="100%" height="140" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="140" rx="14" fill="#eef2ff" />
      <circle cx="90" cy="70" r="34" fill="#c7d2fe" />
      <circle cx="90" cy="55" r="16" fill="#4338ca" />
      <rect x="66" y="72" width="48" height="34" rx="17" fill="#4338ca" />

      <circle cx="200" cy="70" r="40" fill="#bbf7d0" />
      <circle cx="200" cy="52" r="18" fill="#15803d" />
      <rect x="172" y="72" width="56" height="40" rx="20" fill="#15803d" />

      <circle cx="310" cy="70" r="34" fill="#fde68a" />
      <circle cx="310" cy="55" r="16" fill="#b45309" />
      <rect x="286" y="72" width="48" height="34" rx="17" fill="#b45309" />
    </svg>
  );
}

export function EmptyDesk() {
  return (
    <svg viewBox="0 0 200 140" width="180" height="126" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="90" width="160" height="10" rx="3" fill="#e5e7eb" />
      <rect x="35" y="55" width="130" height="40" rx="4" fill="#f3f4f6" stroke="#d1d5db" />
      <rect x="45" y="63" width="40" height="24" rx="2" fill="#c7d2fe" />
      <circle cx="140" cy="75" r="10" fill="#fde68a" />
      <rect x="25" y="100" width="8" height="26" fill="#d1d5db" />
      <rect x="167" y="100" width="8" height="26" fill="#d1d5db" />
    </svg>
  );
}

export function Handshake() {
  return (
    <svg viewBox="0 0 400 120" width="100%" height="120" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="120" rx="14" fill="#fef3c7" />
      <circle cx="150" cy="60" r="30" fill="#fca5a5" />
      <rect x="120" y="78" width="60" height="30" rx="15" fill="#b91c1c" />
      <circle cx="250" cy="60" r="30" fill="#93c5fd" />
      <rect x="220" y="78" width="60" height="30" rx="15" fill="#1d4ed8" />
      <rect x="175" y="70" width="50" height="12" rx="6" fill="#78350f" />
    </svg>
  );
}

export function PipelineIcon() {
  return (
    <svg viewBox="0 0 300 100" width="100%" height="90" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="100" rx="14" fill="#ede9fe" />
      {[40, 110, 180, 250].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy="50" r="16" fill={['#a78bfa', '#818cf8', '#60a5fa', '#34d399'][i]} />
          {i < 3 && <line x1={x + 16} y1="50" x2={x + 54} y2="50" stroke="#c4b5fd" strokeWidth="3" />}
        </g>
      ))}
    </svg>
  );
}
