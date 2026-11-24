import { useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import { Check, Copy, Printer, RotateCcw } from "lucide-react";
import { useStored } from "@/lib/storage";

export function PageHead({ title, lead, children }) {
  return (
    <header className="page-head">
      <h1 className="page-title">{title}</h1>
      {lead && <p className="standfirst">{lead}</p>}
      {children}
    </header>
  );
}

export function Section({ id, title, intro, children, className = "" }) {
  return (
    <section id={id} className={`doc-section ${className}`} aria-labelledby={id ? `${id}-h` : undefined}>
      <div className="doc-section__head">
        <h2 id={id ? `${id}-h` : undefined}>{title}</h2>
        {intro && <p className="doc-section__intro">{intro}</p>}
      </div>
      {children}
    </section>
  );
}

export function Note({ title, children, tone = "plain" }) {
  return (
    <aside className={`note note--${tone}`}>
      {title && <p className="note__title">{title}</p>}
      <div className="note__body">{children}</div>
    </aside>
  );
}

export function TableWrap({ label, children }) {
  return (
    <div className="table-wrap" role="region" aria-label={label} tabIndex={0}>
      <table>{children}</table>
    </div>
  );
}

export function Tag({ children, tone = "plain" }) {
  return <span className={`tag tag--${tone}`}>{children}</span>;
}

export function NextLink({ to, children }) {
  return (
    <Link className="next-link" to={to}>
      {children}
    </Link>
  );
}

function itemText(item) {
  return typeof item === "string" ? item : item.text;
}

export function Checklist({ id, title, note, items }) {
  const [checked, setChecked] = useStored(`check:${id}`, []);
  const done = items.filter((_, i) => checked.includes(i)).length;
  const toggle = (i) =>
    setChecked((prev) => (prev.includes(i) ? prev.filter((n) => n !== i) : [...prev, i]));
  const headId = useId();

  return (
    <div className="checklist" aria-labelledby={title ? headId : undefined}>
      {title && (
        <div className="checklist__head">
          <h3 id={headId}>{title}</h3>
          <p className="checklist__count" aria-live="polite">
            {done} of {items.length} done
          </p>
        </div>
      )}
      {note && <p className="checklist__note">{note}</p>}
      <Progress value={done} max={items.length} />
      <ul className="checklist__items">
        {items.map((item, i) => (
          <li key={i}>
            <label className="check">
              <input type="checkbox" checked={checked.includes(i)} onChange={() => toggle(i)} />
              <span className="check__box" aria-hidden="true">
                <Check size={14} strokeWidth={3} />
              </span>
              <span className="check__text">
                {itemText(item)}
                {typeof item !== "string" && item.tag && <Tag tone={item.tag.toLowerCase()}>{item.tag}</Tag>}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Progress({ value, max }) {
  const ratio = max ? value / max : 0;
  return (
    <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} aria-label={`${value} of ${max} done`}>
      <span className="progress__bar" style={{ transform: `scaleX(${ratio})` }} />
    </div>
  );
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.className = "visually-hidden";
    document.body.appendChild(area);
    area.select();
    let ok;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    area.remove();
    return ok;
  }
}

export function CopyButton({ text, label = "Copy", className = "btn btn--secondary btn--small" }) {
  const [state, setState] = useState("idle");
  useEffect(() => {
    if (state === "idle") return undefined;
    const id = window.setTimeout(() => setState("idle"), 1800);
    return () => window.clearTimeout(id);
  }, [state]);
  return (
    <button
      type="button"
      className={className}
      onClick={async () => setState((await copyText(text)) ? "copied" : "failed")}
    >
      {state === "copied" ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      <span aria-live="polite">{state === "copied" ? "Copied" : state === "failed" ? "Select and copy" : label}</span>
    </button>
  );
}

export function CopyBlock({ caption, text, lang = "text", collapsible = false }) {
  const [open, setOpen] = useState(false);
  const pre = (
    <pre tabIndex={0} aria-label={caption}>
      <code data-lang={lang}>{text}</code>
    </pre>
  );
  return (
    <figure className="code">
      <figcaption className="code__bar">
        <span>{caption}</span>
        <CopyButton text={text} />
      </figcaption>
      {collapsible ? (
        <details className="code__more" onToggle={(e) => setOpen(e.currentTarget.open)}>
          <summary>{open ? "Hide the script" : `Show all ${text.split("\n").length} lines`}</summary>
          {open && pre}
        </details>
      ) : (
        pre
      )}
    </figure>
  );
}

export function Worksheet({ id, title, intro, fields }) {
  const [values, setValues] = useStored(`sheet:${id}`, {});
  const set = (key, v) => setValues((prev) => ({ ...prev, [key]: v }));
  const asText = [
    title,
    "",
    ...fields.map((f) => `${f.label}\n${(values[f.key] || "").trim() || "(blank)"}\n`),
  ].join("\n");
  const filled = fields.filter((f) => (values[f.key] || "").trim()).length;

  return (
    <form className="worksheet" onSubmit={(e) => e.preventDefault()} aria-labelledby={`${id}-title`}>
      <div className="worksheet__head">
        <h3 id={`${id}-title`}>{title}</h3>
        <p className="worksheet__count">
          {filled} of {fields.length} filled
        </p>
      </div>
      {intro && <p className="worksheet__intro">{intro}</p>}
      <div className="worksheet__fields">
        {fields.map((f) => (
          <div key={f.key} className={`field ${f.wide ? "field--wide" : ""}`}>
            <label htmlFor={`${id}-${f.key}`}>{f.label}</label>
            {f.hint && (
              <p className="field__hint" id={`${id}-${f.key}-hint`}>
                {f.hint}
              </p>
            )}
            {f.options ? (
              <select
                id={`${id}-${f.key}`}
                value={values[f.key] || ""}
                onChange={(e) => set(f.key, e.target.value)}
                aria-describedby={f.hint ? `${id}-${f.key}-hint` : undefined}
              >
                <option value="">Choose one</option>
                {f.options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : f.short ? (
              <input
                id={`${id}-${f.key}`}
                type="text"
                value={values[f.key] || ""}
                onChange={(e) => set(f.key, e.target.value)}
                aria-describedby={f.hint ? `${id}-${f.key}-hint` : undefined}
              />
            ) : (
              <textarea
                id={`${id}-${f.key}`}
                rows={f.rows || 3}
                value={values[f.key] || ""}
                onChange={(e) => set(f.key, e.target.value)}
                aria-describedby={f.hint ? `${id}-${f.key}-hint` : undefined}
              />
            )}
          </div>
        ))}
      </div>
      <div className="worksheet__actions">
        <CopyButton text={asText} label="Copy as text" />
        <button type="button" className="btn btn--secondary btn--small" onClick={() => window.print()}>
          <Printer size={16} aria-hidden="true" />
          <span>Print</span>
        </button>
        <button
          type="button"
          className="btn btn--quiet btn--small"
          onClick={() => {
            if (window.confirm(`Clear everything in ${title}? This can’t be undone.`)) setValues({});
          }}
        >
          <RotateCcw size={16} aria-hidden="true" />
          <span>Clear</span>
        </button>
      </div>
      <p className="worksheet__saved">Saved in this browser only. Copy it into a Doc to share with your team.</p>
    </form>
  );
}

export function DefinitionRows({ rows, className = "" }) {
  return (
    <dl className={`def-rows ${className}`}>
      {rows.map(([term, desc]) => (
        <div key={term} className="def-rows__row">
          <dt>{term}</dt>
          <dd>{desc}</dd>
        </div>
      ))}
    </dl>
  );
}

// Light inline marks for step text: **Button or field name** and `text to type or pick exactly`.
export function Marked({ text }) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) => {
    if (part.length > 4 && part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.length > 2 && part.startsWith("`") && part.endsWith("`")) return <code key={i} className="typed">{part.slice(1, -1)}</code>;
    return part;
  });
}

// A step is a string, or { title, text?, actions?, note? }: actions become a lettered
// sub-list, one click or entry per line; note is the short "why" shown after them.
export function Steps({ items, start = 1 }) {
  return (
    <ol className="steps" start={start}>
      {items.map((s, i) => (
        <li key={i}>
          {typeof s === "string" ? (
            <p><Marked text={s} /></p>
          ) : (
            <>
              <h3>{s.title}</h3>
              {s.text && <p><Marked text={s.text} /></p>}
              {s.actions && (
                <ol className="steps__actions">
                  {s.actions.map((a) => (
                    <li key={a}><Marked text={a} /></li>
                  ))}
                </ol>
              )}
              {s.note && <p className="steps__note"><Marked text={s.note} /></p>}
            </>
          )}
        </li>
      ))}
    </ol>
  );
}
