# 💻 yash.dev — VS Code Portfolio

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat&logo=threedotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

A developer portfolio built to look and feel exactly like Visual Studio Code — complete with a 3D animated background, file explorer, tabs, syntax highlighting, a live terminal, and a status bar.

**Live:** [https://portfolio-v5-vs.vercel.app](https://portfolio-v5-vs.vercel.app)

## What's Inside

The portfolio is structured as a VS Code workspace. Each "file" in the explorer maps to a section of my profile:

- `README.md` — Profile overview, career goal, core stack
- `skills.json` — Technical skills rendered as interactive cards
- `projects.py` — Featured projects in a Python class structure
- `career_timeline.tsx` — Work experience and education timeline

Each file has two view modes: a rich **Preview** (formatted UI) and a **Code** view with syntax highlighting — toggled via the breadcrumb bar.

## Features

- Three.js 3D background — floating icosahedron nodes with particle field and connecting edges
- Full VS Code chrome — title bar, activity bar, file explorer sidebar, editor tabs, breadcrumbs, terminal panel, and blue status bar
- Boot sequence loading screen on first visit
- Live terminal with randomly cycling backend-flavoured log messages
- User profile popup on activity bar hover — shows availability status
- Mobile responsive — sidebar collapses to a hamburger menu on small screens
- Reduced particle count on mobile for performance

## Tech Stack

- **React + Vite** — component architecture and fast builds
- **Three.js** — 3D scene, particles, icosahedron meshes
- **Tailwind CSS** — utility-first styling with VS Code colour tokens
- **Lucide React** — VS Code-accurate icon set
- **Vercel** — deployment, auto-deploys on push to `main`

## Running Locally

```bash
git clone https://github.com/Yashdafade/yash.dev.git
cd yash.dev
npm install
npm run dev
```

Open http://localhost:5173
