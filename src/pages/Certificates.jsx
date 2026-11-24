import {
  certificateObjectives,
  certificateWords,
  certificateTiming,
  certificateSteps,
  certificatePrompt,
  certificateScript,
  certificateErrors,
  certificateGoodToKnow,
  agentTrack,
} from "@/data/certificates";
import { PageHead, Section, TableWrap, Steps, CopyBlock, Note, Marked, DefinitionRows } from "@/components/ui";
import { Page, TrackedChecklist } from "@/components/tracked";

export function Certificates() {
  return (
    <Page to="/certificates">
      <PageHead
        title="Hands-on: automated certificates"
        lead="Day 2, 10:45 to 12:00, Exercise 2 in your workbook. Submit a Google Form, and your own PDF certificate lands in your inbox a minute later."
      />

      <Section id="pattern" title="Trigger, action, output">
        <ol className="flow" aria-label="The automation">
          <li>
            <span className="flow__part">Trigger</span>
            <span>Someone submits the form</span>
          </li>
          <li>
            <span className="flow__part">Action</span>
            <span>Apps Script copies the Slides template and fills in the name</span>
          </li>
          <li>
            <span className="flow__part">Output</span>
            <span>A PDF in Drive, an email in the inbox, a status in the Sheet</span>
          </li>
        </ol>
        <h3 className="subhead">By the end you can</h3>
        <ul className="rule-list">
          {certificateObjectives.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </Section>

      <Section id="words" title="Words you will see" intro="New to these terms? Read this once. The steps below use them.">
        <DefinitionRows rows={certificateWords} />
      </Section>

      <Section id="timing" title="Timing">
        <TableWrap label="Activity timing">
          <tbody>
            {certificateTiming.map(([steps, what, time]) => (
              <tr key={steps}>
                <th scope="row">{steps}</th>
                <td>{what}</td>
                <td className="num">{time}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </Section>

      <Section id="steps" title="Step by step">
        <Steps items={certificateSteps} />
      </Section>

      <Section id="script" title="The reference script" intro="The ready-made script. Paste it into Code.gs, put your two IDs at the top, save, then run createTrigger once.">
        <CopyBlock caption="Code.gs" text={certificateScript} lang="javascript" collapsible />
      </Section>

      <Section id="stretch" title="Stretch: have AI write it" intro="Paste this into Gemini, ChatGPT or Claude. Compare what you get with the reference script before you run it.">
        <CopyBlock caption="Certificate script prompt" text={certificatePrompt} />
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
            {certificateErrors.map((e) => (
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
            {certificateGoodToKnow.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </Note>
      </Section>

      <Section id="cleanup" title="Cleanup">
        <TrackedChecklist id="cert-cleanup" anchor={false} />
      </Section>

      <Section id="agent" title="Agent track" intro="For the advanced track: give a coding agent the whole job, then do the parts only you can do.">
        <CopyBlock caption="Instruction for the agent" text={agentTrack.instruction} />
        <div className="split-lists">
          <div>
            <h3>The agent can</h3>
            <ul className="rule-list">
              {agentTrack.agentCan.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>You must</h3>
            <ul className="rule-list">
              {agentTrack.youMust.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </Page>
  );
}
