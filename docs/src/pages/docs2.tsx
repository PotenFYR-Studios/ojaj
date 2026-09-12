import { CodeBlock } from "../components/bits";
import { withBase } from "../site";
import { ChevronDown } from "lucide-react";

export function CommandsPermissions() {
  return (
    <>
      <p>
        One command runs the whole plugin: <code>/onejump</code>, with the friendly alias{" "}
        <code>/ojaj</code>. Tab completion offers the three subcommands.
      </p>

      <h2 id="commands">Commands</h2>
      <div className="doc-content">
        <table>
          <thead>
            <tr>
              <th>Command</th>
              <th>Description</th>
              <th>Console</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="config-key">/onejump</td>
              <td>Prints the help menu (also <code>/ojaj</code>).</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td className="config-key">/onejump toggle</td>
              <td>
                Flips the master switch, writes it to <code>config.yml</code> and reloads the cached
                settings. Persists across restarts.
              </td>
              <td>Yes</td>
            </tr>
            <tr>
              <td className="config-key">/onejump reload</td>
              <td>
                Re-reads <code>config.yml</code> from disk and rebuilds the cached settings.
              </td>
              <td>Yes</td>
            </tr>
            <tr>
              <td className="config-key">/onejump stats</td>
              <td>
                Shows <em>your</em> tracked global-jump count. In-memory; resets on restart.
              </td>
              <td>No, players only</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="permissions">Permissions</h2>
      <div className="doc-content">
        <table>
          <thead>
            <tr>
              <th>Permission</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="config-key">onejump.admin</td>
              <td>op</td>
              <td>
                Required for <strong>every</strong> <code>/onejump</code> subcommand, including{" "}
                <code>stats</code>. Without it you get “No permission.”
              </td>
            </tr>
            <tr>
              <td className="config-key">onejump.bypass</td>
              <td>false</td>
              <td>
                Holders never <em>trigger</em> global jumps. They are still launched by everyone
                else's jumps, and it does not affect command access.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="notes">Behavior notes</h2>
      <ul>
        <li>
          The permission check happens before any subcommand dispatch; there is no public,
          permission-free usage of the plugin.
        </li>
        <li>
          <code>toggle</code> edits the real <code>config.yml</code>; if you also hand-edit the file,
          re-check the <code>enabled</code> key afterwards.
        </li>
        <li>
          <code>reload</code> re-reads configuration only. Jump counters and cooldown timers are kept
          in memory and are unaffected (cooldowns also survive, so a reload won't let players
          spam-trigger).
        </li>
        <li>
          Console output of <code>/onejump</code> uses the same help menu; <code>stats</code> answers
          “Only players can use this.”
        </li>
      </ul>
    </>
  );
}

function Faq({
  id,
  q,
  children,
}: {
  id: string;
  q: string;
  children: React.ReactNode;
}) {
  return (
    <details className="faq-item" id={id} style={{ margin: "0.7em 0" }}>
      <summary>
        {q}
        <ChevronDown size={17} className="faq-chevron" />
      </summary>
      <div className="faq-body">{children}</div>
    </details>
  );
}

export function FaqPage() {
  return (
    <>
      <p>
        Short answers first, details behind each question. The{" "}
        <a href={withBase("/docs/gameplay.html")}>gameplay page</a> documents the full mechanics.
      </p>

      <Faq id="q-spigot" q="Does it work on Spigot?">
        <p>
          No. The plugin listens on <code>PlayerJumpEvent</code>, which is a Paper API event; Spigot
          doesn't have it. Use <strong>Paper or Purpur</strong> (or any fork that ships the Paper
          API).
        </p>
      </Faq>

      <Faq id="q-notrigger" q="Why doesn't my jump trigger anything?">
        <p>Walk through the guard chain, in order:</p>
        <ol>
          <li>
            Is your world allowed? Default config whitelists only <code>world</code> and{" "}
            <code>spawn</code>: the #1 cause of “nothing happens”.
          </li>
          <li>Are you inside the 2-second cooldown from an earlier attempt?</li>
          <li>Is <code>trigger-chance</code> enabled? Failed rolls still consume the cooldown.</li>
          <li>Do you hold <code>onejump.bypass</code>? Bypassed players never trigger.</li>
          <li>Is the plugin enabled at all (<code>/onejump toggle</code> flips it)?</li>
        </ol>
      </Faq>

      <Faq id="q-fall" q="Do players take fall damage?">
        <p>
          Not by default: <code>fall-damage.cancel: true</code> cancels fall damage{" "}
          <strong>server-wide, for every entity</strong>, while the plugin is enabled. It isn't
          scoped to plugin-caused falls. Set it to <code>false</code> for vanilla damage rules.
        </p>
      </Faq>

      <Faq id="q-cascade" q="Can the chaos cascade forever?">
        <p>
          No. Everyone launched by a jump is locked out of <em>triggering</em> for 5 ticks, so the
          plugin's own launches can't cause chain reactions. Each new trigger needs a real player
          jump, after the cooldown.
        </p>
      </Faq>

      <Faq id="q-stats" q="Are stats saved?">
        <p>
          No, the jump counters live in memory and reset when the server restarts.{" "}
          <code>/onejump reload</code> does not clear them, but a reboot does.
        </p>
      </Faq>

      <Faq id="q-max" q="Is the max velocity ever used?">
        <p>
          The random roll is uniform in <code>[min, max)</code>; the upper bound is exclusive. With
          defaults 0.35–1.10 you'll get powers just under 1.10, but never 1.10 exactly.
        </p>
      </Faq>

      <Faq id="q-console" q="Can the console check stats?">
        <p>
          No, <code>/onejump stats</code> reports a personal counter, so it's players-only. The
          console can still use <code>toggle</code> and <code>reload</code>.
        </p>
      </Faq>

      <Faq id="q-alpha" q="Will the config change between versions?">
        <p>
          Possibly; the plugin is in alpha. Balancing tweaks, edge-case fixes and the occasional
          config key change are expected. Keep a backup of your tuned <code>config.yml</code> and
          read the release notes before updating.
        </p>
      </Faq>
    </>
  );
}

