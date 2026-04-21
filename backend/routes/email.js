const express = require('express');
const router = express.Router();
const { Resend } = require('resend');
const db = require('../db/db');

const resend = new Resend(process.env.RESEND_API_KEY);

// POST /api/email/send/:campaignId
router.post('/send/:campaignId', async (req, res) => {
  const { campaignId } = req.params;

  // Get campaign from database
  db.query('SELECT * FROM campaigns WHERE id = ?', [campaignId], async (err, campaigns) => {
    if (err) return res.status(500).json({ error: err.message });
    if (campaigns.length === 0) return res.status(404).json({ error: 'Campaign not found' });

    const campaign = campaigns[0];

    // Get all active subscribers
    db.query('SELECT * FROM subscribers WHERE status = "active"', async (err, subscribers) => {
      if (err) return res.status(500).json({ error: err.message });
      if (subscribers.length === 0) return res.status(400).json({ error: 'No active subscribers' });

      try {
        // Send email to each subscriber
        let sentCount = 0;
        for (const subscriber of subscribers) {
          await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: subscriber.email,
            subject: campaign.subject,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #00c9a7;">${campaign.title}</h2>
                <p>Hi ${subscriber.name},</p>
                <p>${campaign.body}</p>
                <hr/>
                <p style="color: #999; font-size: 12px;">
                  You received this email because you subscribed to Vyanic.
                </p>
              </div>
            `
          });
          sentCount++;
        }

        // Update campaign status to sent
        db.query('UPDATE campaigns SET status = "sent" WHERE id = ?', [campaignId]);

        res.json({ 
          message: `✅ Campaign sent to ${sentCount} subscribers!`,
          sentCount 
        });

      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  });
});

module.exports = router;