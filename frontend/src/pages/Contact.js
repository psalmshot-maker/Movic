import React from 'react';
import ContactForm from '../components/ContactForm';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackList from '../components/FeedbackList';

function Contact() {
  return (
    <section className="contact">
      <h2>Contact Us</h2>
      <ContactForm />
      <h3>Leave Feedback</h3>
      <FeedbackForm />
      <FeedbackList />
    </section>
  );
}

export default Contact;