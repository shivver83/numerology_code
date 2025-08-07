import { VercelRequest, VercelResponse } from '@vercel/node';
import { Pool } from 'pg';

// Create pool using Neon DB credentials
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('Incoming request:', req.method);

  if (req.method !== 'POST') {
    console.log('Rejected request: Method not allowed');
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  try {
    const { name, date_of_birth, email, phone, life_path_number } = req.body;
    console.log('Received form data:', { name, date_of_birth, email, phone, life_path_number });

    if (!name || !date_of_birth) {
      console.log('Missing required fields');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const client = await pool.connect();
    console.log('Connected to database');

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
    console.log('Ensured table exists');

    await client.query(
      `INSERT INTO user_submissions (name, date_of_birth, life_path_number, email, phone)
       VALUES ($1, $2, $3, $4, $5);`,
      [name, date_of_birth, life_path_number, email || null, phone || null]
    );
    console.log('Inserted data into table');

    client.release();
    console.log('Released DB client');

    return res.status(200).json({ message: 'Submission successful' });

  } catch (err) {
    console.error('Database operation failed:', err);
    return res.status(500).json({ error: 'Database error' });
  }
}
