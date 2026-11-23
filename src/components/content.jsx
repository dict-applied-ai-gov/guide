import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import { currentSession, formatClock, trainingStatus, useNow } from "@/lib/time";
import { useStored } from "@/lib/storage";
import { rtcfc } from "@/data/reference";
import { trafficCards, cloudOrLocal, scoreCriteria, scoreModels, agentFitCases } from "@/data/modules";
import { CopyButton, Tag } from "./ui";

export function StatusChip() {
  const now = useNow();
  const status = trainingStatus(now);
  if (!status.label) return null;
  return (
    <p className="status-chip" role="status">
      {status.day ? <Link to={`/${status.day.id}`}>{status.label}</Link> : status.label}
    </p>
  );
}

export function SessionList({ day, showLinks = true }) {
  const now = useNow();
  const live = currentSession(now, day);
  return (
    <ol className="sessions" aria-label={`Day ${day.number} sessions`}>
      {day.sessions.map((s) => {
        const isNow = live === s;
        if (s.kind === "break") {
          return (
            <li key={s.start} className={`session session--break ${isNow ? "is-now" : ""}`}>
              <p className="session__time">
                <span className="session__start">{s.start}</span>
                <span className="session__end">to {s.end}</span>
              </p>
              <p className="session__break">
                {s.title}
                {isNow && <Tag tone="now">Now</Tag>}
              </p>
            </li>
          );
        }
        return (
          <li key={s.start} className={`session ${isNow ? "is-now" : ""}`} id={`s-${s.start.replace(":", "")}`}>
            <p className="session__time">
              <span className="session__start">{s.start}</span>
              <span className="session__end">to {s.end}</span>
            </p>
            <div className="session__body">
              <h3>
                {s.title}
                {isNow && <Tag tone="now">Now</Tag>}
              </h3>
              <p>{s.do}</p>
              {showLinks && s.link && (
                <p className="session__link">
                  <Link to={s.link.to}>{s.link.label}</Link>
                </p>
              )}
            </div>
            <dl className="session__out">
              {s.module && (
                <div>
                  <dt>Module</dt>
                  <dd>{s.module}</dd>
                </div>
              )}
              {s.produce && (
                <div>
                  <dt>You produce</dt>
                  <dd>{s.produce}</dd>
                </div>
              )}
            </dl>
          </li>
        );
      })}
    </ol>
  );
}

export function PromptBuilder() {
  const [values, setValues] = useStored("prompt-builder", {});
  const [, setLibrary] = useStored("prompt-library", []);
  const [saved, setSaved] = useState(false);
  const prompt = rtcfc
    .map((p) => (values[p.key] || "").trim())
    .filter(Boolean)
    .join("\n\n");
  const filled = rtcfc.filter((p) => (values[p.key] || "").trim()).length;

  return (
    <div className="builder">
      <form className="builder__form" onSubmit={(e) => e.preventDefault()} aria-label="R-T-C-F-C prompt builder">
        {rtcfc.map((p) => (
          <div className="field" key={p.key}>
            <label htmlFor={`b-${p.key}`}>
              <span className="builder__letter" aria-hidden="true">{p.letter}</span> {p.name}: {p.meaning.charAt(0).toLowerCase() + p.meaning.slice(1)}
            </label>
            <textarea
              id={`b-${p.key}`}
              rows={2}
              placeholder={p.example}
              value={values[p.key] || ""}
              onChange={(e) => {
                setSaved(false);
                setValues((prev) => ({ ...prev, [p.key]: e.target.value }));
              }}
            />
          </div>
        ))}
        <div className="builder__actions">
          <button
            type="button"
            className="btn btn--secondary btn--small"
            onClick={() => {
              setSaved(false);
              setValues(Object.fromEntries(rtcfc.map((p) => [p.key, p.example])));
            }}
          >
            Fill with the memo example
          </button>
          <button type="button" className="btn btn--quiet btn--small" onClick={() => setValues({})}>
            Clear
          </button>
        </div>
      </form>
      <div className="builder__out">
        <p className="builder__label">Your prompt, {filled} of 5 parts</p>
        <pre className="builder__prompt" tabIndex={0} aria-live="polite">
          {prompt || "Fill in the parts on the left. The prompt builds here."}
        </pre>
        <div className="builder__actions">
          <CopyButton text={prompt} label="Copy prompt" className="btn btn--primary btn--small" />
          <button
            type="button"
            className="btn btn--secondary btn--small"
            disabled={!prompt}
            onClick={() => {
              const title = (values.task || "Untitled prompt").trim().slice(0, 70);
              setLibrary((prev) => [{ id: Date.now(), title, text: prompt }, ...prev]);
              setSaved(true);
            }}
          >
            Save to my library
          </button>
        </div>
        {saved && <p className="builder__saved" role="status">Saved to your prompt library below.</p>}
      </div>
    </div>
  );
}

