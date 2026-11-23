import { useEffect, useState } from "react";

export function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  const key = ids.join();

  useEffect(() => {
    if (ids.length === 0) return;
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting);
        }
        const next = ids.find((id) => visible.get(id));
        if (next) setActive(next);
      },
      { rootMargin: "-22% 0px -68% 0px", threshold: 0 },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [key, ids]);

  return active;
}
