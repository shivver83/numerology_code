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

    // Ensure visit table exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS visit (
        id SERIAL PRIMARY KEY,
        count INTEGER NOT NULL DEFAULT 0
      );
    `);
    console.log('Ensured visit table exists');

    // Ensure at least one row exists
    await client.query(`
      INSERT INTO visit (count) 
      SELECT 0
      WHERE NOT EXISTS (SELECT 1 FROM visit);
    `);

    // Increment count
    await client.query(`UPDATE visit SET count = count + 1 WHERE id = 1;`);

    // Fetch updated count
    const result = await client.query(`SELECT count FROM visit WHERE id = 1;`);
    const count = parseInt(result.rows[0].count, 10);

    client.release();
    console.log(`Updated visit count: ${count}`);

    return res.status(200).json({ count });
  } catch (err) {
    console.error('Database operation failed:', err);
    return res.status(500).json({ error: 'Database error' });
  }
}
