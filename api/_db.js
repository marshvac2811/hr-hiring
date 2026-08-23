const { Pool } = require('pg');

let pool;
function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
  }
  return pool;
}

// Tagged template helper so call sites can keep writing sql`SELECT ...`
function sql(strings, ...values) {
  let text = strings[0];
  for (let i = 0; i < values.length; i++) {
    text += `$${i + 1}` + strings[i + 1];
  }
  return getPool().query(text, values).then((res) => ({ rows: res.rows }));
}

async function ensureSchema() {
  await sql`
    CREATE TABLE IF NOT EXISTS jobs (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      department TEXT,
      description TEXT,
      status TEXT NOT NULL DEFAULT 'open',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS candidates (
      id SERIAL PRIMARY KEY,
      job_id INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      resume_url TEXT,
      notes TEXT,
      stage TEXT NOT NULL DEFAULT 'applied',
      stage_history JSONB NOT NULL DEFAULT '[]',
      dropped_at_stage TEXT,
      drop_reason TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;
  // Migrate columns onto tables created before this feature existed
  await sql`ALTER TABLE candidates ADD COLUMN IF NOT EXISTS stage_history JSONB NOT NULL DEFAULT '[]'`;
  await sql`ALTER TABLE candidates ADD COLUMN IF NOT EXISTS dropped_at_stage TEXT`;
  await sql`ALTER TABLE candidates ADD COLUMN IF NOT EXISTS drop_reason TEXT`;
}

module.exports = { sql, ensureSchema };
