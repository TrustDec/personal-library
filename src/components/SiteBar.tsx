import { Link } from "react-router";

export function SiteBar({ current }: { current?: string }) {
  return (
    <nav className="site-bar">
      <div className="inner">
        <Link to="/">Personal Library</Link>
        {current ? <span className="current">{current}</span> : null}
      </div>
    </nav>
  );
}
