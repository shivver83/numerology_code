// backend/index.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Needed for Neon
});

// POST route to save submission
app.post('/api/submit', async (req, res) => {
  const { name, dateOfBirth } = req.body;

  if (!name || !dateOfBirth) {
    return res.status(400).json({ message: 'Missing name or date of birth' });
  }

  try {
    await pool.query(
      'INSERT INTO user_submissions (name, date_of_birth) VALUES ($1, $2)',
      [name, dateOfBirth]
    );
    res.status(200).json({ message: 'Submission saved!' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message: 'Error saving data' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

