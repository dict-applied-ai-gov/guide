import { Plus, Trash2 } from "lucide-react";
import { capstoneTimeline, capstoneIdeas, capstoneTheme, capstoneTracks, rubric } from "@/data/reference";
import { useStored } from "@/lib/storage";
import { PageHead, Section, TableWrap, DefinitionRows } from "@/components/ui";
import { Page, TrackedChecklist, TrackedWorksheet } from "@/components/tracked";

const LEVELS = [4, 3, 2, 1];

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
      {teams.length === 0 && <p className="scorer__empty">No teams scored yet. Add one when the first demo starts.</p>}
      {teams.map((t, n) => {
        const score = teamScore(t);
        const complete = rubric.every((r) => t.levels?.[r.criterion]);
        return (
          <fieldset key={t.id} className="scorer__team">
            <legend className="visually-hidden">Team {n + 1}</legend>
            <div className="scorer__head">
              <div className="field">
                <label htmlFor={`team-${t.id}`}>Team</label>
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
        <span>Add a team</span>
      </button>
    </div>
  );
}

export function Capstone() {
  return (
    <Page to="/capstone">
      <PageHead
        title="Capstone project"
        lead="Teams of 3, mixed ICT and non-ICT. One real office task, automated, checked, and turned into a decision, with the sample data. Demonstrated in 5 minutes on Thursday."
      />

      <Section id="theme" title="Theme" intro={capstoneTheme.title}>
        <p>{capstoneTheme.why}</p>
        <DefinitionRows rows={capstoneTheme.rules} />
      </Section>

      <Section id="tracks" title="Pick a track" intro="Choose one on Day 1 and write it on your Pain Point Card.">
        <DefinitionRows rows={capstoneTracks} />
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

      <Section id="ideas" title="More project ideas" intro="Each fits one of the tracks above. Start from one, or bring your own.">
        <DefinitionRows rows={capstoneIdeas} />
      </Section>

      <Section id="canvas" title="Project canvas">
        <TrackedWorksheet id="canvas" />
      </Section>

      <Section id="checklist" title="Responsible AI checklist" intro="Complete it during the afternoon build. The rubric gives it a fifth of the score.">
        <TrackedChecklist id="responsible" anchor={false} />
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

      <Section id="score" title="Score the other teams" intro="During the presentations. Your scores stay in this browser; hand them in the way your trainer asks.">
        <Scorer />
      </Section>
    </Page>
  );
}
