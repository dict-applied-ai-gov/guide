// Day 3 lesson: an AI-assisted data analysis and visualization website built on public
// Philippine government data (PSA OpenSTAT), with a design skill that cuts AI slop.
// The training API in public/api/v1 holds copies of four PSA tables, refreshed with
// scripts/fetch-psa.py. The live PSA OpenSTAT API also allows browser requests (CORS open).

export const API_BASE = "https://dict-ai-automation.vercel.app/api/v1";
export const PSA_BASE = "https://openstat.psa.gov.ph/PXWeb/api/v1/en/DB";

export const webObjectives = [
  "Find a question that public government data can answer, and pick the dataset that answers it.",
  "Ask AI for trends and outliers, then check the numbers yourself before you believe them.",
  "Build a one-page data website from a live data link, with no coding.",
  "Use a skill to make the AI fix what looks generated: vague headlines, decoration, misleading charts, no source.",
  "Write three checked insights and the decision they could support, with a person accountable for it.",
];

export const webWords = [
  ["API", "A web address that returns data instead of a page. Your website reads the data from it, so the numbers are never typed by hand."],
  ["JSON and CSV", "Two ways to write a table as text. JSON is for websites; CSV opens in Sheets or Excel."],
  ["PSA OpenSTAT", "The Philippine Statistics Authority’s free statistics database. It has an API anyone can use, with no key."],
  ["Training API", "Copies of four PSA tables on this guide’s website, so the lab still works if the venue Wi-Fi or the PSA server is slow."],
  ["AI slop", "Output that looks finished but says little: vague headlines, invented numbers, decoration, charts that mislead, no source."],
  ["Skill", "A file of instructions the AI reads before it works. Claude loads it as a skill; other AI tools take it as system instructions."],
];

export const webTiming = [
  ["Part 1", "Pick a question and a dataset", "10 min"],
  ["Part 2", "Ask AI about the data, and check two numbers", "15 min"],
  ["Part 3", "Build the website in AI Studio", "20 min"],
  ["Part 4", "Load the design skill and fix the slop", "20 min"],
  ["Part 5", "Three checked insights, share, and clean up", "10 min"],
];

export const datasets = [
  {
    id: "population",
    title: "Population, 2010 to 2024 censuses",
    covers: "Every region, province, city, and municipality: population in 2010, 2015, 2020, and 2024, and the yearly growth rate.",
    question: "Which towns in Negros Occidental grew fastest since 2020, and which shrank?",
    rows: "1,528 rows",
  },
  {
    id: "poverty",
    title: "Poverty incidence, 2018, 2021, 2023",
    covers: "Share of people below the poverty line, and the poverty threshold in pesos, by region, province, and highly urbanized city. With the coefficient of variation for each estimate.",
    question: "How does poverty in the Negros Island Region compare with Western Visayas and the country, and is it going up or down?",
    rows: "142 rows",
  },
  {
    id: "rice-prices",
    title: "Rice retail prices, monthly, 2018 to 2026",
    covers: "Average price per kilo of regular-milled, well-milled, and special rice, for the Philippines, NCR, Western Visayas, Iloilo, NIR, Negros Occidental, Bacolod, and Negros Oriental.",
    question: "How has the price of rice in Bacolod moved compared with the national average?",
    rows: "2,862 rows",
  },
  {
    id: "inflation",
    title: "Inflation, monthly, 2019 to 2026",
    covers: "Year-on-year change in consumer prices: all items, food, food and drinks, housing and utilities, and transport, for the Philippines, Western Visayas, NIR, Negros Occidental, Bacolod, and Negros Oriental.",
    question: "Is inflation in Bacolod higher or lower than the national rate this year, and what is driving it?",
    rows: "2,820 rows",
  },
];

export const otherSources = [
  ["PSA OpenSTAT (live API)", "openstat.psa.gov.ph", "Hundreds of PSA tables: prices, labor, agriculture, tourism, health. Browse, pick a table, and use the API link it gives."],
  ["data.gov.ph", "data.gov.ph", "The government’s open data portal. Download a CSV or Excel file and attach it to the AI instead of using a link."],
  ["PSGC", "psa.gov.ph/classification/psgc", "The official list of regions, provinces, cities, municipalities, and barangays, with their codes."],
];

