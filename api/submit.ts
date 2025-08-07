// /api/submit.ts
import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Add this in Vercel dashboard
  ssl: { rejectUnauthorized: false },
});

export async function POST(req: NextRequest) {
  const { name, dob } = await req.json();

  try {
    const client = await pool.connect();
    await client.query(
      'INSERT INTO users (name, dob) VALUES ($1, $2)',
      [name, dob]
    );
    client.release();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: 'DB error' }, { status: 500 });
  }
}

