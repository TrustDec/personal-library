import { useEffect } from "react";
import { Outlet, ScrollRestoration, useLocation, useNavigationType } from "react-router";
import { Nav } from "../components/Nav";

export function RootLayout() {
  const { hash, pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      document.getElementById(id)?.scrollIntoView();
      return;
    }
    if (navType !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [hash, pathname, navType]);

  return (
    <>
      <ScrollRestoration />
      <Nav />
      <Outlet />
    </>
  );
}
