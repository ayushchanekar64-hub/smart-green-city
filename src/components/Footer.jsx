import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-left">
          <div className="brand">Daniel Sun</div>
          <div className="foot-links">
            <a href="https://dribbble.com/daniel_sun" target="_blank" rel="noreferrer">Design</a>
            <a href="https://www.threads.net/@daniel.sun_design" target="_blank" rel="noreferrer">Youth</a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">Nerdville</a>
          </div>
        </div>
        <div className="footer-right">
          <nav className="footer-nav">
            <a href="#work">Work</a>
            <a href="#story">Story</a>
            <a href="#process">Process</a>
            <a href="#contact">Connect</a>
            <a className="btn btn-primary" href="mailto:hello@example.com">Start project</a>
          </nav>
        </div>
      </div>
      <div className="container tiny">
        <p className="muted">© {new Date().getFullYear()} Your Name. Unofficial clone for educational use.</p>
      </div>
    </footer>
  );
};

export default Footer;
