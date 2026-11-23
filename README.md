# Applied AI Guide

Participant guide website for **Applied AI for Automation and Decision Support**, a three-day government workforce training in Bacolod City, November 24 to 26, 2026.

The content comes from the training's Participant Guide and Lesson Plan. It covers the schedule session by session, the topic modules (A to G), the hands-on labs, the capstone, and reference pages. Checklists, worksheets, the prompt builder, the prompt library and the exercises save to the participant's own browser (`localStorage`, keys prefixed `aag:`). Nothing is sent anywhere.

## Run it locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the build
npm run lint
```

Node 20 or newer.

## Deploy to Vercel

The project is a Vite single-page app. `vercel.json` rewrites every path to `index.html`, so deep links such as `/day-2` or `/capstone#rubric` load directly.

**From the dashboard**

1. Push this folder to a GitHub, GitLab or Bitbucket repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Vercel detects Vite. Keep the defaults: build command `npm run build`, output directory `dist`.
4. Deploy. Later pushes to the main branch redeploy automatically.

**From the command line**

```bash
npm i -g vercel
vercel          # first run links the project and makes a preview deployment
vercel --prod   # production deployment
```

## Where things are

| Path | What it holds |
| --- | --- |
| `src/data/course.js` | Dates, venue, outcomes, the data rule, the three days and their sessions |
| `src/data/setup.js` | Preparation checklists, things to think about, sample datasets |
| `src/data/modules.js` | Modules B to G: models, agents, local AI, data protection, MCP, skills |
| `src/data/certificates.js` | The certificate activity, its prompt and the reference Apps Script |
| `src/data/reference.js` | R-T-C-F-C, glossary, laws, tools, FAQ, capstone, rubric, assessment |
| `src/data/tracking.js` | Every checklist and worksheet by id, shared with the My progress page |
| `src/data/nav.js` | Sidebar groups, page order and the search index |
| `src/pages/` | One component per page; `DayPage.jsx` serves all three days |
| `src/styles/` | `tokens.css` and `base.css` (design tokens), `app.css` (everything else) |

To change a time, a price or a fact, edit the data file. The pages read from it.

## Notes for trainers

- The live "Now" marker and the status on the overview use Philippine time (`Asia/Manila`).
- The Data Traffic Light suggested answers and the cloud-or-local suggestions are discussion starters. Check them before the session.
- Help contacts are listed by role only. Add names and numbers in `helpContacts` in `src/data/reference.js` if you want them on the site.
- The pre and post assessment answers are not in the guide.
