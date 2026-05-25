'use strict';
// ═══════════════════════════════════════════════════════════════
// ARCHMAGE — Game Content
// Edit this file to rebalance characters, weapons, monsters, and waves.
// ═══════════════════════════════════════════════════════════════

// ── WORLD CONFIG ─────────────────────────────────────────────

const CONFIG = {
  WORLD_W: 2040,
  WORLD_H: 2040,
  WAVE_DURATION: 35,       // base seconds for wave 1 (grows 10% per wave)
  WAVE_BREAK: 4,           // seconds between waves
  CONTACT_DAMAGE_INTERVAL: 0.35,  // seconds between contact damage ticks
  REROLLS: 99,              // rerolls available per run on the level-up screen

  // ── CHARACTERS ─────────────────────────────────────────────
  characters: [
    {
      id: 'ember_adept',
      name: 'Ember Adept',
      icon: '🔥',
      health: 90,
      speed: 3.2,
      armor: 0,
      startingWeapon: 'firebolt',
      bonus: { fireDamageMultiplier: 1.15 },
      desc: 'Burst fire damage. Low armor, high output.',
    },
    {
      id: 'frost_seer',
      name: 'Frost Seer',
      icon: '❄️',
      health: 99,
      speed: 2.9,
      armor: 1,
      startingWeapon: 'frost_shard',
      bonus: { slowDurationMultiplier: 1.25 },
      desc: 'Control and survival. Slows enemies longer.',
    },
    {
      id: 'storm_caller',
      name: 'Storm Caller',
      icon: '⚡',
      health: 80,
      speed: 3.5,
      armor: 0,
      startingWeapon: 'spark_chain',
      bonus: { cooldownMultiplier: 0.9 },
      desc: 'Speed and chain lightning. Fastest caster.',
    }
  ],

  // ── WEAPONS ────────────────────────────────────────────────
  // targeting options: 'nearest' | 'random' | 'highestThreat'
  // upgrade changes keys: damageMultiplier, projectileSpeedMultiplier,
  //   cooldownMultiplier, areaRadiusMultiplier, rangeMultiplier,
  //   pierce, bounce, armorPenetration, chainCount, statusEffect,
  //   areaRadius, areaDamageMultiplier, splitProjectiles,
  //   splitDamageMultiplier, projectileCount, damagePerBounce,
  //   pullRadius, pullStrength, finalHitDamageMultiplier,
  //   finalHitStun, followupMeteors, followupDamageMultiplier, groundEffect
  weapons: [
    {
      id: 'firebolt',
      name: 'Firebolt',
      icon: '🔥',
      description: 'Launches a bolt of fire at the nearest enemy.',
      cooldown: 0.75,
      damage: 10,
      projectileSpeed: 7,
      armorPenetration: 1,
      pierce: 0,
      bounce: 0,
      range: 500,
      targeting: 'nearest',
      chainCount: 0,
      chainRange: 0,
      areaRadius: 0,
      statusEffect: null,
      upgrades: [
        { id: 'piercing_flame',    name: 'Piercing Flame',    icon: '🔥', description: 'Firebolt pierces one additional enemy.',         changes: { pierce: 1 } },
        { id: 'explosive_cinder',  name: 'Explosive Cinder',  icon: '💥', description: 'Firebolt explodes for area damage on hit.',       changes: { areaRadius: 45, areaDamageMultiplier: 0.5 } },
        { id: 'inferno_lance',     name: 'Inferno Lance',     icon: '🌋', description: 'Faster and deals much more damage.',             changes: { damageMultiplier: 1.6, projectileSpeedMultiplier: 1.25 } }
      ]
    },
    {
      id: 'frost_shard',
      name: 'Frost Shard',
      icon: '❄️',
      description: 'Fires a shard of ice that slows enemies.',
      cooldown: 1.0,
      damage: 8,
      projectileSpeed: 6,
      armorPenetration: 0,
      pierce: 0,
      bounce: 0,
      range: 450,
      targeting: 'nearest',
      chainCount: 0,
      chainRange: 0,
      areaRadius: 0,
      statusEffect: { type: 'slow', amount: 0.35, duration: 1.5 },
      upgrades: [
        { id: 'deep_freeze',       name: 'Deep Freeze',       icon: '🌨️', description: 'Slow lasts longer and is stronger.',            changes: { statusEffect: { type: 'slow', amount: 0.55, duration: 2.5 } } },
        { id: 'splintering_ice',   name: 'Splintering Ice',   icon: '💠', description: 'Splits into 3 shards on impact.',               changes: { splitProjectiles: 3, splitDamageMultiplier: 0.45 } },
        { id: 'glacial_spear',     name: 'Glacial Spear',     icon: '🧊', description: 'Pierces enemies and gains armor penetration.',   changes: { pierce: 2, armorPenetration: 2 } }
      ]
    },
    {
      id: 'spark_chain',
      name: 'Spark Chain',
      icon: '⚡',
      description: 'Strikes one enemy and chains to nearby targets.',
      cooldown: 1.25,
      damage: 9,
      projectileSpeed: 12,
      armorPenetration: 1,
      pierce: 0,
      bounce: 0,
      range: 500,
      targeting: 'nearest',
      chainCount: 2,
      chainRange: 120,
      areaRadius: 0,
      statusEffect: null,
      upgrades: [
        { id: 'forked_lightning',  name: 'Forked Lightning',  icon: '⚡',  description: 'Chains to 2 more enemies.',                     changes: { chainCount: 2 } },
        { id: 'storm_surge',       name: 'Storm Surge',       icon: '🌩️', description: 'Casts significantly faster.',                   changes: { cooldownMultiplier: 0.7 } },
        { id: 'thunderstrike',     name: 'Thunderstrike',     icon: '🌪️', description: 'Final chain hit stuns and deals bonus damage.', changes: { finalHitDamageMultiplier: 2.2, finalHitStun: 0.45 } }
      ]
    },
    {
      id: 'arcane_orb',
      name: 'Arcane Orb',
      icon: '🔮',
      description: 'Releases a bouncing orb of arcane energy.',
      cooldown: 2.0,
      damage: 14,
      projectileSpeed: 3.5,
      armorPenetration: 2,
      pierce: 1,
      bounce: 2,
      range: 700,
      targeting: 'random',
      chainCount: 0,
      chainRange: 0,
      areaRadius: 0,
      statusEffect: null,
      upgrades: [
        { id: 'unstable_orb',      name: 'Unstable Orb',      icon: '🔮', description: 'Grows stronger after each bounce.',             changes: { damagePerBounce: 1.3 } },
        { id: 'gravity_well',      name: 'Gravity Well',      icon: '🌀', description: 'Orb pulls nearby enemies inward.',              changes: { pullRadius: 100, pullStrength: 0.55 } },
        { id: 'twin_orbs',         name: 'Twin Orbs',         icon: '🔵', description: 'Fires an additional orb.',                     changes: { projectileCount: 1 } }
      ]
    },
    {
      id: 'meteor_sigil',
      name: 'Meteor Sigil',
      icon: '☄️',
      description: 'Calls a meteor down on a distant enemy.',
      cooldown: 4.5,
      damage: 35,
      projectileSpeed: 18,
      armorPenetration: 3,
      pierce: 10,
      bounce: 0,
      range: 900,
      targeting: 'highestThreat',
      chainCount: 0,
      chainRange: 0,
      areaRadius: 75,
      statusEffect: null,
      upgrades: [
        { id: 'wider_crater',      name: 'Wider Crater',      icon: '💥', description: 'Meteor impact radius increases.',              changes: { areaRadiusMultiplier: 1.5 } },
        { id: 'molten_ground',     name: 'Molten Ground',     icon: '🌋', description: 'Impact leaves burning ground for 3s.',         changes: { groundEffect: { type: 'burn', duration: 3, dps: 6 } } },
        { id: 'comet_storm',       name: 'Comet Storm',       icon: '🌠', description: 'Drops two smaller follow-up meteors.',         changes: { followupMeteors: 2, followupDamageMultiplier: 0.5 } }
      ]
    }
    ,
    {
      id: 'shadow_bolt',
      name: 'Shadow Bolt',
      icon: '💜',
      description: 'Hurls a dark bolt that poisons the target.',
      cooldown: 0.85,
      damage: 7,
      projectileSpeed: 9,
      armorPenetration: 0,
      pierce: 0,
      bounce: 0,
      range: 520,
      targeting: 'nearest',
      chainCount: 0,
      chainRange: 0,
      areaRadius: 0,
      statusEffect: { type: 'poison', amount: 5, duration: 3.0 },
      upgrades: [
        { id: 'virulent_toxin',    name: 'Virulent Toxin',    icon: '☠️', description: 'Poison deals more damage and lasts longer.',       changes: { statusEffect: { type: 'poison', amount: 9, duration: 4.5 } } },
        { id: 'dark_pierce',       name: 'Dark Pierce',       icon: '🌑', description: 'Bolt pierces 2 enemies and travels faster.',       changes: { pierce: 2, projectileSpeedMultiplier: 1.3 } },
        { id: 'twin_shadows',      name: 'Twin Shadows',      icon: '👥', description: 'Fires two bolts simultaneously.',                  changes: { projectileCount: 1 } }
      ]
    },
    {
      id: 'bone_spear',
      name: 'Bone Spear',
      icon: '🦴',
      description: 'A slow, heavy lance that pierces through all enemies in a line.',
      cooldown: 2.2,
      damage: 30,
      projectileSpeed: 4.5,
      armorPenetration: 2,
      pierce: 99,
      bounce: 0,
      range: 1400,
      targeting: 'nearest',
      chainCount: 0,
      chainRange: 0,
      areaRadius: 0,
      statusEffect: null,
      upgrades: [
        { id: 'crushing_force',    name: 'Crushing Force',    icon: '💪', description: 'Spear deals significantly more damage.',            changes: { damageMultiplier: 1.75 } },
        { id: 'marrow_eruption',   name: 'Marrow Eruption',   icon: '💥', description: 'Each enemy hit erupts in a small blast.',           changes: { areaRadius: 30, areaDamageMultiplier: 0.55 } },
        { id: 'shattering_blow',   name: 'Shattering Blow',   icon: '❄️', description: 'Every enemy hit is slowed.',                       changes: { statusEffect: { type: 'slow', amount: 0.45, duration: 2.0 } } }
      ]
    },
    {
      id: 'magic_missiles',
      name: 'Magic Missiles',
      icon: '✨',
      description: 'Fires a burst of three arcane bolts at the nearest enemy.',
      cooldown: 1.0,
      damage: 8,
      projectileSpeed: 11,
      armorPenetration: 1,
      pierce: 0,
      bounce: 0,
      range: 380,
      targeting: 'nearest',
      chainCount: 0,
      chainRange: 0,
      areaRadius: 0,
      projectileCount: 3,
      statusEffect: null,
      upgrades: [
        { id: 'missile_barrage',   name: 'Missile Barrage',   icon: '🌟', description: 'Fires 2 additional missiles per cast.',             changes: { projectileCount: 2 } },
        { id: 'arcane_velocity',   name: 'Arcane Velocity',   icon: '⚡', description: 'Missiles are faster and fire more frequently.',     changes: { cooldownMultiplier: 0.65, projectileSpeedMultiplier: 1.35 } },
        { id: 'arcane_overload',   name: 'Arcane Overload',   icon: '💫', description: 'Each missile deals significantly more damage.',     changes: { damageMultiplier: 1.7 } }
      ]
    },
    {
      id: 'rune_burst',
      name: 'Rune Burst',
      icon: '🔵',
      description: 'Detonates a ring of arcane runes that fire in all directions.',
      cooldown: 2.5,
      damage: 12,
      projectileSpeed: 5.5,
      armorPenetration: 1,
      pierce: 0,
      bounce: 0,
      range: 420,
      targeting: 'radial',
      radialCount: 8,
      chainCount: 0,
      chainRange: 0,
      areaRadius: 0,
      statusEffect: null,
      upgrades: [
        { id: 'rune_cascade',      name: 'Rune Cascade',      icon: '🔷', description: 'Fires 4 additional runes per burst.',               changes: { radialCount: 4 } },
        { id: 'runic_empowerment', name: 'Runic Empowerment', icon: '💠', description: 'Each rune deals much more damage.',                  changes: { damageMultiplier: 1.6 } },
        { id: 'arcane_ricochet',   name: 'Arcane Ricochet',   icon: '🔄', description: 'Each rune bounces once off world edges.',            changes: { bounce: 1 } }
      ]
    },
    {
      id: 'void_lance',
      name: 'Void Lance',
      icon: '🌑',
      description: 'Slow but devastating spear of void energy that shreds armor.',
      cooldown: 3.8,
      damage: 58,
      projectileSpeed: 4.5,
      armorPenetration: 10,
      pierce: 0,
      bounce: 0,
      range: 800,
      targeting: 'highestThreat',
      chainCount: 0,
      chainRange: 0,
      areaRadius: 0,
      statusEffect: null,
      upgrades: [
        { id: 'annihilator',       name: 'Annihilator',       icon: '💀', description: 'Lance deals nearly double damage.',                 changes: { damageMultiplier: 1.9 } },
        { id: 'phase_strike',      name: 'Phase Strike',      icon: '👻', description: 'Lance phases through 3 enemies.',                   changes: { pierce: 3 } },
        { id: 'void_implosion',    name: 'Void Implosion',    icon: '🕳️', description: 'Lance explodes on impact for area damage.',         changes: { areaRadius: 60, areaDamageMultiplier: 0.8 } }
      ]
    },
    {
      id: 'vortex_coil',
      name: 'Vortex Coil',
      icon: '🌀',
      description: 'Spirals 3 arms of arcane energy outward from the caster, passing through all enemies they touch.',
      cooldown: 2.2,
      damage: 18,
      projectileSpeed: 2.5,
      armorPenetration: 1,
      pierce: 99,
      bounce: 0,
      range: 420,
      targeting: 'spiral',
      spiralAngularSpeed: 0.114,   // 3 * 2π / ((range-startRadius)/radialSpeed) ≈ 3 revolutions
      chainCount: 0,
      chainRange: 0,
      areaRadius: 0,
      areaDamageMultiplier: 0,
      projectileCount: 3,
      statusEffect: null,
      upgrades: [
        { id: 'coil_density',   name: 'Dense Coil',     icon: '🌀', description: 'Fires 2 additional spiral arms.',                              changes: { projectileCount: 2 } },
        { id: 'toxic_helix',    name: 'Toxic Helix',    icon: '☠️', description: 'Arms apply poison and expand faster.',                         changes: { statusEffect: { type: 'poison', amount: 4, duration: 2.5 }, projectileSpeedMultiplier: 1.3 } },
        { id: 'inferno_spiral', name: 'Inferno Spiral', icon: '🌋', description: 'Arms deal far more damage and explode on contact.',              changes: { damageMultiplier: 1.9, areaRadius: 38, areaDamageMultiplier: 0.55 } }
      ]
    },
    {
      id: 'arcane_trail',
      name: 'Arcane Trail',
      icon: '💜',
      description: 'Leaves a trail of damaging arcane spheres behind you as you move.',
      cooldown: 0.55,
      damage: 0,
      projectileSpeed: 0,
      armorPenetration: 0,
      pierce: 0,
      bounce: 0,
      range: 0,
      targeting: 'trail',
      chainCount: 0,
      chainRange: 0,
      areaRadius: 26,
      areaDamageMultiplier: 0,
      statusEffect: null,
      groundEffect: { type: 'arcane', duration: 2.0, dps: 3 },
      upgrades: [
        { id: 'volatile_residue', name: 'Volatile Residue', icon: '💥', description: 'Spheres appear more often and cover a wider area.',          changes: { cooldownMultiplier: 0.6, areaRadiusMultiplier: 1.4 } },
        { id: 'toxic_residue',    name: 'Toxic Residue',    icon: '☠️', description: 'Spheres now poison enemies that linger in them.',            changes: { groundEffect: { type: 'poison', duration: 2.5, dps: 6 } } },
        { id: 'blazing_path',     name: 'Blazing Path',     icon: '🔥', description: 'Converts to searing fire — much higher damage output.',       changes: { groundEffect: { type: 'burn', duration: 2.5, dps: 10 }, areaRadiusMultiplier: 1.25 } }
      ]
    },
    {
      id: 'plague_pool',
      name: 'Plague Pool',
      icon: '🧪',
      description: 'Hurls vials of corrosive liquid that shatter at random locations nearby, leaving large toxic pools.',
      cooldown: 1.8,
      damage: 0,
      projectileSpeed: 0,
      armorPenetration: 0,
      pierce: 0,
      bounce: 0,
      range: 220,
      targeting: 'pool',
      chainCount: 0,
      chainRange: 0,
      areaRadius: 65,
      areaDamageMultiplier: 0,
      statusEffect: null,
      groundEffect: { type: 'toxic', duration: 3.5, dps: 2.5 },
      upgrades: [
        { id: 'wider_pools',      name: 'Wider Pools',      icon: '💧', description: 'Pools are 45% wider, covering much more ground.',                   changes: { areaRadiusMultiplier: 1.45 } },
        { id: 'virulent_toxin',   name: 'Virulent Toxin',   icon: '☠️', description: 'Pools deal more damage per second and linger far longer.',          changes: { groundEffect: { type: 'toxic', duration: 5.0, dps: 6 } } },
        { id: 'caustic_acid',     name: 'Caustic Acid',     icon: '🔥', description: 'Converts to burning acid — enormous damage, slightly wider area.',  changes: { groundEffect: { type: 'burn', duration: 4.5, dps: 11 }, areaRadiusMultiplier: 1.3 } }
      ]
    }
  ],

  // ── MONSTERS ───────────────────────────────────────────────
  // abilities: 'swarm' | 'fast' | 'armored' | 'regeneration' |
  //            'ranged' | 'poison' | 'charge' | 'boss' | 'fireBreath'
  monsters: [
    { id: 'goblin',      name: 'Goblin',              icon: '👺', health:  12, speed: 2.10, armor: 0, strength:  4, xp:   3, radius: 12, waveMin:  1, spawnWeight: 10, abilities: ['swarm'] },
    { id: 'skeleton',    name: 'Skeleton',             icon: '💀', health:  18, speed: 1.70, armor: 1, strength:  5, xp:   4, radius: 13, waveMin:  2, spawnWeight:  8, abilities: [] },
    { id: 'kobold',      name: 'Kobold',               icon: '🦎', health:  14, speed: 2.80, armor: 0, strength:  4, xp:   4, radius: 11, waveMin:  3, spawnWeight:  7, abilities: ['fast'] },
    { id: 'orc',         name: 'Orc Brute',            icon: '🪓', health:  38, speed: 1.60, armor: 2, strength:  9, xp:   8, radius: 16, waveMin:  5, spawnWeight:  5, abilities: ['armored'] },
    { id: 'ghoul',       name: 'Ghoul',                icon: '🧟', health:  32, speed: 2.20, armor: 1, strength:  7, xp:   8, radius: 15, waveMin:  7, spawnWeight:  5, abilities: ['poison'] },
    { id: 'troll',       name: 'Troll',                icon: '🧌', health:  95, speed: 1.20, armor: 3, strength: 14, xp:  18, radius: 22, waveMin: 10, spawnWeight:  3, abilities: ['regeneration', 'miniboss'] },
    { id: 'beholderkin', name: 'Beholderkin',          icon: '👁️', health:  70, speed: 1.40, armor: 2, strength: 10, xp:  20, radius: 20, waveMin: 14, spawnWeight:  2, abilities: ['ranged'] },
    { id: 'dragon_boss', name: 'Ancient Red Dragon',   icon: '🐉', health: 900, speed: 1.35, armor: 6, strength: 24, xp: 200, radius: 42, waveMin: 20, spawnWeight:  0, abilities: ['boss', 'fireBreath', 'charge'] }
  ],

  // ── WAVE MILESTONES ────────────────────────────────────────
  // monstersTotal: how many spawn this wave
  // miniBoss: monster id to force-spawn once this wave
  // boss: monster id to spawn as the sole enemy (wave 20)
  waveMilestones: [
    { wave:  1, monstersTotal: 22 },
    { wave:  2, monstersTotal: 36 },
    { wave:  3, monstersTotal: 40 },
    { wave:  4, monstersTotal: 52 },
    { wave:  5, monstersTotal: 66 },
    { wave:  6, monstersTotal: 78 },
    { wave:  7, monstersTotal: 80 },
    { wave:  8, monstersTotal: 92 },
    { wave:  9, monstersTotal: 105 },
    { wave: 10, monstersTotal: 118, miniBoss: 'troll' },
    { wave: 11, monstersTotal: 128 },
    { wave: 12, monstersTotal: 130 },
    { wave: 13, monstersTotal: 142 },
    { wave: 14, monstersTotal: 154 },
    { wave: 15, monstersTotal: 168 },
    { wave: 16, monstersTotal: 170 },
    { wave: 17, monstersTotal: 182 },
    { wave: 18, monstersTotal: 195 },
    { wave: 19, monstersTotal: 208 },
    { wave: 20, monstersTotal: 211, boss: 'dragon_boss' }
  ]
};

