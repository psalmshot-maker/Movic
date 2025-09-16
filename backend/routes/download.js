const express = require('express');
const router = express.Router();
const Download = require('../models/Download');

// Start download
router.post('/start', async (req, res) => {
  const download = new Download({
    user: req.body.userId,
    media: req.body.mediaId,
    status: 'pending',
    startedAt: new Date()
  });
  await download.save();
  res.json(download);
});

// Update download progress
router.patch('/:id/progress', async (req, res) => {
  const { progress, status } = req.body;
  const download = await Download.findByIdAndUpdate(req.params.id, { progress, status }, { new: true });
  res.json(download);
});

module.exports = router;