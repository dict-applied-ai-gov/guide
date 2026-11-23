export const rtcfc = [
  { key: "role", letter: "R", name: "Role", meaning: "Who the AI should act as", example: "You are an administrative officer in a government agency." },
  { key: "task", letter: "T", name: "Task", meaning: "What you want", example: "Draft a memo announcing a change in office hours." },
  { key: "context", letter: "C", name: "Context", meaning: "Background details", example: "Effective December 1, the office opens at 7:30 AM. This affects all frontline staff." },
  { key: "format", letter: "F", name: "Format", meaning: "How the answer should look", example: "Use our memo format: To, From, Date, Subject, then 3 short paragraphs." },
  { key: "constraints", letter: "C", name: "Constraints", meaning: "Limits and rules", example: "Formal, polite English. Under 200 words. Leave the memo number blank." },
];

export const promptTips = [
  "Iterate: ask for changes (make it shorter, more formal, add a table).",
  "Give an example of the output you want.",
  "Break big tasks into steps: outline first, then draft, then polish.",
  "Ask the AI to list anything you should double-check.",
  "Save good prompts in your prompt library and reuse them.",
];

export const outputChecklist = [
  "Facts, names, dates, and amounts are correct.",
  "Laws, issuances, and sources cited actually exist and say what the AI claims.",
  "Tone fits the audience.",
  "No personal or confidential information was added or exposed.",
  "A person reviews and owns the final version.",
];

export const verifyMoves = [
  ["Cross-check", "Ask another model the same question and compare."],
  ["Ask for sources", "Then open each one. A citation the AI made up looks just as real as a true one."],
  ["Check official documents", "Laws, circulars, and figures come from the issuing office, not from the chat."],
];

export const labTasks = [
  { title: "A memo", detail: "From a sample circular or set of notes, in your office’s memo format." },
  { title: "A reply letter", detail: "To a sample citizen request, polite and clear." },
  { title: "A one-page summary", detail: "Of a sample circular, for a busy reader." },
];

export const glossary = [
  ["Generative AI", "AI that creates new text, images, or other content from your instructions."],
  ["Large language model (LLM)", "The brain behind tools like ChatGPT, Claude, and Gemini, trained on huge amounts of text."],
  ["Prompt", "The instruction or question you give to an AI."],
  ["Hallucination", "When AI confidently gives wrong or made-up information."],
  ["Context window", "How much text the AI can keep in mind at once."],
  ["AI agent", "An AI that takes actions (browses, edits files, uses apps, runs commands), not just answers."],
  ["Approval, human in the loop", "A step where a person must say yes before the AI acts."],
  ["MCP (Model Context Protocol)", "A standard way to plug AI apps into other tools like Google Drive, Canva, or Slack. Think of it as a USB-C port for AI."],
  ["Connector", "A ready-made link between an AI app and another service, often built on MCP."],
  ["Agent skill", "A reusable how-to package (a folder with a SKILL.md file, plus optional scripts and templates) that an agent loads when a task matches."],
  ["Prompt injection", "Hidden instructions in a document, email, or web page that try to trick an AI into doing something you didn’t ask for."],
  ["Apps Script", "Google’s free tool for writing small programs that automate Sheets, Forms, Slides, Gmail, and Drive."],
  ["Trigger", "A setting that runs a script automatically when something happens, for example when a form is submitted."],
  ["Local model", "An AI model that runs on your own computer, so data doesn’t leave your device."],
  ["Open-weight model", "An AI model whose files are free to download and run yourself, for example Llama, Qwen, or Gemma."],
  ["Synthetic data", "Realistic-looking fake data used for practice and testing."],
  ["Masking, redaction", "Hiding or replacing personal information, for example names → [NAME_1]."],
  ["Least privilege", "Giving a tool only the minimum access it needs."],
  ["RA 10173", "The Philippine Data Privacy Act of 2012."],
  ["Dashboard", "A one-page visual summary of key numbers and charts."],
  ["Tool poisoning", "A malicious MCP server hiding instructions in its tool descriptions."],
  ["Data Traffic Light", "The training’s way to classify data: Public (green), Internal (yellow), Restricted (red)."],
];

