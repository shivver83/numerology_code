import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default async function handler(req: any, res: any) {
  console.log('Incoming request:', req.method);

  if (req.method !== 'GET') {
    console.log('Rejected request: Method not allowed');
    return res.status(405).json({ error: 'Only GET requests allowed' });
  }

  try {
    const client = await pool.connect();
    console.log('Connected to database');

    // Ensure table exists (optional, same pattern as submit.ts)
    await client.query(`
      CREATE TABLE IF NOT EXISTS user_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        date_of_birth DATE NOT NULL,
        life_path_number INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        email VARCHAR(255),
        phone VARCHAR(20),
        gender VARCHAR(20)
      );
    `);
    console.log('Ensured table exists');

    // Get total row count
    const result = await client.query(`SELECT COUNT(*) AS count FROM user_submissions;`);
    const count = parseInt(result.rows[0].count, 10);
    console.log(`Visit count: ${count}`);

    client.release();
    console.log('Released DB client');

    return res.status(200).json({ count });

  } catch (err) {
    console.error('Database operation failed:', err);
    return res.status(500).json({ error: 'Database error' });
  }
}

