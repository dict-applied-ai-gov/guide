import { Link } from "react-router-dom";
import { readStored, useStorageVersion, writeStored } from "@/lib/storage";
import { checklists, worksheets } from "@/data/tracking";
import { trafficCards, cloudOrLocal, scoreCriteria, scoreModels, agentFitCases } from "@/data/modules";
import { PageHead, Progress as Bar, Section, CopyButton } from "@/components/ui";
import { Page } from "@/components/tracked";

function checklistDone(c) {
  const checked = readStored(`check:${c.id}`, []);
  return c.items.filter((_, i) => checked.includes(i)).length;
}

function sheetFilled(w) {
  const values = readStored(`sheet:${w.id}`, {});
  return w.fields.filter((f) => (values[f.key] || "").trim()).length;
}

function exercises() {
  const library = readStored("prompt-library", []);
  const traffic = readStored("traffic-light", {});
  const col = readStored("cloud-or-local", {});
  const scores = readStored("tool-scores", {});
  const fit = readStored("agent-fit", {});
  return [
    { label: "Prompt library", to: "/prompting#library", done: Math.min(library.length, 3), max: 3, text: `${library.length} saved, goal 3` },
    { label: "Data Traffic Light cards", to: "/data-protection#game", done: trafficCards.filter((c) => traffic[c.id]).length, max: trafficCards.length },
    { label: "Tool comparison worksheet", to: "/models#scores", done: Object.values(scores).filter(Boolean).length, max: scoreCriteria.length * scoreModels.length },
    { label: "Agent Fit worksheet", to: "/agents#fit", done: agentFitCases.filter((_, i) => fit[i]?.tool && fit[i]?.risk).length, max: agentFitCases.length },
    { label: "Cloud-or-local decisions", to: "/local-ai#decide", done: cloudOrLocal.filter((s) => col[s.id]).length, max: cloudOrLocal.length },
  ];
}

function allAsText() {
  const parts = worksheets.map((w) => {
    const values = readStored(`sheet:${w.id}`, {});
    if (!w.fields.some((f) => (values[f.key] || "").trim())) return null;
    return [w.title.toUpperCase(), ...w.fields.map((f) => `${f.label}: ${(values[f.key] || "").trim() || "(blank)"}`)].join("\n");
  });
  const library = readStored("prompt-library", []);
  if (library.length) parts.push(["MY PROMPT LIBRARY", ...library.map((p) => `${p.title}\n${p.text}`)].join("\n\n"));
  return parts.filter(Boolean).join("\n\n\n") || "Nothing filled in yet.";
}

function clearAll() {
  if (!window.confirm("Clear every checklist, worksheet, score and saved prompt in this browser? This can’t be undone.")) return;
  try {
    const keys = [];
    for (let i = 0; i < window.localStorage.length; i += 1) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith("aag:") && k !== "aag:theme") keys.push(k);
    }
    keys.forEach((k) => writeStored(k.slice(4), undefined));
  } catch {
    /* nothing stored */
  }
}

function Row({ label, to, done, max, text, optional }) {
  const complete = done === max;
  return (
    <li className={`tally__row ${complete ? "is-complete" : ""}`}>
      <Link to={to} className="tally__label">
        {label}
      </Link>
      {optional && <span className="tally__optional">Optional</span>}
      <Bar value={done} max={max} />
      <span className="tally__count num">{text || `${done} of ${max}`}</span>
    </li>
  );
}

export function Progress() {
  useStorageVersion();
  const ex = exercises();
  const totalChecks = checklists.filter((c) => !c.optional).reduce((s, c) => s + c.items.length, 0);
  const doneChecks = checklists.filter((c) => !c.optional).reduce((s, c) => s + checklistDone(c), 0);

  return (
    <Page to="/progress">
      <PageHead
        title="My progress"
        lead="Every checklist, worksheet and exercise in this guide, with how far you are. Everything is saved in this browser only."
      >
        <p className="page-head__figure">
          <span className="num">{doneChecks}</span> of <span className="num">{totalChecks}</span> checklist items done
        </p>
      </PageHead>

      <Section id="checklists" title="Checklists">
        <ul className="tally">
          {checklists.map((c) => (
            <Row key={c.id} label={c.title} to={c.to} done={checklistDone(c)} max={c.items.length} optional={c.optional} />
          ))}
        </ul>
      </Section>

      <Section id="worksheets" title="Worksheets" intro="Fields filled in each one.">
        <ul className="tally">
          {worksheets.map((w) => (
            <Row key={w.id} label={w.title} to={w.to} done={sheetFilled(w)} max={w.fields.length} />
          ))}
        </ul>
      </Section>

      <Section id="exercises" title="Exercises">
        <ul className="tally">
          {ex.map((e) => (
            <Row key={e.label} {...e} />
          ))}
        </ul>
      </Section>

      <Section
        id="keep"
        title="Keep your work"
        intro="Nothing here leaves your browser. A different laptop or a cleared browser starts empty, so copy your worksheets into a Google Doc before Day 3 ends."
      >
        <div className="button-row">
          <CopyButton text={allAsText()} label="Copy all worksheets and prompts" className="btn btn--primary" />
          <button type="button" className="btn btn--quiet" onClick={clearAll}>
            Clear everything
          </button>
        </div>
      </Section>
    </Page>
  );
}
