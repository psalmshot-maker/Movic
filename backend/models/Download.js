const mongoose = require('mongoose');

const DownloadSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  media: { type: mongoose.Schema.Types.ObjectId, ref: 'Media' },
  status: { type: String, enum: ['pending', 'downloading', 'completed', 'failed'], default: 'pending' },
  progress: { type: Number, default: 0 },
  startedAt: Date,
  completedAt: Date
});

module.exports = mongoose.model('Download', DownloadSchema);