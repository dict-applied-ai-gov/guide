import { tools, lawReferences, sources } from "@/data/reference";
import { PageHead, Section } from "@/components/ui";
import { Page } from "@/components/tracked";

export function Resources() {
  return (
    <Page to="/resources">
      <PageHead title="Tools and sources" lead="Every tool used in the training, and where the facts in this guide come from." />

      <Section id="tools" title="Tools">
        <div className="tool-groups">
          {tools.map((g) => (
            <div key={g.group} className="tool-groups__group">
              <h3>{g.group}</h3>
              <ul>
                {g.items.map(([name, url]) => (
                  <li key={name}>
                    <a href={url} target="_blank" rel="noreferrer">
                      {name}
                    </a>
                    <span className="tool-groups__url">{url.replace("https://", "")}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="laws" title="Laws and guidance">
        <ul className="rule-list">
          {lawReferences.map((l) => (
            <li key={l.name}>{l.name}</li>
          ))}
        </ul>
      </Section>

      <Section id="sources" title="Sources">
        <p className="fine-print">{sources}</p>
      </Section>
    </Page>
  );
}
