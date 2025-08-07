import type { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { name, date_of_birth, email, phone } = req.body;

  if (!name || !date_of_birth) {
    return res.status(400).json({ message: 'Name and DOB are required' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO user_submissions (name, date_of_birth, email, phone)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, date_of_birth, email || null, phone || null]
    );

    return res.status(200).json({ message: 'Success', data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting into DB:', error);
    return res.status(500).json({ message: 'Error saving data', error });
  }
}
