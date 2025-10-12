import React from 'react';

const Navbar = () => {
  return (
    <header className="nav">
      <div className="container nav-row">
        <div className="nav-left">
          <a href="#top" className="brand">Daniel Sun</a>
        </div>
        <nav className="nav-right">
          <a href="#work">Work</a>
          <a href="#story">Story</a>
          <a href="#process">Process</a>
          <a href="#contact">Connect</a>
          <a className="btn btn-primary" href="mailto:hello@example.com">Start project</a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
