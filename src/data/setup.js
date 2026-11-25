export const prepChecklist = [
  {
    id: "prep-device",
    title: "Device and internet",
    items: [
      "Laptop (Windows, macOS, or Chromebook) with its charger. A phone alone is not enough for the hands-on activities.",
      "Laptop is updated and has at least 10 GB of free storage.",
      "Chrome browser, updated (Edge also works).",
      "A mobile hotspot or phone with data as a backup to the venue Wi-Fi, if you can.",
      "An extension cord, if you have one.",
    ],
  },
  {
    id: "prep-google",
    title: "Google account",
    note: "Needed for most activities. A personal Gmail account is fine.",
    items: [
      "A Google account you can sign in to on your laptop.",
      "These open and work: Gemini, NotebookLM, AI Studio, Google Forms, Sheets, Slides, Docs, Drive, Gmail, Apps Script (in a Sheet, Extensions → Apps Script), and Looker Studio (lookerstudio.google.com).",
      "Your phone for 2-step verification, and you can receive codes at the venue.",
      "You know your password. A reset at the venue can take a long time.",
      "You are 18 or older (some Google AI tools require it).",
    ],
  },
  {
    id: "prep-accounts",
    title: "AI accounts",
    note: "Required, then recommended, then optional. If you can’t finish the recommended ones, come anyway: the trainer will demo them.",
    items: [
      { text: "Gemini (gemini.google.com), with your Google account", tag: "Required" },
      { text: "NotebookLM (notebooklm.google.com), with your Google account", tag: "Required" },
      { text: "Google AI Studio (aistudio.google.com), with your Google account", tag: "Required" },
      { text: "Your main AI app, signed in, with the setting that lets your chats train the model turned off: the one you subscribe to (ChatGPT, Claude, Gemini, Grok, or Copilot), or ChatGPT (chatgpt.com) on a free account", tag: "Required" },
      { text: "Claude (claude.ai)", tag: "Recommended" },
      { text: "Grok (grok.com)", tag: "Recommended" },
      { text: "Microsoft Copilot (copilot.microsoft.com) with a Microsoft account, also used for Power Automate if your agency uses Microsoft 365", tag: "Recommended" },
      { text: "Canva Free (canva.com), for the app-connection (MCP) demo", tag: "Optional" },
      { text: "GitHub account, for the advanced coding track", tag: "Optional" },
    ],
  },
  {
    id: "prep-phone",
    title: "For the office app lab (Day 2)",
    note: "No Android phone? You can still build the app and test it in your browser, and pair with a seatmate for the phone step.",
    items: [
      "An Android phone and a USB cable that carries data (the one that came with the phone is best).",
      "Developer options and USB debugging turned on: Settings → About phone → tap Build number seven times, then Settings → Developer options → USB debugging. Steps are on the office app page.",
    ],
  },
  {
    id: "prep-n8n",
    title: "For the n8n lab (Day 3)",
    note: "Do this at home: n8n is a large download. On a Chromebook, or a laptop where you cannot install software, skip it and use the n8n Cloud trial on the day.",
    items: [
      "Node.js 24 installed from nodejs.org/en/download. Pick v24 in the version list, not 26: n8n does not install on 26 yet.",
      "n8n downloaded once: open Command Prompt (Windows) or Terminal (Mac), type npx n8n, and press Enter. Type y if asked. When it says http://localhost:5678, press Ctrl+C to stop it. It needs about 3 GB of free space.",
    ],
  },
  {
    id: "prep-skills",
    title: "Skills you should be comfortable with",
    items: [
      "Copy and paste, upload and download files, switch between browser tabs.",
      "Basic Google Docs and Sheets.",
      { text: "Open a terminal and use basic commands (cd, ls or dir).", tag: "Advanced" },
    ],
  },
  {
    id: "prep-bring",
    title: "Bring with you",
    items: [
      "One real office task you want to improve (see the questions below).",
      "Optional: your office’s memo format, report templates, or forms, with personal information removed.",
      "Optional: an office file, only if you already have written office clearance and it is fully masked. Otherwise you use the sample datasets.",
      "Notebook and pen.",
    ],
  },
];

export const advancedChecklist = {
  id: "prep-advanced",
  title: "Optional installs for the advanced track",
  note: "Do these at home, not at the venue. AI model files are several gigabytes, too heavy for shared venue Wi-Fi.",
  items: [
    "A Windows or Mac laptop with at least 16 GB RAM, to try local AI models. Chromebooks can’t run the local AI tools easily.",
    "Ollama (ollama.com) or LM Studio (lmstudio.ai), with one small (3 to 8B) model already downloaded.",
    "Git (git-scm.com), needed for command-line coding agents. They also need Node.js 24, from the n8n list above.",
    "VS Code or Google Antigravity (antigravity.google).",
    "A command-line coding agent: opencode (opencode.ai), Codex CLI (with a ChatGPT account), or Antigravity CLI.",
    "clasp, Google’s command-line tool for Apps Script (for the certificate activity’s agent track).",
  ],
};

export const thinkAbout = [
  {
    title: "One repetitive task you’d like to automate",
    questions: [
      "What task do you or your team do again and again?",
      "How often (daily, weekly, monthly), and how much time does it take?",
      "What data or documents does it use? Is any of it personal or sensitive?",
    ],
    examples:
      "Examples from participants: processing clearance transactions and daily reports, reconciling account records, tracking supplies and property inventory, generating accomplishment reports, preparing announcements and social media captions.",
  },
  {
    title: "One decision you’d like data to support",
    questions: [
      "What decision does your office make that could use better evidence? For example: where to assign staff, which services need improvement, when to reorder supplies.",
      "What data do you already have that could help?",
    ],
  },
  {
    title: "Optional: office templates to bring",
    questions: [
      "Your agency’s memo format or letter template (blank, no personal information).",
      "Report or form templates you use often.",
      "Prompts you already use with AI. We’ll improve them together.",
    ],
  },
];

export const datasets = [
  { name: "Synthetic memo and request texts", detail: "Memos, circulars, request letters, meeting notes", used: "Day 1 prompting, Day 2 extra practice" },
  { name: "Synthetic NBI clearance applications log", detail: "Fake names, dates, fees, and status", used: "Capstone (Day 2 extra practice)" },
  { name: "Synthetic premium and loan reconciliation sheet", detail: "With planted mismatches", used: "Day 2 advanced track, capstone" },
  { name: "Synthetic supplies and property inventory", detail: "The messy version", used: "Day 2 extra practice, capstone" },
  { name: "Synthetic FAQ document and client feedback survey", detail: "For an office service", used: "Day 2 office app, Day 3 n8n lab" },
  { name: "Public PSA data: population, poverty, rice prices, inflation", detail: "Real government statistics, from the training API", used: "Day 3 data website lab, capstone" },
  { name: "Certificate attendee list", detail: "Your own name and email only", used: "Day 2 certificate activity" },
];
