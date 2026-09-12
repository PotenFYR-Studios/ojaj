/**
 * Central site registry: routes, SEO metadata and TOC headings.
 * Imported by both vite.config.ts (multi-page emit) and the React app
 * (router, sidebar, TOC, search palette): keep it free of React imports.
 */

export const CANON = "https://ojaj.docs.potenfyr.in";

/**
 * Base path the site is served under. Set at build time via VITE_BASE
 * (vite.config `base`); falls back through the runtime env so prerender
 * scripts executed outside vite still resolve it.
 */
const envBase: unknown = import.meta.env?.BASE_URL;
export const BASE: string =
  typeof envBase === "string" ? envBase
  : typeof process !== "undefined" ? process.env?.VITE_BASE ?? "/"
  : "/";

/** Prefix an absolute site path with the serving base (idempotent). */
export function withBase(p: string): string {
  if (BASE !== "/" && (p === BASE || p.startsWith(BASE))) return p;
  if (!p.startsWith("/")) return p;
  return `${BASE}${p.slice(1)}`;
}

/** Remove the serving base from a URL path (idempotent). */
export function stripBase(pathname: string): string {
  if (BASE === "/") return pathname;
  if (pathname === BASE) return "/";
  if (pathname.startsWith(BASE)) return pathname.slice(BASE.length - 1);
  return pathname;
}
export const REPO = "https://github.com/PotenFYR-Studios/ojaj";
export const MODRINTH = "https://modrinth.com/plugin/onejumpalljump";
export const WEBSITE = "https://potenfyr.in";
export const DISCORD = "https://discord.com/invite/zUaN2FPBec";
export const ORG = "https://github.com/PotenFYR-Studios";
export const VERSION = "0.1.0-alpha";

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface PageMeta {
  id: string;
  /** Output file relative to dist root; also the live URL path. */
  file: string;
  title: string;
  description: string;
  headings: Heading[];
}

export const HOME: PageMeta = {
  id: "home",
  file: "index.html",
  title: "OneJumpAllJump: one jump launches the entire server",
  description:
    "OneJumpAllJump (ojaj): one player jumps and the entire Minecraft server launches with them. Chaotic, fully configurable Paper & Purpur plugin.",
  headings: [],
};

export const ABOUT: PageMeta = {
  id: "about",
  file: "about.html",
  title: "About: OneJumpAllJump",
  description:
    "The story behind OneJumpAllJump, the chaotic Minecraft jump plugin by PotenFYR Studios: links, licensing and credits.",
  headings: [],
};

