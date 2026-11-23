import { useState } from "react";
import { Link, NavLink } from "react-router";

type Theme = "light" | "dark";

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function Nav() {
  const [theme, setTheme] = useState<Theme>(currentTheme);
  const dark = theme === "dark";

  function toggleTheme() {
    const next: Theme = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    setTheme(next);
  }

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link className="brand" to="/" aria-label="Personal Library">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path
                fill="currentColor"
                d="M12 2.2 13.7 9 21 12l-7.3 3L12 21.8 10.3 15 3 12l7.3-3L12 2.2Z"
              />
            </svg>
          </span>
          <span className="brand-name">Personal Library</span>
        </Link>
        <nav className="nav-links" aria-label="站点">
          <NavLink to="/" end>
            首页
          </NavLink>
          <Link to={{ pathname: "/", hash: "collection" }}>馆藏</Link>
        </nav>
        <div className="nav-end">
          <button
            type="button"
            className="nav-icon"
            aria-label={dark ? "切换到浅色" : "切换到暗黑"}
            aria-pressed={dark}
            onClick={toggleTheme}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
          <a
            className="nav-github"
            href="https://github.com/TrustDec"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true">
              <path
                fill="currentColor"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
              />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.5 2.4a8.8 8.8 0 1 0 7.1 13.2A8.2 8.2 0 0 1 14.5 2.4Z"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <path
        fill="currentColor"
        d="M11 2h2v3h-2zm0 17h2v3h-2zM2 11h3v2H2zm17 0h3v2h-3zM5.1 3.7l1.4 1.4L5.1 6.5 3.7 5.1zm13.4 13.4 1.4 1.4-1.4 1.4-1.4-1.4zM18.5 5.1l1.4-1.4 1.4 1.4-1.4 1.4zM3.7 18.9l1.4-1.4 1.4 1.4-1.4 1.4z"
      />
    </svg>
  );
}
