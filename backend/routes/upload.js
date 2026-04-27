const express = require('express');
const router = express.Router();
const multer = require('multer');
const XLSX = require('xlsx');
const db = require('../db/db');

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.mimetype === 'application/vnd.ms-excel' ||
      file.mimetype === 'text/csv'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only Excel or CSV files allowed'));
    }
  }
});

router.post('/', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet);

    if (rows.length === 0) {
      return res.status(400).json({ error: 'Excel file is empty' });
    }

    let added = 0;
    let skipped = 0;
    let failed = 0;
    const errors = [];

    for (const row of rows) {
      const name = row['name'] || row['Name'] || row['NAME'] || '';
      const email = row['email'] || row['Email'] || row['EMAIL'] || '';

      if (!email || !email.includes('@')) {
        failed++;
        errors.push(`Invalid email: ${email}`);
        continue;
      }

      const finalName = name || email.split('@')[0];

      await new Promise((resolve) => {
        db.query(
          'INSERT INTO subscribers (name, email) VALUES (?, ?)',
          [finalName, email.trim().toLowerCase()],
          (err) => {
            if (err) {
              if (err.code === 'ER_DUP_ENTRY') {
                skipped++;
              } else {
                failed++;
                errors.push(`${email}: ${err.message}`);
              }
            } else {
              added++;
            }
            resolve();
          }
        );
      });
    }

    res.json({
      message: `✅ Done! Added: ${added}, Skipped (duplicates): ${skipped}, Failed: ${failed}`,
      added,
      skipped,
      failed,
      errors: errors.slice(0, 5)
    });

  } catch (err) {
    res.status(500).json({ error: 'Failed to parse file: ' + err.message });
  }
});

module.exports = router;