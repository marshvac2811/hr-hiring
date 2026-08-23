const { sql, ensureSchema } = require('../_db');

module.exports = async (req, res) => {
  try {
    await ensureSchema();

    if (req.method === 'GET') {
      const { rows } = await sql`SELECT * FROM jobs ORDER BY created_at DESC`;
      return res.status(200).json(rows);
    }

    if (req.method === 'POST') {
      const { title, department, description } = req.body || {};
      if (!title) return res.status(400).json({ error: 'title is required' });
      const { rows } = await sql`
        INSERT INTO jobs (title, department, description)
        VALUES (${title}, ${department || null}, ${description || null})
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
