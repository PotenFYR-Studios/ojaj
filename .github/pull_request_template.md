<!-- PRs: one feature or fix per PR. Branch from master. -->

## What does this PR change?

<!-- Describe the change: plugin mechanics, config, docs site, workflows... -->

## Why?

<!-- The gameplay/docs/tooling problem this solves. Link related issues. -->

## Type

- [ ] Plugin mechanics (Java)
- [ ] Configuration (`config.yml` / `plugin.yml`)
- [ ] Docs site (`docs/`)
- [ ] Community files / CI workflows
- [ ] Other

## Checklist

- [ ] `mvn package` succeeds (plugin changes)
- [ ] `cd docs && bun install && bun run build` succeeds (docs changes)
- [ ] New config keys are documented in `config.yml` comments **and** the
      [configuration reference](https://ojaj.docs.potenfyr.in/docs/configuration.html)
      (`docs/src/pages/docs.tsx`)
- [ ] Behavior changes are reflected in the gameplay docs and FAQ
- [ ] No unrelated formatting churn

## Alpha caveat

Mechanics/config changes may break existing setups. Describe any migration note users will
need (e.g. renamed keys, changed defaults).
