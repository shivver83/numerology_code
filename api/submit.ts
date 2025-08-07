// /api/submit.ts
import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'pg';

export async function POST(req: Request) {
  const body = await req.json();
  const { name, date_of_birth, email, phone } = body;

  if (!name || !date_of_birth) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL, // Should be set in Vercel Environment Variables
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    await client.query(
      'INSERT INTO user_submissions (name, date_of_birth, email, phone) VALUES ($1, $2, $3, $4)',
      [name, date_of_birth, email || null, phone || null]
    );
    await client.end();
    return NextResponse.json({ message: 'Data inserted successfully' });
  } catch (error) {
    console.error('DB Insert Error:', error);
    return NextResponse.json({ message: 'Database error' }, { status: 500 });
  }
}
