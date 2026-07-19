'use client';

import { useEffect } from 'react';
import ParticleWave from './ParticleWave';

export default function HomePage() {
  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) (entry.target as HTMLElement).classList.add('visible');
      });
    }, { threshold: 0.2 });
    revealEls.forEach(el => revealObserver.observe(el));

    function animateSequence(container: HTMLElement, selector: string, staggerMs: number) {
      const items = container.querySelectorAll<HTMLElement>(selector);
      items.forEach((item, i) => setTimeout(() => item.classList.add('show'), i * staggerMs));
      const chip = container.querySelector<HTMLElement>('.status-chip');
      if (chip) setTimeout(() => chip.classList.add('show'), items.length * staggerMs);
    }

    const mockups = document.querySelectorAll<HTMLElement>('[data-animate]');
    const mockupObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting && !el.dataset.played) {
          el.dataset.played = 'true';
          const type = el.dataset.animate;
          if (type === 'call') animateSequence(el, '.caption-line', 400);
          if (type === 'chat') animateSequence(el, '.bubble', 400);
          if (type === 'workflow') animateSequence(el, '.workflow-icon', 300);
          if (type === 'dashboard') {
            el.querySelectorAll<HTMLElement>('.dashboard-stat').forEach((s, i) =>
              setTimeout(() => s.classList.add('show'), i * 150));
          }
        }
      });
    }, { threshold: 0.3 });
    mockups.forEach(m => mockupObserver.observe(m));

    const faqItems = document.querySelectorAll<HTMLElement>('.faq-item');
    faqItems.forEach(item => {
      item.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => {
          i.classList.remove('open');
          const span = i.querySelector('h4 span');
          if (span) span.textContent = '+';
        });
        if (!isOpen) {
          item.classList.add('open');
          const span = item.querySelector('h4 span');
          if (span) span.textContent = '\u2212';
        }
      });
    });

    const testimonials = [
      { quote: '[Placeholder testimonial quote goes here]', name: '[Client Name]', title: '[Client Title / Company]' },
      { quote: '[Placeholder testimonial quote goes here]', name: '[Client Name]', title: '[Client Title / Company]' },
      { quote: '[Placeholder testimonial quote goes here]', name: '[Client Name]', title: '[Client Title / Company]' },
    ];
    let tIndex = 0;
    const card = document.getElementById('testimonial-card') as HTMLElement | null;
    const quoteEl = document.getElementById('testimonial-quote') as HTMLElement | null;
    const nameEl = document.getElementById('testimonial-name') as HTMLElement | null;
    const titleEl = document.getElementById('testimonial-title') as HTMLElement | null;
    const dots = document.querySelectorAll<HTMLElement>('#testimonial-dots .dot');

    const interval = setInterval(() => {
      if (!card || !quoteEl || !nameEl || !titleEl) return;
      card.classList.add('fade');
      setTimeout(() => {
        tIndex = (tIndex + 1) % testimonials.length;
        quoteEl.textContent = '"' + testimonials[tIndex].quote + '"';
        nameEl.textContent = testimonials[tIndex].name;
        titleEl.textContent = testimonials[tIndex].title;
        dots.forEach((d, i) => {
          if (i === tIndex) d.classList.add('active');
          else d.classList.remove('active');
        });
        card.classList.remove('fade');
      }, 400);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <ParticleWave />
      <div style={{ position: 'relative', zIndex: 1 }}>

        <nav>
          <div className="container">
            <div className="logo">EMPOSSIBLE</div>
            <div>
              <a href="#features">Features</a>
              <a href="#process">Process</a>
              <a href="#faq">FAQ</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </nav>

        <section style={{ paddingTop: '160px', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <h1 className="gradient-text" style={{ fontSize: '56px' }}>AI Consulting Designed for Performance and Profit</h1>
            <p style={{ color: 'var(--text-dim)', fontSize: '18px', marginTop: '24px', maxWidth: '620px', marginLeft: 'auto', marginRight: 'auto' }}>
              We build and implement custom AI agents that automate calls, messages, and workflows powered by your own dashboard for full visibility and control.
            </p>
            <a href="#contact" className="btn" style={{ marginTop: '32px' }}>Book a Call</a>
          </div>
        </section>

        <section>
          <div className="container reveal" style={{ textAlign: 'center', maxWidth: '700px' }}>
            <h2 style={{ fontSize: '40px' }}>Built to automate.<br />Designed to perform.</h2>
            <p style={{ color: 'var(--text-dim)', marginTop: '20px', fontSize: '17px' }}>
              Each framework is a building block of your AI infrastructure, designed to automate, connect, and scale your operations with precision.
            </p>
          </div>
        </section>

        <section id="features">
          <div className="container">
            <div className="feature-row">
              <div className="text-col reveal">
                <h3>AI Receptionist</h3>
                <p>Intelligent voice agents that engage, qualify, and convert in real time.</p>
                <div className="sub-feature"><strong>Natural Conversations</strong><span>Understands context and tone, providing human-like voice responses instantly.</span></div>
                <div className="sub-feature"><strong>Smart Lead Routing</strong><span>Identifies caller needs and directs them to the right team automatically.</span></div>
                <div className="sub-feature"><strong>Real-Time Insights</strong><span>Logs every call, sentiment, and action directly into your dashboard for review.</span></div>
                <div className="sub-feature"><strong>Always Available</strong><span>Handles inbound inquiries 24/7 with consistent quality and zero downtime.</span></div>
              </div>
              <div className="mockup-col">
                <div className="mockup-card" data-animate="call">
                  <div className="caption-line">Incoming call... connected</div>
                  <div className="caption-line">Caller: &quot;Hey, I need a quote for a 3-bedroom job.&quot;</div>
                  <div className="caption-line">Agent: &quot;Happy to help, can I get your address and preferred date?&quot;</div>
                  <div className="caption-line">Caller: &quot;Sure, it&apos;s 142 Oak St, this Friday works.&quot;</div>
                  <div className="caption-line">Agent: &quot;Perfect, you&apos;re booked for Friday at 10 AM.&quot;</div>
                  <div className="status-chip">Call booked</div>
                </div>
              </div>
            </div>

            <div className="feature-row reverse">
              <div className="text-col reveal">
                <h3>AI Chat Assistant</h3>
                <p>Conversational AI built to automate support and boost conversions.</p>
                <div className="sub-feature"><strong>Human-Like Replies</strong><span>Responds naturally across channels while maintaining your brand&apos;s tone.</span></div>
                <div className="sub-feature"><strong>Smart Knowledge Base</strong><span>Uses trained data to answer questions instantly and reduce support workload.</span></div>
                <div className="sub-feature"><strong>Context Retention</strong><span>Remembers interactions to create smooth, continuous customer experiences.</span></div>
                <div className="sub-feature"><strong>Performance Tracking</strong><span>Measures chat volume, response rate, and satisfaction inside one unified dashboard.</span></div>
              </div>
              <div className="mockup-col">
                <div className="mockup-card" data-animate="chat">
                  <div className="bubble user">Do you have availability this week?</div>
                  <div className="bubble bot">Yes! We have an opening Thursday at 2 PM.</div>
                  <div className="bubble user">That works, book me in.</div>
                  <div className="bubble bot">You&apos;re all set for Thursday at 2 PM.</div>
                  <div className="status-chip">Task completed</div>
                </div>
              </div>
            </div>

            <div className="feature-row">
              <div className="text-col reveal">
                <h3>Workflow Automations</h3>
                <p>Connected systems that eliminate manual work and drive efficiency.</p>
                <div className="sub-feature"><strong>Seamless Integrations</strong><span>Connects CRMs, forms, and apps to automate repetitive business operations.</span></div>
                <div className="sub-feature"><strong>Custom Triggers</strong><span>Executes precise actions automatically based on data changes or user activity.</span></div>
                <div className="sub-feature"><strong>Time Optimization</strong><span>Replaces hours of manual tasks with intelligent end-to-end workflow logic.</span></div>
                <div className="sub-feature"><strong>Unified Dashboard</strong><span>Monitors automation status, success rates, and ROI metrics in one place.</span></div>
              </div>
              <div className="mockup-col">
                <div className="mockup-card" data-animate="workflow">
                  <div className="workflow-grid">
                    <div className="workflow-line"></div>
                    <div className="workflow-icon">📋</div>
                    <div className="workflow-icon">⚡</div>
                    <div className="workflow-icon">🔗</div>
                    <div className="workflow-icon">📊</div>
                  </div>
                  <div className="status-chip center">Workflow completed</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="feature-row">
              <div className="text-col reveal">
                <h3>The command center.<br />Your business, made visible.</h3>
                <p>A unified dashboard that gives you real-time visibility into calls, messages, automations, and performance, so every decision is data-driven.</p>
                <div className="sub-feature"><strong>Unified Intelligence</strong><span>See every AI agent, workflow, and data source in one seamless interface.</span></div>
                <div className="sub-feature"><strong>Real-Time Insights</strong><span>Get instant performance metrics, response rates, and automation impact updated live.</span></div>
                <div className="sub-feature"><strong>Total Control</strong><span>Adjust, pause, or optimize automations instantly, all from your central dashboard.</span></div>
              </div>
              <div className="mockup-col">
                <div className="dashboard-mock" data-animate="dashboard">
                  <div className="dashboard-stat"><span>Calls Handled Today</span><b>128</b></div>
                  <div className="dashboard-stat"><span>Messages Automated</span><b>342</b></div>
                  <div className="dashboard-stat"><span>Active Workflows</span><b>17</b></div>
                  <div className="dashboard-stat"><span>Avg Response Time</span><b>4s</b></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container reveal" style={{ textAlign: 'center', maxWidth: '700px' }}>
            <div className="eyebrow">Results</div>
            <h2 style={{ fontSize: '40px' }}>Proof in motion.<br />Clarity in numbers.</h2>
            <p style={{ color: 'var(--text-dim)', marginTop: '20px', fontSize: '17px' }}>
              We measure success through real performance data, showing tangible results that validate every system we design.
            </p>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="testimonial-card" id="testimonial-card">
              <p id="testimonial-quote">&quot;[Placeholder testimonial quote goes here]&quot;</p>
              <strong id="testimonial-name">[Client Name]</strong>
              <div style={{ color: 'var(--text-dim)', fontSize: '14px' }} id="testimonial-title">[Client Title / Company]</div>
            </div>
            <div className="testimonial-dots" id="testimonial-dots">
              <div className="dot active"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        </section>

        <section id="process">
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '60px' }}>
              <div className="eyebrow">Process</div>
              <h2 style={{ fontSize: '40px' }}>The blueprint.<br />Behind every system.</h2>
              <p style={{ color: 'var(--text-dim)', marginTop: '20px', fontSize: '17px' }}>
                A clear three-step process that moves every project from discovery to seamless automation and measurable business growth.
              </p>
            </div>
            <div className="process-step reveal">
              <div className="process-num">01</div>
              <div><h4 style={{ fontSize: '20px', marginBottom: '6px' }}>Analyze Operations</h4><p style={{ color: 'var(--text-dim)' }}>We identify inefficiencies and uncover automation opportunities instantly.</p></div>
            </div>
            <div className="process-step reveal reveal-delay-1">
              <div className="process-num">02</div>
              <div><h4 style={{ fontSize: '20px', marginBottom: '6px' }}>Design Frameworks</h4><p style={{ color: 'var(--text-dim)' }}>We create intelligent structures precisely tailored for operational excellence.</p></div>
            </div>
            <div className="process-step reveal reveal-delay-2">
              <div className="process-num">03</div>
              <div><h4 style={{ fontSize: '20px', marginBottom: '6px' }}>Optimize Performance</h4><p style={{ color: 'var(--text-dim)' }}>We launch, monitor, and continuously optimize for measurable growth.</p></div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="reveal" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 60px' }}>
              <h2 style={{ fontSize: '40px' }}>Every benefit.<br />Backed by design.</h2>
              <p style={{ color: 'var(--text-dim)', marginTop: '20px', fontSize: '17px' }}>
                We align strategy, automation, and measurable outcomes, ensuring every build drives long-term business performance and scalability.
              </p>
            </div>
            <div className="grid-3">
              <div className="card reveal"><h4>Increased Efficiency</h4><p>Automate repetitive tasks to save hours and streamline daily operations effortlessly.</p></div>
              <div className="card reveal reveal-delay-1"><h4>Smarter Decisions</h4><p>Gain real-time insights and make data-backed choices with confidence.</p></div>
              <div className="card reveal reveal-delay-2"><h4>Seamless Integration</h4><p>Connect every system you use from CRM to communication in one automated flow.</p></div>
              <div className="card reveal"><h4>Consistent Communication</h4><p>Ensure every message, response, and client interaction stays fast and accurate.</p></div>
              <div className="card reveal reveal-delay-1"><h4>Scalable Growth</h4><p>Systems that evolve with your business, no limits, just continuous improvements.</p></div>
              <div className="card reveal reveal-delay-2"><h4>Cost Reduction</h4><p>Reduce manual labor and eliminate inefficiencies that drain time and budget.</p></div>
            </div>
          </div>
        </section>

        <section id="faq">
          <div className="container" style={{ maxWidth: '700px' }}>
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '60px' }}>
              <div className="eyebrow">FAQs</div>
              <h2 style={{ fontSize: '40px' }}>Everything clear.<br />Before the first call.</h2>
              <p style={{ color: 'var(--text-dim)', marginTop: '20px', fontSize: '17px' }}>
                Every system starts with understanding. Here&apos;s everything worth knowing before we begin.
              </p>
            </div>
            <div id="faq-list">
              <div className="faq-item"><h4>Who is this for? <span>+</span></h4><div className="faq-answer">Businesses looking to automate calls, messages, and repetitive workflows without hiring more staff.</div></div>
              <div className="faq-item"><h4>How long does setup take? <span>+</span></h4><div className="faq-answer">Most systems go from discovery to live automation within a few weeks, depending on complexity.</div></div>
              <div className="faq-item"><h4>Do I need technical knowledge? <span>+</span></h4><div className="faq-answer">No. We handle the build and give you a simple dashboard to monitor everything.</div></div>
              <div className="faq-item"><h4>What makes this different from other AI tools? <span>+</span></h4><div className="faq-answer">Every system is custom-built around your operations, not a generic template.</div></div>
              <div className="faq-item"><h4>What results can I expect? <span>+</span></h4><div className="faq-answer">Faster response times, fewer manual tasks, and clear before/after performance data.</div></div>
            </div>
          </div>
        </section>

        <section id="contact" className="footer-cta">
          <div className="container reveal">
            <h2>Simple systems.<br />Powerful outcomes.</h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '17px', marginBottom: '32px' }}>
              Designed to run quietly, scale effortlessly, and deliver results that speak for themselves.
            </p>
            <a href="mailto:hello@empossible.com" className="btn">Get Started</a>
          </div>
        </section>

      </div>
    </>
  );
}
