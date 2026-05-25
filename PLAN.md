# Archmage — Staff-Level Implementation Plan

## Overview

A 2D top-down browser survival game inspired by the wave-survival genre (Vampire Survivors, etc.) with a D&D mage theme. Single HTML file deliverable, also deployable on GitHub Pages. All content driven by embedded YAML-like data (inline JS objects matching the YAML schema) so the file works without a local server while still being YAML-editable for the Pages deployment.

---

## Staff Review of the Original Plan

### What's solid

- The genre choice is excellent for a browser game: no complex networking, no auth, no persistence requirements.
- YAML-driven content is the right call for moddability and rebalancing. Using `js-yaml` from CDN is the correct lightweight approach.
- The character/weapon/upgrade taxonomy is well thought out. Three tiers (new weapon → upgrade → passive) maps naturally to Vampire Survivors' model, which players understand.
- Emoji-first assets is exactly right for an MVP. Iterate to sprites later.
- Auto-targeting/auto-cast for v1 is the correct scope decision — removes aim complexity and lets you focus on the survival loop.

### Gaps and risks I'm addressing in this implementation

1. **YAML from `fetch()` breaks on `file://`** — The plan says "runs from a local HTML file" but `fetch()` is blocked by CORS on `file://` origins. Resolution: all game data lives as inline JS objects that mirror the YAML schema. The GitHub Pages deployment can optionally load real YAML files.

2. **Canvas coordinate system** — No mention of how world vs. screen coordinates are handled. The arena should be larger than the viewport and the camera should follow the player. Resolution: implement a camera transform with a fixed world size.

3. **Collision architecture** — "Check collisions" is one line in the game loop but is the most expensive operation. Resolution: spatial grid partitioning for enemy–projectile collision. Given the enemy counts expected (≤ 200 at peak wave 20) a simple O(n·m) check with early exit on dead entities is acceptable; a spatial hash is a nice-to-have for later.

4. **Wave gating** — The plan specifies `waveMin` per monster but doesn't define the wave timer or how the inter-wave gap works. Resolution: each wave runs for 45 seconds, then a 5-second "wave complete" banner, then the next wave starts. The dragon boss wave ends only on boss kill.

5. **Upgrade deduplication** — The plan's `getLevelUpChoices` can return impossible choices if the player has every weapon and every upgrade. Resolution: graceful fallback to passive upgrades only; minimum 1 valid choice always shown.

6. **Status effects** — Plan mentions slow, stun, poison, burn but doesn't define the data model for a live effect on an entity. Resolution: `entity.statusEffects = [{type, remaining, strength}]` ticked each frame.

7. **Mobile** — Out of scope for v1 as the plan states. Keyboard WASD only. The canvas will be responsive via CSS but no touch controls.

8. **Performance ceiling** — `ctx.fillText()` with emoji is surprisingly expensive at 60fps × 200 enemies. Resolution: use canvas font rendering with a fixed emoji font; cache emoji draws where possible. If needed, fall back to colored circles with a letter.

---

## File Structure (What We're Building)

```
/archmage
  index.html          ← entire game (all JS inline for file:// compatibility)
  PLAN.md             ← this file
  README.md           ← existing
```

A single `index.html` contains everything:
- Embedded CSS (the terminal aesthetic from the brief + game-specific styles)
- Embedded JS (all game modules as ES5-compatible IIFE or modern ES6 in `<script>`)
- All game data as inline JS objects

This satisfies "playable from local HTML file" absolutely — no server, no fetch, no CDN required. The CDN links for fonts and js-yaml are included but the game falls back gracefully if offline (fonts degrade, YAML loading simply uses the inline data).

---

## Architecture

### Module layout (all inside one `<script>` tag, exposed as a namespace)

