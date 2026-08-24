// Real, freely-licensed (Unsplash License — free for commercial use, no
// attribution required) HR/office photography used across the app.

const PHOTOS = {
  office: 'https://images.unsplash.com/photo-1758873268705-bb756c95f26a?fm=jpg&q=70&w=1200&auto=format&fit=crop',
  team: 'https://images.unsplash.com/photo-1758873269317-51888e824b28?fm=jpg&q=70&w=1200&auto=format&fit=crop',
  interview: 'https://images.unsplash.com/photo-1758520144437-f068ecaf0d83?fm=jpg&q=70&w=1200&auto=format&fit=crop',
  handshake: 'https://images.unsplash.com/photo-1758518730384-be3d205838e8?fm=jpg&q=70&w=1200&auto=format&fit=crop',
};

function Photo({ src, alt, height = 200 }) {
  return (
    <div style={{ borderRadius: 16, overflow: 'hidden', width: '100%', height, background: '#e5e7eb' }}>
      <img
        src={src}
        alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        loading="lazy"
      />
    </div>
  );
}

export function HeroOffice() {
  return <Photo src={PHOTOS.office} alt="Team collaborating in a modern office" height={200} />;
}

export function ManagerSection() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#fdf4ff', borderRadius: 16, padding: 16 }}>
      <div style={{ width: 120, height: 90, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
        <img src={PHOTOS.team} alt="Hiring managers reviewing candidates" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
      </div>
      <div>
        <div style={{ fontWeight: 700, color: '#701a75', fontSize: 15 }}>Hiring Managers</div>
        <div style={{ color: '#a21caf', fontSize: 13 }}>Review candidates &amp; run interviews directly from the pipeline board</div>
      </div>
    </div>
  );
}

export function ManagerInterview() {
  return <Photo src={PHOTOS.interview} alt="Manager interviewing a candidate" height={200} />;
}

export function Handshake() {
  return <Photo src={PHOTOS.handshake} alt="Hiring manager congratulating candidate with a handshake" height={180} />;
}

export function EmptyDesk() {
  return <Photo src={PHOTOS.office} alt="Empty desk — no open roles yet" height={140} />;
}

export function PipelineIcon() {
  return <Photo src={PHOTOS.team} alt="Hiring pipeline" height={90} />;
}

// Small per-stage icons used in pipeline columns / badges (kept as simple
// original icons — a photo would be too small/busy at this size)
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