export const lawReferences = [
  {
    name: "Republic Act No. 10173, Data Privacy Act of 2012",
    note: "And its Implementing Rules and Regulations. Personal data is processed with transparency, a legitimate purpose, and proportionality.",
  },
  {
    name: "NPC Advisory No. 2024-04",
    note: "Guidelines on the application of RA 10173 to AI systems processing personal data: transparency, accountability, fairness, accuracy, human intervention.",
  },
  {
    name: "DICT-CSC Joint Memorandum Circular No. 003, s. 2026",
    note: "Issued June 9, 2026. Framework for the ethical and responsible development, deployment, and use of AI in the government: human accountability, risk assessment, privacy safeguards.",
  },
  {
    name: "Executive Order No. 131",
    note: "Signed November 12, 2026, effective November 14, 2026. Creates the National Artificial Intelligence Council and adopts the Philippine AI Governance Framework: transparency and explainability, security and safety, accountability and integrity, human centricity, fairness and equity, sustainable development.",
  },
  {
    name: "National AI Strategy Roadmap 2.0 (NAISR 2.0)",
    note: "DTI’s national AI strategy and policy landscape.",
  },
  {
    name: "UNESCO Recommendation on the Ethics of Artificial Intelligence",
    note: "The basis for several of the government AI principles.",
  },
  {
    name: "OWASP MCP Security Cheat Sheet",
    note: "Guidance on tool poisoning, least privilege, and approvals for MCP servers.",
  },
];

export const principles = [
  ["Transparency", "Say when AI helped, and how."],
  ["Legitimate purpose", "Use personal data only for the stated purpose."],
  ["Proportionality", "Use only the data the task needs."],
  ["Human oversight", "A person reviews, approves, and signs. The officer who approves is accountable, not the tool or the vendor."],
  ["Fairness", "Check outputs and data for bias against client groups."],
];

export const scenarios = [
  "Can I paste a clearance applicant’s details into ChatGPT to draft a reply?",
  "Can I let an agent read my office Gmail?",
];

export const tools = [
  { group: "AI assistants", items: [["ChatGPT", "https://chatgpt.com"], ["Gemini", "https://gemini.google.com"], ["Claude", "https://claude.ai"], ["Microsoft Copilot", "https://copilot.microsoft.com"], ["Grok", "https://grok.com"]] },
  { group: "Grounded research", items: [["NotebookLM", "https://notebooklm.google.com"]] },
  { group: "Documents and presentations", items: [["Google Docs", "https://docs.google.com"], ["Google Slides", "https://slides.google.com"], ["Canva", "https://www.canva.com"]] },
  { group: "Data", items: [["Google Sheets", "https://sheets.google.com"], ["Looker Studio", "https://lookerstudio.google.com"]] },
  { group: "Automation", items: [["Google Forms", "https://forms.google.com"], ["Apps Script", "https://script.google.com"], ["Power Automate", "https://make.powerautomate.com"]] },
  { group: "Advanced and coding", items: [["Google AI Studio", "https://aistudio.google.com"], ["Google Antigravity", "https://antigravity.google"], ["opencode", "https://opencode.ai"]] },
  { group: "Local AI", items: [["Ollama", "https://ollama.com"], ["LM Studio", "https://lmstudio.ai"]] },
  { group: "Install for coding agents", items: [["Node.js", "https://nodejs.org"], ["Git", "https://git-scm.com"]] },
];

