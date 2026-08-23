import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';
import { PipelineIcon } from '../illustrations';
import { useToast } from '../Toast';

const STAGES = ['applied', 'screening', 'interview', 'offer', 'hired', 'rejected'];

export default function AdminPipeline() {
  const { id } = useParams();
  const showToast = useToast();
  const [job, setJob] = useState(null);
  const [candidates, setCandidates] = useState(null);
  const [error, setError] = useState('');

  function load() {
    api.getJob(id).then(setJob).catch((e) => setError(e.message));
    api.listCandidates(id).then(setCandidates).catch((e) => setError(e.message));
  }

  useEffect(load, [id]);

  async function moveStage(candidateId, stage, name) {
    await api.updateCandidate(candidateId, { stage });
    load();
    showToast(`${name} moved to ${stage}`);
  }

  return (
    <div className="container">
      <Link to="/admin">&larr; All jobs</Link>
      <h1>{job ? job.title : 'Pipeline'}</h1>
      <p className="subtitle">Move candidates through each stage.</p>
      <PipelineIcon />

      {error && <p className="error-msg">{error}</p>}

      {candidates === null ? (
        <p className="empty">Loading…</p>
      ) : (
        <div className="pipeline">
          {STAGES.map((stage) => (
            <div className="pipeline-col" key={stage}>
              <h3>{stage}</h3>
              {candidates.filter((c) => c.stage === stage).map((c) => (
                <div className="candidate-card" key={c.id}>
                  <div className="name">{c.name}</div>
                  <div>{c.email}</div>
                  {c.resume_url && <div><a href={c.resume_url} target="_blank" rel="noreferrer">Resume</a></div>}
                  <select value={c.stage} onChange={(e) => moveStage(c.id, e.target.value, c.name)}>
                    {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              ))}
              {candidates.filter((c) => c.stage === stage).length === 0 && (
                <p style={{ fontSize: 12, color: '#9ca3af' }}>—</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
