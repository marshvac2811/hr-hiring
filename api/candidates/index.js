const { sql, ensureSchema } = require('../_db');

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
      const { job_id, name, email, resume_url } = req.body || {};
      if (!job_id || !name || !email) {
        return res.status(400).json({ error: 'job_id, name, and email are required' });
      }
      const initialHistory = JSON.stringify([{ stage: 'applied', at: new Date().toISOString(), note: null }]);
      const { rows } = await sql`
        INSERT INTO candidates (job_id, name, email, resume_url, stage_history)
        VALUES (${job_id}, ${name}, ${email}, ${resume_url || null}, ${initialHistory})
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
