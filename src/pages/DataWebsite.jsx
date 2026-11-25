import { Link } from "react-router-dom";
import {
  API_BASE,
  webObjectives,
  webWords,
  webTiming,
  datasets,
  otherSources,
  questionSteps,
  analyzeSteps,
  buildSteps,
  skillSteps,
  finishSteps,
  analysisPrompt,
  buildPrompt,
  reviewPrompt,
  webErrors,
  webStretch,
  liveApiExample,
} from "@/data/dataWebsite";
import skillText from "@/data/gov-data-website-skill.md?raw";
import { PageHead, Section, TableWrap, Steps, CopyBlock, Note, Marked, DefinitionRows } from "@/components/ui";
import { Page, TrackedChecklist, TrackedWorksheet } from "@/components/tracked";

export function DataWebsite() {
  return (
    <Page to="/data-website">
      <PageHead
        title="Hands-on: a data website from public government data"
        lead="Day 3, 10:45 to 12:00, Exercise 2 in your Day 3 workbook. Ask AI about real Philippine Statistics Authority data, check it, build a one-page website from it, then use a design skill so it does not look generated."
      />

      <Section id="pattern" title="Ask, check, build, polish">
        <ol className="flow" aria-label="The data website">
          <li>
            <span className="flow__part">Ask</span>
            <span>AI reads the PSA data and answers your question</span>
          </li>
          <li>
            <span className="flow__part">Check</span>
            <span>You find two of its numbers in the data yourself</span>
          </li>
          <li>
            <span className="flow__part">Build and polish</span>
            <span>AI Studio builds the page; the design skill removes the slop</span>
          </li>
        </ol>
        <h3 className="subhead">By the end you can</h3>
        <ul className="rule-list">
          {webObjectives.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
        <Note title="Public data, so the data rule is easy today" tone="accent">
          <p>
            These are published government statistics with no personal data, so any AI tool may read them. The habit still applies: the AI drafts, you check
            the numbers, and a person owns what the page says.
          </p>
        </Note>
      </Section>

      <Section id="words" title="Words you will see">
        <DefinitionRows rows={webWords} />
      </Section>

      <Section id="timing" title="Timing">
        <TableWrap label="Activity timing">
          <tbody>
            {webTiming.map(([part, what, time]) => (
              <tr key={part}>
                <th scope="row">{part}</th>
                <td>{what}</td>
                <td className="num">{time}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </Section>

      <Section
        id="api"
        title="The data: four PSA tables, ready to use"
        intro="Copies of Philippine Statistics Authority tables, on this guide’s website. Free, no key, and any web page may read them. Each comes as JSON (for the website) and CSV (for Sheets and for checking)."
      >
        <TableWrap label="Training API datasets">
          <thead>
            <tr>
              <th scope="col">Dataset</th>
              <th scope="col">What it covers</th>
              <th scope="col">A question it answers</th>
              <th scope="col">Links</th>
            </tr>
          </thead>
          <tbody>
            {datasets.map((d) => (
              <tr key={d.id}>
                <th scope="row">
                  {d.title}
                  <span className="muted"> ({d.rows})</span>
                </th>
                <td>{d.covers}</td>
                <td>{d.question}</td>
                <td>
                  <a href={`/api/v1/${d.id}.json`} target="_blank" rel="noreferrer">
                    JSON
                  </a>
                  {" · "}
                  <a href={`/api/v1/${d.id}.csv`} download>
                    CSV
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
        <p>
          The link to paste into the build prompt is <code>{`${API_BASE}/<dataset>.json`}</code>, for example <code>{`${API_BASE}/rice-prices.json`}</code>. The
          list of all four, with their columns, is at <a href="/api/v1/index.json">/api/v1/index.json</a>.
        </p>
        <Note title="Read the notes in each file">
          <p>
            Negros Occidental and the City of Bacolod are separate rows: the province figure leaves out the city. The poverty figures are survey estimates,
            rounded to whole numbers, with a coefficient of variation (CV); a CV above 20 means use with caution.
          </p>
        </Note>
        <h3 className="subhead">Other Philippine government data</h3>
        <TableWrap label="Other sources">
          <tbody>
            {otherSources.map(([name, url, what]) => (
              <tr key={name}>
                <th scope="row">
                  <a href={`https://${url}`} target="_blank" rel="noreferrer">
                    {name}
                  </a>
                </th>
                <td>{what}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </Section>

      <Section id="question" title="Part 1: Pick a question and a dataset">
        <Steps items={questionSteps} />
      </Section>

      <Section id="analyze" title="Part 2: Ask AI about the data, then check it">
        <Steps items={analyzeSteps} />
      </Section>

      <Section id="build" title="Part 3: Build the website in AI Studio">
        <Steps items={buildSteps} />
      </Section>

      <Section id="skill" title="Part 4: Load the design skill and fix the slop" intro="A skill is a file of rules the AI reads before it works. This one is written for government data pages.">
        <ul className="file-list">
          <li>
            <a href="/materials/day-3/05-gov-data-website-skill.zip" download>
              Design skill for Claude
            </a>
            <span className="file-list__note"> (zip): upload it under Settings → Capabilities → Skills</span>
          </li>
          <li>
            <a href="/materials/day-3/06-gov-data-website-skill.md" download>
              Design skill for any AI
            </a>
            <span className="file-list__note"> (md): paste it into AI Studio’s system instructions, a Gem, a custom GPT, or the chat</span>
          </li>
        </ul>
        <Steps items={skillSteps} />
        <h3 className="subhead">Slop check</h3>
        <TrackedChecklist id="slop-check" anchor={false} />
        <p>
          Want to see more skills? The <Link to="/skills">agent skills module</Link> explains how they work and how to write your own.
        </p>
      </Section>

      <Section id="insights" title="Part 5: Three checked insights">
        <Steps items={finishSteps} />
        <TrackedWorksheet id="insights" />
        <p>
          Before you write the decision, run the <Link to="/decision-support#bias">bias and risk check</Link>. The AI can list options; a person decides.
        </p>
      </Section>

      <Section id="prompts" title="The prompts" intro="Copy each one into the tool named in the caption. Replace the parts in square brackets.">
        <CopyBlock caption="Analysis prompt, for your AI chat (attach the CSV)" text={analysisPrompt} />
        <CopyBlock caption="Build prompt, for AI Studio Build" text={buildPrompt} />
        <CopyBlock caption="Review prompt, after loading the skill" text={reviewPrompt} />
        <CopyBlock caption="The design skill (the same text as the .md file)" text={skillText} collapsible />
      </Section>

      <Section id="errors" title="When it doesn’t work">
        <TableWrap label="Common errors">
          <thead>
            <tr>
              <th scope="col">You see</th>
              <th scope="col">What to do</th>
            </tr>
          </thead>
          <tbody>
            {webErrors.map((e) => (
              <tr key={e.problem}>
                <th scope="row">{e.problem}</th>
                <td>
                  <ul className="fix-list">
                    {e.fix.map((f) => (
                      <li key={f}>
                        <Marked text={f} />
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </Section>

      <Section id="stretch" title="Stretch tasks" intro="For early finishers and the advanced track.">
        <Steps items={webStretch} />
        <CopyBlock caption="Reading the live PSA OpenSTAT API from a web page (JavaScript)" text={liveApiExample} lang="js" collapsible />
      </Section>

      <Section id="cleanup" title="Cleanup">
        <p>
          The data is public, so there is little to clean up. Delete any chat where you pasted something other than the PSA data, and keep the share link only
          if you plan to use the website as your capstone.
        </p>
      </Section>
    </Page>
  );
}
