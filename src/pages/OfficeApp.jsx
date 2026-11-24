import {
  appObjectives,
  appWords,
  appTiming,
  phoneSteps,
  iphoneNote,
  stitchSteps,
  buildSteps,
  installSteps,
  fixSteps,
  stitchPrompt,
  buildPrompt,
  appErrors,
  appStretch,
} from "@/data/officeApp";
import { PageHead, Section, TableWrap, Steps, CopyBlock, Note, Marked, DefinitionRows } from "@/components/ui";
import { Page, TrackedChecklist } from "@/components/tracked";

export function OfficeApp() {
  return (
    <Page to="/office-app">
      <PageHead
        title="Hands-on: build an office assistant app"
        lead="Day 2, 9:15 to 10:15, Exercise 1 in your workbook. Sketch the screens with Google Stitch, build the app with Google AI Studio, and test it on your own phone. No coding."
      />

      <Section id="pattern" title="Sketch, build, test">
        <ol className="flow" aria-label="The office app">
          <li>
            <span className="flow__part">Sketch</span>
            <span>Google Stitch draws the screens from your description</span>
          </li>
          <li>
            <span className="flow__part">Build</span>
            <span>Google AI Studio turns the sketch into a working Android app</span>
          </li>
          <li>
            <span className="flow__part">Test</span>
            <span>You install it on your phone, find what is wrong, and let AI fix it</span>
          </li>
        </ol>
        <h3 className="subhead">By the end you can</h3>
        <ul className="rule-list">
          {appObjectives.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
        <Note title="The data rule applies here too" tone="accent">
          <p>The app uses only the sample office facts on this page. Never put real citizen names, numbers, or records into it.</p>
        </Note>
      </Section>

      <Section id="words" title="Words you will see" intro="New to these terms? Read this once. The steps below use them.">
        <DefinitionRows rows={appWords} />
      </Section>

      <Section id="timing" title="Timing">
        <TableWrap label="Activity timing">
          <tbody>
            {appTiming.map(([part, what, time]) => (
              <tr key={part}>
                <th scope="row">{part}</th>
                <td>{what}</td>
                <td className="num">{time}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </Section>

      <Section id="phone" title="Part 1a: Get your Android phone ready" intro="Do this first, while Stitch is working. It takes two minutes.">
        <Steps items={phoneSteps} />
        <Note title="Using an iPhone?">
          <p>{iphoneNote}</p>
        </Note>
      </Section>

      <Section id="stitch" title="Part 1b: Sketch the screens in Stitch">
        <Steps items={stitchSteps} />
      </Section>

      <Section id="build" title="Part 2: Build the app in AI Studio">
        <Steps items={buildSteps} />
      </Section>

      <Section id="install" title="Part 3: Install it on your phone">
        <Steps items={installSteps} />
      </Section>

      <Section id="fix" title="Part 4: Test and fix with AI">
        <Steps items={fixSteps} />
        <h3 className="subhead">Check your app</h3>
        <TrackedChecklist id="app-checks" anchor={false} />
      </Section>

      <Section id="prompts" title="The prompts" intro="Copy each one into the tool named in the caption.">
        <CopyBlock caption="Design prompt, for Stitch" text={stitchPrompt} />
        <CopyBlock caption="Build prompt, for AI Studio" text={buildPrompt} collapsible />
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
            {appErrors.map((e) => (
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

      <Section id="stretch" title="Stretch tasks" intro="For early finishers.">
        <Steps items={appStretch} />
      </Section>

      <Section id="cleanup" title="Cleanup">
        <TrackedChecklist id="app-cleanup" anchor={false} />
      </Section>
    </Page>
  );
}
