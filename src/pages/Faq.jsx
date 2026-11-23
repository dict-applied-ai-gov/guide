import { faq, helpContacts } from "@/data/reference";
import { PageHead, Section, DefinitionRows } from "@/components/ui";
import { Page } from "@/components/tracked";

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export function Faq() {
  return (
    <Page to="/faq">
      <PageHead title="FAQ and help" lead="The questions people ask most, and who to ask when this page doesn’t answer yours." />

      {faq.map((g) => (
        <Section key={g.group} id={slug(g.group)} title={g.group}>
          <div className="faq">
            {g.items.map(([q, a]) => (
              <details key={q} className="faq__item">
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </Section>
      ))}

      <Section
        id="help"
        title="Who to ask"
        intro="At the venue, your setup buddy is the fastest help. For anything else, find the person in the role below."
      >
        <DefinitionRows rows={helpContacts} />
      </Section>
    </Page>
  );
}
