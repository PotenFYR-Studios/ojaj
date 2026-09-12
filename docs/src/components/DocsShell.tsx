import { useEffect, useMemo, useRef, useState } from "react";
import { Search, ChevronLeft, ChevronRight, ChevronDown, X } from "lucide-react";
import { DOC_PAGES, type Heading, type PageMeta, pageById } from "../site";
import { Footer, Navbar } from "./chrome";

const groups: { label: string; ids: string[] }[] = [
  { label: "Get started", ids: ["getting-started"] },
  { label: "Mechanics", ids: ["gameplay"] },
  { label: "Reference", ids: ["configuration", "commands-permissions", "faq", "examples", "license"] },
];

const href = (p: PageMeta) => `/${p.file}`;

function pageHref(id: string): string {
  const p = pageById(id);
  return p ? href(p) : "/docs/index.html";
}

/* ------------------------------------------------- collapsible sidebar group */
function SidebarGroup({
  group,
  current,
  onNav,
}: {
  group: { label: string; ids: string[] };
  current: string;
  onNav: () => void;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-lg px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#6a7089] transition-colors hover:text-[#9aa0b4]"
      >
        {group.label}
        <ChevronDown size={12} className={`transition-transform ${open ? "" : "-rotate-90"}`} />
      </button>
      {open && (
        <>
          {group.ids.map((id) => {
            const p = pageById(id)!;
            const active = id === current;
            return (
              <a
                key={id}
                href={href(p)}
                onClick={onNav}
                aria-current={active ? "page" : undefined}
                className={`rounded-lg px-3 py-1.5 text-[13px] transition-colors ${
                  active
                    ? "bg-brand-violet/15 text-white shadow-[inset_0_0_0_1px_rgba(139,92,246,.4)]"
                    : "text-[#9aa0b4] hover:bg-white/5 hover:text-[#e8eaf2]"
                }`}
              >
                {shortTitle(id)}
              </a>
            );
          })}
          {group.label !== "Reference" && <div className="pb-2 pt-2" />}
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ sidebar */
function Sidebar({ current, open, onClose }: { current: string; open: boolean; onClose: () => void }) {
  return (
    <aside
      className={`${
        open ? "flex" : "hidden"
      } sidebar-scroll md:flex sticky top-14 h-[calc(100vh-3.5rem)] w-60 shrink-0 flex-col gap-1 overflow-y-auto border-r border-line-light/60 px-3 py-6 max-md:fixed max-md:inset-y-14 max-md:left-0 max-md:z-30 max-md:bg-[#0b0d14]/98`}
    >
      <button
        type="button"
        onClick={onClose}
        className="mb-2 self-end text-[#9aa0b4] md:hidden"
        aria-label="Close sidebar"
      >
        <X size={16} />
      </button>
      {groups.map((g) => (
        <SidebarGroup key={g.label} group={g} current={current} onNav={onClose} />
      ))}
    </aside>
  );
}

function shortTitle(id: string): string {
  switch (id) {
    case "getting-started":
      return "Getting started";
    case "gameplay":
      return "Gameplay & mechanics";
    case "configuration":
      return "Configuration";
    case "commands-permissions":
      return "Commands & permissions";
    case "faq":
      return "FAQ";
    case "examples":
      return "Examples";
    case "license":
      return "License";
    default:
      return id;
  }
}

/* ---------------------------------------------------------------------- toc */
function Toc({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState("");
  useEffect(() => {
    if (!headings.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) setActive(en.target.id);
        }
      },
      { rootMargin: "-80px 0px -65% 0px" },
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [headings]);

  if (!headings.length) return null;
  return (
    <nav
      className="sidebar-scroll sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-l border-line-light/60 px-4 py-6 xl:block"
      aria-label="On this page"
    >
      <p className="grad-text mb-3 text-[10px] font-bold uppercase tracking-[0.14em]">On this page</p>
      <ul className="space-y-0.5">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              aria-current={active === h.id ? "location" : undefined}
              className={`toc-item block border-l-2 py-1 text-[12px] leading-snug transition-colors ${
                active === h.id ? "active" : "border-line text-[#9aa0b4]"
              } hover:text-[#e8eaf2]`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ------------------------------------------------------------------ palette */
function Palette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
  }, [open]);
  if (!open) return null;

  const pageItems = [
    ...DOC_PAGES.map((p) => ({ label: shortTitle(p.id), target: href(p), kind: "page" as const })),
    { label: "About this project", target: "/about.html", kind: "page" as const },
  ];
  const sectionItems = DOC_PAGES.flatMap((p) =>
    p.headings.map((h) => ({ label: `${shortTitle(p.id)}: ${h.text}`, target: `${href(p)}#${h.id}`, kind: "section" as const })),
  );
  const all = [...pageItems, ...sectionItems]
    .filter((i) => i.label.toLowerCase().includes(q.toLowerCase()))
    .slice(0, 14);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-28 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-label="Search documentation"
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-[#101320] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search the docs…"
          className="w-full border-b border-line-light bg-transparent px-4 py-3.5 text-sm text-white outline-none placeholder:text-[#6a7089]"
          onKeyDown={(e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "Enter" && all[0]) {
              onClose();
              location.href = all[0].target;
            }
          }}
        />
        <div className="max-h-80 overflow-y-auto p-2">
          {all.map((i, idx) => (
            <a
              key={idx}
              href={i.target}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] ${
                idx === 0 ? "bg-brand-violet/15 text-white" : "text-[#9aa0b4] hover:bg-white/5"
              }`}
            >
              <span className="font-mono text-[10px] text-[#6a7089]">{i.kind === "section" ? "§" : "→"}</span>
              {i.label}
            </a>
          ))}
          {!all.length && (
            <div className="px-3 py-6 text-center text-xs text-[#6a7089]">No matches</div>
          )}
        </div>
        <div className="border-t border-line-light px-4 py-2 font-mono text-[10px] text-[#6a7089]">
          ↑↓ navigate · Enter open · Esc close
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- pagination */
function Pagination({ current }: { current: string }) {
  const i = DOC_PAGES.findIndex((p) => p.id === current);
  if (i < 0) return null;
  const prev = DOC_PAGES[i - 1];
  const next = DOC_PAGES[i + 1];
  return (
    <nav className="mt-16 flex items-stretch justify-between gap-4">
      {prev ? (
        <a
          href={href(prev)}
          className="group flex-1 rounded-xl border border-line-light bg-white/[0.02] p-4 transition-all hover:-translate-y-0.5 hover:border-brand-violet/50"
        >
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#6a7089]">
            <ChevronLeft size={11} /> Previous
          </span>
          <strong className="mt-1 block text-sm font-semibold text-[#e8eaf2] group-hover:text-[#c4b5fd]">
            {shortTitle(prev.id)}
          </strong>
        </a>
      ) : (
        <span className="flex-1" />
      )}
      {next ? (
        <a
          href={href(next)}
          className="group flex-1 rounded-xl border border-line-light bg-white/[0.02] p-4 text-right transition-all hover:-translate-y-0.5 hover:border-brand-pink/50"
        >
          <span className="flex items-center justify-end gap-1 text-[10px] font-bold uppercase tracking-widest text-[#6a7089]">
            Next <ChevronRight size={11} />
          </span>
          <strong className="mt-1 block text-sm font-semibold text-[#e8eaf2] group-hover:text-[#f9a8d4]">
            {shortTitle(next.id)}
          </strong>
        </a>
      ) : (
        <span className="flex-1" />
      )}
    </nav>
  );
}

/* ---------------------------------------------------------------- docs shell */
export function DocsShell({
  current,
  children,
}: {
  current: string;
  children: React.ReactNode;
}) {
  const page = pageById(current)!;
  const headings = useMemo(() => page?.headings ?? [], [page]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      const i = DOC_PAGES.findIndex((p) => p.id === current);
      if (i >= 0) {
        if (e.key === "]" && DOC_PAGES[i + 1]) location.href = pageHref(DOC_PAGES[i + 1].id);
        if (e.key === "[" && DOC_PAGES[i - 1]) location.href = pageHref(DOC_PAGES[i - 1].id);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [current]);

  const isPortal = current === "docs";
  const groupLabel = groups.find((g) => g.ids.includes(current))?.label;

  return (
    <div className="relative min-h-screen">
      <Navbar mode="docs" />
      <Palette open={searchOpen} onClose={() => setSearchOpen(false)} />

      {isPortal ? (
        <main className="relative z-10 mx-auto max-w-6xl px-6 py-16">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-line-light bg-white/[0.03] px-3.5 py-1 font-mono text-xs text-[#9aa0b4] backdrop-blur-md">
            ojaj docs
          </p>
          <h1 className="grad-text mb-3 text-4xl font-extrabold tracking-tight">Documentation</h1>
          <p className="mb-10 max-w-xl text-[15px] text-[#9aa0b4]">{page.description}</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DOC_PAGES.map((p) => (
              <a
                key={p.id}
                href={href(p)}
                className="group relative overflow-hidden rounded-2xl border border-line-light bg-white/[0.02] p-5 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-brand-violet/50 hover:shadow-[0_12px_40px_rgba(0,0,0,.5)]"
              >
                <h3 className="mb-1.5 text-[15px] font-semibold text-white group-hover:text-[#c4b5fd]">
                  {shortTitle(p.id)}
                </h3>
                <p className="line-clamp-3 text-xs leading-relaxed text-[#9aa0b4]">{p.description}</p>
              </a>
            ))}
          </div>
        </main>
      ) : (
        <div className="relative z-10 mx-auto flex max-w-full items-start">
          <Sidebar current={current} open={menuOpen} onClose={() => setMenuOpen(false)} />
          <div className="flex min-w-0 flex-1 justify-center">
            <main className="min-w-0 max-w-6xl flex-1 px-8 py-10 max-[900px]:px-5">
              <header className="mb-8 border-b border-line-light pb-6">
                <nav
                  aria-label="Breadcrumb"
                  className="mb-2 flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-[#6a7089]"
                >
                  <a href="/docs/index.html" className="transition-colors hover:text-[#c4b5fd]">
                    Docs
                  </a>
                  {groupLabel && (
                    <>
                      <span className="text-line-light">/</span>
                      <span>{groupLabel}</span>
                    </>
                  )}
                </nav>
                <h1 className="grad-text text-3xl font-extrabold tracking-tight">
                  {shortTitle(current)}
                </h1>
              </header>
              <article className="doc-content" style={{ display: "block" }}>
                {children}
              </article>
              <Pagination current={current} />
            </main>
            <Toc headings={headings} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
