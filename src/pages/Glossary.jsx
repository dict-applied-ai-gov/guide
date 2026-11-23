import { useState } from "react";
import { glossary } from "@/data/reference";
import { PageHead } from "@/components/ui";
import { Page } from "@/components/tracked";

export function Glossary() {
  const [q, setQ] = useState("");
  const words = q.toLowerCase().trim();
  const shown = [...glossary]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .filter(([t, m]) => !words || t.toLowerCase().includes(words) || m.toLowerCase().includes(words));

  return (
    <Page to="/glossary">
      <PageHead title="Glossary" lead="The words you’ll hear over three days, in plain language." />
      <div className="filter">
        <label htmlFor="glossary-filter">Filter terms</label>
        <input id="glossary-filter" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="MCP, trigger, masking" />
        <p className="filter__count" aria-live="polite">
          {shown.length} of {glossary.length} terms
        </p>
      </div>
      {shown.length ? (
        <dl className="def-rows glossary">
          {shown.map(([term, meaning]) => (
            <div key={term} className="def-rows__row">
              <dt>{term}</dt>
              <dd>{meaning}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="empty">No term matches “{q}”. Try a shorter word, or ask your trainer.</p>
      )}
    </Page>
  );
}
