export const course = {
  title: "Applied AI for Automation and Decision Support",
  short: "Applied AI Guide",
  audience: "Government Workforce Training",
  venue: "Bacolod City, Negros Occidental",
  city: "Bacolod City",
  dates: "November 24 to 26, 2026",
  days: "Tuesday to Thursday",
  hours: "8:00 AM to 5:00 PM daily (Philippine time)",
  contactHours: "about 21",
  timeZone: "Asia/Manila",
  start: "2026-11-24",
  end: "2026-11-26",
};

export const welcome = [
  "Welcome to three days of hands-on learning. This training is built around what you told us in the AI Training Readiness Assessment. Most of you already use tools like ChatGPT and Gemini, so we go beyond the basics and focus on using AI safely, responsibly, and productively in government work.",
  "You learn by doing. Each day has short talks, live demos, and plenty of hands-on practice. On the last day, you and your team build and present a small working solution for a real task in your own office.",
  "Bring the AI you already use. Most of you subscribe to a model such as ChatGPT, Claude, Gemini, Grok, or Copilot, and you will work in it all three days. A free account still covers every core activity. Paying gets you a stronger model; it does not make a personal account cleared for office data.",
];

export const outcomes = [
  {
    short: "Explain how generative AI works",
    text: "Explain how generative AI works, what it does well, and where it can go wrong (made-up facts, bias, outdated information).",
  },
  {
    short: "Use AI within RA 10173",
    text: "Use AI responsibly under the Data Privacy Act of 2012 (RA 10173), NPC Advisory No. 2024-04, and government guidance on the ethical and responsible use of AI (DICT-CSC JMC No. 003, s. 2026).",
  },
  {
    short: "Write clear, reusable prompts",
    text: "Write clear, reusable prompts for memos, letters, reports, and summaries.",
  },
  {
    short: "Check AI outputs before use",
    text: "Check AI outputs with a simple checklist before using them in official work.",
  },
  {
    short: "Automate a repetitive task",
    text: "Automate a repetitive office task with tools your office can keep running (Google Forms, Sheets, Slides, Apps Script, and AI assistants, or Power Automate for Microsoft 365 offices).",
  },
  {
    short: "Turn data into a decision brief",
    text: "Analyze and visualize office data with AI help, and turn it into a short decision brief.",
  },
  {
    short: "Pick cloud, enterprise, or local",
    text: "Compare AI models and agent tools, and choose cloud, enterprise, or local options based on how sensitive your data is.",
  },
  {
    short: "Connect apps safely with MCP",
    text: "Explain MCP in plain words and apply the safety checklist (least privilege, read-only first, approvals on, demo folder only). Where your plan allows, try a read-only connector on a trainer-provided demo folder. Watching the live demo and completing the checklist meets the objective.",
  },
  {
    short: "Build and present a solution",
    text: "Build and present a mini automation or decision-support solution for your office.",
  },
];

export const dataRule =
  "Use the sample (synthetic) datasets unless you already have written office clearance and a fully masked file.";

export const dataRuleFull = [
  "Use the sample (synthetic) datasets unless you already have written office clearance and a fully masked file.",
  "Do not upload applicant lists, loan or premium files, health or case records, or any unmasked personal data.",
  "The trainer checks any file you brought before it is used.",
];

const brk = (start, end, title) => ({ start, end, title, kind: "break" });

