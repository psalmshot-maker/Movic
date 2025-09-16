const express = require('express');
const router = express.Router();
const Playlist = require('../models/Playlist');

// Create playlist
router.post('/', async (req, res) => {
  const { name, user } = req.body;
  const playlist = new Playlist({ name, user, media: [] });
  await playlist.save();
  res.json(playlist);
});

// Add media to playlist
router.post('/:id/add', async (req, res) => {
  const playlist = await Playlist.findById(req.params.id);
  playlist.media.push(req.body.mediaId);
  await playlist.save();
  res.json(playlist);
});

// Get playlists for user
router.get('/user/:userId', async (req, res) => {
  const playlists = await Playlist.find({ user: req.params.userId }).populate('media');
  res.json(playlists);
});

module.exports = router;