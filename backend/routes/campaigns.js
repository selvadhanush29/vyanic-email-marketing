const express = require('express');
const router = express.Router();
const db = require('../db/db');

// GET all campaigns
router.get('/', (req, res) => {
  db.query('SELECT * FROM campaigns ORDER BY created_at DESC', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// POST create new campaign
router.post('/', (req, res) => {
  const { title, subject, body } = req.body;

  if (!title || !subject || !body) {
    return res.status(400).json({ error: 'Title, subject and body are required' });
  }

  db.query(
    'INSERT INTO campaigns (title, subject, body) VALUES (?, ?, ?)',
    [title, subject, body],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ 
        message: '✅ Campaign created!', 
        id: results.insertId 
      });
    }
  );
});

module.exports = router;