export function PromptLibrary() {
  const [library, setLibrary] = useStored("prompt-library", []);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  return (
    <div className="library">
      <form
        className="library__add"
        onSubmit={(e) => {
          e.preventDefault();
          if (!text.trim()) return;
          setLibrary((prev) => [{ id: Date.now(), title: title.trim() || "Untitled prompt", text: text.trim() }, ...prev]);
          setTitle("");
          setText("");
        }}
      >
        <div className="field">
          <label htmlFor="lib-title">Name</label>
          <input id="lib-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Reply to a citizen request" />
        </div>
        <div className="field">
          <label htmlFor="lib-text">Prompt</label>
          <textarea id="lib-text" rows={4} value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <button type="submit" className="btn btn--primary btn--small" disabled={!text.trim()}>
          <Plus size={16} aria-hidden="true" />
          <span>Add to library</span>
        </button>
      </form>
      <div className="library__list">
        <p className="library__count">
          {library.length === 0
            ? "No prompts yet. Aim for at least 3 by the end of Day 1."
            : `${library.length} ${library.length === 1 ? "prompt" : "prompts"} saved${library.length < 3 ? `, ${3 - library.length} more to reach the Day 1 goal` : ""}`}
        </p>
        <ul>
          {library.map((p) => (
            <li key={p.id} className="library__item">
              <h3>{p.title}</h3>
              <pre tabIndex={0}>{p.text}</pre>
              <div className="library__actions">
                <CopyButton text={p.text} />
                <button
                  type="button"
                  className="btn btn--quiet btn--small"
                  onClick={() => setLibrary((prev) => prev.filter((x) => x.id !== p.id))}
                  aria-label={`Delete ${p.title}`}
                >
                  <Trash2 size={16} aria-hidden="true" />
                  <span>Delete</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const LIGHTS = [
  { key: "public", label: "Public", color: "green" },
  { key: "internal", label: "Internal", color: "yellow" },
  { key: "restricted", label: "Restricted", color: "red" },
];

export function TrafficLight() {
  const [picks, setPicks] = useStored("traffic-light", {});
  const answered = trafficCards.filter((c) => picks[c.id]);
  const right = answered.filter((c) => picks[c.id] === c.answer).length;

  return (
    <div className="traffic">
      <p className="traffic__score" aria-live="polite">
        {answered.length === 0
          ? "Sort each card. Your answer is checked as you go."
          : `${right} of ${answered.length} match the suggested answer${answered.length === trafficCards.length ? ". All sorted." : "."}`}
      </p>
      <ul className="traffic__cards">
        {trafficCards.map((card) => {
          const pick = picks[card.id];
          const correct = pick === card.answer;
          const answer = LIGHTS.find((l) => l.key === card.answer);
          return (
            <li key={card.id} className="traffic__card">
              <fieldset>
                <legend>{card.label}</legend>
                <div className="segmented">
                  {LIGHTS.map((l) => (
                    <label key={l.key} className={`segmented__opt light--${l.color}`}>
                      <input
                        type="radio"
                        name={`tl-${card.id}`}
                        value={l.key}
                        checked={pick === l.key}
                        onChange={() => setPicks((prev) => ({ ...prev, [card.id]: l.key }))}
                      />
                      <span>{l.label}</span>
                    </label>
                  ))}
                </div>
                {pick && (
                  <p className={`traffic__verdict ${correct ? "is-right" : "is-wrong"}`}>
                    {correct ? "Matches. " : `Suggested: ${answer.label} (${answer.color}). `}
                    {card.why}
                  </p>
                )}
              </fieldset>
            </li>
          );
        })}
      </ul>
      {answered.length > 0 && (
        <button type="button" className="btn btn--quiet btn--small" onClick={() => setPicks({})}>
          Start over
        </button>
      )}
    </div>
  );
}

const PLACES = [
  { key: "cloud", label: "Cloud" },
  { key: "either", label: "Either, with care" },
  { key: "local", label: "Local" },
];

export function CloudOrLocal() {
  const [picks, setPicks] = useStored("cloud-or-local", {});
  const [notes, setNotes] = useStored("cloud-or-local-notes", {});
  return (
    <ol className="decide">
      {cloudOrLocal.map((s) => {
        const pick = picks[s.id];
        return (
          <li key={s.id} className="decide__row">
            <fieldset>
              <legend>{s.scenario}</legend>
              <div className="segmented">
                {PLACES.map((p) => (
                  <label key={p.key} className="segmented__opt">
                    <input
                      type="radio"
                      name={`col-${s.id}`}
                      checked={pick === p.key}
                      onChange={() => setPicks((prev) => ({ ...prev, [s.id]: p.key }))}
                    />
                    <span>{p.label}</span>
                  </label>
                ))}
              </div>
              <div className="field">
                <label htmlFor={`col-why-${s.id}`}>Why</label>
                <input
                  id={`col-why-${s.id}`}
                  type="text"
                  value={notes[s.id] || ""}
                  onChange={(e) => setNotes((prev) => ({ ...prev, [s.id]: e.target.value }))}
                />
              </div>
              {pick && (
                <p className="decide__hint">
                  Suggested: {PLACES.find((p) => p.key === s.suggested).label.toLowerCase()}. {s.why}
                </p>
              )}
            </fieldset>
          </li>
        );
      })}
    </ol>
  );
}

export function ToolScores() {
  const [scores, setScores] = useStored("tool-scores", {});
  const total = (m) => scoreCriteria.reduce((sum, c) => sum + (Number(scores[`${m}|${c}`]) || 0), 0);
  return (
    <div className="table-wrap" role="region" aria-label="Tool comparison worksheet" tabIndex={0}>
      <table className="scores">
        <caption>Score each answer from 1 (poor) to 4 (excellent).</caption>
        <thead>
          <tr>
            <th scope="col">Criterion</th>
            {scoreModels.map((m) => (
              <th scope="col" key={m}>{m}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scoreCriteria.map((c) => (
            <tr key={c}>
              <th scope="row">{c}</th>
              {scoreModels.map((m) => (
                <td key={m}>
                  <select
                    aria-label={`${m}, ${c}`}
                    value={scores[`${m}|${c}`] || ""}
                    onChange={(e) => setScores((prev) => ({ ...prev, [`${m}|${c}`]: e.target.value }))}
                  >
                    <option value="">Score</option>
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Total</th>
            {scoreModels.map((m) => (
              <td key={m} className="num">{total(m) || ""}</td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export function AgentFit() {
  const [rows, setRows] = useStored("agent-fit", {});
  const set = (i, key, v) => setRows((prev) => ({ ...prev, [i]: { ...(prev[i] || {}), [key]: v } }));
  return (
    <div className="table-wrap" role="region" aria-label="Agent Fit worksheet" tabIndex={0}>
      <table className="fit">
        <thead>
          <tr>
            <th scope="col">Office use case</th>
            <th scope="col">Tool you’d pick</th>
            <th scope="col">Data risk</th>
            <th scope="col">Actions that need approval</th>
          </tr>
        </thead>
        <tbody>
          {agentFitCases.map((c, i) => (
            <tr key={c}>
              <th scope="row">{c}</th>
              <td>
                <input type="text" aria-label={`${c}: tool`} value={rows[i]?.tool || ""} onChange={(e) => set(i, "tool", e.target.value)} />
              </td>
              <td>
                <select aria-label={`${c}: data risk`} value={rows[i]?.risk || ""} onChange={(e) => set(i, "risk", e.target.value)}>
                  <option value="">Choose</option>
                  <option>Public (green)</option>
                  <option>Internal (yellow)</option>
                  <option>Restricted (red)</option>
                </select>
              </td>
              <td>
                <input type="text" aria-label={`${c}: actions needing approval`} value={rows[i]?.approve || ""} onChange={(e) => set(i, "approve", e.target.value)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ClockRange({ start, end }) {
  return (
    <>
      {formatClock(start)} to {formatClock(end)}
    </>
  );
}
