import { createBrowserRouter, redirect, type LoaderFunctionArgs } from "react-router";
import { loader as articleLoader, ArticlePage } from "./routes/ArticlePage";
import { HomePage } from "./routes/HomePage";
import { NotFoundPage, RouteErrorPage } from "./routes/NotFoundPage";
import { RootLayout } from "./routes/RootLayout";

const basename =
  import.meta.env.BASE_URL === "/" ? "/" : import.meta.env.BASE_URL.replace(/\/$/, "");

function appPathname(requestUrl: string): string {
  const { pathname } = new URL(requestUrl);
  if (basename !== "/" && pathname.startsWith(basename)) {
    return pathname.slice(basename.length) || "/";
  }
  return pathname;
}

function rootLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const pathname = appPathname(request.url);
  if (pathname.length > 1 && pathname.endsWith("/")) {
    throw redirect(pathname.slice(0, -1) + url.search + url.hash);
  }
  return null;
}

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: RootLayout,
      loader: rootLoader,
      errorElement: <RouteErrorPage />,
      children: [
        { index: true, Component: HomePage },
        {
          path: "library/:slug",
          loader: articleLoader,
          Component: ArticlePage,
        },
        { path: "*", Component: NotFoundPage },
      ],
    },
  ],
  { basename },
);
