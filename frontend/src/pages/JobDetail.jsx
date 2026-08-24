import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import { Handshake, ManagerInterview } from '../illustrations';
import { useToast } from '../Toast';

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function JobDetail() {
  const { id } = useParams();
  const showToast = useToast();
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '' });
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.getJob(id).then(setJob).catch((e) => setError(e.message));
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      let payload = { job_id: id, ...form };
      if (file) {
        payload.resume_file_base64 = await fileToBase64(file);
        payload.resume_filename = file.name;
      }
      await api.applyToJob(payload);
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
      <ManagerInterview />
      <h1 style={{ marginTop: 18 }}>{job.title}</h1>
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
            <label>Upload CV (PDF or Word)</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files[0] || null)}
            />
          </div>
          <button className="btn" disabled={submitting}>{submitting ? 'Submitting…' : 'Submit application'}</button>
        </form>
      )}
    </div>
  );
}
