import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CalendarDays,
  CircleCheck,
  Code2,
  Cpu,
  Database,
  Download,
  FileText,
  FlaskConical,
  Landmark,
  Layers,
  MapPin,
  MessageSquare,
  Palette,
  Presentation,
  ShieldAlert,
  Sheet,
  Sparkles,
  Target,
  Terminal,
  Workflow,
  Wrench,
} from "lucide-react";
import { course, days, dataRule, modules, outcomes, quickAnswers } from "@/data/course";
import { StatusChip } from "@/components/content";

const stack = [
  { name: "Gemini", desc: "AI assistant, built into Google Workspace", icon: Sparkles, url: "https://gemini.google.com" },
  { name: "NotebookLM", desc: "Answers with citations from your own documents", icon: BookOpen, url: "https://notebooklm.google.com" },
  { name: "ChatGPT", desc: "All-round drafting and reasoning", icon: MessageSquare, url: "https://chatgpt.com" },
  { name: "Claude", desc: "Long documents and careful writing", icon: FileText, url: "https://claude.ai" },
  { name: "Google AI Studio", desc: "Prompt testing, prototypes, Gemini API keys", icon: FlaskConical, url: "https://aistudio.google.com" },
  { name: "Forms and Sheets", desc: "Collecting, cleaning, and checking office data", icon: Sheet, url: "https://sheets.google.com" },
  { name: "Apps Script", desc: "Automations across Forms, Slides, and Gmail", icon: Code2, url: "https://script.google.com" },
  { name: "Looker Studio", desc: "Free dashboards for decision support", icon: BarChart3, url: "https://lookerstudio.google.com" },
  { name: "n8n", desc: "Workflows with an AI step, without code", icon: Workflow, url: "https://n8n.io" },
  { name: "PSA OpenSTAT", desc: "Official Philippine statistics, with a free API", icon: Database, url: "https://openstat.psa.gov.ph" },
  { name: "Canva", desc: "Designs, and the app connection (MCP) demo", icon: Palette, url: "https://www.canva.com" },
  { name: "Ollama and LM Studio", desc: "AI that runs offline on your laptop", icon: Cpu, url: "https://ollama.com" },
  { name: "opencode and Antigravity", desc: "Coding agents for the advanced track", icon: Terminal, url: "https://opencode.ai" },
  { name: "Power Automate", desc: "Automation for Microsoft 365 offices", icon: Workflow, url: "https://make.powerautomate.com" },
];

const sessionCount = (d) => d.sessions.filter((s) => s.kind !== "break").length;