export const questionSteps = [
  {
    title: "Choose one question",
    actions: [
      "Pick one of the four datasets above, or a question of your own that one of them can answer.",
      "Write the question in one sentence, the way your head of office would ask it.",
    ],
    note: "A good question names a place, a time, and a comparison. “How has the price of rice in Bacolod moved compared with the national average since 2023?” beats “Rice prices”.",
  },
  {
    title: "Open the data once",
    actions: [
      "Open the CSV link of your dataset. It downloads, and opens in Sheets or Excel.",
      "Read the column names, and find the rows for your area. Note the latest month or year.",
    ],
  },
];

export const analyzeSteps = [
  {
    title: "Ask the AI about the data",
    actions: [
      "Open the AI you use (Gemini, ChatGPT, Claude, or another).",
      "Attach the CSV you downloaded, and paste the analysis prompt from “The prompts” below. Replace the question in brackets.",
    ],
  },
  {
    title: "Check two numbers yourself",
    actions: [
      "Pick two numbers from the AI’s answer.",
      "Find them in the CSV: filter the area and the date. In Sheets, `=AVERAGEIFS` or a filter view is enough.",
      "Write down whether they match. If one does not, tell the AI where it went wrong and ask again.",
    ],
    note: "This is the habit that matters most today. AI tools often get a number slightly wrong, or average the wrong rows, and sound sure about it.",
  },
];

export const buildSteps = [
  {
    title: "Open AI Studio Build",
    actions: [
      "Go to `aistudio.google.com` and choose **Build**.",
      "Choose a web app (not Android this time).",
    ],
  },
  {
    title: "Paste the build prompt",
    actions: [
      "Copy the build prompt from “The prompts” below.",
      "Replace the two parts in brackets: your question, and the JSON link of your dataset.",
      "Send it, and wait for the preview.",
    ],
  },
  {
    title: "Check that it uses the real data",
    actions: [
      "Pick one number on the page and find it in the CSV.",
      "Change the area in the filter, if it has one, and check one more number.",
      "If a number is wrong or made up, say so in plain words: `The regular-milled rice price for Bacolod in October 2026 should be PHP 56.23. Read it from the data; do not estimate.`",
    ],
  },
];

export const skillSteps = [
  {
    title: "Load the design skill",
    actions: [
      "**AI Studio:** open the settings for the app and paste the whole skill file into **System instructions**. Or paste it into the chat with `Apply these design rules to this website.`",
      "**Claude:** upload `05-gov-data-website-skill.zip` under **Settings → Capabilities → Skills**, switch it on, then ask Claude to build or review the website.",
      "**ChatGPT or Gemini:** attach `06-gov-data-website-skill.md` or paste it at the start of the chat.",
    ],
  },
  {
    title: "Ask for a review first, then the fix",
    actions: [
      "Paste the review prompt below. The AI lists what breaks the rules before it changes anything.",
      "Read the list. Cross out anything you disagree with, then reply `Fix the rest.`",
    ],
  },
  {
    title: "Run the slop check yourself",
    actions: ["Go through the checklist below on the finished page. Ask for one more round of fixes for anything still unticked."],
  },
];

export const finishSteps = [
  {
    title: "Write three checked insights",
    actions: [
      "Three sentences, each with a number, a place, and a time, in the worksheet below.",
      "For each one, write how you checked it.",
      "Add one decision these insights could support, and who would make it.",
    ],
  },
  {
    title: "Save and share",
    actions: [
      "Take a screenshot of the finished page.",
      "Use **Share** in AI Studio to copy a link. You can use this website as your capstone if it answers a question your office has.",
    ],
  },
];

export const analysisPrompt = `You are helping a government employee in Bacolod City understand public statistics. The attached file is from the Philippine Statistics Authority (PSA).

My question: [YOUR QUESTION]

1. Answer the question in three sentences, with the numbers, places, and dates.
2. Show the rows you used as a small table, so I can check them.
3. Point out anything unusual: a jump, a drop, a missing month, or an area that stands apart.
4. List what this data cannot tell us, and anything that could mislead a reader (rounding, small samples, changes in how areas are grouped).

Use only the numbers in the file. If you need a number that is not there, say so instead of estimating it.`;

