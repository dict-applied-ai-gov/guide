import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { pages, searchIndex } from "@/data/nav";

function score(entry, words) {
  const title = entry.title.toLowerCase();
  const detail = entry.detail.toLowerCase();
  let total = 0;
  for (const w of words) {
    if (title.startsWith(w)) total += 6;
    else if (title.includes(w)) total += 4;
    else if (detail.includes(w)) total += 1;
    else return 0;
  }
  return total + (entry.kind === "Session" || entry.kind === "Glossary" ? 0 : 1);
}

export function SearchPalette({ open, onClose }) {
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const results = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return pages.map((p) => ({ title: p.label, detail: p.desc, to: p.to, kind: p.group }));
    return searchIndex
      .map((e) => ({ e, s: score(e, words) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 12)
      .map((r) => r.e);
  }, [query]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      setQuery("");
      setActive(0);
      window.requestAnimationFrame(() => inputRef.current?.focus());
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const go = (entry) => {
    onClose();
    navigate(entry.to);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active]);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="palette"
      aria-label="Search the guide"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div className="palette__field">
        <Search size={20} aria-hidden="true" />
        <input
          ref={inputRef}
          type="search"
          placeholder="Search sessions, modules, terms"
          aria-label="Search sessions, modules, terms"
          aria-controls="palette-results"
          aria-activedescendant={results[active] ? `palette-${active}` : undefined}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
        />
      </div>
      <ul id="palette-results" className="palette__results" role="listbox" aria-label="Results">
        {results.length === 0 && <li className="palette__empty">Nothing matches. Try a tool name, a session, or a term like MCP.</li>}
        {results.map((r, i) => (
          <li
            key={`${r.kind}-${r.title}-${i}`}
            id={`palette-${i}`}
            role="option"
            aria-selected={i === active}
            className="palette__item"
            onMouseMove={() => setActive(i)}
            onClick={() => go(r)}
          >
            <span className="palette__title">{r.title}</span>
            <span className="palette__detail">{r.detail}</span>
            <span className="palette__kind">{r.kind}</span>
          </li>
        ))}
      </ul>
      <p className="palette__hint">Use the arrow keys to move, Enter to open, Esc to close.</p>
    </dialog>
  );
}