export const days = [
  {
    id: "day-1",
    number: 1,
    short: "Foundations and prompting",
    date: "2026-11-24",
    weekday: "Tuesday",
    dateLabel: "November 24",
    title: "Foundations, responsible use, prompting, and agents",
    objective:
      "Get set up on the tools, understand how generative AI and the major models differ, use AI safely within Philippine law and government guidance, write reliable prompts, and see what AI agents can do.",
    keyOutput:
      "Tool comparison sheet, Data Traffic Light card, prompt set, agent pick, and capstone problem statement",
    sessions: [
      {
        start: "8:00",
        end: "8:30",
        title: "Registration, opening, and pre-assessment",
        do: "Start the pre-assessment as you sit down (QR code on screen). Hear the data rule, meet your co-participants, and set goals. Quick intro round: one task I wish AI could do for me.",
        produce: "Pre-assessment",
        link: { to: "/assessment", label: "About the assessment" },
      },
      {
        start: "8:30",
        end: "9:00",
        title: "Setup check",
        module: "A",
        do: "Sign in to Gemini and ChatGPT with help from setup buddies, and copy the training folder (with the sample datasets) to your Drive. Any office file you brought is checked here before use. No check, no upload.",
        produce: "All tools ready",
        link: { to: "/setup", label: "Setup checklist" },
      },
      {
        start: "9:00",
        end: "10:00",
        title: "Generative AI foundations and intro to AI models",
        module: "B",
        do: "Learn how AI works and why it makes mistakes. Watch the trainer send one prompt to five models and score the answers together, then try a quick spot-the-hallucination exercise.",
        produce: "Tool comparison worksheet",
        link: { to: "/models", label: "AI models module" },
      },
      brk("10:00", "10:15", "Morning break"),
      {
        start: "10:15",
        end: "11:15",
        title: "Responsible and ethical AI in government",
        do: "RA 10173, NPC guidance, and the DICT-CSC circular on AI in government (NAISR 2.0 and EO 131 are on the handout). Case scenarios in groups, and an open talk on job displacement worries: AI as an assistant, with humans staying accountable.",
        produce: "Office AI do’s and don’ts",
        link: { to: "/responsible-ai", label: "Responsible AI" },
      },
      {
        start: "11:15",
        end: "12:00",
        title: "Protecting data given to AI and agents",
        module: "E",
        do: "Play the Data Traffic Light game, run a redaction drill on synthetic records, and watch a live prompt injection demo with a poisoned document.",
        produce: "Your Data Traffic Light card",
        link: { to: "/data-protection", label: "Data protection module" },
      },
      brk("12:00", "1:00", "Lunch"),
      {
        start: "1:00",
        end: "2:30",
        title: "Prompt engineering for office work",
        do: "Use the R-T-C-F-C framework to draft a memo and a reply letter to a citizen request. The trainer shows a one-page summary of a sample circular in NotebookLM, with citations from the uploaded document.",
        produce: "2 documents and before-and-after prompts",
        link: { to: "/prompting", label: "Prompt builder" },
      },
      {
        start: "2:30",
        end: "3:00",
        title: "Checking AI outputs",
        do: "Use a checklist to verify facts, figures, laws cited, tone, and privacy. Cross-check with another model, ask for sources, and check official documents. Pairs verify each other’s lab outputs. Start your prompt library (at least 3 prompts; finish as homework).",
        produce: "Peer check and prompt library",
        link: { to: "/prompting#check", label: "Output checklist" },
      },
      brk("3:00", "3:15", "Afternoon break"),
      {
        start: "3:15",
        end: "4:00",
        title: "Meet the AI agents",
        module: "C",
        do: "Three live demos: Grok Bot, Rakazo, and opencode. The other agents (OpenMausBot, Google AI Studio, Antigravity, command-line agents) are on the handout. In teams, match each agent to an office use case and rate its data risk.",
        produce: "Agent Fit worksheet",
        link: { to: "/agents", label: "Agent tools module" },
      },
      {
        start: "4:00",
        end: "5:00",
        title: "Capstone problem and exit ticket",
        do: "Form mixed teams of 3 (ICT and non-ICT), pick a capstone track, and choose a real office task. Fill in a Pain Point Card: track, task, frequency, time spent, data involved, privacy level, and your baseline number (4:00 to 4:45). Exit ticket (4:45 to 5:00).",
        produce: "Pain Point Card and exit ticket",
        link: { to: "/capstone#pain-point", label: "Pain Point Card" },
      },
    ],
    materials: [
      ["01-day-1-workbook.docx", "Workbook", "All ten exercises, to print or fill in"],
      ["02-day-1-handout.docx", "Handout", "R-T-C-F-C, output checks, Data Traffic Light, laws, and the agents not demonstrated"],
      ["03-sample-circular.docx", "Sample circular", "For the hallucination check, the memo, and the NotebookLM demo"],
      ["04-citizen-request-letter.docx", "Citizen request letter", "For the reply letter task"],
      ["05-staff-meeting-notes.docx", "Staff meeting notes", "For the memo task"],
      ["06-spot-the-hallucination.docx", "Spot the hallucination", "An AI summary with six errors"],
      ["07-redaction-drill.xlsx", "Redaction drill", "12 fake client records to mask"],
      ["09-model-comparison-scoresheet.xlsx", "Model scoresheet", "Scores the five models, with totals"],
      ["10-data-traffic-light-cards.docx", "Traffic Light cards", "Printable game cards"],
    ],
    advanced:
      "Advanced track (prompting session): system prompts, few-shot prompting, structured JSON outputs, and building a Gemini Gem or custom GPT for a repeat task.",
  },
  {
    id: "day-2",
    number: 2,
    short: "Automating routine tasks",
    date: "2026-11-25",
    weekday: "Wednesday",
    dateLabel: "November 25",
    title: "Automating routine tasks, app connections, local AI, and agents",
    objective:
      "Automate repetitive document, spreadsheet, and workflow tasks with tools your office can keep running, connect agents to everyday apps safely through MCP, and understand when to run AI locally.",
    keyOutput:
      "Cleaned dataset, a working Form to Sheet to email workflow, the MCP demo flow, and a safe agent task",
    sessions: [
      {
        start: "8:00",
        end: "8:15",
        title: "Recap",
        do: "A quick 5-question quiz on Day 1, and a look at the questions from the exit tickets.",
        produce: "Recap quiz",
      },
      {
        start: "8:15",
        end: "9:45",
        title: "Automating document and spreadsheet work",
        do: "Part 1 (8:15 to 9:00): turn notes into minutes and action items, with template prompts for memos, letters, accomplishment reports, and captions. Part 2 (9:00 to 9:45): clean the messy inventory sheet, describe a problem in plain language and let AI write one formula (XLOOKUP or IF), and build one pivot summary. COUNTIFS, QUERY, and the reconciliation mini-case move to the advanced track and the Accounts check capstone track.",
        produce: "Document template and cleaned dataset",
        link: { to: "/prompting", label: "Prompt builder" },
      },
      brk("9:45", "10:15", "Morning break"),
      {
        start: "10:15",
        end: "12:00",
        title: "Hands-on: automated certificates",
        do: "Start from a pre-built kit: copy the trainer\u2019s Form, Sheet, and Slides template, then paste the ready-made script, approve the permission screen, test with your own entry, and clean up. Stretch: have AI write the script. Cleanup at the end is never skipped.",
        produce: "Your own certificate in your inbox",
        link: { to: "/certificates", label: "Certificate activity" },
      },
      brk("12:00", "1:00", "Lunch"),
      {
        start: "1:00",
        end: "1:40",
        title: "Connecting AI agents to apps (MCP)",
        module: "F",
        do: "Demo only (demo accounts): watch an AI read a Sheet, make a Canva poster, and draft an email. Complete the safety checklist. Trying a read-only connector is optional, for the advanced track.",
        produce: "MCP demo and safety checklist",
        link: { to: "/mcp", label: "MCP module" },
      },
      {
        start: "1:40",
        end: "2:15",
        title: "Running AI on your own computer",
        module: "D",
        do: "Demo only: see AI run offline on a laptop with Wi-Fi off, compare it with a cloud model, and decide cloud or local for five office scenarios.",
        produce: "Cloud-or-local decision sheet",
        link: { to: "/local-ai", label: "Local AI module" },
      },
      brk("2:15", "2:35", "Afternoon break"),
      {
        start: "2:35",
        end: "4:15",
        title: "Hands-on with agents and skills",
        module: "C",
        do: "Everyone: build a FAQ assistant in NotebookLM or a Gemini Gem from the sample FAQ document, red-team it for 5 minutes, and fill in a permissions card. Advanced track: build with a coding agent in a sandbox folder and write a SKILL.md file.",
        produce: "FAQ assistant and permissions card",
        link: { to: "/skills", label: "Agent skills module" },
      },
      {
        start: "4:15",
        end: "5:00",
        title: "Capstone planning",
        do: "Plan your project with the Capstone Project Canvas in three parts: automate it, check it, decide with it. Confirm your track and baseline number. The trainer gives quick feedback to each team. Exit ticket.",
        produce: "Approved project canvas",
        link: { to: "/capstone#canvas", label: "Project canvas" },
      },
    ],
    materials: [
      ["01-day-2-workbook.docx", "Workbook", "All ten exercises, to print or fill in"],
      ["02-day-2-handout.docx", "Handout", "Prompt templates, formulas, certificate fixes, MCP and local AI reference"],
      ["03-raw-meeting-notes.docx", "Raw meeting notes", "To turn into minutes and action items"],
      ["04-messy-inventory.xlsx", "Messy inventory", "To clean with AI help"],
      ["05-clearance-applications-log.xlsx", "Clearance applications log", "390 fake applications, for the formula, the pivot table, and Day 3"],
      ["06-certificate-script.txt", "Certificate script", "The ready-made Apps Script for the certificate lab"],
      ["07-training-attendance-sample.xlsx", "Training attendance", "The sheet the MCP demo reads"],
      ["08-sample-office-faq.docx", "Sample office FAQ", "The only source for your FAQ assistant"],
      ["09-reconciliation-advanced.xlsx", "Reconciliation (advanced)", "Two lists with planted mismatches"],
    ],
    advanced:
      "Advanced track: time-driven triggers, generating Google Docs from templates with Apps Script, and calling the Gemini API from Apps Script.",
  },
  {
    id: "day-3",
    number: 3,
    short: "Decision support and capstone",
    date: "2026-11-26",
    weekday: "Thursday",
    dateLabel: "November 26",
    title: "AI for decision support and capstone",
    objective:
      "Use AI to analyze data, build simple dashboards, write evidence-based decision briefs with risk and bias checks, and present a working capstone.",
    keyOutput: "Dashboard, decision brief, and capstone demo and presentation",
    sessions: [
      {
        start: "8:00",
        end: "8:15",
        title: "Recap",
        do: "Quick quiz and capstone check-in: each team shares its progress in one sentence.",
        produce: "Recap quiz",
      },
      {
        start: "8:15",
        end: "10:00",
        title: "AI-assisted data analysis and visualization",
        do: "Ask AI about trends and outliers in a sample dataset, check the numbers in Sheets, and make your own copy of the trainer\u2019s Looker Studio report, then adapt it to the synthetic clearance applications log or client feedback data (KPIs, a trend chart, a filter by office or month).",
        produce: "Mini dashboard and 3 checked insights",
        link: { to: "/decision-support", label: "Decision support" },
      },
      brk("10:00", "10:15", "Morning break"),
      {
        start: "10:15",
        end: "11:30",
        title: "Evidence-based decisions, risk, and bias",
        do: "AI as decision support, not decision maker. Write a decision brief with options and risks, run the bias and risk checklist, then use AI to prepare a brief on a resource allocation or service improvement case and critique it.",
        produce: "1-page decision brief",
        link: { to: "/decision-support#brief", label: "Decision brief" },
      },
      {
        start: "11:30",
        end: "12:00",
        title: "Capstone kit check",
        do: "Check your team has its files, sample dataset, and roles (builder, checker, presenter) ready. Note your first step for 1:00.",
        produce: "Kit check",
        link: { to: "/capstone", label: "Capstone" },
      },
      brk("12:00", "1:00", "Lunch"),
      {
        start: "1:00",
        end: "3:00",
        title: "Capstone build",
        do: "Build, test with the synthetic dataset that matches your problem, complete the Responsible AI checklist, and prepare a 5-minute demo. Coaching rounds of about 10 minutes per team.",
        produce: "Working prototype",
        link: { to: "/capstone#checklist", label: "Responsible AI checklist" },
      },
      brk("3:00", "3:15", "Afternoon break"),
      {
        start: "3:15",
        end: "4:05",
        title: "Capstone presentations",
        do: "A 5-minute demo and 2-minute Q&A per team: show the task automated, how you checked it, and the decision it supports, against your baseline number. Score other teams' projects.",
        produce: "Capstone score",
        link: { to: "/capstone#rubric", label: "Rubric" },
      },
      {
        start: "4:05",
        end: "4:35",
        title: "Post-assessment and action plan",
        do: "Post-assessment and your 30-day AI Action Plan, which continues your capstone back at the office.",
        produce: "Action plan",
        link: { to: "/assessment#action-plan", label: "Action plan" },
      },
      {
        start: "4:35",
        end: "5:00",
        title: "Closing",
        do: "Training evaluation by QR code, recognition, certificates, and the group photo.",
        produce: "Certificates",
      },
    ],
    advanced:
      "Advanced track: calculated fields, blended data sources, and scenario or sensitivity analysis in the dashboard; a web app, chatbot, or agent-style workflow with a privacy-by-design review for the capstone.",
  },
];

