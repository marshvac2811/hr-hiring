const { sql, ensureSchema } = require('../_db');

module.exports = async (req, res) => {
  try {
    await ensureSchema();
    const { id } = req.query;

    if (req.method === 'GET') {
      const { rows } = await sql`SELECT * FROM jobs WHERE id = ${id}`;
      if (!rows[0]) return res.status(404).json({ error: 'Job not found' });
      return res.status(200).json(rows[0]);
    }

    if (req.method === 'PATCH') {
      const { title, department, description, status } = req.body || {};
      const { rows } = await sql`
        UPDATE jobs SET
          title = COALESCE(${title}, title),
          department = COALESCE(${department}, department),
          description = COALESCE(${description}, description),
          status = COALESCE(${status}, status)
        WHERE id = ${id}
        RETURNING *
      `;
      if (!rows[0]) return res.status(404).json({ error: 'Job not found' });
      return res.status(200).json(rows[0]);
    }

    res.setHeader('Allow', 'GET, PATCH');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error', detail: String(err) });
  }
};
