# Project Setup Guide

This repo currently contains a plain HTML/CSS/JS site. To use the React components in `/components/ui`, you need to migrate to a React + TypeScript + Tailwind CSS + shadcn project. Follow the steps below.

---

## 1. Initialize a New shadcn Project

Run this in your terminal (in a new folder or overwrite this repo locally):

```bash
npx shadcn@latest init
```

When prompted, choose:
- **TypeScript**: Yes
- **Style**: Default (or New York)
- **Base color**: your preference
- **CSS variables**: Yes

This scaffolds a Next.js + Tailwind + TypeScript project with shadcn preconfigured.

---

## 2. Why `/components/ui` Matters

shadcn uses `/components/ui` as its **default output directory** for all generated components. Keeping your custom components here ensures:
- Consistent import paths using `@/components/ui/...`
- shadcn CLI can coexist without conflicts
- Vercel and Next.js resolve aliases correctly via `tsconfig.json` path mapping

If this folder doesn't exist, create it:

```bash
mkdir -p components/ui
```

---

## 3. Install Tailwind CSS (if not already installed)

If you initialized via shadcn CLI, Tailwind is already set up. If not:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Add this to `tailwind.config.ts`:

```ts
content: [
  './app/**/*.{ts,tsx}',
  './components/**/*.{ts,tsx}',
  './pages/**/*.{ts,tsx}',
],
```

Add Tailwind directives to `globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 4. Install TypeScript (if not already installed)

```bash
npm install -D typescript @types/react @types/node
npx tsc --init
```

Make sure `tsconfig.json` includes the path alias:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

## 5. Install the `three` Dependency

```bash
npm install three
npm install -D @types/three
```

---

## 6. Copy Component Files

The following files are already in this repo:

- `components/ui/particle-wave.tsx` — the Three.js particle wave component
- `components/ui/demo.tsx` — a demo wrapper page

---

## 7. Use the Component

In any page (e.g., `app/page.tsx`):

```tsx
import { DemoOne } from '@/components/ui/demo';

export default function Home() {
  return <DemoOne />;
}
```

---

## 8. Deploy to Vercel

1. Push this repo to GitHub (already done)
2. Go to [vercel.com](https://vercel.com) and import the repo
3. Vercel auto-detects Next.js — no extra config needed
4. Click **Deploy**

---

## Component Notes

- **Responsive**: Canvas fills `100vw x 100vh`, auto-resizes on window resize
- **Theme-aware**: Reads `dark` class on `<html>` to switch between white/black particles
- **Mouse interaction**: Tracks mouse position (hook into shader for future interaction)
- **Cleanup**: Properly disposes Three.js geometry, material, and renderer on unmount
