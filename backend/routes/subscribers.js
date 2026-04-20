const express = require('express');
const router = express.Router();
const db = require('../db/db');

// GET all subscribers
router.get('/', (req, res) => {
  db.query('SELECT * FROM subscribers ORDER BY created_at DESC', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// POST add new subscriber
router.post('/', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  db.query(
    'INSERT INTO subscribers (name, email) VALUES (?, ?)',
    [name, email],
    (err, results) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'Email already exists' });
        }
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ 
        message: '✅ Subscriber added!', 
        id: results.insertId 
      });
    }
  );
});

module.exports = router;