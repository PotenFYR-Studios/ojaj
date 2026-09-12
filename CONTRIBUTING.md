# Contributing to OneJumpAllJump

Thanks for helping make the server jump! This repo has two buildable parts:

| Part | Path | Toolchain |
|---|---|---|
| Plugin | `pom.xml` | Java 21, Maven |
| Docs site | `docs/` | Bun 1.1+, Vite 6, React 18, Tailwind CSS 4, TypeScript |

## Plugin (Java)

```bash
# build the jar (requires JDK 21+)
mvn package

# output: target/OneJumpAllJump-1.0-ALPHA.jar
```

The only dependency is `paper-api` (provided scope, from the PaperMC repo), so the build needs
no secrets or extra setup.

To test changes, drop the built jar into a local Paper/Purpur 26.1+ server's `plugins/` folder
and restart. A common pattern is pointing a test server's `plugins/` at your build output,
please don't commit test-server files (the repo's `.gitignore` already excludes `run/` and
`testserver/`).

### Code style

- Follow the formatting of the surrounding code (the codebase is deliberately airy; one
  statement per line, generous vertical spacing)
- Keep config values cached in `ConfigManager`/`CachedSettings`; don't add per-event file reads
- New config keys must be added to `config.yml` (with comments) **and** `CachedSettings`
- Document real behavior in the docs site when you change mechanics

## Docs site

```bash
cd docs
bun install
bun run build     # type-checks, builds and prerenders to docs/dist/
bun run dev       # local dev server with hot reload (port 5175)
```

Preview the production build with clean-URL support (extensionless routes like `/about` and
`/examples` resolve to their `.html` files, matching the directory twins the build emits):

```bash
python3 docs/dev-server.py 4180   # serves docs/dist/ at http://127.0.0.1:4180
```

The site is a Vite multi-page app: every route (landing, `/docs/*`, `/about`) gets its own
static HTML shell with unique SEO meta. When adding a page:

1. Add its metadata (route, title, description, TOC headings) to `docs/src/site.ts`
2. Build the content as a React component under `docs/src/pages/`
3. Wire it into `docs/src/App.tsx`
4. Add the route to `docs/public/sitemap.xml`

Design follows the PotenFYR Studios docs design system: deep-navy `#0b0d14` surfaces,
violet/pink/orange gradients, Fira Code micro-labels, glass cards. Don't introduce new palette
values.

## Issues

Before opening an issue, please check the
[FAQ](https://ojaj.docs.potenfyr.in/docs/faq.html), especially the world-name gotcha (default
config only whitelists the worlds `world` and `spawn`). Use the issue templates:

- **Bug report**: include server software + version, plugin version and steps to reproduce
- **Feature request**: describe the gameplay problem, not just the solution
- **Question**: gameplay/config questions are welcome
- **Documentation**: typos, unclear docs, missing pages

## Pull requests

1. Fork the repo and create a feature branch from `master`
2. Keep PRs focused: one feature or fix per PR
3. Verify `mvn package` succeeds (and `bun run build` for docs changes) before opening
4. Describe what changed and why; link any related issues
5. Config/mechanics changes should update `docs/src/pages/docs*.tsx` and `config.yml` in the
   same PR

## Licensing

By contributing, you agree that your contributions are licensed under the project's Apache-2.0 with Commons Clause license that
covers this repository.