export const sources =
  "Sources for the model and agent facts, checked November 2026: chatgpt.com/pricing; claude.com/pricing and the Claude Help Center; gemini.google/ph/subscriptions and Gemini Apps Help; x.ai/pricing; Microsoft Copilot pricing and enterprise data protection pages; DeepSeek privacy policy; aistudio.google.com/docs/terms; antigravity.google/pricing; Google Developers Blog (Gemini CLI to Antigravity CLI); chatgpt.com/codex/pricing; opencode.ai; mausbot.com and github.com/milind-soni/OpenMausBot; rakazo.com and github.com/elie222/rakazo; canva.com/canva-mcp; developers.google.com/workspace (MCP servers); docs.x.ai/grok-bot; Agent Skills docs at platform.claude.com, antigravity.google/docs/skills, cursor.com/docs/skills, learn.chatgpt.com/docs/build-skills, and geminicli.com; Apps Script quotas at developers.google.com/apps-script/guides/services/quotas.";

export const faq = [
  {
    group: "Before the training",
    items: [
      ["Do I need a paid AI account?", "No. Everything you need for the core activities works on free accounts. Paid features are shown only as optional extras."],
      ["Can I use a Chromebook?", "Yes, for the core activities. To try local AI models on the advanced track, a Windows or Mac laptop with at least 16 GB RAM works best; Chromebooks can’t run the local AI tools easily."],
      ["Is a phone enough?", "No. Bring a laptop with its charger. A phone alone is not enough for the hands-on activities, but bring it for 2-step verification."],
      ["My agency restricts AI tools on office accounts. What do I use?", "Use your personal accounts with the sample (synthetic) data only."],
      ["I couldn’t set up the recommended accounts. Should I still come?", "Yes. Come anyway; the trainer will demo them. The required ones are a Google account and ChatGPT Free."],
      ["Should I download AI models at the venue?", "No. Model files are several gigabytes, too heavy for shared venue Wi-Fi. Download them at home."],
      ["I need large print, seating help, or language support.", "Tell the training lead before Day 1 or at registration. Filipino or Hiligaynon explanations, large-print handouts, and seating near the screen, aisle, or exit can be arranged."],
    ],
  },
  {
    group: "Data",
    items: [
      ["Do I need to bring office data?", "No. Every exercise, lab, demo, and the capstone uses sample (synthetic) datasets the trainer provides: realistic-looking records with fake names."],
      ["Can I use my own office file?", "Only as an exception: you already have written office clearance and the file is fully masked. It is checked at the 8:30 Day 1 setup check before any upload. No check, no upload."],
      ["Can I connect my work Gmail or Drive to an agent?", "Not during the training. Demo accounts only. Real office connections need IT and DPO approval and an enterprise plan whose terms cover the data."],
    ],
  },
  {
    group: "During the labs",
    items: [
      ["A tool won’t let me sign in.", "Pair up with your setup buddy so you don’t lose the lesson. Common causes: blocked sign-ins, the wrong browser profile, and age verification."],
      ["Google says the app isn’t verified.", "That is normal for your own Apps Script. Click Advanced → Go to (your project) (unsafe) → Allow, after reading the permission list."],
      ["My certificate never arrived.", "See the troubleshooting list on the certificate activity page. Copy the error from Executions or the status column and paste it to the AI with Please fix the script."],
      ["The AI quoted a law I haven’t seen before.", "Check it against the official source before using it. Never use it just because the AI sounds sure."],
    ],
  },
  {
    group: "After the training",
    items: [
      ["What happens after the three days?", "About 30 days after, you’ll get a short follow-up form about your 30-day AI Action Plan."],
      ["What should I clean up?", "Delete uploads and chats, remove files from shared and agent folders, delete triggers, revoke script access, and disconnect any apps you connected."],
    ],
  },
];

export const capstoneTimeline = [
  ["Day 1, 4:00 PM", "Pick a track and a task", "Pain Point Card with a baseline number"],
  ["Day 2, 4:15 PM", "Plan automate, check, decide", "Capstone Project Canvas"],
  ["Day 3, 11:30 AM", "Kit check", "Files, sample dataset, and roles ready"],
  ["Day 3, 1:00 to 3:00 PM", "Build and test", "Working prototype and Responsible AI checklist"],
  ["Day 3, 3:15 PM", "Present", "5-minute demo and 2-minute Q&A"],
  ["Next 30 days", "Keep going at the office", "30-day AI Action Plan"],
];

