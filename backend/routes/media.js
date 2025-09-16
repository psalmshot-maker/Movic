const express = require('express');
const router = express.Router();
const Media = require('../models/Media');
const axios = require('axios');
const youtubedl = require('youtube-dl-exec');

// YouTube search (requires process.env.YOUTUBE_API_KEY)
router.get('/search/youtube', async (req, res) => {
  const { q } = req.query;
  const apiKey = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(q)}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    res.json(response.data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.default.url,
      channel: item.snippet.channelTitle
    })));
  } catch (error) {
    res.status(500).json({ error: 'YouTube search failed.' });
  }
});

// Download YouTube video as audio (MP3)
router.get('/download/youtube/:id/audio', async (req, res) => {
  const videoId = req.params.id;
  res.setHeader('Content-Disposition', `attachment; filename="${videoId}.mp3"`);
  res.setHeader('Content-Type', 'audio/mpeg');
  const audioStream = youtubedl.raw(
    `https://www.youtube.com/watch?v=${videoId}`,
    {
      extractAudio: true,
      audioFormat: 'mp3',
      output: '-', // stream to stdout
    }
  );
  audioStream.stdout.pipe(res);
  audioStream.stderr.on('data', (data) => {
    console.error(data.toString());
  });
});

// Upload media (dummy, no file storage here)
router.post('/upload', async (req, res) => {
  const media = new Media({
    title: req.body.title,
    url: req.body.url,
    uploader: req.body.uploader,
    type: req.body.type,
    tags: req.body.tags
  });
  await media.save();
  res.json({ message: "Upload successful", media });
});

// Get recommendations (dummy: trending)
router.get('/recommendations/:userId', async (req, res) => {
  const trending = await Media.find().sort({ views: -1 }).limit(10);
  res.json(trending);
});

// Increment share count
router.post('/:id/share', async (req, res) => {
  const media = await Media.findByIdAndUpdate(req.params.id, { $inc: { shares: 1 } }, { new: true });
  res.json(media);
});

module.exports = router;