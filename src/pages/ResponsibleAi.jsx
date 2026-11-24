import { Link } from "react-router-dom";
import { principles, lawReferences, scenarios } from "@/data/reference";
import { PageHead, Section, DefinitionRows } from "@/components/ui";
import { Page, TrackedWorksheet } from "@/components/tracked";

export function ResponsibleAi() {
  return (
    <Page to="/responsible-ai">
      <PageHead
        title="Responsible and ethical AI in government"
        lead="Day 1, 10:55 to 12:00. AI is an assistant. The officer who approves the work is accountable, not the tool and not the vendor."
      />

      <Section id="principles" title="Five principles">
        <DefinitionRows rows={principles} />
      </Section>

      <Section id="laws" title="The rules that apply">
        <dl className="def-rows">
          {lawReferences.map((l) => (
            <div key={l.name} className="def-rows__row">
              <dt>{l.name}</dt>
              <dd>{l.note}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="scenarios" title="Case scenarios" intro="Discuss in your group. Work through the Data Traffic Light and the 5-step protocol before you answer.">
        <ol className="scenarios">
          {scenarios.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <p>
          Both come back to the same questions: what light is this data, who has cleared it, and where does it go?{" "}
          <Link to="/data-protection#protocol">The 5-step protocol</Link>
        </p>
      </Section>

      <Section id="jobs" title="Will AI take our jobs?">
        <p>
          It is a fair worry, and the session gives it time. The position of this training, and of the DICT-CSC guidance, is that AI prepares
          and a person decides, checks, and signs. The skills that grow in value are the ones AI can’t carry: judgment, knowing the office and
          its clients, and being accountable for the result.
        </p>
      </Section>

      <Section id="office-rules" title="Your office’s do’s and don’ts">
        <TrackedWorksheet id="office-dos" />
        <p>
          For a starting list, see the <Link to="/data-protection#dos">do’s and don’ts for data</Link>.
        </p>
      </Section>
    </Page>
  );
}