export const capstoneIdeas = [
  ["Clearance or transaction tracker", "A form-based daily log feeding Sheets, an automatic daily report and payment monitoring dashboard, plus a FAQ assistant for common applicant questions."],
  ["Supplies and property inventory", "A Google Form for issuance and returns, a Sheets inventory with automatic stock-level alerts, and a Looker Studio dashboard."],
  ["Account reconciliation helper", "Sheets formulas, written with AI help, that match two account lists and flag discrepancies for human review."],
  ["Information officer content kit", "A prompt library and templates for announcements, captions, and briefers, with a verification step."],
  ["Accomplishment report generator", "An Apps Script that turns weekly Sheet data into a formatted report in Google Docs."],
  ["FAQ assistant", "Grounded in your office’s own (sample) FAQ document, in NotebookLM or a Gemini Gem."],
  ["Agent and MCP workflow", "An agent connected read-only to a demo Drive folder and Canva that turns weekly data into a summary and a poster, with approvals before anything is shared."],
  ["Local AI helper", "An offline summarizer for internal documents using Ollama or LM Studio, for offices handling sensitive data."],
  ["Advanced: a small web app or chatbot", "Prototyped in Google AI Studio, with a privacy-by-design review."],
];

export const rubric = [
  {
    criterion: "Problem relevance",
    weight: 20,
    levels: [
      "Real office task in a chosen track, with a baseline number (time, errors, backlog)",
      "Clear problem, impact partly described",
      "Problem is general or vague",
      "Problem unclear",
    ],
  },
  {
    criterion: "Solution functionality",
    weight: 25,
    levels: [
      "Automates the task end to end with the synthetic dataset (or a trainer-checked, cleared office file)",
      "Works with minor gaps",
      "Partially working, or mostly a mock-up",
      "Not working",
    ],
  },
  {
    criterion: "Appropriate use of AI and automation",
    weight: 20,
    levels: [
      "Tools well matched to the task; free and sustainable; prompts and steps documented",
      "Mostly appropriate; some documentation",
      "Tool choice weak or undocumented",
      "AI used without clear purpose",
    ],
  },
  {
    criterion: "Responsible AI, privacy, and verification",
    weight: 20,
    levels: [
      "The check step is built in: complete checklist, synthetic or cleared data, human review and verification, risks and bias addressed",
      "Most safeguards present",
      "Safeguards mentioned but not built in",
      "Safeguards missing",
    ],
  },
  {
    criterion: "Presentation and sustainability",
    weight: 15,
    levels: [
      "Clear demo of automate, check, decide; result compared with the baseline; realistic 30-day plan for the office",
      "Clear demo; some plan",
      "Demo unclear; little plan",
      "No clear demo",
    ],
  },
];

export const responsibleChecklist = [
  "We used the sample (synthetic) dataset, or followed the 5-step data protocol for a cleared, masked file.",
  "Our data is classified (green, yellow, red) and personal data is masked.",
  "Office clearance is in place where needed.",
  "A human reviews every output before it is used, and that step is built into the workflow.",
  "We checked facts, figures, and sources with the output checklist.",
  "We named the risks and possible bias, and how we handle them.",
  "Agents and connectors have least privilege, with approvals on.",
  "Uploads, chats, triggers, and connections will be cleared after the session.",
];

