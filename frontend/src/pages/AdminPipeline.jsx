import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';
import { PipelineIcon, StageIcon } from '../illustrations';
import { useToast } from '../Toast';

const STAGES = ['applied', 'screening', 'interview', 'offer', 'hired', 'rejected'];

export default function AdminPipeline() {
  const { id } = useParams();
  const showToast = useToast();
  const [job, setJob] = useState(null);
  const [candidates, setCandidates] = useState(null);
  const [error, setError] = useState('');
  const [openHistory, setOpenHistory] = useState(null);

  function load() {
    api.getJob(id).then(setJob).catch((e) => setError(e.message));
    api.listCandidates(id).then(setCandidates).catch((e) => setError(e.message));
  }

  useEffect(load, [id]);

  async function moveStage(candidateId, stage, name) {
    let reason = null;
    if (stage === 'rejected') {
      reason = window.prompt(`Why is ${name} being dropped at this stage? (optional)`) || null;
    }
    await api.updateCandidate(candidateId, { stage, reason });
    load();
    showToast(stage === 'rejected' ? `${name} dropped` : `${name} moved to ${stage}`);
  }

  return (
    <div className="container">
      <Link to="/admin">&larr; All jobs</Link>
      <h1>{job ? job.title : 'Pipeline'}</h1>
      <p className="subtitle">Move candidates through each stage. Rejections record where they dropped and why.</p>
      <PipelineIcon />

      {error && <p className="error-msg">{error}</p>}

      {candidates === null ? (
        <p className="empty">Loading…</p>
      ) : (
        <div className="pipeline">
          {STAGES.map((stage) => (
            <div className="pipeline-col" key={stage}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <StageIcon stage={stage} size={16} /> {stage}
              </h3>
              {candidates.filter((c) => c.stage === stage).map((c) => (
                <div className="candidate-card" key={c.id}>
                  <div className="name">{c.name}</div>
                  <div>{c.email}</div>
                  {c.resume_url && <div><a href={c.resume_url} target="_blank" rel="noreferrer">Resume</a></div>}

                  {c.stage === 'rejected' && c.dropped_at_stage && (
                    <div style={{ marginTop: 6, fontSize: 12, color: '#b91c1c' }}>
                      Dropped at: <strong>{c.dropped_at_stage}</strong>
                      {c.drop_reason && <div style={{ color: '#7f1d1d' }}>“{c.drop_reason}”</div>}
                    </div>
                  )}

                  <select value={c.stage} onChange={(e) => moveStage(c.id, e.target.value, c.name)}>
                    {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>

                  {c.stage_history && c.stage_history.length > 0 && (
                    <div style={{ marginTop: 6 }}>
                      <button
                        type="button"
                        onClick={() => setOpenHistory(openHistory === c.id ? null : c.id)}
                        style={{ fontSize: 11, background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', padding: 0 }}
                      >
                        {openHistory === c.id ? 'Hide history' : 'Show history'}
                      </button>
                      {openHistory === c.id && (
                        <ul style={{ margin: '6px 0 0', paddingLeft: 16, fontSize: 11, color: '#4b5563' }}>
                          {c.stage_history.map((h, i) => (
                            <li key={i}>
                              <strong>{h.stage}</strong> — {new Date(h.at).toLocaleDateString()}
                              {h.note && <> · “{h.note}”</>}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
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
