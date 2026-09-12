import { renderToString } from "react-dom/server";
import App from "./App";

/**
 * SSR entry used by scripts/prerender.ts. App resolves its page from
 * location.pathname, so the server defines a per-route stub before rendering;
 * the client bundle keeps reading the real location (see main.tsx hydration).
 */
export function render(pathname: string): string {
  Object.defineProperty(globalThis, "location", {
    value: { pathname },
    configurable: true,
  });
  return renderToString(<App />);
}
