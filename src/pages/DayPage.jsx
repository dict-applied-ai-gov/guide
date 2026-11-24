import { Link } from "react-router-dom";
import { dataRule } from "@/data/course";
import { PageHead, Section, Note, DefinitionRows } from "@/components/ui";
import { SessionList } from "@/components/content";
import { Page, TrackedWorksheet } from "@/components/tracked";
import { formatClock } from "@/lib/time";

export function DayPage({ day }) {
  return (
    <Page to={`/${day.id}`}>
      <PageHead title={`Day ${day.number}: ${day.title}`}>
        <p className="page-head__date">
          <time dateTime={day.date}>
            {day.weekday}, {day.dateLabel}, 2026
          </time>
          , {formatClock(day.sessions[0].start)} to {formatClock(day.sessions[day.sessions.length - 1].end)}
        </p>
      </PageHead>

      <div className="day-summary">
        <p className="lead">{day.objective}</p>
        <p className="day-summary__out">
          <strong>By 5:00 PM you have:</strong> {day.keyOutput}.
        </p>
      </div>

      {day.number === 1 && (
        <Note title="The data rule, read aloud every morning" tone="accent">
          <p>
            {dataRule} <Link to="/data-protection">The full rule and the 5-step protocol</Link>
          </p>
        </Note>
      )}

      <Section id="sessions" title="Session by session" intro="The current session is marked Now while the training runs. Times are Philippine time.">
        <SessionList day={day} />
      </Section>

      {day.materials && (
        <Section id="materials" title="Materials and exercise files" intro="Sample files only, with fake names and numbers. Open them in Google Drive, or download and upload them to the AI tool the exercise names.">
          <ul className="file-list">
            {day.materials.map(([file, label, note]) => (
              <li key={file}>
                <a href={`/materials/${day.id}/${file}`} download>
                  {label}
                </a>
                <span className="file-list__note">
                  {" "}
                  ({file.split(".").pop()}): {note}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {day.submission && (
        <Section id="submit" title={`Submit your Day ${day.number} outputs`} intro="One Google Form, four things, before you leave. Collect them during the day.">
          <div className="submit-box">
            <div>
              <DefinitionRows rows={day.submission.items} />
              <p className="submit-box__link">
                <a className="btn btn--primary" href={day.submission.url} target="_blank" rel="noreferrer">
                  Open the Day {day.number} form
                </a>{" "}
                <span className="muted">{day.submission.url.replace("https://", "")}</span>
              </p>
              <p className="muted">{day.submission.note}</p>
            </div>
            <img className="submit-box__qr" src={day.submission.qr} width="200" height="200" alt={`QR code for the Day ${day.number} form`} />
          </div>
        </Section>
      )}

      <Section id="advanced" title="Advanced track">
        <p>{day.advanced.replace(/^Advanced track \(([^)]+)\):\s*/, "In the $1: ").replace(/^Advanced track:\s*/, "")}</p>
      </Section>

      <Section id="exit" title="Exit ticket">
        <TrackedWorksheet id={`exit-${day.id}`} />
      </Section>
    </Page>
  );
}
