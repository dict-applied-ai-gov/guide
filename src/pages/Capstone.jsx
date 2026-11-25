import { Plus, Trash2 } from "lucide-react";
import {
  capstoneTimeline,
  capstoneIdeas,
  capstoneTheme,
  capstoneTracks,
  capstoneInspiration,
  capstoneQuestions,
  painPointExample,
  planModeSteps,
  planModePrompt,
  capstoneTools,
  presentFormat,
  feedbackFormat,
  submitItems,
  rubric,
} from "@/data/reference";
import { useStored } from "@/lib/storage";
import { Link } from "react-router-dom";
import { PageHead, Section, TableWrap, DefinitionRows, Note, CopyBlock } from "@/components/ui";
import { Page, TrackedChecklist, TrackedWorksheet } from "@/components/tracked";

const LEVELS = [4, 3, 2, 1];
const CAPSTONE_FORM = "https://forms.gle/qmzxZ8eHNrq7mKVS7";

function teamScore(team) {
  const scored = rubric.filter((r) => team.levels?.[r.criterion]);
  if (!scored.length) return null;
  return Math.round(scored.reduce((s, r) => s + (r.weight * Number(team.levels[r.criterion])) / 4, 0));
}

function Scorer() {
  const [teams, setTeams] = useStored("capstone-scores", []);
  const update = (id, patch) => setTeams((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));

  return (
    <div className="scorer">
      {teams.length === 0 && <p className="scorer__empty">No one scored yet. Add a presenter when the first demo starts.</p>}
      {teams.map((t, n) => {
        const score = teamScore(t);
        const complete = rubric.every((r) => t.levels?.[r.criterion]);
        return (
          <fieldset key={t.id} className="scorer__team">
            <legend className="visually-hidden">Team {n + 1}</legend>
            <div className="scorer__head">
              <div className="field">
                <label htmlFor={`team-${t.id}`}>Presenter</label>
                <input id={`team-${t.id}`} type="text" value={t.name} onChange={(e) => update(t.id, { name: e.target.value })} />
              </div>
              <p className="scorer__total">
                <span className="num">{score ?? "0"}</span> of 100{complete ? "" : ", so far"}
              </p>
              <button
                type="button"
                className="btn btn--quiet btn--small"
                onClick={() => setTeams((prev) => prev.filter((x) => x.id !== t.id))}
                aria-label={`Remove ${t.name || `team ${n + 1}`}`}
              >
                <Trash2 size={16} aria-hidden="true" />
                <span>Remove</span>
              </button>
            </div>
            <div className="scorer__grid">
              {rubric.map((r) => (
                <div className="field" key={r.criterion}>
                  <label htmlFor={`team-${t.id}-${r.criterion}`}>
                    {r.criterion}, {r.weight}%
                  </label>
                  <select
                    id={`team-${t.id}-${r.criterion}`}
                    value={t.levels?.[r.criterion] || ""}
                    onChange={(e) => update(t.id, { levels: { ...t.levels, [r.criterion]: e.target.value } })}
                  >
                    <option value="">Score</option>
                    {LEVELS.map((l, i) => (
                      <option key={l} value={l}>
                        {l}: {r.levels[i]}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <div className="field field--wide">
              <label htmlFor={`team-${t.id}-note`}>One thing they did well, one question</label>
              <input id={`team-${t.id}-note`} type="text" value={t.note || ""} onChange={(e) => update(t.id, { note: e.target.value })} />
            </div>
          </fieldset>
        );
      })}
      <button
        type="button"
        className="btn btn--secondary btn--small"
        onClick={() => setTeams((prev) => [...prev, { id: Date.now(), name: "", levels: {}, note: "" }])}
      >
        <Plus size={16} aria-hidden="true" />
        <span>Add a presenter</span>
      </button>
    </div>
  );
}

export function Capstone() {
  return (
    <Page to="/capstone">
      <PageHead
        title="Capstone project"
        lead="Your own app for your office or the government, built with the tools you choose. Planned on Day 2, built on Day 3 from 1:00 to 2:45, and submitted by 4:15. Five participants, drawn at random, demo theirs at 3:00."
      />

      <Section id="theme" title="Theme" intro={capstoneTheme.title}>
        <p>{capstoneTheme.why}</p>
        <DefinitionRows rows={capstoneTheme.rules} />
      </Section>

      <Section id="inspiration" title="Find inspiration" intro="Before you plan, see what others have already built. Borrow the idea, not the code or the brand.">
        <div className="card-list">
          {capstoneInspiration.map((src) => (
            <article key={src.name} className="card inspo">
              <h3 className="inspo__title">
                <a href={src.url} target="_blank" rel="noreferrer">
                  {src.name}
                </a>
              </h3>
              <p>{src.what}</p>
              {src.examples && (
                <>
                  <p className="muted">Apps listed there that an office could learn from:</p>
                  <DefinitionRows rows={src.examples} />
                </>
              )}
            </article>
          ))}
        </div>
        <h3 className="subhead">Ask these while you browse</h3>
        <ul className="rule-list">
          {capstoneQuestions.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
      </Section>

      <Section id="tracks" title="Tracks" intro="Optional: use one to narrow your idea. You chose one on your Day 1 Pain Point Card.">
        <DefinitionRows rows={capstoneTracks} />
      </Section>

      <Section id="tools" title="Choose your tools" intro="Anything from the three days, or another AI builder. Pick the one that gives you a link you can share at the end.">
        <DefinitionRows rows={capstoneTools} />
        <p>
          Whatever you build, load the <Link to="/data-website#skill">design skill</Link> so it does not look generated.
        </p>
      </Section>

      <Section id="timeline" title="Timeline">
        <TableWrap label="Capstone timeline">
          <thead>
            <tr>
              <th scope="col">When</th>
              <th scope="col">What</th>
              <th scope="col">You produce</th>
            </tr>
          </thead>
          <tbody>
            {capstoneTimeline.map(([when, what, out]) => (
              <tr key={when}>
                <th scope="row">{when}</th>
                <td>{what}</td>
                <td>{out}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </Section>

      <Section id="pain-point" title="Pain Point Card">
        <TrackedWorksheet id="pain-point" />
      </Section>

      <Section id="example" title="Example Pain Point Card" intro="An invented example with sample data: the Friday clearance tally.">
        <DefinitionRows rows={painPointExample} />
      </Section>

      <Section id="plan" title="Plan before you build" intro="Use plan mode, or the starter prompt, to turn your card into a plan. The plan is a draft: you decide, and the officer who signs owns the result.">
        <ol className="rule-list">
          {planModeSteps.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ol>
        <CopyBlock caption="Starter prompt, for any AI chat" text={planModePrompt} />
      </Section>

      <Section id="ideas" title="More project ideas" intro="Each fits one of the tracks above. Start from one, or bring your own.">
        <DefinitionRows rows={capstoneIdeas} />
      </Section>

      <Section id="canvas" title="Project canvas">
        <TrackedWorksheet id="canvas" />
      </Section>

      <Section id="build" title="Build: Day 3, 1:00 to 2:45">
        <ul className="rule-list">
          <li>Start from the smallest version that works: one screen, one form, or one chart that answers one question.</li>
          <li>Use sample or public data only. Load the design skill. Test it the way a staff member or a citizen would.</li>
          <li>Ask the trainer when you are stuck for more than five minutes.</li>
          <li>By 2:45: a screenshot, a link that opens, and the Responsible AI checklist below ticked.</li>
        </ul>
      </Section>

      <Section id="checklist" title="Responsible AI checklist" intro="Complete it during the build. The rubric gives it a fifth of the score.">
        <TrackedChecklist id="responsible" anchor={false} />
      </Section>

      <Section id="present" title="Present: Day 3, 3:00 to 3:35" intro="Five names are drawn at random, so everyone gets ready. 5 minutes each.">
        <DefinitionRows rows={presentFormat} />
        <Note title="Be ready to be called">
          <p>Keep the app open in a browser tab, logged in, with a sample entry ready to type. If the Wi-Fi fails, show your screenshot and walk through it.</p>
        </Note>
      </Section>

      <Section id="feedback" title="Feedback: Day 3, 3:35 to 4:00" intro="After the five demos. Short and specific.">
        <DefinitionRows rows={feedbackFormat} />
        <TrackedWorksheet id="capstone-feedback" />
      </Section>

      <Section id="submit" title="Submit: Day 3, 4:00 to 4:15" intro="Everyone submits, not only the five presenters.">
        <DefinitionRows rows={submitItems} />
        <p>
          <a className="btn btn--primary" href={CAPSTONE_FORM} target="_blank" rel="noreferrer">
            Open the capstone form
          </a>{" "}
          <span className="muted">{CAPSTONE_FORM.replace("https://", "")}</span>
        </p>
      </Section>

      <Section id="rubric" title="Rubric">
        <TableWrap label="Capstone rubric">
          <caption>Each criterion is scored 4 (highest) to 1, then weighted.</caption>
          <thead>
            <tr>
              <th scope="col">Criterion</th>
              <th scope="col">Weight</th>
              {LEVELS.map((l) => (
                <th scope="col" key={l}>
                  {l}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rubric.map((r) => (
              <tr key={r.criterion}>
                <th scope="row">{r.criterion}</th>
                <td className="num">{r.weight}%</td>
                {r.levels.map((lv) => (
                  <td key={lv}>{lv}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </Section>

      <Section id="score" title="Score the presenters" intro="Optional, during the presentations. Your scores stay in this browser; hand them in the way your trainer asks.">
        <Scorer />
      </Section>
    </Page>
  );
}
