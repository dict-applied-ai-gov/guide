import { Link } from "react-router-dom";
import { PageHead } from "@/components/ui";

export function NotFound() {
  return (
    <article className="page">
      <PageHead title="This page isn’t in the guide" lead="The link may be old, or mistyped." />
      <p>
        <Link to="/">Back to the overview</Link>, or press Ctrl K to search.
      </p>
    </article>
  );
}
