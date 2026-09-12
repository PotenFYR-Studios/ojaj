import { CodeBlock, ConfigTable } from "../components/bits";

const FULL_CONFIG = `# OneJumpAllJump: default config.yml (generated on first run)
enabled: true            # master toggle

cooldown:
  seconds: 2             # per-player trigger cooldown

velocity:
  y: 0.42                # vanilla jump ≈ 0.42
  random:
    enabled: true
    min: 0.35
    max: 1.10            # upper bound is exclusive

trigger-chance:
  enabled: false
  chance: 100            # percent (1-100)

fall-damage:
  cancel: true           # cancels fall damage while enabled

particles:
  enabled: true
  type: end_rod          # any Minecraft particle ID
  amount: 25

trail:
  enabled: true
  particle: happy_villager
  amount: 5              # particles per tick
  duration-ticks: 10     # 20 ticks = 1 second

sound:
  enabled: true
  type: entity_firework_rocket_launch
  volume: 1.0
  pitch: 1.2

actionbar:
  enabled: true
  message: '&e%player% made everybody jump!'

titles:
  enabled: true
  title: '&6GLOBAL JUMP'
  subtitle: '&eTriggered by %player%'
  fadein: 5
  stay: 30
  fadeout: 10

broadcast:
  enabled: true
  message: '&e%player% triggered a global jump!'

worlds:
  mode: whitelist        # whitelist or blacklist
  list:
    - world
    - spawn`;

