import { assessment } from "@/data/reference";
import { useStored } from "@/lib/storage";
import { PageHead, Section, DefinitionRows, TableWrap } from "@/components/ui";
import { Page, TrackedWorksheet } from "@/components/tracked";

function SelfRating() {
  const [ratings, setRatings] = useStored("confidence", {});
  const set = (item, when, v) => setRatings((prev) => ({ ...prev, [`${when}|${item}`]: v }));
  return (
    <TableWrap label="Confidence self-check">
      <caption>1 is not confident, 5 is very confident. For your own record; the official assessment is the form your trainer shares.</caption>
      <thead>
        <tr>
          <th scope="col">I can</th>
          <th scope="col">Day 1</th>
          <th scope="col">Day 3</th>
        </tr>
      </thead>
      <tbody>
        {assessment.confidence.map((c) => (
          <tr key={c}>
            <th scope="row">{c}</th>
            {["day1", "day3"].map((w) => (
              <td key={w}>
                <select aria-label={`${c}, ${w === "day1" ? "Day 1" : "Day 3"}`} value={ratings[`${w}|${c}`] || ""} onChange={(e) => set(c, w, e.target.value)}>
                  <option value="">Rate</option>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </TableWrap>
  );
}

export function Assessment() {
  return (
    <Page to="/assessment">
      <PageHead
        title="Assessment and evaluation"
        lead="The same short assessment at the start of Day 1 and near the end of Day 3, so you and the trainers can see what changed."
      />

      <Section id="pre-post" title="Pre and post assessment" intro="Day 1 at 9:00, from the QR code on screen, and Day 3 at 4:15.">
        <DefinitionRows rows={assessment.parts} />
      </Section>

      <Section id="self" title="Your confidence, before and after">
        <SelfRating />
      </Section>

      <Section id="during" title="During the three days">
        <DefinitionRows rows={assessment.formative} />
      </Section>

      <Section id="evaluation" title="How the training is evaluated">
        <TableWrap label="Evaluation levels">
          <thead>
            <tr>
              <th scope="col">Level</th>
              <th scope="col">What is measured</th>
              <th scope="col">How</th>
              <th scope="col">When</th>
            </tr>
          </thead>
          <tbody>
            {assessment.evaluation.map(([level, what, how, when]) => (
              <tr key={level}>
                <th scope="row">{level}</th>
                <td>{what}</td>
                <td>{how}</td>
                <td>{when}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </Section>

      <Section id="action-plan" title="Your 30-day AI Action Plan">
        <TrackedWorksheet id="action-plan" />
      </Section>
    </Page>
  );
}
