import { Link } from "react-router-dom";
import { pages } from "@/data/nav";
import { getChecklist, getWorksheet } from "@/data/tracking";
import { Checklist, Worksheet } from "./ui";

export function TrackedChecklist({ id, anchor = true }) {
  const c = getChecklist(id);
  return (
    <div id={anchor ? id : undefined} className="tracked">
      <Checklist id={c.id} title={c.title} note={c.note} items={c.items} />
    </div>
  );
}

export function TrackedWorksheet({ id, anchor }) {
  const w = getWorksheet(id);
  return (
    <div id={anchor} className="tracked">
      <Worksheet id={w.id} title={w.title} intro={w.intro} fields={w.fields} />
    </div>
  );
}

export function PageNav({ to }) {
  const i = pages.findIndex((p) => p.to === to);
  const prev = i > 0 ? pages[i - 1] : null;
  const next = i >= 0 && i < pages.length - 1 ? pages[i + 1] : null;
  return (
    <nav className="page-nav" aria-label="Previous and next page">
      {prev ? (
        <Link to={prev.to} className="page-nav__link" rel="prev">
          <span className="page-nav__dir">Previous</span>
          <span className="page-nav__title">{prev.label}</span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link to={next.to} className="page-nav__link page-nav__link--next" rel="next">
          <span className="page-nav__dir">Next</span>
          <span className="page-nav__title">{next.label}</span>
        </Link>
      )}
    </nav>
  );
}

export function Page({ to, children }) {
  return (
    <article className="page">
      {children}
      <PageNav to={to} />
    </article>
  );
}
