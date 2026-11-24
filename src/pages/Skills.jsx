import { skillSupport, skillSteps, skillFolder, memoSkill, certificateSkill } from "@/data/modules";
import { PageHead, Section, DefinitionRows, Steps, CopyBlock } from "@/components/ui";
import { Page, TrackedChecklist, TrackedWorksheet } from "@/components/tracked";

export function Skills() {
  return (
    <Page to="/skills">
      <PageHead
        title="Using agent skills"
        lead="Module G, the Day 1 demo, and optional practice for the advanced track. A skill is a how-to an agent loads when a task matches: write the instructions once, reuse them every time."
      />

      <Section id="what" title="What a skill is">
        <p>
          A skill is a folder with a SKILL.md file inside. The top of the file names the skill and says when to use it; the rest holds the steps,
          the rules and an example. Scripts and templates can sit beside it.
        </p>
        <CopyBlock caption="A skill folder" text={skillFolder} />
      </Section>

      <Section id="support" title="Where skills work">
        <DefinitionRows rows={skillSupport} />
      </Section>

      <Section id="write" title="Write your own" intro="Optional, for the advanced track or after the training. No agent is needed for the guided version.">
        <Steps items={skillSteps} />
      </Section>

      <Section id="templates" title="Starter templates" intro="Copy one, rename it, and change the steps to fit your office.">
        <CopyBlock caption="memo-writer/SKILL.md" text={memoSkill} lang="markdown" />
        <CopyBlock caption="generate-certificates/SKILL.md" text={certificateSkill} lang="markdown" />
      </Section>

      <Section id="plan" title="Permissions plan">
        <TrackedWorksheet id="skill-plan" />
      </Section>

      <Section id="safety" title="Skill safety">
        <TrackedChecklist id="skill-safety" anchor={false} />
      </Section>
    </Page>
  );
}
