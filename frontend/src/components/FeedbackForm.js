import React, { useState } from 'react';

function FeedbackForm() {
  const [form, setForm] = useState({ user: '', comment: '' });
  const [message, setMessage] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      setMessage(data.message);
      setForm({ user: '', comment: '' });
    } catch (error) {
      setMessage('Failed to submit feedback.');
    }
  }

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <input type="text" name="user" placeholder="Your Name (optional)" value={form.user} onChange={handleChange} />
      <textarea name="comment" placeholder="Your Feedback" value={form.comment} onChange={handleChange} required />
      <button type="submit">Send Feedback</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default FeedbackForm;