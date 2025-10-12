import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="cta">
          <h2>Tap this 'tiny' button to highlight your product =)</h2>
          <div className="cta-actions">
            <a className="btn btn-primary" href="mailto:hello@example.com">Connect</a>
            <a className="btn" href="#work">See work</a>
          </div>
        </div>
        <div className="contact-grid">
          <div>
            <h3>Email</h3>
            <a className="link" href="mailto:hello@example.com">hello@example.com</a>
          </div>
          <div>
            <h3>Insights</h3>
            <a className="link" href="https://x.com" target="_blank" rel="noreferrer">X (Twitter)</a>
          </div>
          <div>
            <h3>Social</h3>
            <a className="link" href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
