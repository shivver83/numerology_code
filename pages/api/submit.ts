// pages/api/submit.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'pg';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, date_of_birth, life_path_number, email, phone } = req.body;

  if (!name || !date_of_birth) {
    return res.status(400).json({ message: 'Missing name or date of birth' });
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    await client.query(
      `INSERT INTO user_submissions (name, date_of_birth, life_path_number, email, phone)
       VALUES ($1, $2, $3, $4, $5)`,
      [name, date_of_birth, life_path_number, email, phone]
    );
    await client.end();
    res.status(200).json({ message: 'Success!' });
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ message: 'Database error' });
  }
}
