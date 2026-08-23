import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import { Handshake } from '../illustrations';
import { useToast } from '../Toast';

export default function JobDetail() {
  const { id } = useParams();
  const showToast = useToast();
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', resume_url: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.getJob(id).then(setJob).catch((e) => setError(e.message));
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await api.applyToJob({ job_id: id, ...form });
      setSubmitted(true);
      showToast('Application submitted!');
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (error && !job) return <div className="container"><p className="error-msg">{error}</p></div>;
  if (!job) return <div className="container"><p className="empty">Loading…</p></div>;

  return (
    <div className="container">
      <h1>{job.title}</h1>
      <p className="subtitle">{job.department || 'General'}</p>
      {job.description && <div className="card">{job.description}</div>}

      <h2>Apply</h2>
      {submitted ? (
        <div className="card" style={{ textAlign: 'center' }}>
          <Handshake />
          <p style={{ marginTop: 12 }}>Thanks — your application has been submitted.</p>
        </div>
      ) : (
        <form className="card" onSubmit={handleSubmit}>
          {error && <p className="error-msg">{error}</p>}
          <div className="field">
            <label>Full name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="field">
            <label>Email</label>
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="field">
            <label>Resume link (Drive, LinkedIn, etc.)</label>
            <input value={form.resume_url} onChange={(e) => setForm({ ...form, resume_url: e.target.value })} />
          </div>
          <button className="btn" disabled={submitting}>{submitting ? 'Submitting…' : 'Submit application'}</button>
        </form>
      )}
    </div>
  );
}
