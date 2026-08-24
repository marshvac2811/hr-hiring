import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { HeroOffice, ManagerSection } from '../illustrations';
import { useToast } from '../Toast';

export default function AdminDashboard() {
  const showToast = useToast();
  const [jobs, setJobs] = useState(null);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', department: '', description: '' });
  const [saving, setSaving] = useState(false);

  function load() {
    api.listJobs().then(setJobs).catch((e) => setError(e.message));
  }

  useEffect(load, []);

  function jobLink(job) {
    return `${window.location.origin}/jobs/${job.id}`;
  }

  async function copyLink(job) {
    const link = jobLink(job);
    try {
      await navigator.clipboard.writeText(link);
      showToast('Link copied!');
    } catch {
      window.prompt('Copy this link:', link);
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const newJob = await api.createJob(form);
      setForm({ title: '', department: '', description: '' });
      setShowForm(false);
      load();
      showToast('Job posted! Copying share link…');
      try {
        await navigator.clipboard.writeText(jobLink(newJob));
        showToast('Share link copied to clipboard');
      } catch {
        // clipboard may be unavailable — link is still visible on the job card
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function toggleStatus(job) {
    const next = job.status === 'open' ? 'closed' : 'open';
    await api.updateJob(job.id, { status: next });
    load();
    showToast(next === 'closed' ? 'Job closed' : 'Job reopened');
  }

  return (
    <div className="container">
      <HeroOffice />
      <div style={{ marginTop: 14 }}><ManagerSection /></div>
      <h1 style={{ marginTop: 18 }}>Admin — Jobs</h1>
      <p className="subtitle">Post roles and manage the pipeline.</p>

      {error && <p className="error-msg">{error}</p>}

      <button className="btn" onClick={() => setShowForm((s) => !s)}>
        {showForm ? 'Cancel' : '+ New job'}
      </button>

      {showForm && (
        <form className="card" onSubmit={handleCreate} style={{ marginTop: 14 }}>
          <div className="field">
            <label>Title</label>
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className="field">
            <label>Department</label>
            <input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
          </div>
          <div className="field">
            <label>Description</label>
            <textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <button className="btn" disabled={saving}>{saving ? 'Saving…' : 'Create job'}</button>
        </form>
      )}

      <div style={{ marginTop: 20 }}>
        {jobs === null && <p className="empty">Loading…</p>}
        {jobs !== null && jobs.length === 0 && <p className="empty">No jobs yet — create one above.</p>}
        {(jobs || []).map((job) => (
          <div className="card" key={job.id}>
            <p className="card-title">{job.title} <span className="badge">{job.status}</span></p>
            <p className="card-meta">{job.department || 'General'}</p>
            <Link className="btn secondary" to={`/admin/jobs/${job.id}`}>View pipeline</Link>{' '}
            <button className="btn secondary" onClick={() => toggleStatus(job)}>
              {job.status === 'open' ? 'Close job' : 'Reopen job'}
            </button>{' '}
            <button className="btn secondary" onClick={() => copyLink(job)}>
              🔗 Copy share link
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
