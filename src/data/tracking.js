// Every checklist and worksheet the guide saves, in one registry.
// Pages render them by id; the My progress page reads the same list.
import { prepChecklist, advancedChecklist } from "./setup";
import { outputChecklist, responsibleChecklist, biasChecklist } from "./reference";
import { mcpSafety, skillSafety } from "./modules";
import { certificateCleanup } from "./certificates";
import { n8nChecks, n8nCleanup } from "./n8n";
import { appChecks, appCleanup } from "./officeApp";

const PRIVACY = ["Public (green)", "Internal (yellow)", "Restricted (red)"];

export const checklists = [
  ...prepChecklist.map((c) => ({ ...c, to: `/setup#${c.id}` })),
  { ...advancedChecklist, to: "/setup#prep-advanced", optional: true },
  { id: "output-check", title: "Output checklist", items: outputChecklist, to: "/prompting#check" },
  {
    id: "daily-cleanup",
    title: "End of day cleanup",
    note: "Step 5 of the data protocol. Untick these each morning and run them again before you leave.",
    items: [
      "Deleted the files I uploaded to AI tools.",
      "Deleted the chats that held training data.",
      "Removed files from shared folders and agent work folders.",
      "Disconnected any app connections I set up.",
    ],
    to: "/data-protection#cleanup",
  },
  { id: "mcp-safety", title: "MCP safety checklist", items: mcpSafety, to: "/mcp#safety" },
  { id: "skill-safety", title: "Skill safety", items: skillSafety, to: "/skills#safety" },
  { id: "cert-cleanup", title: "Certificate cleanup", note: "Never skipped.", items: certificateCleanup, to: "/certificates#cleanup" },
  { id: "app-checks", title: "Office app checks", items: appChecks, to: "/office-app#fix" },
  { id: "app-cleanup", title: "Office app cleanup", note: "Never skipped.", items: appCleanup, to: "/office-app#cleanup" },
  { id: "n8n-checks", title: "Reply drafter checks", items: n8nChecks, to: "/n8n#samples" },
  { id: "n8n-cleanup", title: "n8n cleanup", note: "Never skipped.", items: n8nCleanup, to: "/n8n#cleanup" },
  {
    id: "bias-check",
    title: "Bias and risk checklist",
    items: biasChecklist.map(([name, question]) => `${name}: ${question}`),
    to: "/decision-support#bias",
  },
  { id: "responsible", title: "Responsible AI checklist", items: responsibleChecklist, to: "/capstone#checklist" },
];

const exitFields = [
  { key: "learned", label: "What I learned" },
  { key: "unclear", label: "What is still unclear" },
  { key: "use", label: "What I will use at work" },
];

