const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const mediaRoutes = require('./routes/media');
const playlistRoutes = require('./routes/playlist');
const feedbackRoutes = require('./routes/feedback');
const notificationRoutes = require('./routes/notification');
const downloadRoutes = require('./routes/download');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

mongoose.connect('mongodb://localhost/movic', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

app.set('io', io);

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/playlist', playlistRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/notification', notificationRoutes);
app.use('/api/download', downloadRoutes);

io.on('connection', (socket) => {
  socket.on('register', (username) => {
    socket.join(username);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));