```
Game (singleton)
  ├── Config          — all YAML data as JS objects
  ├── State           — current game state (phase, wave, player, entities)
  ├── Input           — keyboard state tracking
  ├── Camera          — world→screen transform
  ├── Player          — player entity, stat management
  ├── EnemySpawner    — wave logic, spawn timing
  ├── Entities        — arrays of enemies, projectiles, pickups
  ├── WeaponSystem    — per-weapon cooldown and fire logic
  ├── ProjectileSystem — movement, bouncing, chaining
  ├── CollisionSystem — circle–circle broad+narrow phase
  ├── EffectSystem    — status effects, ground effects, particles
  ├── LevelSystem     — XP, level-up, upgrade choice generation
  ├── Renderer        — all canvas drawing calls
  └── UI              — HTML overlay screens (start, level-up, game-over)
```

### State machine phases

```
TITLE → CHARACTER_SELECT → PLAYING → LEVEL_UP → WAVE_COMPLETE → GAME_OVER | VICTORY
```

---

## Data Schemas (inline JS, mirroring YAML)

### Character

```js
{ id, name, icon, health, speed, armor, startingWeapon, bonus: {} }
```

### Monster

```js
{ id, name, icon, health, speed, armor, strength, xp, radius, waveMin, spawnWeight, abilities: [] }
```

### Weapon

```js
{ id, name, icon, description, cooldown, damage, projectileSpeed, armorPenetration,
  pierce, bounce, range, targeting, chainCount, chainRange, areaRadius, statusEffect,
  upgrades: [{ id, name, description, changes: {} }] }
```

### Active weapon instance (on player)

```js
{ weaponId, cooldownRemaining, appliedUpgrades: [], computedStats: {} }
```

### Projectile

```js
{ x, y, vx, vy, damage, armorPen, pierce, bounce, remaining, chainCount,
  chainRange, areaRadius, weaponId, ownerId, hitEnemyIds: Set }
```

### Enemy

```js
{ id, configId, x, y, hp, maxHp, speed, armor, strength, xp, radius,
  statusEffects: [], dead: false, flashTimer: 0 }
```

---

## Combat Math (implemented exactly as planned)

```
effectiveArmor = max(0, target.armor - weapon.armorPenetration)
finalDamage    = max(1, weapon.damage - effectiveArmor)
```

Wave scaling:
```
enemyHp     = baseHp * (1 + wave * 0.12)
enemyDamage = baseStrength * (1 + wave * 0.08)
spawnRate   = max(0.4, 1.5 - wave * 0.04)   // seconds between spawns
```

XP formula (plan's version A):
```
xpToNextLevel = floor(20 + level * 12 + level^1.4 * 4)
```

---

## Rendering Strategy

- World size: 2400 × 2400 px
- Canvas: fills the browser viewport
- Camera: centered on player, clamped to world bounds
- Grid: subtle dot grid drawn at world layer to give depth
- Enemies: emoji rendered via `ctx.fillText` in a 24–36px font
- Player: colored circle + character emoji
- Projectiles: small emoji or colored circles
- UI bars: drawn directly on canvas (health, XP, wave)
- Screens: HTML overlay `<div>` shown/hidden, not canvas — keeps DOM events simple

---

## Phase Delivery

| Phase | Deliverable |
|-------|-------------|
| 1 | Single `index.html` with full game loop, all 5 weapons, all 8 monsters, 3 characters, 20 waves, dragon boss, level-up system, game-over and victory screens |

This is a single-phase delivery since the plan is fully specced and the scope is well-understood.

---

## Out of Scope (v1)

- Touch/mobile controls
- Sound effects and music
- Screen shake
- Particle effects (flash-on-hit only)
- External YAML file loading (uses inline data for file:// compatibility)
- Leaderboard / persistence
- Sprite art (emoji throughout)

---

## Known Technical Decisions

| Decision | Rationale |
|----------|-----------|
| Single HTML file | Works on `file://`, zero build tooling, zero dependencies |
| Inline data (not fetch YAML) | CORS blocks fetch on file:// |
| HTML overlay screens | Easier event handling than canvas UI |
| Emoji rendering | No art assets needed, readable at all sizes |
| 60fps requestAnimationFrame | Standard game loop |
| ES2020 JS (no transpile) | Modern browsers only, no bundler needed |
| Canvas 2D (no WebGL) | Sufficient for this entity count, simpler API |
