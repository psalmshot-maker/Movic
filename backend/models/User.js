const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: String,
  password: String,
  avatar: String,
  bio: String,
  theme: { type: String, enum: ['dark', 'light'], default: 'dark' },
  language: { type: String, default: 'en' },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Media' }],
  playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }],
  downloads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Media' }],
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

module.exports = mongoose.model('User', UserSchema);