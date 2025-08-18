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

    // Create visits table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS visits (
        id SERIAL PRIMARY KEY,
        count INTEGER NOT NULL DEFAULT 0
      );
    `);

    // Ensure at least one row exists
    await client.query(`
      INSERT INTO visits (count)
      SELECT 0
      WHERE NOT EXISTS (SELECT 1 FROM visits);
    `);

    // Increment the count
    const result = await client.query(`
      UPDATE visits
      SET count = count + 1
      WHERE id = 1
      RETURNING count;
    `);

    const visitCount = result.rows[0].count;
    console.log(`Updated visit count: ${visitCount}`);

    client.release();
    console.log('Released DB client');

    return res.status(200).json({ count: visitCount });

  } catch (err) {
    console.error('Database operation failed:', err);
    return res.status(500).json({ error: 'Database error' });
  }
}
