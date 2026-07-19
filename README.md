# EMPOSSIBLE AI Website (Static HTML/CSS/JS)

Plain HTML/CSS/JS site with scroll-triggered motion effects (no framework, no build step) recreating the animated call transcript, chat thread, workflow diagram, and live dashboard sections.

## Structure
- `index.html` — all page content and sections
- `styles.css` — dark theme styling + animation states
- `script.js` — IntersectionObserver-based scroll reveals, sequential mockup animations, testimonial rotator, FAQ accordion

## Deploy: GitHub then Vercel

1. Push to GitHub:
```
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/empossible-ai-html.git
git push -u origin main
```

2. In Vercel: "Add New Project" → import this repo → Framework Preset: **Other** (static site) → Deploy. No build command needed since it's plain HTML/CSS/JS.

## Editing content
- Section text/headlines: edit directly in `index.html`
- Testimonial placeholder quotes: edit the `testimonials` array in `script.js`
- FAQ answers: edit the `.faq-item` blocks in `index.html`
- Colors/spacing: edit `styles.css`
