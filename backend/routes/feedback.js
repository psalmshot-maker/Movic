const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const Notification = require('../models/Notification');

// Submit feedback
router.post('/', async (req, res) => {
  const feedback = new Feedback({
    user: req.body.user || "Anonymous",
    comment: req.body.comment
  });
  await feedback.save();
  req.app.get('io').emit('newFeedback', feedback);
  res.status(201).json({ message: 'Feedback submitted!', feedback });
});

// Like feedback
router.post('/:id/like', async (req, res) => {
  const feedback = await Feedback.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true });
  req.app.get('io').emit('likeFeedback', feedback);

  if (feedback.user !== req.body.user) {
    const notification = new Notification({
      user: feedback.user,
      type: 'like',
      message: `${req.body.user || "Someone"} liked your feedback.`
    });
    await notification.save();
    req.app.get('io').to(feedback.user).emit('notification', notification);
  }
  res.json(feedback);
});

// Reply to feedback
router.post('/:id/reply', async (req, res) => {
  const reply = { user: req.body.user || "Anonymous", comment: req.body.comment };
  const feedback = await Feedback.findByIdAndUpdate(
    req.params.id,
    { $push: { replies: reply } },
    { new: true }
  );
  req.app.get('io').emit('replyFeedback', feedback);

  if (feedback.user !== req.body.user) {
    const notification = new Notification({
      user: feedback.user,
      type: 'reply',
      message: `${req.body.user || "Anonymous"} replied to your comment.`
    });
    await notification.save();
    req.app.get('io').to(feedback.user).emit('notification', notification);
  }

  res.json(feedback);
});

// Get all feedback
router.get('/', async (req, res) => {
  const feedbacks = await Feedback.find().sort({ createdAt: -1 });
  res.json(feedbacks);
});

module.exports = router;