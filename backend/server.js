const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db/db');

const subscriberRoutes = require('./routes/subscribers');
const campaignRoutes = require('./routes/campaigns');
const emailRoutes = require('./routes/email');
const uploadRoutes = require('./routes/upload');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./routes/middleware/auth');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/subscribers', authMiddleware, subscriberRoutes);
app.use('/api/campaigns', authMiddleware, campaignRoutes);
app.use('/api/email', authMiddleware, emailRoutes);
app.use('/api/upload', authMiddleware, uploadRoutes);

// Test routes
app.get('/', (req, res) => {
  res.json({ message: 'Vyanic Backend is running! 🚀' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
