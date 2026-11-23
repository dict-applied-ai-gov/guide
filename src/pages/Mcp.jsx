import { mcpExamples, mcpDemo } from "@/data/modules";
import { PageHead, Section, TableWrap, Note, Steps } from "@/components/ui";
import { Page, TrackedChecklist } from "@/components/tracked";

export function Mcp() {
  return (
    <Page to="/mcp">
      <PageHead
        title="Connecting agents to apps with MCP"
        lead="Module F, Day 2, 1:00 to 2:15. MCP lets an AI app reach into Drive, Canva or Slack. Think of it as a USB-C port for AI."
      />

      <Section id="what" title="In plain words">
        <p>
          MCP (Model Context Protocol) is a standard way to plug AI apps into other tools. A connector is a ready-made link between an AI app and
          one service, often built on MCP. Once connected, the AI can read your files and act in the app, with the access you gave it. That is
          the whole point, and the whole risk.
        </p>
      </Section>

      <Section id="examples" title="What it connects to">
        <TableWrap label="MCP examples">
          <thead>
            <tr>
              <th scope="col">App</th>
              <th scope="col">What the AI can do</th>
              <th scope="col">How to connect</th>
            </tr>
          </thead>
          <tbody>
            {mcpExamples.map(([app, can, how]) => (
              <tr key={app}>
                <th scope="row">{app}</th>
                <td>{can}</td>
                <td>{how}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </Section>

      <Section id="demo" title="The live demo" intro="Demo accounts only. Watch for the approval prompt before the email.">
        <Steps items={mcpDemo} />
        <Note title="Trying it yourself">
          <p>
            Where your free plan allows, try a read-only connector on the trainer’s demo folder. If your plan doesn’t, watching the demo and
            completing the checklist below meets the objective.
          </p>
        </Note>
      </Section>

      <Section id="safety" title="Safety checklist">
        <TrackedChecklist id="mcp-safety" anchor={false} />
      </Section>
    </Page>
  );
}
