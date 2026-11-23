import { Link } from "react-router-dom";
import { dataRule } from "@/data/course";
import { PageHead, Section, Note } from "@/components/ui";
import { SessionList } from "@/components/content";
import { Page, TrackedWorksheet } from "@/components/tracked";

export function DayPage({ day }) {
  return (
    <Page to={`/${day.id}`}>
      <PageHead title={`Day ${day.number}: ${day.title}`}>
        <p className="page-head__date">
          <time dateTime={day.date}>
            {day.weekday}, {day.dateLabel}, 2026
          </time>
          , 8:00 AM to 5:00 PM
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

      <Section id="advanced" title="Advanced track">
        <p>{day.advanced.replace(/^Advanced track \(([^)]+)\):\s*/, "In the $1: ").replace(/^Advanced track:\s*/, "")}</p>
      </Section>

      <Section id="exit" title="Exit ticket">
        <TrackedWorksheet id={`exit-${day.id}`} />
      </Section>
    </Page>
  );
}