export const buildPrompt = `Build a one-page website that answers this question for a citizen or a head of office in the Philippines:

[YOUR QUESTION]

DATA
Fetch the data from this link when the page loads: [JSON LINK, for example https://dict-ai-automation.vercel.app/api/v1/rice-prices.json]
The JSON has "rows" (an array of records), "columns" (a description of each field), "title", "source", "source_url", "notes", and "retrieved".
Use only these rows. Never type in, invent, or estimate a number. If the link fails, show a short message saying the data could not load, with a Try again button.

PAGE
- A headline that states the main finding as a plain sentence with a number in it, worked out from the data.
- Three key numbers, each with its unit, place, and date.
- One chart that answers the question: a line chart for change over time, or a sorted bar chart to compare places. Label both axes with units.
- A filter for the area (and the item or rice type, if the data has one).
- A small table of the rows behind the chart.
- A "How to read this" note in two or three sentences, using the notes in the JSON.
- A source line at the bottom: the source, a link to source_url, and the retrieved date.

STYLE
Plain English a citizen understands. Peso amounts as PHP 56.23. Months as October 2026. It must work on a phone.`;

export const reviewPrompt = `Review this website against the design skill rules. First, list every place it breaks a rule, grouped as Content, Charts, Look, and Access, with the rule it breaks. Do not change anything yet. Then wait for my reply.`;

export const slopChecks = [
  "The headline is a finding with a number in it, not a slogan like “Unlocking insights”.",
  "Every number on the page comes from the data, with its unit, place, and date.",
  "I checked at least two numbers against the CSV myself.",
  "The chart fits the question: a line for time, sorted bars to compare places. Bars start at zero.",
  "Axes have labels and units, and there are no more colors than the data needs.",
  "No decoration that carries no meaning: gradient blobs, glowing cards, emoji icons, animated counters.",
  "The source, its link, and the retrieved date are on the page.",
  "It says what the data cannot tell you (for example rounding, or a high coefficient of variation).",
  "It reads well on a phone, and the text is large and dark enough to read.",
];

export const webErrors = [
  {
    problem: "The page says it could not load the data",
    fix: [
      "Open the JSON link in a new tab. If it shows text starting with `{`, the link is right; ask the AI to `fetch it again and show the error message on the page`.",
      "Venue Wi-Fi slow? Download the CSV and attach it to the chat with `Use this file instead of the link.`",
    ],
  },
  {
    problem: "The numbers look right, but one does not match the CSV",
    fix: [
      "Check the area and the date first: Negros Occidental and the City of Bacolod are separate rows.",
      "Tell the AI the exact row it should use, and ask it to read the number from the data.",
    ],
  },
  {
    problem: "The chart has twenty lines or a rainbow of colors",
    fix: ["Ask: `Show at most four areas at a time, chosen with the filter. Use one strong color for the main area and grey for the rest.`"],
  },
  {
    problem: "It made up a trend or a cause",
    fix: ["Ask: `Keep to what the data shows. Remove any claim about why it happened unless the data shows it.`"],
  },
  {
    problem: "Claude says it cannot reach the link",
    fix: ["Some tools block web requests from the preview. Attach the CSV instead, or build in AI Studio, which can fetch the link."],
  },
];

export const webStretch = [
  {
    title: "Use the live PSA API",
    actions: [
      "Open a table at `openstat.psa.gov.ph`, choose the rows you want, and look for the API link under the table.",
      "Ask the AI to fetch from that link instead of the training copy. The PSA API is free, needs no key, and allows websites to read it.",
    ],
  },
  {
    title: "Add a download button",
    text: "Ask for a button that downloads the rows shown in the table as a CSV, so a colleague can check them.",
  },
  {
    title: "Compare two datasets",
    text: "Put rice prices next to food inflation for the same area and months. Ask the AI to keep them as two charts, not one chart with two axes.",
  },
];

export const liveApiExample = `fetch("${PSA_BASE}/2M/2018NEW/0042M4ARN01.px", {
  method: "POST",
  body: JSON.stringify({
    query: [
      { code: "Geolocation", selection: { filter: "item", values: ["064501000"] } }, // City of Bacolod
      { code: "Commodity", selection: { filter: "item", values: ["1"] } }           // Rice, regular-milled
    ],
    response: { format: "json" }
  })
}).then((r) => r.json());`;
