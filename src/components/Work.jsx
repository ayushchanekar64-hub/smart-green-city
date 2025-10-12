import React from 'react';

const cases = [
  { title: 'Ruby', tags: 'Branding, Web design, Development' },
  { title: 'Stimulate', tags: 'Branding, Web design, Illustrations, Development' },
  { title: 'Caldera', tags: 'Web design, Development' },
  { title: 'Reward Point', tags: 'Web design, Illustrations' },
  { title: 'Memex', tags: 'Brand & product refresh, Web design' },
  { title: 'Pix AI', tags: 'Branding, Illustrations' },
  { title: 'Polpis Systems', tags: 'Web design, Visual direction' },
  { title: 'Quantia', tags: 'Web design, Visual direction, Illustrations' },
  { title: 'Hily', tags: 'Branding, visual direction' },
  { title: 'Deepengine', tags: 'Web design, Visual direction, Illustrations' },
];

const Work = () => {
  return (
    <section id="work" className="section work">
      <div className="container">
        <div className="section-head">
          <h2>My latest work</h2>
          <p className="muted">from 2020 'til today</p>
        </div>
        <div className="grid cases">
          {cases.map((c, i) => (
            <div className="case-card" key={i}>
              <div className="case-thumb placeholder" aria-hidden="true" />
              <div className="case-meta">
                <h3>{c.title}</h3>
                <p className="muted">{c.tags}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="muted center">New cases are on the way, slowly but surely 😅</p>
      </div>
    </section>
  );
};

export default Work;