export const modules = [
  { letter: "A", title: "Prerequisites and setup", to: "/setup", when: "Before Day 1, and Day 1, 8:30 to 9:00", minutes: "30" },
  { letter: "B", title: "Intro to different AI models", to: "/models", when: "Day 1, 9:00 to 10:00", minutes: "about 35 of 60" },
  { letter: "C", title: "Agent tools", to: "/agents", when: "Day 1, 3:15 to 4:00, and Day 2, 2:35 to 4:15", minutes: "45 + 100" },
  { letter: "D", title: "Running local AI agents", to: "/local-ai", when: "Day 2, 1:40 to 2:15 (demo)", minutes: "35" },
  { letter: "E", title: "Protecting data given to agents", to: "/data-protection", when: "Day 1, 11:15 to 12:00, then every Day 2 lab", minutes: "45 + embedded" },
  { letter: "F", title: "Connecting agents to apps with MCP", to: "/mcp", when: "Day 2, 1:00 to 1:40 (demo)", minutes: "40" },
  { letter: "G", title: "Using agent skills", to: "/skills", when: "Day 1 demo, Day 2 advanced track", minutes: "about 20" },
];

export const quickAnswers = [
  { q: "Do I need a paid AI account?", a: "No. Use the one you already pay for, or a free account. Either way, sample data only." },
  { q: "Should I bring office data?", a: "No. Every exercise uses sample data with fake names." },
  { q: "Will a Chromebook work?", a: "Yes, for the core track. Local AI needs a Windows or Mac laptop with 16 GB RAM." },
  { q: "What if my agency blocks AI tools?", a: "Use your personal accounts with the sample data only." },
];