// ── PASSIVE UPGRADES ─────────────────────────────────────────
// These appear in level-up choices alongside weapon upgrades.
// apply(player) is called when the player picks this passive.
const PASSIVES = [
  { id: 'hp_up',     name: 'Vitality Shard', icon: '💚', description: '+20 max HP and restore 20 HP.',      apply: p => { p.maxHealth += 20; p.health = Math.min(p.health + 20, p.maxHealth); } },
  { id: 'speed_up',  name: 'Swiftness Rune', icon: '💨', description: '+0.4 movement speed.',               apply: p => { p.speed += 0.4; } },
  { id: 'armor_up',  name: 'Stone Skin',     icon: '🛡️', description: '+1 armor.',                          apply: p => { p.armor += 1; } },
  { id: 'heal',      name: 'Mending Sigil',  icon: '✨', description: 'Restore 35% of max HP.',             apply: p => { p.health = Math.min(p.health + p.maxHealth * 0.35, p.maxHealth); } },
  { id: 'cd_global', name: 'Arcane Tempo',   icon: '⏳', description: 'All spell cooldowns −12%.',          apply: p => { p.globalCDMultiplier = (p.globalCDMultiplier || 1) * 0.88; } },
  { id: 'range_up',  name: 'Far Sight',      icon: '🔭', description: '+25% range on all spells.',          apply: p => { p.globalRangeMultiplier = (p.globalRangeMultiplier || 1) * 1.25; for (const wi of p.weapons) p.recomputeWeapon(wi); } }
];
