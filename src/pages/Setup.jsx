import { Link } from "react-router-dom";
import { welcome, dataRuleFull } from "@/data/course";
import { thinkAbout, datasets } from "@/data/setup";
import { checklists } from "@/data/tracking";
import { PageHead, Section, Note, TableWrap } from "@/components/ui";
import { Page, TrackedChecklist } from "@/components/tracked";

const prepIds = checklists.filter((c) => c.id.startsWith("prep-") && c.id !== "prep-advanced").map((c) => c.id);

export function Setup() {
  return (
    <Page to="/setup">
      <PageHead title="Before you come" lead="Get these done at home before Tuesday. The 9:15 setup session on Day 1 is for fixing what’s left, not for starting." />

      <Section id="welcome" title="Welcome">
        {welcome.map((p) => (
          <p key={p.slice(0, 20)}>{p}</p>
        ))}
      </Section>

      <Section id="checklist" title="Preparation checklist" intro="Your ticks are saved in this browser, and add up on the My progress page.">
        <div className="checklists">
          {prepIds.map((id) => (
            <TrackedChecklist key={id} id={id} />
          ))}
        </div>
      </Section>

      <Section id="advanced" title="Advanced track installs">
        <TrackedChecklist id="prep-advanced" />
      </Section>

      <Section id="data" title="The data rule">
        <Note title="Read this before you pack a file" tone="warn">
          <ul>
            {dataRuleFull.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </Note>
        <TableWrap label="Sample datasets">
          <caption>The sample (synthetic) datasets in the training folder. All names are fake.</caption>
          <thead>
            <tr>
              <th scope="col">Dataset</th>
              <th scope="col">What’s in it</th>
              <th scope="col">Used in</th>
            </tr>
          </thead>
          <tbody>
            {datasets.map((d) => (
              <tr key={d.name}>
                <th scope="row">{d.name}</th>
                <td>{d.detail}</td>
                <td>{d.used}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </Section>

      <Section id="think" title="Think about these before you come" intro="Your answers become the capstone. Write them down, or bring them in your head.">
        <div className="think">
          {thinkAbout.map((t) => (
            <div key={t.title} className="think__item">
              <h3>{t.title}</h3>
              <ul>
                {t.questions.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
              {t.examples && <p className="think__examples">{t.examples}</p>}
            </div>
          ))}
        </div>
        <p>
          On Day 1 your team turns one of these into a <Link to="/capstone#pain-point">Pain Point Card</Link>.
        </p>
      </Section>
    </Page>
  );
}
