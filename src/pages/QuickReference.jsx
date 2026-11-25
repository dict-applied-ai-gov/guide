import { Printer } from "lucide-react";
import { dataRule, days } from "@/data/course";
import { rtcfc, outputChecklist } from "@/data/reference";
import { protocol, neverPaste } from "@/data/modules";
import { PageHead } from "@/components/ui";
import { Page } from "@/components/tracked";

export function QuickReference() {
  return (
    <Page to="/quick-reference">
      <PageHead title="Quick reference" lead="The essentials on one page. Print it, or keep it open in a tab.">
        <button type="button" className="btn btn--secondary btn--small" onClick={() => window.print()}>
          <Printer size={16} aria-hidden="true" />
          <span>Print this page</span>
        </button>
      </PageHead>

      <div className="qref">
        <section className="qref__block qref__block--wide" aria-labelledby="qr-rule">
          <h2 id="qr-rule">The data rule</h2>
          <p className="qref__rule">{dataRule}</p>
        </section>

        <section className="qref__block" aria-labelledby="qr-lights">
          <h2 id="qr-lights">Data Traffic Light</h2>
          <dl className="qref__dl">
            <div>
              <dt>Public (green)</dt>
              <dd>Published or meant for the public. Regular tools.</dd>
            </div>
            <div>
              <dt>Internal (yellow)</dt>
              <dd>Not public, no personal data. Mask, clear, training off.</dd>
            </div>
            <div>
              <dt>Restricted (red)</dt>
              <dd>Personal, sensitive, confidential. Not in personal AI accounts, paid or free.</dd>
            </div>
          </dl>
        </section>

        <section className="qref__block" aria-labelledby="qr-protocol">
          <h2 id="qr-protocol">The 5-step protocol</h2>
          <ol className="qref__ol">
            {protocol.map((p) => (
              <li key={p.step}>
                <strong>{p.step}.</strong> {p.check}
              </li>
            ))}
          </ol>
        </section>

        <section className="qref__block" aria-labelledby="qr-prompt">
          <h2 id="qr-prompt">R-T-C-F-C</h2>
          <dl className="qref__dl">
            {rtcfc.map((p) => (
              <div key={p.key}>
                <dt>
                  {p.letter}, {p.name}
                </dt>
                <dd>{p.meaning}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="qref__block" aria-labelledby="qr-check">
          <h2 id="qr-check">Before you use an output</h2>
          <ul className="qref__ul">
            {outputChecklist.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        <section className="qref__block" aria-labelledby="qr-never">
          <h2 id="qr-never">Never paste</h2>
          <ul className="qref__ul">
            {neverPaste.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        <section className="qref__block" aria-labelledby="qr-agents">
          <h2 id="qr-agents">Agents and connectors</h2>
          <ul className="qref__ul">
            <li>Read-only first, one folder or account.</li>
            <li>Approvals on for sending, sharing, deleting, paying.</li>
            <li>Demo accounts only during the training.</li>
            <li>Treat what an agent reads as untrusted.</li>
            <li>Disconnect when done.</li>
          </ul>
        </section>

        <section className="qref__block qref__block--wide" aria-labelledby="qr-days">
          <h2 id="qr-days">The three days</h2>
          <dl className="qref__days">
            {days.map((d) => (
              <div key={d.id}>
                <dt>
                  Day {d.number}, {d.weekday.slice(0, 3)} {d.dateLabel.replace("November", "Nov")}
                </dt>
                <dd>{d.title}</dd>
              </div>
            ))}
          </dl>
          <p className="qref__hours">9:00 AM to 5:00 PM each day. Lunch 12:00 to 1:00; breaks are on each day’s schedule.</p>
        </section>
      </div>
    </Page>
  );
}
