import { days } from "./course";
import { glossary } from "./reference";

export const navGroups = [
  {
    label: "Course",
    items: [
      { to: "/", label: "Overview", desc: "Dates, venue, the three days, the data rule" },
      { to: "/progress", label: "My progress", desc: "Every checklist and worksheet in one place" },
      { to: "/schedule", label: "Schedule", desc: "All three days, session by session" },
      { to: "/setup", label: "Before you come", desc: "Preparation checklist, accounts, installs" },
    ],
  },
  {
    label: "Days",
    items: days.map((d) => ({
      to: `/${d.id}`,
      label: `Day ${d.number}`,
      sub: `${d.weekday.slice(0, 3)}, ${d.dateLabel}`,
      desc: d.title,
    })),
  },
  {
    label: "Topic modules",
    items: [
      { to: "/models", label: "AI models", letter: "B", desc: "ChatGPT, Claude, Gemini, Grok, Copilot, open models compared" },
      { to: "/data-protection", label: "Protecting data", letter: "E", desc: "Data Traffic Light, the 5-step protocol, prompt injection" },
      { to: "/agents", label: "Agent tools", letter: "C", desc: "Grok Bot, OpenMausBot, Rakazo, opencode, AI Studio, Antigravity" },
      { to: "/mcp", label: "Apps and MCP", letter: "F", desc: "Connecting agents to apps, and the safety checklist" },
      { to: "/local-ai", label: "Local AI", letter: "D", desc: "Ollama, LM Studio, hardware, cloud or local" },
      { to: "/skills", label: "Agent skills", letter: "G", desc: "SKILL.md, starter templates, skill safety" },
    ],
  },
  {
    label: "Hands-on",
    items: [
      { to: "/prompting", label: "Prompting and checking", desc: "R-T-C-F-C prompt builder, prompt library, output checklist" },
      { to: "/office-app", label: "Build an office app", desc: "Stitch + AI Studio, then test it on your phone" },
      { to: "/certificates", label: "Automated certificates", desc: "Forms, Sheets, Slides, Apps Script, Gmail" },
      { to: "/n8n", label: "Build an app with n8n", desc: "Set up n8n, then a form + AI Reply drafter" },
      { to: "/decision-support", label: "Decision support", desc: "Data analysis, dashboard, decision brief, bias check" },
      { to: "/capstone", label: "Capstone project", desc: "Pain Point Card, project canvas, rubric" },
    ],
  },
  {
    label: "Reference",
    items: [
      { to: "/responsible-ai", label: "Responsible AI", desc: "RA 10173, NPC advisory, JMC 003, EO 131, do’s and don’ts" },
      { to: "/quick-reference", label: "Quick reference", desc: "One printable page of the essentials" },
      { to: "/glossary", label: "Glossary", desc: "Terms in plain words" },
      { to: "/faq", label: "FAQ and help", desc: "Common questions, troubleshooting, who to ask" },
      { to: "/resources", label: "Tools and sources", desc: "Links to every tool, laws, and sources" },
      { to: "/assessment", label: "Assessment", desc: "Pre and post assessment, evaluation, 30-day action plan" },
    ],
  },
];

export const pages = navGroups.flatMap((g) => g.items.map((i) => ({ ...i, group: g.label })));

export const searchIndex = [
  ...pages.map((p) => ({ title: p.label === "Day 1" || p.label === "Day 2" || p.label === "Day 3" ? `${p.label}: ${p.desc}` : p.label, detail: p.desc, to: p.to, kind: p.group })),
  ...days.flatMap((d) =>
    d.sessions
      .filter((s) => s.kind !== "break")
      .map((s) => ({ title: s.title, detail: `Day ${d.number}, ${s.start} to ${s.end}`, to: `/${d.id}`, kind: "Session" }))
  ),
  ...glossary.map(([term, meaning]) => ({ title: term, detail: meaning, to: "/glossary", kind: "Glossary" })),
];
