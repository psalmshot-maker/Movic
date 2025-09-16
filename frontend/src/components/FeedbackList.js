import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetch('/api/feedback')
      .then(res => res.json())
      .then(setFeedbacks);

    socket.on('newFeedback', feedback => setFeedbacks(prev => [feedback, ...prev]));
    socket.on('likeFeedback', updated => setFeedbacks(prev => prev.map(fb => (fb._id === updated._id ? updated : fb))));
    socket.on('replyFeedback', updated => setFeedbacks(prev => prev.map(fb => (fb._id === updated._id ? updated : fb))));

    return () => {
      socket.off('newFeedback');
      socket.off('likeFeedback');
      socket.off('replyFeedback');
    };
  }, []);

  async function likeFeedback(id) {
    await fetch(`/api/feedback/${id}/like`, { method: 'POST' });
  }

  async function replyFeedback(id, user, comment) {
    await fetch(`/api/feedback/${id}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, comment })
    });
  }

  return (
    <div className="feedback-list">
      <h3>User Feedback</h3>
      {feedbacks.map(fb => (
        <div key={fb._id} className="feedback-item">
          <strong>{fb.user}</strong>: <span>{fb.comment}</span>
          <button onClick={() => likeFeedback(fb._id)}>👍 {fb.likes}</button>
          {/* Add reply section here */}
          {fb.replies && fb.replies.length > 0 && (
            <div className="replies">
              {fb.replies.map((rep, idx) => (
                <div key={idx} className="reply">
                  <strong>{rep.user}</strong>: {rep.comment}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FeedbackList;