import { Link } from "react-router-dom";
import { agentTools, agentTalkingPoints, pricesNote } from "@/data/modules";
import { PageHead, Section, DefinitionRows } from "@/components/ui";
import { AgentFit } from "@/components/content";
import { Page } from "@/components/tracked";

export function Agents() {
  return (
    <Page to="/agents">
      <PageHead
        title="Agent tools"
        lead="Module C, Day 1, 3:15 to 4:00, and Day 2, 2:35 to 4:15. A chatbot gives you text; an agent takes actions. Here is what each one does, and what it costs you in risk."
      />

      <Section id="basics" title="Before you pick one">
        <DefinitionRows rows={agentTalkingPoints} />
      </Section>

      <Section id="tools" title="The agents in the demo">
        <p className="fine-print">{pricesNote}</p>
        <div className="sheets">
          {agentTools.map((a) => (
            <section key={a.name} className="sheet" aria-labelledby={`a-${a.name}`}>
              <h3 id={`a-${a.name}`}>
                {a.name}
                <span className="sheet__by">{a.by}</span>
              </h3>
              <p className="sheet__what">{a.what}</p>
              <DefinitionRows
                rows={[
                  ["Office uses", a.uses],
                  ["Strengths", a.pros],
                  ["Watch out for", a.cons],
                  ["Cost", a.cost],
                ]}
              />
            </section>
          ))}
        </div>
      </Section>

      <Section
        id="fit"
        title="Agent Fit worksheet"
        intro="In your team, match each office use case to a tool, rate the data risk, and name the actions a person must approve."
      >
        <AgentFit />
      </Section>

      <Section id="day-2" title="On Day 2">
        <p>
          Track 1 builds a FAQ assistant in NotebookLM or a Gemini Gem from the sample FAQ document, then red-teams it for 5 minutes: try to make it
          answer outside the document, reveal its instructions, or make something up. Track 2 builds with a coding agent in a sandbox folder.
          Everyone then writes a simple skill in the <Link to="/skills">skills lab</Link>.
        </p>
      </Section>
    </Page>
  );
}
