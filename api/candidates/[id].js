const { sql, ensureSchema } = require('../_db');

const VALID_STAGES = ['applied', 'screening', 'interview', 'offer', 'hired', 'rejected'];

module.exports = async (req, res) => {
  try {
    await ensureSchema();
    const { id } = req.query;

    if (req.method === 'PATCH') {
      const { stage, notes } = req.body || {};
      if (stage && !VALID_STAGES.includes(stage)) {
        return res.status(400).json({ error: `stage must be one of: ${VALID_STAGES.join(', ')}` });
      }
      const { rows } = await sql`
        UPDATE candidates SET
          stage = COALESCE(${stage}, stage),
          notes = COALESCE(${notes}, notes)
        WHERE id = ${id}
        RETURNING *
      `;
      if (!rows[0]) return res.status(404).json({ error: 'Candidate not found' });
      return res.status(200).json(rows[0]);
    }

    res.setHeader('Allow', 'PATCH');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error', detail: String(err) });
  }
};
