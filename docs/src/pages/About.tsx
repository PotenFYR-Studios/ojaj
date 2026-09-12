import { Footer, Navbar } from "../components/chrome";
import { DotPattern } from "../magicui";
import { MODRINTH, ORG, REPO, WEBSITE } from "../site";

export default function About() {
  return (
    <div className="relative min-h-screen">
      <Navbar mode="site" />
      <DotPattern className="[mask-image:radial-gradient(750px_circle_at_50%_0,white,transparent_75%)]" />

      <main className="relative z-10 mx-auto max-w-3xl px-6 pb-16 pt-20">
        <p className="eyebrow eyebrow-orange mb-3">About the project</p>
        <h1 className="grad-text text-4xl font-extrabold tracking-tight sm:text-5xl">
          One jump. One plugin. One studio.
        </h1>

        <div className="doc-content mt-8">
          <p>
            <strong>OneJumpAllJump</strong> (<code>ojaj</code>) started as the answer to a question
            no sane admin has ever asked: <em>what if a jump was everyone's problem?</em> The result
            is a server-side Minecraft plugin where a single player's jump launches every player
            online: with random launch power, particles, synchronized sounds, titles and a chat
            broadcast, all governed by cooldowns, odds and world filters.
          </p>
          <p>
            It is deliberately small (one listener, one command, one config) and deliberately chaos.
            The plugin is in <strong>alpha</strong>; balancing and config surfaces may still change
            between releases.
          </p>

          <h2 id="potenfyr">PotenFYR Studios</h2>
          <p>
            ojaj is maintained by{" "}
            <a href={WEBSITE} target="_blank" rel="noopener">
              PotenFYR Studios
            </a>
            , a creative hub for game development, hosting infrastructure, automation tools and
            community-driven open-source projects, from Minecraft plugins and Fabric frameworks to
            Pterodactyl/Pelican eggs and API security.
          </p>

          <h2 id="links">Links</h2>
          <ul>
            <li>
              Source code:{" "}
              <a href={REPO} target="_blank" rel="noopener">
                github.com/PotenFYR-Studios/ojaj
              </a>{" "}
              (Apache-2.0 with the Commons Clause; see the repo's{" "}
              <a href={`${REPO}/blob/master/LICENSE`} target="_blank" rel="noopener">
                LICENSE
              </a>
              )
            </li>
            <li>
              Downloads:{" "}
              <a href={MODRINTH} target="_blank" rel="noopener">
                Modrinth: One Jump All Jump
              </a>
            </li>
            <li>
              Organization:{" "}
              <a href={ORG} target="_blank" rel="noopener">
                github.com/PotenFYR-Studios
              </a>
            </li>
            <li>
              Support: the{" "}
              <a href="https://discord.com/invite/zUaN2FPBec" target="_blank" rel="noopener">
                PotenFYR Discord
              </a>{" "}
              or{" "}
              <a href={`${REPO}/issues`} target="_blank" rel="noopener">
                GitHub Issues
              </a>
            </li>
          </ul>

          <h2 id="credits">Credits</h2>
          <p>
            Developed by PotenFYR Studios; plugin.yml credits <code>dashutosh04</code> as author.
            Built for chaotic multiplayer gameplay, and for everyone who has ever wanted physics to
            be a group activity.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