export const assessment = {
  parts: [
    ["Part A, knowledge", "10 multiple-choice questions: AI limitations and hallucination, RA 10173 and safe data handling, prompt structure, verification, automation concepts, and bias in decision support."],
    ["Part B, confidence", "7 self-rated items on a 1 to 5 scale, the same tasks as the readiness survey: prompting, drafting, spreadsheets, reports, verifying, automating, and decision support."],
  ],
  formative: [
    ["Daily exit tickets", "Three questions: what I learned, what is still unclear, what I will use at work."],
    ["Morning recap quizzes", "On Days 2 and 3."],
    ["Lab outputs", "Prompt library, cleaned dataset, automated workflow, dashboard, decision brief."],
  ],
  evaluation: [
    ["Reaction", "Satisfaction, relevance, trainer effectiveness, venue and logistics", "Training evaluation form", "End of Day 3"],
    ["Learning", "Knowledge and confidence gains, capstone quality", "Pre and post assessment, capstone rubric", "Day 1 and Day 3"],
    ["Behavior", "Use of AI tools and automations at work", "30-day follow-up form based on your AI Action Plan", "About 30 days after"],
    ["Results (optional)", "Time saved, fewer errors, faster service", "Short success stories from participants' offices", "60 to 90 days after"],
  ],
  confidence: [
    "Write good prompts",
    "Draft letters, memos, and reports",
    "Work with spreadsheets and data",
    "Prepare summaries and reports",
    "Verify AI outputs",
    "Automate routine tasks",
    "Support decisions with data",
  ],
};

export const helpContacts = [
  ["Training lead", "Questions about the program, and requests for large print, seating help, or language support (Filipino or Hiligaynon)"],
  ["Venue and logistics", "Getting there, the room, meals"],
  ["Technical setup", "Accounts, logins, laptops"],
];

export const biasChecklist = [
  ["Data quality", "Are there gaps, duplicates, or errors that could explain the pattern?"],
  ["Representativeness", "Does the data cover all offices, months, and client groups the decision affects?"],
  ["Fairness to client groups", "Would any group be treated worse by this option?"],
  ["Privacy", "Is personal data masked, and is the analysis proportionate to the purpose?"],
  ["Explainability", "Can you explain the evidence and the recommendation to the people affected?"],
];

export const analysisPrompts = [
  "Using the attached synthetic clearance applications log, give me the number of applications per office per month as a table, and point out any month or office that looks unusual.",
  "For each number in your table, give me the Google Sheets formula (COUNTIFS or QUERY) I can use to check it myself.",
  "Suggest three charts for a one-page dashboard for the head of office, and say which question each chart answers.",
  "List anything in this data that could mislead a decision: missing months, duplicate rows, or offices with very few records.",
];

export const capstoneTheme = {
  title: "One office task, end to end: automate it, check it, decide with it",
  why: "Built around the readiness survey: half of you (11 of 22) have not automated anything yet, most rate yourselves beginners in verifying outputs and decision support, 17 of 22 know little about data privacy, and 9 named the cost of paid tools as a barrier. So every project takes one real task, automates it with free tools, builds in a human check, and ends with a number someone can decide with.",
  rules: [
    ["Mixed teams", "3 people, at least one from ICT and one from outside ICT."],
    ["A baseline number", "Write down today’s time, errors, or backlog on the Pain Point Card, and compare against it in your demo."],
    ["Free tools only", "Every core project runs on free accounts."],
    ["It keeps going", "Your 30-day AI Action Plan continues the capstone back at the office."],
  ],
};

export const capstoneTracks = [
  ["Frontline transactions", "A Form-fed daily log (such as the clearance applications log), an automatic daily summary, and a dashboard of volume and waiting times."],
  ["Accounts check", "AI-written formulas (XLOOKUP, COUNTIFS, QUERY) that match two lists, flag mismatches for a person to review, and total what is still open."],
  ["Supplies and property", "A Form for issuance and returns, a Sheets inventory with low-stock alerts, and a chart for reorder decisions."],
  ["Citizen feedback", "A FAQ assistant grounded in your office’s sample FAQ, plus a feedback survey summarized into the top three service issues."],
  ["Build track (ICT-led)", "A script, small web app, agent, or local AI helper, with a privacy-by-design review and a non-ICT teammate as the tester."],
];
