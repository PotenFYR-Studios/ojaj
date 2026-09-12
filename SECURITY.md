# Security Policy

## Supported versions

| Version | Status | Supported |
|---|---|---|
| 0.1.0-alpha (Modrinth) / 1.0-ALPHA (master) | alpha | ✅ security fixes only where feasible |

OneJumpAllJump is a small, server-side-only plugin. It has no network listeners, no external
services and no persistent storage, so the practical attack surface is game-server behavior
(velocity changes, particles, sounds and messages).

## Reporting a vulnerability

Please **do not open a public GitHub issue** for security problems.

Report privately through one of these channels:

1. **GitHub private vulnerability reporting**, on
   [github.com/PotenFYR-Studios/ojaj](https://github.com/PotenFYR-Studios/ojaj/security/advisories/new),
   use *Security → Report a vulnerability*
2. **Email**: [support@potenfyr.in](mailto:support@potenfyr.in) (include "ojaj security" in the
   subject)

Include: plugin version, server software and version, affected configuration, and a description
or reproduction steps.

## What counts as a security issue here

- Crash or memory-exhaustion vectors reachable from normal gameplay (e.g. config values that
  can freeze or crash the server)
- Exploitable interactions with other plugins (e.g. permission bypasses)
- Anything that lets a player trigger actions they shouldn't (commands, permissions)

Balance concerns, "too much chaos" reports and bug reports belong in
[GitHub Issues](https://github.com/PotenFYR-Studios/ojaj/issues) instead.

## Known intentional behavior (not vulnerabilities)

- The plugin replaces player vertical velocity server-wide on trigger
- With `fall-damage.cancel: true` (default), **all** fall damage is cancelled for all entities
  while the plugin runs
- `/onejump` subcommands are gated behind `onejump.admin` (default: op)
