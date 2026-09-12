import { useMemo } from "react";
import { pageIdFromPath } from "./site";
import { DocsShell } from "./components/DocsShell";
import Landing from "./pages/Landing";
import About from "./pages/About";
import { Configuration, GettingStarted, Gameplay } from "./pages/docs";
import { CommandsPermissions, Examples, FaqPage } from "./pages/docs2";
import License from "./pages/License";

export default function App() {
  // read once per mount; static hosting serves a fresh HTML shell per route,
  // so full page loads are the only navigation that matters
  const current = useMemo(() => pageIdFromPath(location.pathname), []);

  switch (current) {
    case "home":
      return <Landing />;
    case "about":
      return <About />;
    case "docs":
    case "getting-started":
    case "gameplay":
    case "configuration":
    case "commands-permissions":
    case "faq":
    case "examples":
    case "license":
      return (
        <DocsShell current={current}>
          {current === "getting-started" && <GettingStarted />}
          {current === "gameplay" && <Gameplay />}
          {current === "configuration" && <Configuration />}
          {current === "commands-permissions" && <CommandsPermissions />}
          {current === "faq" && <FaqPage />}
          {current === "examples" && <Examples />}
          {current === "license" && <License />}
        </DocsShell>
      );
    default:
      return <Landing />;
  }
}
