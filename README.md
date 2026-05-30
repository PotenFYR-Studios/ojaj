
<!-- ====================================================== -->
<!--                     BANNER SECTION                      -->
<!-- ====================================================== -->

<p align="center">
  <img src="./banner.png" alt="OneJumpAllJump Banner">
</p>

<h1 align="center">OneJumpAllJump</h1>

<p align="center">
  A chaotic Paper plugin where one player's jump launches the entire server.
</p>

<p align="center">

  <img src="https://img.shields.io/badge/Minecraft-26.1+-brightgreen?style=for-the-badge">

  <img src="https://img.shields.io/badge/Platform-Paper-blue?style=for-the-badge">

  <img src="https://img.shields.io/badge/Status-Alpha-orange?style=for-the-badge">

  <img src="https://img.shields.io/badge/Java-21-red?style=for-the-badge">

</p>

---

# Features

- Global synchronized jumping
- Random jump velocity system
- Action bars
- Titles & subtitles
- Broadcast messages
- Particle trails
- Sound effects
- World whitelist / blacklist
- Anti-spam cooldown system
- Trigger chance system
- Fall damage protection
- Stats tracking
- Fully configurable
- Optimized cached config system

---

# Preview

When a single player jumps:

- every player gets launched
- particles explode everywhere
- synchronized sounds play
- titles appear on screen
- actionbars update instantly
- the server descends into chaos

---

# Commands

| Command | Description |
|---|---|
| `/onejump toggle` | Enable/disable plugin |
| `/onejump reload` | Reload configuration |
| `/onejump stats` | View your tracked jumps |

Aliases:

```text
/ojaj
````

---

# Permissions

| Permission       | Description                          |
| ---------------- | ------------------------------------ |
| `onejump.admin`  | Access admin commands                |
| `onejump.bypass` | Prevent player from triggering jumps |

---

# Supported Servers

| Software   | Supported |
| ---------- | --------- |
| Paper      | ✅         |
| Purpur     | ✅         |
| Pufferfish | ✅         |
| Spigot     | ❌         |

---

# Installation

1. Download latest release
2. Put jar inside:

```text
/plugins/
```

3. Restart server

---

# Example Configuration

```yaml
enabled: true

cooldown:
  seconds: 2

velocity:
  y: 0.42

  random:
    enabled: true
    min: 0.35
    max: 1.10

particles:
  enabled: true
  type: end_rod
  amount: 25

sound:
  enabled: true
  type: entity_firework_rocket_launch
  volume: 1.0
  pitch: 1.2
```

---

# Configuration Features

Everything is configurable:

* jump strength
* random launch power
* particles
* sounds
* trails
* titles
* broadcasts
* cooldowns
* world restrictions
* trigger chance
* fall damage handling

---

# Building

Requires:

* Java 21
* Maven

Build command:

```bash
mvn clean package
```

Compiled jar:

```text
target/OneJumpAllJump-1.0.jar
```

---

# Alpha Notice

This plugin is currently in alpha.

Possible issues may include:

* balancing problems
* edge-case bugs
* unfinished systems
* config changes between versions

Feedback and testing are appreciated.

---

# Credits

Developed by Potenfyr.
Built for chaotic multiplayer gameplay.

