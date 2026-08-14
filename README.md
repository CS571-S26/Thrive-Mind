# 🌿 Thrive Mind

Thrive Mind is a client-side mental wellness platform built for college students. It combines a non-diagnostic mood check-in, an explainable rule-based recommendation engine, mood history and trend tracking, self-care habit tracking, and curated (and verified) campus support resources in a single accessible interface.

[**Live site**](https://cs571-s26.github.io/Thrive-Mind/) · [Run it locally](#️-run-it-locally) · [Architecture](#-architecture)

## ✨ Features

- **Home** — a needs-based landing page ("I'm feeling overwhelmed", "I feel lonely", etc.) that routes straight to the relevant help
- **Mood Quiz** — a short check-in (explicitly **not** a diagnostic tool) that scores five categories — Mood, Energy, Sleep, Connection, Stress — and surfaces the one worth focusing on today
- **My Wellness** — a personal dashboard pulling together your mood trend, self-care streak, and the same rule-based recommendations from your last check-in
- **Mental Health Issues** — plain-language explanations of stress, academic pressure, anxiety, burnout, procrastination, loneliness, homesickness, and more, with sourced links to UW–Madison UHS, NIMH, SAMHSA, CDC, and NAMI
- **Resources** — a verified UW–Madison support table (crisis line, counseling, Let's Talk, and more) plus crisis hotlines, therapist finders, apps, and educational links
- **Self-Care Planner** — track small daily wellness habits, with a streak and monthly total
- **About Us** — who built Thrive Mind, why, and how to reach us

## 🧭 Architecture

This is a static, client-only React app — there's no backend or database. All state lives in the browser and persists via `localStorage`.

```
┌──────────────────────────────────────────────────────────────┐
│                            React UI                            │
│   Home · Mood Quiz · My Wellness · Issues · Resources ·        │
│                Self-Care Planner · About Us                    │
└─────────────────────────────┬──────────────────────────────────┘
                               │  React Router (client-side routing,
                               │  deep-linkable via query params)
┌─────────────────────────────┴──────────────────────────────────┐
│                      Utility / logic layer                      │
│  moodHistory.js        — mood entries, trend, focus, insights    │
│  selfCareHistory.js    — dated habit history, streaks, totals    │
│  recommendations.js    — rule-based recommendation engine        │
└─────────────────────────────┬──────────────────────────────────┘
                               │
                      window.localStorage
```

Each page component reads/writes through the utility layer rather than touching `localStorage` directly, which is what makes the recommendation engine below reusable in two different UI contexts (Mood Quiz results and the Dashboard) without duplicating logic.

## 🧠 Explainable, rule-based recommendation engine

The Mood Quiz and Dashboard don't use AI. Recommendations come from a small, fully explainable lookup — every suggestion can be traced back to a specific rule:

```
question responses
      │
      ▼
category scores  (Mood · Energy · Sleep · Connection · Stress)
      │
      ▼
overall %  →  result tier (struggling · down · okay · good)
      │
      ▼
lowest-scoring category  →  "focus" category
      │
      ▼
rule-based action selection  (reset · reconnect · learn · get support)
      │
      ▼
3 recommended actions, each linking to a real page in the app
```

For example: a check-in scoring Stress 25%, Sleep 50%, Connection 75% sets **Stress** as the focus category, which maps to a stress-management reading suggestion; a Connection score above 60% skips the "reach out to someone" nudge (no point suggesting it to someone already well-connected); and a "down" result tier adds a campus-counselor suggestion as the closing action. The code comments on this intentionally: `recommendations.js` describes itself as "a small, fully rule-based recommendation engine — no AI, just an explainable lookup," and `moodHistory.js`'s pattern-detection helper is documented as "a simple, explainable, rule-based nudge — not a diagnosis, just a pattern flag."

## 🔗 Access the live site

Thrive Mind is deployed with GitHub Pages: **https://cs571-s26.github.io/Thrive-Mind/**

No installation needed — just open the link in a browser.

## 🛠️ Run it locally

```bash
git clone git@github.com:CS571-S26/Thrive-Mind.git
cd Thrive-Mind
npm install
npm run dev
```

This starts a local dev server (Vite) with hot reload, printed in your terminal — typically `http://localhost:5173`.

## ✅ Testing

```bash
npm test
```

Runs the [Vitest](https://vitest.dev/) suite covering the app's core logic: mood scoring and category breakdown, the recommendation engine's rule selection, trend and streak calculation, and dashboard empty-state handling.

## 📦 Build & deploy

```bash
npm run build
```

This outputs a production build into the `docs/` folder, which is what GitHub Pages serves directly from the `main` branch. Commit and push the rebuilt `docs/` folder to publish changes to the live site.

## 🧰 Tech stack

- [React](https://react.dev/) + [React Router](https://reactrouter.com/) for the UI and page navigation
- [React Bootstrap](https://react-bootstrap.github.io/) for components and layout
- [Vite](https://vite.dev/) for local dev and production builds
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react) for testing
- `localStorage` as the persistence layer — no backend, no database

## ♿ Accessibility

Thrive Mind is designed with accessibility in mind: semantic heading structure, ARIA labeling on progress indicators, decorative emoji marked `aria-hidden`, visible focus outlines on every interactive element, and animations that respect `prefers-reduced-motion`. This hasn't yet gone through a full manual audit (keyboard-only walkthrough, screen reader pass, contrast verification) — that's next on the list below.

## 🗺️ Possible next steps

- **Automated CI/CD** — a GitHub Actions workflow (lint → test → build → deploy) instead of manually rebuilding and committing `docs/`
- **A full accessibility audit** — actually testing keyboard navigation, screen readers, and color contrast, not just designing for them
- **A backend, if there's a real reason for one** — user accounts and cloud-synced history would make the data model meaningfully better, but a wellness app collecting real personal mental-health data carries real privacy and security responsibility. Not worth adding just to look more sophisticated — an anonymous/demo-account model would be the honest way to do it if this grows further.

## 💬 Contact

Built by Ishita and Charith, students at UW-Madison. Questions, feedback, or ideas? Reach out via the **About Us** page in the app, or email:

- ishafyiw@gmail.com
- charithpareddy@gmail.com