/* ------------------------------------------------------------------ examples */

const START_SNIPPET = `# The one fix most servers need: name your worlds.
# The default config only whitelists these two worlds.
# If yours are named anything else, nothing will happen.
worlds:
  mode: whitelist
  list:
    - world        # <- your main world's exact folder name
    - spawn`;

const PREDICTABLE_SNIPPET = `# Survival-friendly: fixed launch power, longer cooldown, 50/50 odds
velocity:
  random:
    enabled: false
  y: 0.65          # a confident hop, not a catapult

cooldown:
  seconds: 5

trigger-chance:
  enabled: true
  chance: 50

trail:
  amount: 3
  duration-ticks: 6`;

const LOBBY_SNIPPET = `# Chaos everywhere EXCEPT the lobby and minigames
worlds:
  mode: blacklist
  list:
    - lobby
    - minigames
    - event

fall-damage:
  cancel: true     # keep the soft landings in the survival worlds`;

const MAXIMUM_SNIPPET = `# The full ojaj experience. We are not responsible for your builds.
trigger-chance:
  enabled: true
  chance: 100

cooldown:
  seconds: 1

velocity:
  random:
    enabled: true
    min: 0.9
    max: 1.4       # exclusive, but who is checking

particles:
  type: end_rod
  amount: 40

trail:
  amount: 10
  duration-ticks: 40

sound:
  type: entity.firework_rocket.launch   # the real registry key
  volume: 1.0
  pitch: 1.4`;

const MESSAGES_SNIPPET = `# & color codes and %player% work in every message key
actionbar:
  message: '&e%player% made everybody jump!'

titles:
  enabled: true
  title: '&6GLOBAL JUMP'
  subtitle: '&eTriggered by %player%'
  stay: 30

broadcast:
  message: '&e%player% triggered a global jump!'`;

const COMMANDS_SNIPPET = `/onejump stats    # your personal trigger count (players only, in-memory)
/onejump toggle   # flip the plugin on/off; written back to config.yml
/onejump reload   # re-read config.yml without a restart
/ojaj             # every subcommand also works under the /ojaj alias`;

export function Examples() {
  return (
    <>
      <p>
        Every snippet below is copy-paste ready for{" "}
        <code>plugins/OneJumpAllJump/config.yml</code>: keys straight from the shipped default,
        behavior straight from the source. Run <code>/onejump reload</code> after editing; no
        restart needed.
      </p>

      <h2 id="start">Start here: fix your worlds</h2>
      <p>
        The shipped config whitelists only the worlds <code>world</code> and <code>spawn</code>.
        If your main world is named anything else, jumps silently do nothing; this is the single
        most common "the plugin is broken" report, and the fix is one line:
      </p>
      <CodeBlock code={START_SNIPPET} />

      <h2 id="predictable">Survival-friendly tuning</h2>
      <p>
        For a survival server where people actually built things: turn the random power off, slow
        the pace down, and make every second jump a coin flip instead of a certainty.
      </p>
      <CodeBlock code={PREDICTABLE_SNIPPET} />

      <h2 id="lobby">Keep lobbies and minigames safe</h2>
      <p>
        Switch the world filter to <code>blacklist</code> and the chaos applies everywhere{" "}
        <em>except</em> the listed worlds, the inverse of the whitelist default.
      </p>
      <CodeBlock code={LOBBY_SNIPPET} />

      <h2 id="maximum">Full chaos</h2>
      <p>
        Every jump triggers, everyone launches hard, and the sky fills with end-rod sparks. One
        honest detail from the source: sound keys use the registry's dotted form. The shipped
        default <code>entity_firework_rocket_launch</code> matches no key and always resolves
        through the silent fallback to the same firework sound. The dotted form below is the
        real key.
      </p>
      <CodeBlock code={MAXIMUM_SNIPPET} />

      <h2 id="messages">Custom messages</h2>
      <p>
        All message keys support legacy <code>&amp;</code> color codes and the{" "}
        <code>%player%</code> placeholder (the trigger player's name).
      </p>
      <CodeBlock code={MESSAGES_SNIPPET} />

      <h2 id="commands">Everyday commands</h2>
      <p>
        All of these need <code>onejump.admin</code> (op by default); see{" "}
        <a href={withBase("/docs/commands-permissions.html")}>commands &amp; permissions</a>.
      </p>
      <CodeBlock lang="text" code={COMMANDS_SNIPPET} />
    </>
  );
}
