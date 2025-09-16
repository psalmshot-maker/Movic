const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get user profile
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate('downloads')
    .populate('playlists')
    .populate('favorites');
  res.json(user);
});

// Update theme
router.post('/:id/theme', async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { theme: req.body.theme });
  res.json({ message: "Theme updated" });
});

// Update language
router.post('/:id/language', async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { language: req.body.language });
  res.json({ message: "Language updated" });
});

// Add/remove favorite
router.post('/:id/favorites', async (req, res) => {
  const { mediaId } = req.body;
  const user = await User.findById(req.params.id);
  if (user.favorites.includes(mediaId)) user.favorites.pull(mediaId);
  else user.favorites.push(mediaId);
  await user.save();
  res.json(user.favorites);
});

module.exports = router;