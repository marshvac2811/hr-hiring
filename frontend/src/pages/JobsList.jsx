import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { HeroOffice, EmptyDesk } from '../illustrations';

export default function JobsList() {
  const [jobs, setJobs] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.listJobs().then(setJobs).catch((e) => setError(e.message));
  }, []);

  const openJobs = (jobs || []).filter((j) => j.status === 'open');

  return (
    <div className="container">
      <HeroOffice />
      <h1 style={{ marginTop: 18 }}>Open Roles</h1>
      <p className="subtitle">Current openings — apply directly below.</p>

      {error && <p className="error-msg">{error}</p>}
      {jobs === null && !error && <p className="empty">Loading…</p>}
      {jobs !== null && openJobs.length === 0 && (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <EmptyDesk />
          <p className="empty">No open roles right now. Check back soon.</p>
        </div>
      )}

      {openJobs.map((job) => (
        <div className="card" key={job.id}>
          <p className="card-title">{job.title}</p>
          <p className="card-meta">{job.department || 'General'}</p>
          {job.description && <p>{job.description}</p>}
          <Link className="btn" to={`/jobs/${job.id}`}>View & Apply</Link>
        </div>
      ))}
    </div>
  );
}
