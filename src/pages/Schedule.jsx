import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { course, days, modules } from "@/data/course";
import { trainingStatus, useNow } from "@/lib/time";
import { PageHead, Section, TableWrap } from "@/components/ui";
import { SessionList } from "@/components/content";
import { Page } from "@/components/tracked";

export function Schedule() {
  const now = useNow();
  const status = trainingStatus(now);
  const [active, setActive] = useState(() => (status.day ? days.indexOf(status.day) : 0));
  const tabs = useRef([]);
  const day = days[active];

  const onKeyDown = (e) => {
    let next = null;
    if (e.key === "ArrowRight") next = (active + 1) % days.length;
    else if (e.key === "ArrowLeft") next = (active - 1 + days.length) % days.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = days.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <Page to="/schedule">
      <PageHead title="Schedule" lead={`${course.days}, ${course.dates}. ${course.hours}.`} />

      <div className="tabs" role="tablist" aria-label="Training day">
        {days.map((d, i) => (
          <button
            key={d.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${d.id}`}
            aria-selected={i === active}
            aria-controls={`panel-${d.id}`}
            tabIndex={i === active ? 0 : -1}
            className="tabs__tab"
            onClick={() => setActive(i)}
            onKeyDown={onKeyDown}
          >
            <span className="tabs__day">Day {d.number}</span>
            <span className="tabs__date">
              {d.weekday}, {d.dateLabel}
            </span>
          </button>
        ))}
      </div>

      <section className="tabs__panel" role="tabpanel" id={`panel-${day.id}`} aria-labelledby={`tab-${day.id}`}>
        <div className="day-summary">
          <h2>{day.title}</h2>
          <p>{day.objective}</p>
          <p className="day-summary__out">
            <strong>By 5:00 PM:</strong> {day.keyOutput}.
          </p>
          <p>
            <Link to={`/${day.id}`}>Open the Day {day.number} page</Link>
          </p>
        </div>
        <SessionList day={day} />
      </section>

      <Section id="modules" title="Where the topic modules fall" intro="Modules A to G run inside the day sessions, not as extra time.">
        <TableWrap label="Topic modules">
          <thead>
            <tr>
              <th scope="col">Module</th>
              <th scope="col">Topic</th>
              <th scope="col">When</th>
              <th scope="col">Minutes</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((m) => (
              <tr key={m.letter}>
                <td className="num">{m.letter}</td>
                <th scope="row">
                  <Link to={m.to}>{m.title}</Link>
                </th>
                <td>{m.when}</td>
                <td>{m.minutes}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </Section>
    </Page>
  );
}
