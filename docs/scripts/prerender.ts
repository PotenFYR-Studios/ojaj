// Post-build static emission + prerender (runs after `vite build`):
//  1. emits one HTML file per route (plus clean-URL <name>/index.html twins)
//     with per-page title/description/canonical/Open Graph/Twitter meta and
//     the landing schema.org @graph, always from vite's clean shell, so the
//     pass is idempotent (a bundle-time closeBundle hook re-fired during the
//     SSR server close and accumulated meta blocks; post-build never does)
//  2. fills each page's <div id="root"> with the React app's rendered HTML
//     so crawlers and no-JS visitors see full content
// Hydration: main.tsx hydrates over the prerendered markup; all components
// render deterministically (no Math.random/Date.now), so SSR and client
// markup match exactly.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createServer } from "vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  ALL_PAGES,
  PORTAL,
  CANON,
  HOME,
  REPO,
  MODRINTH,
  WEBSITE,
  ORG,
  VERSION,
  type PageMeta,
} from "../src/site";

const __dir = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dir, "..");
const dist = resolve(root, "dist");

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

/** Structured data for the landing page only (schema.org @graph). */
const landingJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${CANON}/#website`,
      url: `${CANON}/`,
      name: "OneJumpAllJump (ojaj): Documentation",
      description:
        "Docs for the Paper & Purpur plugin where one player's jump launches the entire server.",
      inLanguage: "en",
      publisher: { "@id": `${CANON}/#org` },
    },
    {
      "@type": "Organization",
      "@id": `${CANON}/#org`,
      name: "PotenFYR Studios",
      url: WEBSITE,
      sameAs: [ORG],
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${CANON}/#plugin`,
      name: "OneJumpAllJump",
      alternateName: "ojaj",
      softwareVersion: VERSION,
      applicationCategory: "GameApplication",
      operatingSystem: "Minecraft 26.1+ (Paper, Purpur)",
      url: MODRINTH,
      downloadUrl: MODRINTH,
      codeRepository: REPO,
      license: `${REPO}/blob/master/LICENSE`,
      isAccessibleForFree: true,
      author: { "@type": "Organization", name: "PotenFYR Studios", url: WEBSITE, sameAs: [ORG] },
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
  ],
};

const OG_SITE_NAME = "ojaj docs";
const OG_IMAGE = `${CANON}/og.png`;
const OG_IMAGE_ALT = "OneJumpAllJump banner: one jump launches the entire server";

/** Replace the title and inject description / canonical / Open Graph / Twitter meta. */
function emitPage(
  shell: string,
  p: { title: string; description: string },
  canonical: string,
): string {
  return shell
    .replace(/<title>.*?<\/title>/, `<title>${esc(p.title)}</title>`)
    .replace(
      "</head>",
      `  <meta name="description" content="${esc(p.description)}">\n` +
        `  <link rel="canonical" href="${canonical}">\n` +
        `  <meta property="og:site_name" content="${OG_SITE_NAME}">\n` +
        `  <meta property="og:type" content="website">\n` +
        `  <meta property="og:title" content="${esc(p.title)}">\n` +
        `  <meta property="og:description" content="${esc(p.description)}">\n` +
        `  <meta property="og:url" content="${canonical}">\n` +
        `  <meta property="og:image" content="${OG_IMAGE}">\n` +
        `  <meta property="og:image:alt" content="${esc(OG_IMAGE_ALT)}">\n` +
        `  <meta name="twitter:card" content="summary_large_image">\n` +
        `  <meta name="twitter:title" content="${esc(p.title)}">\n` +
        `  <meta name="twitter:description" content="${esc(p.description)}">\n` +
        `  <meta name="twitter:image" content="${OG_IMAGE}">\n</head>`,
    );
}

interface ServerRender {
  render: (pathname: string) => string;
}

try {
  const vite = await createServer({
    root,
    logLevel: "error",
    server: { middlewareMode: true },
    appType: "custom",
  });
  const { render } = (await vite.ssrLoadModule("/src/entry-server.tsx")) as ServerRender;

  const shell = readFileSync(resolve(dist, "index.html"), "utf8");
  const write = (file: string, html: string) => {
    const target = resolve(dist, file);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, html);
  };

  const pages: { p: PageMeta; file: string; canonical: string }[] = [
    { p: HOME, file: "index.html", canonical: `${CANON}/` },
    ...[PORTAL, ...ALL_PAGES]
      .filter((p) => p.file !== "index.html")
      .flatMap((p) => {
        const canonical = `${CANON}/${p.file}`;
        const items = [{ p, file: p.file, canonical }];
        // clean-URL twin so /about/, /examples/, /docs/faq/ resolve on
        // GitHub Pages (which cannot rewrite extensionless to .html)
        if (!p.file.endsWith("index.html")) {
          items.push({ p, file: p.file.replace(/\.html$/, "/index.html"), canonical });
        }
        return items;
      }),
  ];

  for (const { p, file, canonical } of pages) {
    const route = file === "index.html" ? "/" : `/${file.replace(/index\.html$/, "")}`;
    const body = render(route);
    let html = emitPage(shell, p, canonical);
    if (p.id === "home") {
      html = html.replace(
        "</head>",
        `  <script type="application/ld+json">${JSON.stringify(landingJsonLd)}</script>\n</head>`,
      );
    }
    // function replacer: the rendered body may contain `$` sequences
    html = html.replace('<div id="root"></div>', () => `<div id="root">${body}</div>`);
    write(file, html);
    console.log(`[prerender] ${file} <- ${route} (${body.length} chars)`);
  }

  await vite.close();
  console.log(`[prerender] ${pages.length} pages emitted + prerendered`);
} catch (err) {
  console.error("[prerender] ERROR:", err);
  process.exit(1);
}
