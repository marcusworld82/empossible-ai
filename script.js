document.addEventListener('DOMContentLoaded', function () {

  // Generic scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });
  revealEls.forEach(el => revealObserver.observe(el));

  // Sequential line/bubble/icon animations inside mockups
  function animateSequence(container, selector, staggerMs) {
    const items = container.querySelectorAll(selector);
    items.forEach((item, i) => {
      setTimeout(() => item.classList.add('show'), i * staggerMs);
    });
    const chip = container.querySelector('.status-chip');
    if (chip) {
      setTimeout(() => chip.classList.add('show'), items.length * staggerMs);
    }
  }

  const mockups = document.querySelectorAll('[data-animate]');
  const mockupObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.played) {
        entry.target.dataset.played = 'true';
        const type = entry.target.dataset.animate;
        if (type === 'call') animateSequence(entry.target, '.caption-line', 400);
        if (type === 'chat') animateSequence(entry.target, '.bubble', 400);
        if (type === 'workflow') animateSequence(entry.target, '.workflow-icon', 300);
        if (type === 'dashboard') {
          const stats = entry.target.querySelectorAll('.dashboard-stat');
          stats.forEach((s, i) => setTimeout(() => s.classList.add('show'), i * 150));
        }
      }
    });
  }, { threshold: 0.3 });
  mockups.forEach(m => mockupObserver.observe(m));

  // Testimonial rotator
  const testimonials = [
    { quote: '[Placeholder testimonial quote goes here]', name: '[Client Name]', title: '[Client Title / Company]' },
    { quote: '[Placeholder testimonial quote goes here]', name: '[Client Name]', title: '[Client Title / Company]' },
    { quote: '[Placeholder testimonial quote goes here]', name: '[Client Name]', title: '[Client Title / Company]' },
  ];
  let tIndex = 0;
  const card = document.getElementById('testimonial-card');
  const quoteEl = document.getElementById('testimonial-quote');
  const nameEl = document.getElementById('testimonial-name');
  const titleEl = document.getElementById('testimonial-title');
  const dots = document.querySelectorAll('#testimonial-dots .dot');

  function updateTestimonial() {
    card.classList.add('fade');
    setTimeout(() => {
      tIndex = (tIndex + 1) % testimonials.length;
      quoteEl.textContent = '"' + testimonials[tIndex].quote + '"';
      nameEl.textContent = testimonials[tIndex].name;
      titleEl.textContent = testimonials[tIndex].title;
      dots.forEach((d, i) => d.classList.toggle('active', i === tIndex));
      card.classList.remove('fade');
    }, 400);
  }
  setInterval(updateTestimonial, 4000);

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('h4 span').textContent = '+';
      });
      if (!isOpen) {
        item.classList.add('open');
        item.querySelector('h4 span').textContent = '\u2212';
      }
    });
  });

});
