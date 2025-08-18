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

    // Ensure visits table exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS visit (
        id SERIAL PRIMARY KEY,
        count INTEGER DEFAULT 0
      );
    `);

    // Ensure there is at least one row in visit table
    await client.query(`
      INSERT INTO visit (count)
      SELECT 0
      WHERE NOT EXISTS (SELECT 1 FROM visit);
    `);

    // Increment visit count
    const updateResult = await client.query(`
      UPDATE visit
      SET count = count + 1
      WHERE id = (SELECT id FROM visit LIMIT 1)
      RETURNING count;
    `);

    const newCount = updateResult.rows[0].count;
    console.log(`Updated visit count: ${newCount}`);

    client.release();
    console.log('Released DB client');

    return res.status(200).json({ count: newCount });

  } catch (err) {
    console.error('Database operation failed:', err);
    return res.status(500).json({ error: 'Database error' });
  }
}