export function GettingStarted() {
  return (
    <>
      <p>
        OneJumpAllJump (short: <strong>ojaj</strong>) is a server-side plugin with one job: when a
        player jumps, every player on the server is launched with them. This page gets it running in
        under five minutes.
      </p>

      <h2 id="requirements">Requirements</h2>
      <ul>
        <li>
          <strong>Paper or Purpur</strong>: the plugin listens on Paper's <code>PlayerJumpEvent</code>,
          which Spigot does not provide. Forks that ship the Paper API work too.
        </li>
        <li>
          <strong>Minecraft 26.1+</strong>: the published builds target 26.1, 26.1.1 and 26.1.2
          (the plugin is compiled against the Paper 1.21 API, <code>api-version: 1.21</code>).
        </li>
        <li>
          <strong>Java 21+</strong>: the jar is compiled for Java 21; any JVM that runs your server
          already qualifies.
        </li>
        <li>
          <strong>Server-side only</strong>: players need no mod, resource pack or client change.
        </li>
      </ul>

      <h2 id="install">Install from Modrinth</h2>
      <ol>
        <li>
          Grab the latest <code>.jar</code> from the{" "}
          <a href="https://modrinth.com/plugin/onejumpalljump" target="_blank" rel="noopener">
            Modrinth project page
          </a>{" "}
          (or install it straight through the Modrinth App / your panel's Modrinth integration).
        </li>
        <li>
          Drop the jar into your server's <code>plugins/</code> folder.
        </li>
        <li>Restart the server. A default <code>plugins/OneJumpAllJump/config.yml</code> is generated on first enable.</li>
      </ol>

      <h2 id="first-jump">Your first global jump</h2>
      <p>
        Join the server, walk into an allowed world (see the gotcha below) and jump. Everyone online
        gets launched, and you should see the default title, action bar and chat broadcast:
      </p>
      <CodeBlock lang="text" code={`GLOBAL JUMP                     <- title
<dash> made everybody jump!         <- action bar
dash triggered a global jump!    <- broadcast`} />
      <p>
        As an operator you can check your personal counter and control the plugin at any time:
      </p>
      <CodeBlock lang="text" code={`/onejump stats    # tracked jumps for you
/onejump toggle   # flip the plugin on/off
/onejump reload   # re-read config.yml`} />

      <h2 id="world-gotcha">The world-name gotcha</h2>
      <blockquote>
        <p>
          The default config ships with <code>worlds.mode: whitelist</code> and the list{" "}
          <code>[world, spawn]</code>. <strong>If your world is named anything else, nothing will
          happen.</strong> Either add your world to <code>worlds.list</code> or switch to{" "}
          <code>mode: blacklist</code>, then run <code>/onejump reload</code>.
        </p>
      </blockquote>

      <h2 id="where-next">Where to next</h2>
      <ul>
        <li>
          <a href="/docs/gameplay.html">Gameplay &amp; mechanics</a>: the exact trigger chain, launch
          math and safeguards.
        </li>
        <li>
          <a href="/docs/configuration.html">Configuration</a>: every key in <code>config.yml</code>{" "}
          documented.
        </li>
        <li>
          <a href="/docs/commands-permissions.html">Commands &amp; permissions</a>: everything{" "}
          <code>/onejump</code> can do.
        </li>
      </ul>
      <blockquote>
        <p>
          OneJumpAllJump is in <strong>alpha</strong>. Expect balancing tweaks, edge-case bugs and the
          occasional config change between versions; feedback and testing are very welcome on{" "}
          <a href="https://github.com/PotenFYR-Studios/ojaj/issues" target="_blank" rel="noopener">
            GitHub Issues
          </a>
          .
        </p>
      </blockquote>
    </>
  );
}

export function Gameplay() {
  return (
    <>
      <p>
        This page documents exactly what the plugin does on every jump: no hand-waving. Everything
        below is the real behavior of the current alpha.
      </p>

      <h2 id="trigger">The trigger</h2>
      <p>
        The plugin listens to <code>PlayerJumpEvent</code>, a <strong>Paper API</strong> event that
        fires when a player actually jumps (not when they sprint, step or fall). That single event is
        the only trigger in the whole plugin; there are no commands, redstone or timers involved.
      </p>

      <h2 id="checks">The checks, in order</h2>
      <p>
        Before the server launches, the jumping player runs through a guard chain. The first failing
        check stops everything silently:
      </p>
      <ol>
        <li>
          <strong>Master toggle</strong>: <code>enabled: false</code> disables the plugin entirely.
        </li>
        <li>
          <strong>Re-entry lock</strong>: if you were <em>launched</em> within the last 5 ticks, your
          own jump can't start a new chain. This is what stops the chaos from feeding on itself.
        </li>
        <li>
          <strong>Bypass permission</strong>: players with <code>onejump.bypass</code> never trigger
          global jumps (they still get launched by everyone else).
        </li>
        <li>
          <strong>World filter</strong>: in <code>whitelist</code> mode jumps only count inside the
          listed worlds; in <code>blacklist</code> mode they count everywhere <em>except</em> the
          listed worlds.
        </li>
        <li>
          <strong>Cooldown</strong>: the jumping player must have waited <code>cooldown.seconds</code>{" "}
          (default 2s) since their last <em>attempt</em>. The cooldown starts even if the next check
          fails.
        </li>
        <li>
          <strong>Trigger chance</strong>: when enabled, a roll of 1–100 must be{" "}
          <code>&lt;= trigger-chance.chance</code>. Failed rolls still consume the cooldown, so a
          streak of bad luck is possible by design.
        </li>
      </ol>

      <h2 id="launch">The launch</h2>
      <p>
        Once a trigger passes, <strong>every online player</strong>, including the jumper, gets
        their vertical velocity replaced in the same tick:
      </p>
      <ul>
        <li>
          Fixed mode: <code>velocity.y</code> for everyone (the vanilla jump is ≈ <code>0.42</code>).
        </li>
        <li>
          Random mode (default): each player rolls an independent value in{" "}
          <code>[velocity.random.min, velocity.random.max)</code>. Note the upper bound is{" "}
          <em>exclusive</em>; with the defaults 0.35–1.10, some players hop and some nearly leave
          atmosphere.
        </li>
        <li>Horizontal momentum is preserved; only the Y component changes.</li>
      </ul>

      <h2 id="spectacle">The spectacle</h2>
      <p>Each launched player also gets, per jump:</p>
      <ul>
        <li>
          <strong>Particles</strong>: a burst of <code>particles.amount</code> particles roughly one
          block above their feet.
        </li>
        <li>
          <strong>Sound</strong>: <code>sound.type</code> played at their location with the configured
          volume and pitch.
        </li>
        <li>
          <strong>Action bar</strong>: <code>actionbar.message</code> with{" "}
          <code>%player%</code> replaced by the trigger's name.
        </li>
        <li>
          <strong>Title + subtitle</strong>: with the same placeholder and configured fade timings.
        </li>
        <li>
          <strong>Trail</strong>: a repeating task spawns <code>trail.amount</code> particles per tick
          for <code>trail.duration-ticks</code> ticks, and stops early if the player logs off.
        </li>
      </ul>
      <p>
        Finally one <strong>chat broadcast</strong> goes out to everyone announcing who started it.
      </p>

      <h2 id="safeguards">Built-in safeguards</h2>
      <ul>
        <li>
          <strong>No infinite cascade</strong>: the 5-tick re-entry lock means plugin-launched
          players can't immediately re-trigger.
        </li>
        <li>
          <strong>Opt-out</strong>: <code>onejump.bypass</code> removes a player from the trigger
          pool entirely.
        </li>
        <li>
          <strong>Scope</strong>: world whitelist/blacklist keeps the chaos out of lobbies, events
          or minigames.
        </li>
        <li>
          <strong>Soft landings</strong>: with <code>fall-damage.cancel: true</code> (the default)
          the plugin cancels <em>fall damage events server-wide</em>: for every entity, not only
          damage from its own launches. Set it to <code>false</code> if you want vanilla fall damage
          back.
        </li>
      </ul>

      <h2 id="stats">Stats &amp; persistence</h2>
      <p>
        Every successful trigger credits +1 to the jumping player's counter (launched players don't
        earn stats for being yeeted). Counters live in memory only; <strong>they reset when the
        server restarts</strong>. <code>/onejump reload</code> does not clear them.
      </p>

      <h2 id="formatting">Colors &amp; placeholders</h2>
      <p>
        Messages (<code>actionbar.message</code>, <code>titles.title</code>,{" "}
        <code>titles.subtitle</code>, <code>broadcast.message</code>) support legacy{" "}
        <code>&amp;</code> color codes and the <code>%player%</code> placeholder. Invalid{" "}
        <code>particles.type</code> / <code>sound.type</code> IDs fall back silently to{" "}
        <code>end_rod</code> and <code>entity_firework_rocket_launch</code>.
      </p>
    </>
  );
}

