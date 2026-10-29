import type { Params, UIMatch } from 'react-router';

/**
 * Route `handle` for pages below a tab (product details, enrolment, about…).
 * On phones the header becomes an app bar with a back button and this title.
 * Tab pages (Home, Products, Compare, Glossary) have no handle.
 */
export interface AppBarHandle {
  title: string;
  /** Where Back goes when the page was opened directly, with no in-app page behind it. */
  backTo: (params: Params) => string;
}

export interface AppBar {
  title: string;
  backTo: string;
}

function isAppBarHandle(handle: unknown): handle is AppBarHandle {
  return typeof handle === 'object' && handle !== null && 'title' in handle && 'backTo' in handle;
}

/** The deepest matched route's app bar, or null on a tab page. */
export function appBarFor(matches: UIMatch[]): AppBar | null {
  for (let i = matches.length - 1; i >= 0; i--) {
    const { handle, params } = matches[i]!;
    if (isAppBarHandle(handle)) return { title: handle.title, backTo: handle.backTo(params) };
  }
  return null;
}
