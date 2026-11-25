import { analysisPrompts } from "@/data/reference";
import { PageHead, Section, Steps, CopyBlock, Note } from "@/components/ui";
import { Page, TrackedChecklist, TrackedWorksheet } from "@/components/tracked";

const dashboardSteps = [
  { title: "Open Looker Studio", text: "Go to lookerstudio.google.com, create a blank report, and add the synthetic clearance applications log (or the client feedback data) from your Drive as a Google Sheets data source." },
  { title: "Add the KPIs", text: "Insert scorecards for the few numbers the head of office asks about first, such as total applications or average rating." },
  { title: "Add a trend chart", text: "Insert a time series chart by month, so a change over time is visible at a glance." },
  { title: "Add a filter", text: "Insert a drop-down control for office or month, so one dashboard answers questions for every office." },
  { title: "Check it against Sheets", text: "Pick two numbers on the dashboard and recompute them in Sheets with COUNTIFS or a pivot table. If they disagree, find out why before anyone sees it." },
];

export function DecisionSupport() {
  return (
    <Page to="/decision-support">
      <PageHead
        title="AI for decision support"
        lead="Reference for the Day 3 data website lab and your capstone. AI finds the pattern and drafts the brief. A person checks the numbers and makes the call."
      />

      <Section id="analysis" title="Ask the data" intro="Use these with a sample dataset. Then check every number the AI gives you.">
        {analysisPrompts.map((p, i) => (
          <CopyBlock key={p} caption={`Prompt ${i + 1}`} text={p} />
        ))}
      </Section>

      <Section id="dashboard" title="Build the dashboard" intro="Free, in Looker Studio: KPIs, a trend chart, and a filter by office or month.">
        <Steps items={dashboardSteps} />
      </Section>

      <Section id="bias" title="Bias and risk check" intro="Run this before any brief leaves your desk.">
        <TrackedChecklist id="bias-check" anchor={false} />
      </Section>

      <Section id="brief" title="Decision brief" intro="Use AI to prepare a brief on a resource allocation or service improvement case. Then critique it as if someone else wrote it.">
        <Note title="Decision support, not decision maker" tone="accent">
          <p>The AI can list options and risks. It cannot be accountable for the choice. The brief names the person who decides.</p>
        </Note>
        <TrackedWorksheet id="decision-brief" />
      </Section>

      <Section id="advanced" title="Advanced track">
        <p>Calculated fields, blended data sources, and scenario or sensitivity analysis in the dashboard.</p>
      </Section>
    </Page>
  );
}
