import { rtcfc, promptTips, verifyMoves, labTasks } from "@/data/reference";
import { days } from "@/data/course";
import { PageHead, Section, TableWrap, DefinitionRows, Note } from "@/components/ui";
import { PromptBuilder, PromptLibrary } from "@/components/content";
import { Page, TrackedChecklist } from "@/components/tracked";

export function Prompting() {
  return (
    <Page to="/prompting">
      <PageHead
        title="Prompting and checking"
        lead="Day 1, 1:00 to 3:00, and the Day 2 document lab. Five parts make a prompt that works the first time, and a checklist catches what it gets wrong."
      />

      <Section id="rtcfc" title="R-T-C-F-C">
        <TableWrap label="The R-T-C-F-C framework">
          <thead>
            <tr>
              <th scope="col">Part</th>
              <th scope="col">What it means</th>
              <th scope="col">Example, for a memo</th>
            </tr>
          </thead>
          <tbody>
            {rtcfc.map((p) => (
              <tr key={p.key}>
                <th scope="row">
                  <span className="letter">{p.letter}</span> {p.name}
                </th>
                <td>{p.meaning}</td>
                <td>{p.example}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </Section>

      <Section id="builder" title="Prompt builder" intro="Fill in the parts. Your prompt assembles on the right, ready to paste into any assistant.">
        <PromptBuilder />
      </Section>

      <Section id="lab" title="The lab" intro="Write each with R-T-C-F-C, from the sample texts in the training folder. Keep your first prompt and your best one: before and after.">
        <ol className="tasks">
          {labTasks.map((t) => (
            <li key={t.title}>
              <h3>{t.title}</h3>
              <p>{t.detail}</p>
            </li>
          ))}
        </ol>
        <Note title="NotebookLM for answers with citations">
          <p>
            Upload a sample circular or policy to NotebookLM and ask your question there. Its answers point to the passage they came from, so you
            can check them in one click.
          </p>
        </Note>
      </Section>

      <Section id="tips" title="Better results">
        <ul className="rule-list">
          {promptTips.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </Section>

      <Section id="check" title="Checking AI outputs" intro="Day 1, 2:30 to 3:00. Pairs check each other’s lab outputs with this list.">
        <TrackedChecklist id="output-check" anchor={false} />
        <DefinitionRows rows={verifyMoves} />
      </Section>

      <Section id="library" title="My prompt library" intro="At least 3 prompts by the end of Day 1; finish as homework. Saved in this browser only.">
        <PromptLibrary />
      </Section>

      <Section id="advanced" title="Advanced track">
        <p>{days[0].advanced.replace("Advanced track (prompting session): ", "In the prompting session: ")}</p>
      </Section>
    </Page>
  );
}
