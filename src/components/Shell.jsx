import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  Award,
  BarChart3,
  BookOpen,
  BookOpenText,
  Calendar,
  ChevronDown,
  CircleHelp,
  ClipboardCheck,
  FileText,
  Home,
  LayoutGrid,
  Menu,
  MessageSquareText,
  Moon,
  PanelLeft,
  Printer,
  Search,
  ShieldCheck,
  Sun,
  Trophy,
  Wrench,
  X,
} from "lucide-react";
import { course, days } from "@/data/course";
import { navGroups, pages } from "@/data/nav";
import { SearchPalette } from "./SearchPalette";

const ICONS = {
  "/": Home,
  "/progress": LayoutGrid,
  "/schedule": Calendar,
  "/setup": Wrench,
  "/prompting": MessageSquareText,
  "/certificates": Award,
  "/decision-support": BarChart3,
  "/capstone": Trophy,
  "/responsible-ai": ShieldCheck,
  "/quick-reference": Printer,
  "/glossary": BookOpen,
  "/faq": CircleHelp,
  "/resources": FileText,
  "/assessment": ClipboardCheck,
};

const sessionCount = (d) => d.sessions.filter((s) => s.kind !== "break").length;

function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "light");
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      window.localStorage.setItem("aag:theme", next);
    } catch {
      /* the choice lasts for this visit */
    }
    setTheme(next);
  };
  return [theme, toggle];
}

function SidebarItem({ item, onClose }) {
  const day = days.find((d) => `/${d.id}` === item.to);
  const Icon = ICONS[item.to];
  return (
    <li>
      <NavLink to={item.to} end={item.to === "/"} className="side-link" onClick={onClose}>
        {day ? (
          <span className="badge-square">D{day.number}</span>
        ) : item.letter ? (
          <span className="badge-square badge-square--outline">{item.letter}</span>
        ) : Icon ? (
          <Icon className="side-link__icon" size={18} aria-hidden="true" />
        ) : null}
        <span className="side-link__body">
          <span className="side-link__text">{day ? day.short : item.label}</span>
          {day && (
            <span className="side-link__sub">
              {day.weekday.slice(0, 3)}, {day.dateLabel.replace("November", "Nov")}, {sessionCount(day)} sessions
            </span>
          )}
        </span>
      </NavLink>
    </li>
  );
}

function Sidebar({ open, onClose }) {
  return (
    <aside id="site-nav" className="sidebar" data-open={open ? "true" : "false"} aria-label="Guide">
      <div className="sidebar__brand">
        <Link to="/" className="brand" onClick={onClose}>
          <span className="brand__mark" aria-hidden="true">
            <BookOpenText size={20} />
          </span>
          <span className="brand__text">
            <span className="brand__name">{course.short}</span>
            <span className="brand__sub">Participant Guide</span>
          </span>
        </Link>
        <button type="button" className="icon-btn sidebar__close" onClick={onClose} aria-label="Close menu">
          <X size={18} aria-hidden="true" />
        </button>
      </div>
      <nav className="sidebar__nav" aria-label="Pages">
        {navGroups.map((group) => (
          <div key={group.label} className="sidebar__group">
            <p className="sidebar__label">{group.label}</p>
            <ul>
              {group.items.map((item) => (
                <SidebarItem key={item.to} item={item} onClose={onClose} />
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <p className="sidebar__foot">
        {course.city}
        <br />
        {course.dates}
      </p>
    </aside>
  );
}

function DaysMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);

  if (path !== location.pathname) {
    setPath(location.pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const active = days.some((d) => location.pathname === `/${d.id}`);
  return (
    <div className="menu" ref={ref}>
      <button
        type="button"
        className={`top-link ${active ? "is-active" : ""}`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
      >
        Days
        <ChevronDown size={14} aria-hidden="true" />
      </button>
      {open && (
        <ul className="menu__list">
          {days.map((d) => (
            <li key={d.id}>
              <Link to={`/${d.id}`} className="menu__item">
                <span className="badge-square">D{d.number}</span>
                <span>
                  <span className="menu__title">{d.short}</span>
                  <span className="menu__sub">
                    {d.weekday}, {d.dateLabel}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <p className="site-footer__title">{course.title}</p>
        <p className="site-footer__meta">
          {course.audience}, {course.venue}, {course.dates}
        </p>
      </div>
      <ul className="site-footer__links">
        <li><Link to="/schedule">Schedule</Link></li>
        <li><Link to="/setup">Before you come</Link></li>
        <li><Link to="/quick-reference">Quick reference</Link></li>
        <li><Link to="/faq">FAQ and help</Link></li>
      </ul>
      <p className="site-footer__note">
        Follows the Participant Guide and Lesson Plan. Prices change often; your trainer has the final word. Built with help from Claude Code.
      </p>
    </footer>
  );
}

const TOP_LINKS = [
  { to: "/", label: "Overview" },
  { to: "/progress", label: "Progress" },
  { to: "/setup", label: "Setup" },
  { to: "/quick-reference", label: "Handout" },
];

export function Shell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return window.localStorage.getItem("aag:sidebar") === "collapsed";
    } catch {
      return false;
    }
  });
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();
  const location = useLocation();
  const mainRef = useRef(null);
  const firstRender = useRef(true);

  const toggleSidebar = () => {
    if (window.matchMedia("(max-width: 64rem)").matches) {
      setMenuOpen(true);
      return;
    }
    setCollapsed((c) => {
      try {
        window.localStorage.setItem("aag:sidebar", c ? "open" : "collapsed");
      } catch {
        /* lasts for this visit */
      }
      return !c;
    });
  };

  useEffect(() => {
    const page = pages.find((p) => p.to === location.pathname);
    document.title = page && page.to !== "/" ? `${page.label}: ${course.short}` : `${course.short}: ${course.city}, ${course.dates}`;
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    mainRef.current?.focus({ preventScroll: true });
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === "/" && !/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) && !e.target.isContentEditable) {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="shell" data-collapsed={collapsed ? "true" : "false"}>
      <a className="skip-link" href="#main">Skip to content</a>
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      {menuOpen && <div className="scrim" onClick={() => setMenuOpen(false)} aria-hidden="true" />}
      <div className="shell__main">
        <header className="topbar">
          <button
            type="button"
            className="icon-btn icon-btn--solid"
            aria-label="Show or hide the page list"
            aria-controls="site-nav"
            onClick={toggleSidebar}
          >
            <PanelLeft className="only-wide" size={18} aria-hidden="true" />
            <Menu className="only-narrow" size={18} aria-hidden="true" />
          </button>
          <button type="button" className="search-btn" onClick={() => setSearchOpen(true)} aria-haspopup="dialog">
            <Search size={16} aria-hidden="true" />
            <span className="search-btn__text">Search...</span>
            <kbd className="search-btn__key">Ctrl K</kbd>
          </button>
          <nav className="topbar__nav" aria-label="Main">
            {TOP_LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === "/"} className={({ isActive }) => `top-link ${isActive ? "is-active" : ""}`}>
                {l.label}
              </NavLink>
            ))}
            <DaysMenu />
          </nav>
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
        </header>
        <main id="main" className="main" ref={mainRef} tabIndex={-1}>
          <div className="main__inner">
            <Outlet />
            <Footer />
          </div>
        </main>
      </div>
      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
