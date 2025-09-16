const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
  title: String,
  url: String,
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  uploadedAt: { type: Date, default: Date.now },
  type: { type: String, enum: ['video', 'audio'] },
  tags: [String],
  views: { type: Number, default: 0 },
  shares: { type: Number, default: 0 }
});

module.exports = mongoose.model('Media', MediaSchema);