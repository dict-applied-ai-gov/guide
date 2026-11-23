import { localOptions, hardware, localTalkingPoints } from "@/data/modules";
import { PageHead, Section, TableWrap, DefinitionRows } from "@/components/ui";
import { CloudOrLocal } from "@/components/content";
import { Page } from "@/components/tracked";

export function LocalAi() {
  return (
    <Page to="/local-ai">
      <PageHead
        title="Running AI on your own computer"
        lead="Module D, Day 2, 2:15 to 3:00. The trainer turns Wi-Fi off and the model keeps answering. Your data never left the laptop."
      />

      <Section id="when" title="Cloud or local">
        <DefinitionRows rows={localTalkingPoints} />
      </Section>

      <Section id="tools" title="The tools">
        <TableWrap label="Local AI tools">
          <thead>
            <tr>
              <th scope="col">Tool</th>
              <th scope="col">What it is</th>
              <th scope="col">Best for</th>
            </tr>
          </thead>
          <tbody>
            {localOptions.map(([name, what, best]) => (
              <tr key={name}>
                <th scope="row">{name}</th>
                <td>{what}</td>
                <td>{best}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </Section>

      <Section id="hardware" title="What your computer needs" intro="Approximate, for quantized models. Bigger models are slower and need more memory.">
        <TableWrap label="Hardware by model size">
          <thead>
            <tr>
              <th scope="col">Model size</th>
              <th scope="col">Memory</th>
              <th scope="col">Typical machine</th>
              <th scope="col">Good enough for</th>
            </tr>
          </thead>
          <tbody>
            {hardware.map(([size, mem, machine, use]) => (
              <tr key={size}>
                <th scope="row">{size}</th>
                <td>{mem}</td>
                <td>{machine}</td>
                <td>{use}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </Section>

      <Section
        id="decide"
        title="Cloud-or-local decision sheet"
        intro="Decide for each office scenario, and write why. The suggestion appears once you’ve chosen."
      >
        <CloudOrLocal />
      </Section>
    </Page>
  );
}
