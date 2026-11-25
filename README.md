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

## Sharing previews and search

`index.html` carries the description, Open Graph and Twitter tags, and the favicons (`public/favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, `site.webmanifest`). The share image is `public/og-image.png` (1200 x 630).

Social sites need absolute links, so the build adds them: the canonical link, `og:url`, `og:image`, `twitter:image`, event details for search engines (JSON-LD), `robots.txt` and `sitemap.xml`. The address defaults to `https://dict-ai-automation.vercel.app` (`DEFAULT_SITE_URL` in `vite.config.js`). To use another domain, set `SITE_URL` in the Vercel project's environment variables, for example `https://guide.example.gov.ph`, and redeploy.

After deploying, check a link with the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) and press **Scrape Again** if an old preview is cached.

## Where things are

| Path | What it holds |
| --- | --- |
| `src/data/course.js` | Dates, venue, outcomes, the data rule, the three days and their sessions |
| `src/data/setup.js` | Preparation checklists, things to think about, sample datasets |
| `src/data/modules.js` | Modules B to G: models, agents, local AI, data protection, MCP, skills |
| `src/data/certificates.js` | The certificate activity, its prompt and the reference Apps Script |
| `src/data/dataWebsite.js` | The Day 3 data website lab: datasets, steps, prompts, slop check |
| `src/data/gov-data-website-skill.md` | The design skill; copied to `public/materials/day-3/` as the .md and the Claude .zip |
| `public/api/v1/` | The training data API: four PSA OpenSTAT tables as JSON and CSV, served with open CORS (see `vercel.json`). Refresh with `python3 scripts/fetch-psa.py public/api/v1` |
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
