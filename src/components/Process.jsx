import React from 'react';

const steps = [
  { n: '01', t: 'Discovery', d: 'Understand vision, audience, constraints, and goals.' },
  { n: '02', t: 'Direction', d: 'Moodboards, visual directions, and strategic positioning.' },
  { n: '03', t: 'Design', d: 'Iterative design of brand and web with feedback loops.' },
  { n: '04', t: 'Build', d: 'Responsive implementation with attention to performance.' },
  { n: '05', t: 'Launch', d: 'QA, handoff, and post-launch support.' },
];

const Process = () => {
  return (
    <section id="process" className="section process">
      <div className="container">
        <div className="section-head">
          <h2>What my perfect collab looks like</h2>
        </div>
        <div className="grid steps">
          {steps.map((s) => (
            <div className="step" key={s.n}>
              <div className="step-n">{s.n}</div>
              <div className="step-body">
                <h3>{s.t}</h3>
                <p className="muted">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
