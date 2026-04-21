const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db/db');

const subscriberRoutes = require('./routes/subscribers');
const campaignRoutes = require('./routes/campaigns');
const emailRoutes = require('./routes/email');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/email', emailRoutes);
// Test routes
app.get('/', (req, res) => {
  res.json({ message: 'Vyanic Backend is running! 🚀' });
});

app.get('/test-db', (req, res) => {
  db.query('SELECT 1 + 1 AS result', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json({ message: '✅ Database connected!', result: results[0].result });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});