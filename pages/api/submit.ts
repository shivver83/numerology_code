// pages/api/submit.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

type UserData = {
  name: string;
  dob: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, dob } = req.body as UserData;

    if (!name || !dob) {
      return res.status(400).json({ message: 'Missing name or date of birth' });
    }

    const csvLine = `"${name}","${dob}"\n`;
    const filePath = path.join(process.cwd(), 'userdata.csv');

    fs.appendFile(filePath, csvLine, (err) => {
      if (err) {
        console.error('Failed to write to file:', err);
        return res.status(500).json({ message: 'Failed to save data' });
      }

      return res.status(200).json({ message: 'Data saved successfully' });
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

