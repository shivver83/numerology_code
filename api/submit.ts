import { VercelRequest, VercelResponse } from '@vercel/node';
import { Pool } from 'pg';

// Neon DB credentials from environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  try {
    const { name, date_of_birth, email, phone, life_path_number } = req.body;

    if (!name || !date_of_birth) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const client = await pool.connect();

    await client.query(
      `CREATE TABLE IF NOT EXISTS user_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        date_of_birth DATE NOT NULL,
        life_path_number INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        email VARCHAR(255),
        phone VARCHAR(20)
      );`
    );

    await client.query(
      `INSERT INTO user_submissions (name, date_of_birth, life_path_number, email, phone)
       VALUES ($1, $2, $3, $4, $5);`,
      [name, date_of_birth, life_path_number, email || null, phone || null]
    );

    client.release();
    return res.status(200).json({ message: 'Submission successful' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
}

