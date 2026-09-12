import { Footprints, Filter, Rocket, Sparkles, ShieldCheck, Download } from "lucide-react";
import { Meteors, GlowOrb, DotPattern } from "../magicui";
import { CodeBlock } from "../components/bits";
import { Footer, Navbar } from "../components/chrome";
import { MODRINTH, REPO } from "../site";

const HERO_SNIPPET = `velocity:
  random:
    enabled: true     # every player rolls their own power
    min: 0.35
    max: 1.10         # some hop. some leave the atmosphere.

particles:
  type: end_rod
  amount: 25`;

const CHAOS_CARDS = [
  {
    icon: Footprints,
    title: "One player jumps",
    desc: "Any real jump on the server fires Paper's PlayerJumpEvent: that's the whole trigger surface.",
  },
  {
    icon: Filter,
    title: "The checks decide",
    desc: "Cooldown, trigger odds and the world whitelist/blacklist run first. Fails stay silent.",
  },
  {
    icon: Rocket,
    title: "Everyone launches",
    desc: "All online players are yeeted the same tick, each with an independent power between 0.35 and 1.10.",
  },
  {
    icon: Sparkles,
    title: "The server erupts",
    desc: "Particle bursts, synchronized sounds, GLOBAL JUMP titles, villager trails and a chat broadcast.",
  },
];

const SAFEGUARDS = [
  "5-tick re-entry lock: no infinite cascade",
  "onejump.bypass opt-out permission",
  "world whitelist / blacklist",
  "per-player trigger cooldown",
  "trigger-chance odds, 1–100",
  "fall-damage cancel (optional)",
];

const STATS = [
  { value: "1 → all", label: "players launched per jump" },
  { value: "0.35–1.10", label: "random launch power" },
  { value: "2s", label: "default trigger cooldown" },
  { value: "12", label: "config groups, all optional" },
];

export default function Landing() {
  return (
    <div className="relative min-h-screen">
      <Navbar mode="site" />

      {/* ------------------------------------------------------------ hero */}
      <section className="relative overflow-hidden">
        <DotPattern className="[mask-image:radial-gradient(750px_circle_at_50%_0,white,transparent_75%)]" />
        <GlowOrb className="-top-48 left-[8%]" color="rgba(139,92,246,0.18)" size={550} />
        <GlowOrb className="-top-40 right-[4%]" color="rgba(236,72,153,0.15)" size={500} />
        <GlowOrb className="top-24 left-1/2 -translate-x-1/2" color="rgba(249,115,22,0.12)" size={420} />
        <Meteors number={16} />

        <div className="relative z-10 mx-auto max-w-5xl px-6 pb-20 pt-24 text-center sm:pt-28">
          <p
            className="hero-in mb-6 inline-flex items-center gap-2.5 rounded-full border border-line-light bg-white/[0.03] px-3.5 py-1.5 font-mono text-[0.72em] uppercase tracking-[0.14em] text-[#9aa0b4] backdrop-blur-md"
            style={{ animationDelay: "0s" }}
          >
            <span className="pulse-dot" />
            v0.1.0-alpha · Paper / Purpur · MC 26.1+
          </p>

          <h1
            className="hero-in grad-text-launch mx-auto max-w-3xl text-[clamp(2.6em,6vw,4em)] font-extrabold leading-[1.08] tracking-tight"
            style={{ animationDelay: "0.1s" }}
          >
            One jump. Everybody jumps.
          </h1>

          <p
            className="hero-in mx-auto mt-6 max-w-[720px] text-[1.04em] leading-[1.75] text-[#9aa0b4]"
            style={{ animationDelay: "0.2s" }}
          >
            OneJumpAllJump is a chaotic Paper plugin with a simple premise: a single player jumps,
            and the <strong className="font-semibold text-[#e8eaf2]">entire server</strong> is
            launched with them: random launch power, particles, sounds and titles included. Fully
            configurable chaos, down to the tenth of a tick.
          </p>

          <div
            className="hero-in mt-9 flex flex-wrap items-center justify-center gap-3.5"
            style={{ animationDelay: "0.3s" }}
          >
            <a className="btn btn-primary" href="/docs/getting-started.html">
              Get started
            </a>
            <a className="btn btn-ghost" href={MODRINTH} target="_blank" rel="noopener">
              <Download size={15} /> Download on Modrinth
            </a>
          </div>

          <div
            className="hero-in mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-3.5 sm:grid-cols-4"
            style={{ animationDelay: "0.4s" }}
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-center backdrop-blur-md transition-transform hover:-translate-y-0.5"
              >
                <div className="grad-text font-mono text-2xl font-extrabold sm:text-3xl">{s.value}</div>
                <div className="mt-1 text-[11.5px] uppercase tracking-[1.4px] text-[#9aa0b4]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------- how the chaos works */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <p className="eyebrow eyebrow-orange mb-3 text-center">How the chaos works</p>
        <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-white">
          Trigger. Check. Launch. Erupt.
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-[0.92em] text-[#9aa0b4]">
          Every global jump follows the same chain: documented, predictable chaos.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CHAOS_CARDS.map((c) => (
            <div key={c.title} className="doc-card">
              <div className="card-icon">
                <c.icon size={20} />
              </div>
              <h3 className="text-[0.98em] font-semibold text-white">{c.title}</h3>
              <p className="text-[0.83em] leading-[1.55] text-[#9aa0b4]">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          <ShieldCheck size={16} className="text-[#34d399]" />
          {SAFEGUARDS.map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------ config peek */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow eyebrow-orange mb-3">Tuned by hand</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              Chaos with an off-ramp
            </h2>
            <p className="mt-4 max-w-lg text-[0.95em] leading-[1.75] text-[#9aa0b4]">
              Every dial is in one <code className="rounded border border-line bg-[rgba(139,92,246,0.1)] px-1.5 py-0.5 font-mono text-[0.85em] text-[#d8ccfe]">config.yml</code>{" "}
              Launch power, cooldowns, odds, worlds, particles, sounds, titles and broadcasts.
              Whitelist your survival world, blacklist the lobby, and reload live with{" "}
              <code className="rounded border border-line bg-[rgba(139,92,246,0.1)] px-1.5 py-0.5 font-mono text-[0.85em] text-[#d8ccfe]">/onejump reload</code>.
            </p>
            <ul className="mt-6 space-y-2 text-[0.9em] text-[#b9bfd4]">
              <li>• World whitelist / blacklist: chaos only where you want it</li>
              <li>• Per-player cooldown + trigger chance for pacing</li>
              <li>• Cached config: zero per-jump file reads</li>
            </ul>
            <a className="btn btn-ghost btn-sm mt-8" href="/docs/configuration.html">
              Read the config reference →
            </a>
          </div>
          <CodeBlock code={HERO_SNIPPET} />
        </div>
      </section>

      {/* ------------------------------------------------------- bottom CTA */}
      <section className="relative z-10 py-20 text-center">
        <div className="relative z-10 mx-auto max-w-2xl px-6">
          <h2 className="grad-text text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ready to launch?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[0.95em] text-[#9aa0b4]">
            Five-minute install, zero client requirements. One rule though: maybe don't build your
            base over the void.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <a className="btn btn-primary" href="/docs/getting-started.html">
              Install the plugin
            </a>
            <a className="btn btn-ghost" href={REPO} target="_blank" rel="noopener">
              View the source
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