export const DOC_PAGES: PageMeta[] = [
  {
    id: "getting-started",
    file: "docs/getting-started.html",
    title: "Getting started: OneJumpAllJump docs",
    description:
      "Install OneJumpAllJump on a Paper or Purpur server: requirements, Modrinth download, first launch and the one gotcha every admin should know.",
    headings: [
      { id: "requirements", text: "Requirements", level: 2 },
      { id: "install", text: "Install from Modrinth", level: 2 },
      { id: "first-jump", text: "Your first global jump", level: 2 },
      { id: "world-gotcha", text: "The world-name gotcha", level: 2 },
      { id: "where-next", text: "Where to next", level: 2 },
    ],
  },
  {
    id: "gameplay",
    file: "docs/gameplay.html",
    title: "Gameplay & mechanics: OneJumpAllJump docs",
    description:
      "Exactly how OneJumpAllJump works: the jump trigger, the guard chain (cooldown, odds, worlds, bypass), the launch, effects, safeguards and stats.",
    headings: [
      { id: "trigger", text: "The trigger", level: 2 },
      { id: "checks", text: "The checks, in order", level: 2 },
      { id: "launch", text: "The launch", level: 2 },
      { id: "spectacle", text: "The spectacle", level: 2 },
      { id: "safeguards", text: "Built-in safeguards", level: 2 },
      { id: "stats", text: "Stats & persistence", level: 2 },
      { id: "formatting", text: "Colors & placeholders", level: 2 },
    ],
  },
  {
    id: "configuration",
    file: "docs/configuration.html",
    title: "Configuration reference: OneJumpAllJump docs",
    description:
      "Every OneJumpAllJump config.yml option: cooldown, velocity, trigger chance, fall damage, particles, trails, sounds, titles, broadcasts and world filters.",
    headings: [
      { id: "example", text: "Full example", level: 2 },
      { id: "master", text: "Master toggle", level: 2 },
      { id: "cooldown", text: "cooldown", level: 2 },
      { id: "velocity", text: "velocity", level: 2 },
      { id: "trigger-chance", text: "trigger-chance", level: 2 },
      { id: "fall-damage", text: "fall-damage", level: 2 },
      { id: "particles", text: "particles", level: 2 },
      { id: "trail", text: "trail", level: 2 },
      { id: "sound", text: "sound", level: 2 },
      { id: "actionbar", text: "actionbar", level: 2 },
      { id: "titles", text: "titles", level: 2 },
      { id: "broadcast", text: "broadcast", level: 2 },
      { id: "worlds", text: "worlds", level: 2 },
      { id: "notes", text: "Parsing & fallbacks", level: 2 },
    ],
  },
  {
    id: "commands-permissions",
    file: "docs/commands-permissions.html",
    title: "Commands & permissions: OneJumpAllJump docs",
    description:
      "The /onejump command (alias /ojaj): toggle, reload and stats subcommands plus the onejump.admin and onejump.bypass permissions.",
    headings: [
      { id: "commands", text: "Commands", level: 2 },
      { id: "permissions", text: "Permissions", level: 2 },
      { id: "notes", text: "Behavior notes", level: 2 },
    ],
  },
  {
    id: "faq",
    file: "docs/faq.html",
    title: "FAQ: OneJumpAllJump docs",
    description:
      "OneJumpAllJump frequently asked questions: Spigot support, missing triggers, fall damage, cascades, stats persistence and alpha caveats.",
    headings: [
      { id: "q-spigot", text: "Does it work on Spigot?", level: 2 },
      { id: "q-notrigger", text: "Why doesn't my jump trigger anything?", level: 2 },
      { id: "q-fall", text: "Do players take fall damage?", level: 2 },
      { id: "q-cascade", text: "Can the chaos cascade forever?", level: 2 },
      { id: "q-stats", text: "Are stats saved?", level: 2 },
      { id: "q-max", text: "Is the max velocity ever used?", level: 2 },
      { id: "q-console", text: "Can the console check stats?", level: 2 },
      { id: "q-alpha", text: "Will the config change between versions?", level: 2 },
    ],
  },
  {
    id: "examples",
    file: "examples.html",
    title: "Examples: OneJumpAllJump docs",
    description:
      "Copy-paste config.yml and command examples for OneJumpAllJump: the world fix, survival tuning, lobby protection, full chaos and custom messages.",
    headings: [
      { id: "start", text: "Start here: fix your worlds", level: 2 },
      { id: "predictable", text: "Survival-friendly tuning", level: 2 },
      { id: "lobby", text: "Keep lobbies and minigames safe", level: 2 },
      { id: "maximum", text: "Full chaos", level: 2 },
      { id: "messages", text: "Custom messages", level: 2 },
      { id: "commands", text: "Everyday commands", level: 2 },
    ],
  },
  {
    id: "license",
    file: "license.html",
    title: "License: OneJumpAllJump",
    description:
      "What you can and cannot do with OneJumpAllJump: Apache-2.0 with the Commons Clause, in plain language.",
    headings: [
      { id: "allowed", text: "What you can do", level: 2 },
      { id: "limits", text: "What you cannot do", level: 2 },
      { id: "notice", text: "License notices", level: 2 },
    ],
  },
];

/** All routed pages (landing + docs + about) for the multi-page emit. */
export const ALL_PAGES: PageMeta[] = [HOME, ...DOC_PAGES, ABOUT];

export const PORTAL: PageMeta = {
  id: "docs",
  file: "docs/index.html",
  title: "Documentation: OneJumpAllJump",
  description:
    "OneJumpAllJump docs hub: getting started, gameplay mechanics, configuration reference, commands & permissions, FAQ, examples and the license.",
  headings: [],
};

/** Page id from a URL path (accepts both /docs/x and /docs/x.html). */
export function pageIdFromPath(pathname: string): string | null {
  const raw = stripBase(pathname);
  const p = raw.replace(/\.html$/, "").replace(/\/$/, "") || "/";
  if (p === "/") return "home";
  if (p === "/about") return "about";
  if (p === "/examples") return "examples";
  if (p === "/license" || p === "/license/index") return "license";
  const docs = p.match(/^\/docs\/([\w-]+)$/);
  if (docs) {
    const hit = DOC_PAGES.find((d) => d.id === docs[1] || d.file.endsWith(`${docs[1]}.html`));
    if (hit) return hit.id;
    return "docs"; // /docs/<unknown> falls back to the portal
  }
  if (p === "/docs") return "docs";
  return "home";
}

export function pageById(id: string): PageMeta | undefined {
  if (id === "docs") return PORTAL;
  return ALL_PAGES.find((p) => p.id === id);
}
