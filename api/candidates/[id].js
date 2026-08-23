const { sql, ensureSchema } = require('../_db');

const VALID_STAGES = ['applied', 'screening', 'interview', 'offer', 'hired', 'rejected'];

module.exports = async (req, res) => {
  try {
    await ensureSchema();
    const { id } = req.query;

    if (req.method === 'PATCH') {
      const { stage, notes, reason } = req.body || {};
      if (stage && !VALID_STAGES.includes(stage)) {
        return res.status(400).json({ error: `stage must be one of: ${VALID_STAGES.join(', ')}` });
      }

      const current = await sql`SELECT * FROM candidates WHERE id = ${id}`;
      if (!current.rows[0]) return res.status(404).json({ error: 'Candidate not found' });
      const existing = current.rows[0];

      let stageHistory = existing.stage_history || [];
      let droppedAtStage = existing.dropped_at_stage;
      let dropReason = existing.drop_reason;

      if (stage && stage !== existing.stage) {
        stageHistory = [...stageHistory, { stage, at: new Date().toISOString(), note: reason || null }];
        if (stage === 'rejected') {
          droppedAtStage = existing.stage; // the stage they were in right before rejection
          dropReason = reason || null;
        } else {
          // moving forward again clears any prior drop record
          droppedAtStage = null;
          dropReason = null;
        }
      }

      const historyJson = JSON.stringify(stageHistory);
      const { rows } = await sql`
        UPDATE candidates SET
          stage = COALESCE(${stage}, stage),
          notes = COALESCE(${notes}, notes),
          stage_history = ${historyJson},
          dropped_at_stage = ${droppedAtStage},
          drop_reason = ${dropReason}
        WHERE id = ${id}
        RETURNING *
      `;
      return res.status(200).json(rows[0]);
    }

    res.setHeader('Allow', 'PATCH');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error', detail: String(err) });
  }
};
