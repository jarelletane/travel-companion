import { useEffect, useState } from "react";
import type { Page } from "../types/navigation";

const PAGE_PATHS: Record<Page, string> = {
  login: "/login",
  dashboard: "/dashboard",
  trips: "/trips",
  places: "/places",
  imports: "/imports",
  costs: "/costs",
  invite: "/invite",
  settings: "/settings",
  tripMap: "/trips/map",
};

const PATH_PAGES = Object.fromEntries(
  Object.entries(PAGE_PATHS).map(([page, path]) => [path, page])
) as Record<string, Page>;

function getPageFromPath(pathname: string): Page {
  return PATH_PAGES[pathname] ?? "login";
}

export function useAppRoute() {
  const [page, setPageState] = useState<Page>(() => getPageFromPath(window.location.pathname));

  useEffect(() => {
    function handlePopState() {
      setPageState(getPageFromPath(window.location.pathname));
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function navigate(page: Page) {
    const nextPath = PAGE_PATHS[page];
    setPageState(page);

    if (window.location.pathname !== nextPath) {
      window.history.pushState(null, "", nextPath);
    }
  }

  return { page, navigate };
}

