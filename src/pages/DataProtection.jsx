import { dataRuleFull } from "@/data/course";
import { protocol, neverPaste, dosAndDonts, dataTalkingPoints } from "@/data/modules";
import { PageHead, Section, Note, TableWrap, DefinitionRows } from "@/components/ui";
import { TrafficLight } from "@/components/content";
import { Page, TrackedChecklist } from "@/components/tracked";

const lights = [
  ["Public (green)", "Already published, or meant for the public page. Regular AI tools are fine."],
  ["Internal (yellow)", "Office work that isn’t public but holds no personal data. Mask anything personal, get your office’s OK, and turn training and history off."],
  ["Restricted (red)", "Personal, sensitive personal, or confidential. Not in free AI tools. Only with clearance, masked, on a local model or an enterprise no-training setting."],
];

export function DataProtection() {
  return (
    <Page to="/data-protection">
      <PageHead
        title="Protecting data given to AI and agents"
        lead="Module E, Day 1, 11:20 to 12:00 and 1:00 to 1:25, then inside every Day 2 lab. Decide what a file is before it goes anywhere."
      />

      <Section id="rule" title="The data rule">
        <Note tone="warn">
          <ul>
            {dataRuleFull.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </Note>
      </Section>

      <Section id="lights" title="The Data Traffic Light">
        <DefinitionRows rows={lights} className="def-rows--lights" />
      </Section>

      <Section id="game" title="Sort the cards" intro="Pick a light for each card. The suggested answers are a starting point for your group’s discussion, not a ruling.">
        <TrafficLight />
      </Section>

      <Section id="protocol" title="The 5-step protocol" intro="For any file that isn’t plainly green.">
        <ol className="protocol">
          {protocol.map((p) => (
            <li key={p.step}>
              <h3>{p.step}</h3>
              <p>{p.what}</p>
              <p className="protocol__check">
                <strong>Ask:</strong> {p.check}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="never" title="Never paste these into a free AI tool">
        <ul className="rule-list">
          {neverPaste.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </Section>

      <Section id="dos" title="Do’s and don’ts">
        <TableWrap label="Do’s and don’ts">
          <thead>
            <tr>
              <th scope="col">Do</th>
              <th scope="col">Don’t</th>
            </tr>
          </thead>
          <tbody>
            {dosAndDonts.map(([d, n]) => (
              <tr key={d}>
                <td>{d}</td>
                <td>{n}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </Section>

      <Section
        id="injection"
        title="Prompt injection"
        intro="In the live demo, an agent reads a document with an instruction hidden inside it, and follows it."
      >
        <p>
          The document looks ordinary. Somewhere in it, maybe in white text or a footnote, a line tells the AI to do something you never asked for:
          ignore your instructions, send a file, add a link. An agent that treats everything it reads as an order will do it. The defence is the same
          every time: read-only access, approvals on for anything that sends, shares or deletes, and a person who reads the output.
        </p>
      </Section>

      <Section id="points" title="What the law and good practice say">
        <DefinitionRows rows={dataTalkingPoints} />
      </Section>

      <Section id="cleanup" title="Every day, before you leave">
        <TrackedChecklist id="daily-cleanup" anchor={false} />
      </Section>
    </Page>
  );
}
