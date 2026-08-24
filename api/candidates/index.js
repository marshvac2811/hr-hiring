const { sql, ensureSchema } = require('../_db');
const { extractResumeText, computeAtsScore } = require('../_ats');
const { put } = require('@vercel/blob');

const ATS_THRESHOLD = 80;

module.exports = async (req, res) => {
  try {
    await ensureSchema();

    if (req.method === 'GET') {
      const { job_id } = req.query;
      const { rows } = job_id
        ? await sql`SELECT * FROM candidates WHERE job_id = ${job_id} ORDER BY created_at DESC`
        : await sql`SELECT * FROM candidates ORDER BY created_at DESC`;
      return res.status(200).json(rows);
    }

    if (req.method === 'POST') {
      const { job_id, name, email, resume_url, resume_file_base64, resume_filename } = req.body || {};
      if (!job_id || !name || !email) {
        return res.status(400).json({ error: 'job_id, name, and email are required' });
      }

      const jobResult = await sql`SELECT * FROM jobs WHERE id = ${job_id}`;
      const job = jobResult.rows[0];
      if (!job) return res.status(404).json({ error: 'Job not found' });

      let finalResumeUrl = resume_url || null;
      let atsScore = null;

      if (resume_file_base64) {
        const buffer = Buffer.from(resume_file_base64, 'base64');
        if (buffer.length > 8 * 1024 * 1024) {
          return res.status(400).json({ error: 'Resume file too large (max 8MB)' });
        }

        // Store the actual file so it lands directly in our system
        const blob = await put(
          `resumes/${Date.now()}-${(resume_filename || 'resume').replace(/[^a-zA-Z0-9._-]/g, '_')}`,
          buffer,
          { access: 'public', addRandomSuffix: true }
        );
        finalResumeUrl = blob.url;

        // Parse the resume and score it against the job description
        const resumeText = await extractResumeText(buffer, resume_filename || '');
        atsScore = computeAtsScore(job.description || '', resumeText);
      }

      const autoRejected = atsScore !== null && atsScore < ATS_THRESHOLD;
      const initialStage = autoRejected ? 'rejected' : 'applied';

      const history = [{ stage: 'applied', at: new Date().toISOString(), note: null }];
      if (autoRejected) {
        history.push({
          stage: 'rejected',
          at: new Date().toISOString(),
          note: `Auto-rejected: ATS score ${atsScore}% (below ${ATS_THRESHOLD}% threshold)`,
        });
      }

      const { rows } = await sql`
        INSERT INTO candidates (
          job_id, name, email, resume_url, stage, stage_history,
          ats_score, dropped_at_stage, drop_reason
        )
        VALUES (
          ${job_id}, ${name}, ${email}, ${finalResumeUrl}, ${initialStage}, ${JSON.stringify(history)},
          ${atsScore}, ${autoRejected ? 'applied' : null},
          ${autoRejected ? `Auto-rejected: ATS score ${atsScore}% (below ${ATS_THRESHOLD}% threshold)` : null}
        )
        RETURNING *
      `;
      return res.status(201).json(rows[0]);
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error', detail: String(err) });
  }
};