export function Home() {
  return (
    <div className="home">
      <section className="hero-card" aria-labelledby="hero-h">
        <ul className="pills" aria-label="At a glance">
          <li className="pill">
            <CalendarDays size={14} aria-hidden="true" /> 3 days, on site
          </li>
          <li className="pill">
            <MapPin size={14} aria-hidden="true" /> {course.city}, {course.dates}
          </li>
          <li className="pill">
            <Landmark size={14} aria-hidden="true" /> DICT ILCDB-linked government training
          </li>
        </ul>
        <h1 id="hero-h" className="hero-card__title">
          {course.title}
        </h1>
        <p className="hero-card__lead">
          Use AI safely, responsibly, and productively in government work: better prompts, office tasks automated with tools your office can keep, agents
          connected to apps, local AI, and AI-assisted decisions. Bring one real task; leave with it automated.
        </p>
        <StatusChip />
        <div className="hero-card__actions">
          <Link className="btn btn--primary btn--lg" to="/setup">
            <Wrench size={16} aria-hidden="true" />
            Start with setup
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link className="btn btn--secondary btn--lg" to="/day-1">
            Jump to Day 1
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="home-section" aria-labelledby="slides-h">
        <h2 id="slides-h" className="icon-heading">
          <Presentation size={22} aria-hidden="true" /> Presentation slides
        </h2>
        <ul className="tile-grid tile-grid--3">
          {days.map((d) => (
            <li key={d.id}>
              <a className="tile" href={d.slides} download>
                <span className="tile__icon" aria-hidden="true">
                  <Download size={18} />
                </span>
                <span>
                  <span className="tile__title">Day {d.number} slides (PDF)</span>
                  <span className="tile__desc">
                    {d.weekday}, {d.dateLabel}: {d.short}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="home-section__note">The slides the trainer shows each day. Download them to follow along or to review later.</p>
      </section>

      <section className="home-section" aria-labelledby="stack-h">
        <h2 id="stack-h" className="icon-heading">
          <Target size={22} aria-hidden="true" /> Tools you will use
        </h2>
        <ul className="tile-grid">
          {stack.map((t) => (
            <li key={t.name}>
              <a className="tile" href={t.url} target="_blank" rel="noreferrer">
                <span className="tile__icon" aria-hidden="true">
                  <t.icon size={18} />
                </span>
                <span>
                  <span className="tile__title">{t.name}</span>
                  <span className="tile__desc">{t.desc}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="home-section__note">Use the AI you already subscribe to, or a free account: every core activity works on both. Sample data only, either way.</p>
      </section>

      <section className="home-section" aria-labelledby="journey-h">
        <h2 id="journey-h" className="icon-heading">
          <Sparkles size={22} aria-hidden="true" /> 3-day journey
        </h2>
        <ol className="day-grid">
          {days.map((d) => (
            <li key={d.id}>
              <Link to={`/${d.id}`} className="day-card">
                <span className="badge-day">Day {d.number}</span>
                <span className="day-card__title">{d.title}</span>
                <span className="day-card__date">
                  {d.weekday}, {d.dateLabel}, {sessionCount(d)} sessions
                </span>
                <span className="day-card__desc">{d.objective}</span>
                <span className="day-card__out">
                  <span className="day-card__label">You leave with</span>
                  {d.keyOutput}
                </span>
                <span className="day-card__more">
                  Open Day {d.number} <ArrowRight size={14} aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="callout" aria-labelledby="rule-h">
        <span className="callout__icon" aria-hidden="true">
          <ShieldAlert size={20} />
        </span>
        <div>
          <h2 id="rule-h" className="callout__title">
            The data rule, read aloud every morning
          </h2>
          <p className="callout__text">{dataRule}</p>
          <p className="callout__more">
            <Link to="/data-protection">Read the full rule and the 5-step protocol</Link>
          </p>
        </div>
      </section>

      <section className="home-section" aria-labelledby="modules-h">
        <h2 id="modules-h" className="icon-heading">
          <Layers size={22} aria-hidden="true" /> Topic modules
        </h2>
        <ul className="tile-grid tile-grid--3">
          {modules.map((m) => (
            <li key={m.letter}>
              <Link className="tile" to={m.to}>
                <span className="badge-square badge-square--lg">{m.letter}</span>
                <span>
                  <span className="tile__title">{m.title}</span>
                  <span className="tile__desc">{m.when}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="home-section" aria-labelledby="outcomes-h">
        <h2 id="outcomes-h" className="icon-heading">
          <CircleCheck size={22} aria-hidden="true" /> By Thursday you can
        </h2>
        <ul className="card outcome-list">
          {outcomes.map((o) => (
            <li key={o.short}>
              <CircleCheck size={18} aria-hidden="true" />
              <span>
                <span className="outcome-list__short">{o.short}</span>
                <span className="outcome-list__text">{o.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="home-section" aria-labelledby="q-h">
        <h2 id="q-h" className="icon-heading">
          <MessageSquare size={22} aria-hidden="true" /> Questions people ask first
        </h2>
        <dl className="qa-grid">
          {quickAnswers.map((qa) => (
            <div key={qa.q} className="card qa">
              <dt>{qa.q}</dt>
              <dd>{qa.a}</dd>
            </div>
          ))}
        </dl>
        <p className="home-section__note">
          <Link to="/faq">All questions and troubleshooting</Link>
        </p>
      </section>
    </div>
  );
}
