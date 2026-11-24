import { models, modelTalkingPoints, ruleOfThumb, pricesNote } from "@/data/modules";
import { PageHead, Section, DefinitionRows, Note } from "@/components/ui";
import { ToolScores } from "@/components/content";
import { Page } from "@/components/tracked";

export function Models() {
  return (
    <Page to="/models">
      <PageHead
        title="Intro to different AI models"
        lead="Module B, Day 1, 9:45 to 10:55. One prompt goes to five models; you score the answers, learn why they differ, then hunt for six errors in an AI summary."
      />

      <Section id="basics" title="Four things to know first">
        <DefinitionRows rows={modelTalkingPoints} />
      </Section>

      <Section id="rule" title="Rule of thumb" intro="Where to start, by the kind of office and the kind of work.">
        <DefinitionRows rows={ruleOfThumb} className="def-rows--short" />
      </Section>

      <Section id="compare" title="The models side by side">
        <p className="fine-print">{pricesNote}</p>
        <div className="sheets">
          {models.map((m) => (
            <section key={m.name} className="sheet" aria-labelledby={`m-${m.name}`}>
              <h3 id={`m-${m.name}`}>
                {m.name}
                <span className="sheet__by">{m.maker}</span>
              </h3>
              <DefinitionRows
                rows={[
                  ["Free", m.free],
                  ["Paid", m.paid],
                  ["Good for", m.goodFor],
                  ["Context length", m.context],
                  ["Your data", m.data],
                  ["For government work", m.gov],
                ]}
              />
            </section>
          ))}
        </div>
      </Section>

      <Section
        id="scores"
        title="Tool comparison worksheet"
        intro="Send the same prompt to each model, then score each answer. Mark any made-up fact you catch. After the break, Exercise 2 is a longer hunt: six errors in an AI summary of the sample circular."
      >
        <ToolScores />
        <Note title="Before you trust the winner">
          <p>A high score on one prompt says little about the next. Check facts, laws and figures in every answer you use, whichever model wrote it.</p>
        </Note>
      </Section>
    </Page>
  );
}