export function Configuration() {
  return (
    <>
      <p>
        Everything lives in <code>plugins/OneJumpAllJump/config.yml</code>. Reload from disk with{" "}
        <code>/onejump reload</code>; the plugin caches all values on load, so there is no per-jump
        config lookup.
      </p>

      <h2 id="example">Full example</h2>
      <CodeBlock code={FULL_CONFIG} />

      <h2 id="master">Master toggle</h2>
      <ConfigTable
        rows={[
          {
            key: "enabled",
            type: "boolean",
            def: "true",
            desc: "Master switch. When false, no jumps trigger at all. /onejump toggle flips and saves this key.",
          },
        ]}
      />

      <h2 id="cooldown">cooldown</h2>
      <ConfigTable
        rows={[
          {
            key: "cooldown.seconds",
            type: "int",
            def: "2",
            desc: "Minimum seconds between trigger attempts per player. Starts even if the odds roll fails.",
          },
        ]}
      />

      <h2 id="velocity">velocity</h2>
      <ConfigTable
        rows={[
          { key: "velocity.y", type: "double", def: "0.42", desc: "Fixed vertical velocity applied to every player. Vanilla jump ≈ 0.42." },
          { key: "velocity.random.enabled", type: "boolean", def: "true", desc: "Give each player an independent random launch power instead of the fixed value." },
          { key: "velocity.random.min", type: "double", def: "0.35", desc: "Minimum launch power." },
          { key: "velocity.random.max", type: "double", def: "1.10", desc: "Upper bound: exclusive. Values above ~0.9 launch players well above jump height." },
        ]}
      />

      <h2 id="trigger-chance">trigger-chance</h2>
      <ConfigTable
        rows={[
          { key: "trigger-chance.enabled", type: "boolean", def: "false", desc: "Enable probability-based triggering." },
          { key: "trigger-chance.chance", type: "int (1–100)", def: "100", desc: "Percent chance a passing jump actually launches the server." },
        ]}
      />

      <h2 id="fall-damage">fall-damage</h2>
      <ConfigTable
        rows={[
          { key: "fall-damage.cancel", type: "boolean", def: "true", desc: "Cancels fall damage events server-wide (every entity) while enabled, not only plugin-caused falls." },
        ]}
      />

      <h2 id="particles">particles</h2>
      <ConfigTable
        rows={[
          { key: "particles.enabled", type: "boolean", def: "true", desc: "Spawn a burst on every launched player." },
          { key: "particles.type", type: "particle ID", def: "end_rod", desc: "Any Minecraft particle ID (end_rod, flame, cloud, explosion…). Invalid IDs fall back to end_rod." },
          { key: "particles.amount", type: "int", def: "25", desc: "Particles per burst." },
        ]}
      />

      <h2 id="trail">trail</h2>
      <ConfigTable
        rows={[
          { key: "trail.enabled", type: "boolean", def: "true", desc: "Leave a particle trail behind launched players." },
          { key: "trail.particle", type: "particle ID", def: "happy_villager", desc: "Trail particle; invalid IDs fall back to happy_villager." },
          { key: "trail.amount", type: "int", def: "5", desc: "Particles spawned every tick." },
          { key: "trail.duration-ticks", type: "int", def: "10", desc: "Trail length in ticks (20 ticks = 1 second)." },
        ]}
      />

      <h2 id="sound">sound</h2>
      <ConfigTable
        rows={[
          { key: "sound.enabled", type: "boolean", def: "true", desc: "Play the synchronized jump sound." },
          { key: "sound.type", type: "sound ID", def: "entity_firework_rocket_launch", desc: "Any Minecraft sound ID; invalid IDs fall back to the firework launch." },
          { key: "sound.volume", type: "float", def: "1.0", desc: "Playback volume." },
          { key: "sound.pitch", type: "float", def: "1.2", desc: "Playback pitch." },
        ]}
      />

      <h2 id="actionbar">actionbar</h2>
      <ConfigTable
        rows={[
          { key: "actionbar.enabled", type: "boolean", def: "true", desc: "Show the hotbar message on every launch." },
          { key: "actionbar.message", type: "string", def: "'&e%player% made everybody jump!'", desc: "Supports & color codes and %player%." },
        ]}
      />

      <h2 id="titles">titles</h2>
      <ConfigTable
        rows={[
          { key: "titles.enabled", type: "boolean", def: "true", desc: "Show the fullscreen title + subtitle." },
          { key: "titles.title", type: "string", def: "'&6GLOBAL JUMP'", desc: "Main title line." },
          { key: "titles.subtitle", type: "string", def: "'&eTriggered by %player%'", desc: "Subtitle line." },
          { key: "titles.fadein", type: "int", def: "5", desc: "Fade-in duration in ticks." },
          { key: "titles.stay", type: "int", def: "30", desc: "Time on screen in ticks." },
          { key: "titles.fadeout", type: "int", def: "10", desc: "Fade-out duration in ticks." },
        ]}
      />

      <h2 id="broadcast">broadcast</h2>
      <ConfigTable
        rows={[
          { key: "broadcast.enabled", type: "boolean", def: "true", desc: "Announce the trigger in chat." },
          { key: "broadcast.message", type: "string", def: "'&e%player% triggered a global jump!'", desc: "Supports & color codes and %player%." },
        ]}
      />

      <h2 id="worlds">worlds</h2>
      <ConfigTable
        rows={[
          { key: "worlds.mode", type: "whitelist | blacklist", def: "whitelist", desc: "whitelist: jumps only count in listed worlds. blacklist: jumps count everywhere except listed worlds." },
          { key: "worlds.list", type: "string list", def: "[world, spawn]", desc: "World names as they appear on disk. If your main world is named differently, add it; this is the #1 'nothing happens' cause." },
        ]}
      />

      <h2 id="notes">Parsing &amp; fallbacks</h2>
      <ul>
        <li>
          Particle and sound IDs are matched against the Minecraft registry (
          <code>NamespacedKey.minecraft(...)</code>, lowercase). Unknown names fall back silently;
          check the server log-free behavior by testing a jump after edits.
        </li>
        <li>
          <code>/onejump toggle</code> writes the new <code>enabled</code> value back to{" "}
          <code>config.yml</code>, so toggling survives restarts.
        </li>
        <li>
          Alpha caveat: keys may be added or renamed between versions; keep a backup of your tuned{" "}
          <code>config.yml</code>.
        </li>
      </ul>
    </>
  );
}
