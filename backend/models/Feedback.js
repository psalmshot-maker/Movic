const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
  user: { type: String, default: 'Anonymous' },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const FeedbackSchema = new mongoose.Schema({
  user: { type: String, default: 'Anonymous' },
  comment: { type: String, required: true },
  likes: { type: Number, default: 0 },
  replies: [ReplySchema],
  createdAt: { type: Date, default: Date.now },
  flagged: { type: Boolean, default: false }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);