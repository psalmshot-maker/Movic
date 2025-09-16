const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Get notifications for a user
router.get('/:user', async (req, res) => {
  const notifications = await Notification.find({ user: req.params.user }).sort({ createdAt: -1 });
  res.json(notifications);
});

// Mark notifications as seen
router.post('/:user/seen', async (req, res) => {
  await Notification.updateMany({ user: req.params.user }, { seen: true });
  res.json({ message: 'Notifications marked as seen.' });
});

module.exports = router;