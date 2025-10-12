import React from 'react';

const roles = ['Halo Lab', 'Heartbeat', 'Ooze', 'O0 design', 'Clerk'];

const Story = () => {
  return (
    <section id="story" className="section story">
      <div className="container">
        <div className="section-head">
          <h2>I don't have dark secrets, only bright ones</h2>
        </div>
        <div className="story-grid">
          <div className="story-text">
            <p>
              Growing up in Ukraine, my journey into design started on the streets. As a teen, art and graffiti sparked my visual storytelling passion, an architecture degree gave me foundation, and digital design showed new creative depths.
            </p>
            <p>
              Five years later, I moved to Porto. Here, with the ocean breeze, I craft web and brand solutions for tech companies to shine.
            </p>
            <p>
              I partner with dynamic teams reinventing tomorrow, from YC startups to enterprises and bootstrapped founders.
            </p>
          </div>
          <div className="story-roles">
            {roles.map((r) => (
              <div className="role" key={r}>{r}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
