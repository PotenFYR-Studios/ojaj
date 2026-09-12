import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { DISCORD, MODRINTH, ORG, WEBSITE, withBase } from "../site";

/**
 * 56px sticky navbar (SPEC §5.1). `mode="docs"` renders the ojaj.docs topbar
 * used inside the documentation layout; `mode="site"` the landing navbar.
 */
export function Navbar({ mode }: { mode: "site" | "docs" }) {
  const [open, setOpen] = useState(false);

  // close the mobile dropdown whenever the route changes
  useEffect(() => {
    const onNav = () => setOpen(false);
    window.addEventListener("popstate", onNav);
    return () => window.removeEventListener("popstate", onNav);
  }, []);

  return (
    <header className="sticky top-0 z-500 flex h-14 items-center gap-3.5 border-b border-line-light bg-[#0b0d14]/72 px-5 backdrop-blur-[14px] saturate-150 max-[900px]:gap-2">
      <a href={withBase("/")} className="flex shrink-0 items-center gap-2.5" aria-label="OneJumpAllJump home">
        <img
          src={withBase("/favicon.png")}
          alt=""
          width={24}
          height={24}
          className="h-6 w-6 rounded-full drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]"
        />
        <span className="font-mono text-[0.95em] font-bold text-white">
          ojaj<span className="bg-gradient-to-r from-[#c4b5fd] to-[#f9a8d4] bg-clip-text text-transparent">.</span>
          {mode === "docs" ? "docs" : ""}
        </span>
      </a>

      {mode === "docs" && (
        <>
          <span className="text-line-light">|</span>
          <a
            href={withBase("/docs/index.html")}
            className="font-mono text-[0.72em] uppercase tracking-[0.15em] text-[#6a7089] transition-colors hover:text-[#c4b5fd]"
          >
            Docs
          </a>
          <span className="text-line-light">|</span>
          <a
            href={withBase("/license.html")}
            className="font-mono text-[0.72em] uppercase tracking-[0.15em] text-[#6a7089] transition-colors hover:text-[#c4b5fd]"
          >
            License
          </a>
        </>
      )}

      {mode === "site" && (
        <nav className="ml-2 hidden items-center gap-1 md:flex" aria-label="Primary">
          <NavDropLink href="/docs/gameplay.html">Gameplay</NavDropLink>
          <NavDropLink href="/docs/configuration.html">Configuration</NavDropLink>
          <NavDropLink href="/examples.html">Examples</NavDropLink>
          <NavDropLink href="/docs/faq.html">FAQ</NavDropLink>
          <NavDropLink href="/license.html">License</NavDropLink>
          <NavDropLink href="/about.html">About</NavDropLink>
        </nav>
      )}

      <div className="ml-auto hidden items-center gap-5 text-xs sm:flex">
        <a href={WEBSITE} target="_blank" rel="noopener" className="text-[#9aa0b4] transition-colors hover:text-[#c4b5fd]">
          Website
        </a>
        <a href={MODRINTH} target="_blank" rel="noopener" className="text-[#9aa0b4] transition-colors hover:text-[#c4b5fd]">
          Modrinth
        </a>
        <a href={DISCORD} target="_blank" rel="noopener" className="text-[#9aa0b4] transition-colors hover:text-[#c4b5fd]">
          Discord
        </a>
        <a href={ORG} target="_blank" rel="noopener" className="text-[#9aa0b4] transition-colors hover:text-white">
          GitHub
        </a>
      </div>

      <button
        type="button"
        className="ml-auto text-[#9aa0b4] transition-colors hover:text-white sm:hidden"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Toggle navigation menu"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-14 z-40 flex flex-col gap-1 border-b border-line-light bg-[#0b0d14]/98 px-5 py-4 backdrop-blur-md sm:hidden">
          <NavDropLink href="/docs/index.html">Docs</NavDropLink>
          <NavDropLink href="/docs/gameplay.html">Gameplay</NavDropLink>
          <NavDropLink href="/docs/configuration.html">Configuration</NavDropLink>
          <NavDropLink href="/examples.html">Examples</NavDropLink>
          <NavDropLink href="/docs/faq.html">FAQ</NavDropLink>
          <NavDropLink href="/license.html">License</NavDropLink>
          <NavDropLink href="/about.html">About</NavDropLink>
          <NavDropLink href={WEBSITE} ext>Website</NavDropLink>
          <NavDropLink href={MODRINTH} ext>Modrinth</NavDropLink>
          <NavDropLink href={DISCORD} ext>Discord</NavDropLink>
          <NavDropLink href={ORG} ext>GitHub</NavDropLink>
        </div>
      )}
    </header>
  );
}

function NavDropLink({
  href,
  children,
  ext,
}: {
  href: string;
  children: React.ReactNode;
  ext?: boolean;
}) {
  return (
    <a
      href={withBase(href)}
      {...(ext ? { target: "_blank", rel: "noopener" } : {})}
      className="rounded-[7px] px-2.5 py-1.5 text-[0.84em] font-medium text-[#9aa0b4] transition-colors hover:bg-white/5 hover:text-white"
    >
      {children}
    </a>
  );
}

/** Full-bleed footer, 3 zones (SPEC §5.2). */
export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line-light bg-[#0e111d]/60">
      <div className="mx-auto max-w-[1280px] px-6 py-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="font-mono text-sm font-bold text-white">
              ojaj
              <span className="bg-gradient-to-r from-[#c4b5fd] to-[#f9a8d4] bg-clip-text text-transparent">.</span>
            </div>
            <p className="mt-1 max-w-[420px] text-[0.8em] text-[#9aa0b4]">
              One jump launches the entire server. Crafted chaos for Paper &amp; Purpur servers.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5 font-mono text-[0.78em] text-[#9aa0b4]">
            <a href={ORG} target="_blank" rel="noopener" className="transition-colors hover:text-white">
              GitHub Org
            </a>
            <a href={WEBSITE} target="_blank" rel="noopener" className="transition-colors hover:text-white">
              potenfyr.in
            </a>
            <a href={DISCORD} target="_blank" rel="noopener" className="transition-colors hover:text-white">
              Support Discord
            </a>
            <a href={MODRINTH} target="_blank" rel="noopener" className="transition-colors hover:text-white">
              Modrinth
            </a>
            <a href={withBase("/examples.html")} className="transition-colors hover:text-white">
              Examples
            </a>
            <a href={withBase("/license.html")} className="transition-colors hover:text-white">
              License
            </a>
            <a href={withBase("/docs/index.html")} className="text-[#a78bfa] hover:underline">
              Docs
            </a>
          </div>
        </div>
        <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-line-light pt-4 text-[0.75em] text-[#6a7089] sm:flex-row">
          <span>&copy; 2026 PotenFYR Studios. Released under Apache-2.0 with the Commons Clause.</span>
          <span>Crafted with &hearts; for chaotic Minecraft servers</span>
        </div>
      </div>
    </footer>
  );
}
