const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const db = require('../db/db');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

router.post('/send/:campaignId', async (req, res) => {
  const { campaignId } = req.params;

  db.query('SELECT * FROM campaigns WHERE id = ?', [campaignId], async (err, campaigns) => {
    if (err) return res.status(500).json({ error: err.message });
    if (campaigns.length === 0) return res.status(404).json({ error: 'Campaign not found' });

    const campaign = campaigns[0];

    db.query('SELECT * FROM subscribers WHERE status = "active"', async (err, subscribers) => {
      if (err) return res.status(500).json({ error: err.message });
      if (subscribers.length === 0) return res.status(400).json({ error: 'No active subscribers' });

      try {
        let sentCount = 0;
        let failedCount = 0;

        for (const subscriber of subscribers) {
          try {
            await transporter.sendMail({
              from: `"Vyanic" <${process.env.GMAIL_USER}>`,
              to: subscriber.email,
              subject: campaign.subject,
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <div style="background: linear-gradient(90deg,#00c9a7,#0070c0); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                    <h1 style="color: white; margin: 0; font-size: 24px;">Vyanic</h1>
                  </div>
                  <h2 style="color: #333;">${campaign.title}</h2>
                  <p style="color: #333;">Hi ${subscriber.name},</p>
                  <p style="color: #555; line-height: 1.6;">${campaign.body}</p>
                  <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;"/>
                  <p style="color: #999; font-size: 12px;">
                    You received this email because you subscribed to Vyanic newsletter.
                  </p>
                </div>
              `
            });
            sentCount++;
          } catch (emailErr) {
            console.error(`Failed to send to ${subscriber.email}:`, emailErr.message);
            failedCount++;
          }
        }

        db.query('UPDATE campaigns SET status = "sent" WHERE id = ?', [campaignId]);

        res.json({
          message: `✅ Campaign sent to ${sentCount} subscribers!${failedCount > 0 ? ` (${failedCount} failed)` : ''}`,
          sentCount,
          failedCount
        });

      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  });
});

module.exports = router;