export const worksheets = [
  {
    id: "exit-day-1",
    title: "Day 1 exit ticket",
    intro: "Three short answers before you leave. Copy them into the exit ticket form your trainer shares.",
    fields: exitFields,
    to: "/day-1#exit",
  },
  {
    id: "office-dos",
    title: "Office AI do’s and don’ts",
    intro: "Your group’s rules for your own office, from the case scenarios.",
    fields: [
      { key: "dos", label: "Do", hint: "Three things your office should always do when using AI.", rows: 4 },
      { key: "donts", label: "Don’t", hint: "Three things nobody in your office should do with AI.", rows: 4 },
    ],
    to: "/responsible-ai#office-rules",
  },
  {
    id: "pain-point",
    title: "Pain Point Card",
    intro: "One real office task for your team of 3. Day 1, 3:35 PM.",
    fields: [
      { key: "team", label: "Team members", short: true, wide: true },
      { key: "track", label: "Capstone track", options: ["Frontline transactions", "Accounts check", "Supplies and property", "Citizen feedback", "Build track (ICT-led)"] },
      { key: "task", label: "Task", hint: "The repetitive task, in one or two sentences.", wide: true },
      { key: "frequency", label: "How often", options: ["Daily", "Weekly", "Monthly", "Quarterly", "Several times a day"] },
      { key: "time", label: "Time spent each time", short: true, hint: "For example: 2 hours, or 30 minutes per report." },
      { key: "data", label: "Data involved", hint: "Which files, forms, or records the task uses.", wide: true },
      { key: "privacy", label: "Privacy level", options: PRIVACY },
      { key: "baseline", label: "Baseline number", short: true, hint: "Today\u2019s number you will try to beat, for example 3 hours a week or 12 errors a month." },
    ],
    to: "/capstone#pain-point",
  },
  {
    id: "exit-day-2",
    title: "Day 2 exit ticket",
    intro: "Three short answers before you leave.",
    fields: exitFields,
    to: "/day-2#exit",
  },
  {
    id: "skill-plan",
    title: "Skill permissions plan",
    intro: "Advanced track: for the skill you write on Day 2. Decide what it may touch before any agent runs it.",
    fields: [
      { key: "name", label: "Skill name", short: true, hint: "Lowercase with hyphens, for example memo-writer." },
      { key: "when", label: "When it should be used", short: true },
      { key: "reads", label: "What it may read", hint: "Folders, files, or apps. Read-only first." },
      { key: "changes", label: "What it may create or change" },
      { key: "approve", label: "Actions that need my approval", hint: "Sending, sharing, deleting, posting, paying." },
      { key: "data", label: "Highest data level it may see", options: PRIVACY },
    ],
    to: "/skills#plan",
  },
  {
    id: "canvas",
    title: "Capstone Project Canvas",
    intro: "Plan the solution in three parts before you build it: automate it, check it, decide with it. The trainer gives quick feedback. Day 2, 4:15 PM.",
    fields: [
      { key: "problem", label: "Problem and track", hint: "The office task, your track, and your baseline number.", wide: true },
      { key: "users", label: "Users", hint: "Who uses the solution, and who benefits." },
      { key: "data", label: "Data and its classification", hint: "Which sample dataset, and green, yellow, or red." },
      { key: "tools", label: "1. Automate it: tools", hint: "Free AI tools, Forms, Sheets, or scripts you will use." },
      { key: "workflow", label: "1. Automate it: workflow", hint: "Trigger, steps, and output.", rows: 4 },
      { key: "check", label: "2. Check it", hint: "Where a person reviews, what you verify, and the privacy risks and how you handle each one.", rows: 3 },
      { key: "decide", label: "3. Decide with it", hint: "The number, chart, or brief your head of office will use, and the decision it supports.", rows: 3 },
      { key: "success", label: "Success measure", hint: "Your baseline number and the target: time saved, fewer errors, faster service." },
    ],
    to: "/capstone#canvas",
  },
  {
    id: "insights",
    title: "Three checked insights",
    intro: "From the dashboard lab. Write each insight, then how you checked the number in Sheets.",
    fields: [
      { key: "one", label: "Insight 1, and how you checked it", wide: true },
      { key: "two", label: "Insight 2, and how you checked it", wide: true },
      { key: "three", label: "Insight 3, and how you checked it", wide: true },
    ],
    to: "/decision-support#insights",
  },
  {
    id: "decision-brief",
    title: "Decision brief",
    intro: "One page. AI helps prepare it; a person decides.",
    fields: [
      { key: "question", label: "Decision to be made", wide: true },
      { key: "evidence", label: "Evidence", hint: "The checked numbers and where they came from.", rows: 4 },
      { key: "options", label: "Options", hint: "Two or three, each in a sentence.", rows: 4 },
      { key: "risks", label: "Risks and bias", hint: "From the bias and risk checklist.", rows: 4 },
      { key: "recommendation", label: "Recommendation", rows: 3 },
      { key: "decider", label: "Who decides", short: true, hint: "The person accountable, by role." },
    ],
    to: "/decision-support#brief",
  },
  {
    id: "action-plan",
    title: "30-day AI Action Plan",
    intro: "About 30 days after the training you get a short follow-up form about this plan.",
    fields: [
      { key: "task", label: "The task I will use AI for", wide: true },
      { key: "tool", label: "The tool I will use", short: true },
      { key: "data", label: "Its data level", options: PRIVACY },
      { key: "first", label: "My first step, this week" },
      { key: "share", label: "Who I will share it with" },
      { key: "measure", label: "How I will know it worked", wide: true },
    ],
    to: "/assessment#action-plan",
  },
  {
    id: "exit-day-3",
    title: "Day 3 exit ticket",
    intro: "Three short answers before the closing.",
    fields: exitFields,
    to: "/day-3#exit",
  },
];

export const getChecklist = (id) => checklists.find((c) => c.id === id);
export const getWorksheet = (id) => worksheets.find((w) => w.id === id);
