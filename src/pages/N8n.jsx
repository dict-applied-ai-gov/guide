import { Link } from "react-router-dom";
import {
  n8nObjectives,
  n8nWords,
  n8nTiming,
  n8nPaths,
  n8nModels,
  n8nBuildSteps,
  n8nPrompt,
  n8nCompletion,
  n8nSystemMessage,
  n8nSamples,
  n8nErrors,
  n8nGoodToKnow,
  n8nStretch,
  n8nWorkflowFile,
  n8nImportSteps,
} from "@/data/n8n";
import { PageHead, Section, TableWrap, Steps, CopyBlock, Note, Marked, DefinitionRows } from "@/components/ui";
import { Page, TrackedChecklist } from "@/components/tracked";

export function N8n() {
  return (
    <Page to="/n8n">
      <PageHead
        title="Hands-on: build a simple app with n8n"
        lead="Day 2, 2:35 to 3:35. Set up n8n, then build a Reply drafter: a web form where staff paste a citizen’s message and get a labelled draft reply, written only from the office FAQ."
      />

      <Section id="pattern" title="Trigger, action, output, without code">
        <p>
          n8n is a workflow tool: instead of writing code, you connect boxes on the screen, and each box does one job. It follows the same pattern as the{" "}
          <Link to="/certificates">certificate lab</Link>, and it can call an AI model in the middle.
        </p>
        <ol className="flow" aria-label="The Reply drafter">
          <li>
            <span className="flow__part">Trigger</span>
            <span>Staff submit the n8n form with a citizen’s message</span>
          </li>
          <li>
            <span className="flow__part">Action</span>
            <span>An AI model labels it and drafts a reply from the office FAQ</span>
          </li>
          <li>
            <span className="flow__part">Output</span>
            <span>A results page with the label, urgency, and draft, for a person to check and send</span>
          </li>
        </ol>
        <h3 className="subhead">By the end you can</h3>
        <ul className="rule-list">
          {n8nObjectives.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
        <Note title="The data rule applies here too" tone="accent">
          <p>
            Paste only the sample messages on this page. Never real citizen messages, names, or numbers, even into your own n8n.
          </p>
        </Note>
      </Section>

      <Section id="words" title="Words you will see" intro="New to these terms? Read this once. The steps below use them.">
        <DefinitionRows rows={n8nWords} />
      </Section>

      <Section id="timing" title="Timing">
        <TableWrap label="Activity timing">
          <tbody>
            {n8nTiming.map(([part, what, time]) => (
              <tr key={part}>
                <th scope="row">{part}</th>
                <td>{what}</td>
                <td className="num">{time}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </Section>

      <Section id="setup" title="Part 1: Set up n8n" intro="Choose one path. Path A is the default for everyone.">
        {n8nPaths.map((path) => (
          <div key={path.id} id={`setup-${path.id}`}>
            <h3 className="subhead">{path.title}</h3>
            <p>{path.when}</p>
            <Steps items={path.steps} />
            {path.commands?.map((c) => (
              <CopyBlock key={c.caption} caption={c.caption} text={c.text} lang="shell" />
            ))}
          </div>
        ))}
      </Section>

      <Section id="model" title="Part 2: Connect an AI model" intro="You do this inside the Basic LLM Chain node in Part 3. Get your key or server ready now.">
        {n8nModels.map((m) => (
          <div key={m.id} id={`model-${m.id}`}>
            <h3 className="subhead">{m.title}</h3>
            <Steps items={m.steps} />
            <Note title="Note">
              <p>{m.caution}</p>
            </Note>
          </div>
        ))}
      </Section>

      <Section id="build" title="Part 3: Build the Reply drafter" intro="Three nodes in a row: On form submission → Basic LLM Chain (with a chat model) → Form ending.">
        <Steps items={n8nBuildSteps} />
      </Section>

      <Section id="prompt" title="The prompt" intro="Paste into Prompt (User Message) in the Basic LLM Chain. Keep the field as an expression.">
        <CopyBlock caption="Prompt (User Message)" text={n8nPrompt} />
        <h3 className="subhead">Results page expression</h3>
        <p>Paste into Completion Message in the Form ending node, as an expression.</p>
        <CopyBlock caption="Completion Message" text={n8nCompletion} lang="javascript" />
      </Section>

      <Section id="system" title="The system message" intro="Paste into Chat Messages → Add prompt → System → Message. These are the fictional office’s FAQ facts from 08-sample-office-faq.docx.">
        <CopyBlock caption="System Message" text={n8nSystemMessage} collapsible />
      </Section>

      <Section id="samples" title="Part 4: Test with the sample messages" intro="Fake messages, written for this lab. Submit each one and check the draft.">
        <TableWrap label="Sample messages">
          <thead>
            <tr>
              <th scope="col">Test</th>
              <th scope="col">Message to paste</th>
            </tr>
          </thead>
          <tbody>
            {n8nSamples.map(([name, text]) => (
              <tr key={name}>
                <th scope="row">{name}</th>
                <td>{text}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
        <h3 className="subhead">Check every draft</h3>
        <TrackedChecklist id="n8n-checks" anchor={false} />
      </Section>

      <Section id="import" title="Fell behind? Import the finished workflow">
        <p>
          Download <a href={`/materials/day-2/${n8nWorkflowFile}`} download>the finished Reply drafter workflow</a> ({n8nWorkflowFile}), then:
        </p>
        <Steps items={n8nImportSteps} />
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
            {n8nErrors.map((e) => (
              <tr key={e.problem}>
                <th scope="row">{e.problem}</th>
                <td>
                  <ul className="fix-list">
                    {e.fix.map((f) => (
                      <li key={f}><Marked text={f} /></li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
        <Note title="Good to know">
          <ul>
            {n8nGoodToKnow.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </Note>
      </Section>

      <Section id="stretch" title="Stretch tasks" intro="For early finishers and the advanced track.">
        <Steps items={n8nStretch} />
      </Section>

      <Section id="cleanup" title="Cleanup">
        <TrackedChecklist id="n8n-cleanup" anchor={false} />
      </Section>
    </Page>
  );
}
