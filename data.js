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
  BANS: 99,                  // number of times the player can ban a choice per run
  MAX_WEAPONS: 10,          // maximum number of active powers a player can hold

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
      description: 'Slow but devastating spear of void energy that shreds armor. Warps space as it flies, pulling nearby enemies toward it.',
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
      pullRadius: 70,
      pullStrength: 1.8,
      statusEffect: null,
      upgrades: [
        { id: 'annihilator',       name: 'Annihilator',       icon: '💀', description: 'Lance deals nearly double damage.',                 changes: { damageMultiplier: 1.9 } },
        { id: 'phase_strike',      name: 'Phase Strike',      icon: '👻', description: 'Lance phases through 3 enemies.',                   changes: { pierce: 3 } },
        { id: 'void_implosion',    name: 'Void Implosion',    icon: '🕳️', description: 'Lance explodes on impact for area damage.',         changes: { areaRadius: 60, areaDamageMultiplier: 0.8 } }
      ]
    },
    {
      id: 'phoenix_wings',
      name: 'Phoenix Wings',
      icon: '🦅',
      description: 'Fires bolts sideways from both sides of the caster, perpendicular to the nearest enemy. Bolts accelerate as they fly.',
      cooldown: 1.4,
      damage: 13,
      projectileSpeed: 8,
      projectileAcceleration: 1.04,
      armorPenetration: 1,
      pierce: 1,
      bounce: 0,
      range: 560,
      targeting: 'wings',
      spreadAngle: 0.28,
      chainCount: 0,
      chainRange: 0,
      areaRadius: 0,
      areaDamageMultiplier: 0,
      projectileCount: 3,
      statusEffect: null,
      upgrades: [
        { id: 'searing_feathers', name: 'Searing Feathers', icon: '🔥', description: 'Bolts apply poison and pierce one additional enemy.',  changes: { statusEffect: { type: 'poison', amount: 5, duration: 2.0 }, pierce: 1 } },
        { id: 'wider_wings',      name: 'Wider Wings',      icon: '🦅', description: 'One additional bolt fans out from each side.',        changes: { projectileCount: 1 } },
        { id: 'blaze_of_glory',   name: 'Blaze of Glory',   icon: '🌟', description: 'Each bolt deals far more damage and accelerates faster.', changes: { damageMultiplier: 1.7, projectileAccelerationMultiplier: 1.5 } }
      ]
    },
    {
      id: 'arcane_cube',
      name: 'Arcane Cube',
      icon: '🔲',
      description: 'Conjures 4 walls of arcane energy that simultaneously sweep around the player, damaging every enemy they pass through.',
      cooldown: 2.2,
      damage: 18,
      projectileSpeed: 3,
      armorPenetration: 1,
      pierce: 99,
      bounce: 0,
      range: 80,
      targeting: 'box',
      chainCount: 0,
      chainRange: 0,
      areaRadius: 0,
      areaDamageMultiplier: 0,
      projectileCount: 4,
      statusEffect: null,
      upgrades: [
        { id: 'larger_cube',      name: 'Larger Cube',      icon: '🔲', description: 'The cube extends 50% further from the caster.',                    changes: { rangeMultiplier: 1.5 } },
        { id: 'shock_walls',      name: 'Shock Walls',      icon: '⚡', description: 'Each wall slows every enemy it passes through.',                   changes: { statusEffect: { type: 'slow', amount: 0.45, duration: 2.0 } } },
        { id: 'volatile_corners', name: 'Volatile Corners', icon: '💥', description: 'Walls explode at their endpoints, dealing area damage at each corner.', changes: { areaRadius: 55, areaDamageMultiplier: 0.7 } }
      ]
    },
    {
      id: 'phase_blade',
      name: 'Phase Blade',
      icon: '⚔️',
      description: 'Conjures an ethereal blade that orbits the caster continuously, slicing through every enemy it passes.',
      cooldown: 5.5,
      damage: 22,
      projectileSpeed: 0,
      armorPenetration: 2,
      pierce: 99,
      bounce: 0,
      range: 80,
      targeting: 'orbit',
      orbitSpeed: 0.12,
      orbitDuration: 5.2,
      chainCount: 0,
      chainRange: 0,
      areaRadius: 0,
      areaDamageMultiplier: 0,
      projectileCount: 1,
      statusEffect: null,
      upgrades: [
        { id: 'twin_blades',    name: 'Twin Blades',    icon: '⚔️', description: 'A second blade orbits counter-clockwise simultaneously.',  changes: { projectileCount: 1 } },
        { id: 'phantom_edge',   name: 'Phantom Edge',   icon: '👻', description: 'Blade applies poison to every enemy it cuts.',             changes: { statusEffect: { type: 'poison', amount: 6, duration: 2.0 } } },
        { id: 'expanded_orbit', name: 'Expanded Orbit', icon: '🔄', description: 'Blade orbits at a 60% greater radius.',                   changes: { rangeMultiplier: 1.6 } }
      ]
    },
    {
      id: 'starfall',
      name: 'Starfall',
      icon: '🌠',
      description: 'Calls down a barrage of shooting stars that crash into random locations around the caster, each exploding on impact.',
      cooldown: 4.0,
      damage: 28,
      projectileSpeed: 22,
      armorPenetration: 2,
      pierce: 5,
      bounce: 0,
      range: 300,
      targeting: 'starfall',
      chainCount: 0,
      chainRange: 0,
      areaRadius: 40,
      areaDamageMultiplier: 0.6,
      projectileCount: 6,
      statusEffect: null,
      upgrades: [
        { id: 'meteor_shower',  name: 'Meteor Shower',  icon: '🌠', description: 'Calls 3 additional stars each barrage.',                   changes: { projectileCount: 3 } },
        { id: 'burning_impact', name: 'Burning Impact', icon: '🔥', description: 'Each impact scorches the ground beneath it.',              changes: { groundEffect: { type: 'burn', duration: 2.5, dps: 5 } } },
        { id: 'stellar_wrath',  name: 'Stellar Wrath',  icon: '💫', description: 'Stars hit harder and scatter over a wider area.',         changes: { damageMultiplier: 1.6, rangeMultiplier: 1.4 } }
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
    },
    {
      id: 'force_pulse',
      name: 'Force Pulse',
      icon: '💨',
      description: 'Releases an expanding shockwave of arcane force that hurls all nearby enemies outward. Deals no damage.',
      cooldown: 3.5,
      damage: 0,
      projectileSpeed: 6,
      armorPenetration: 0,
      pierce: 99,
      bounce: 0,
      range: 220,
      targeting: 'pulse',
      knockback: 90,
      chainCount: 0,
      chainRange: 0,
      areaRadius: 0,
      areaDamageMultiplier: 0,
      statusEffect: null,
      upgrades: [
        { id: 'wider_pulse',       name: 'Wider Pulse',       icon: '💨', description: 'Shockwave extends 60% further.',                                     changes: { rangeMultiplier: 1.6 } },
        { id: 'violent_repulsion', name: 'Violent Repulsion', icon: '🌪️', description: 'Enemies are thrown twice as far.',                                  changes: { knockbackMultiplier: 2.0 } },
        { id: 'arcane_trauma',     name: 'Arcane Trauma',     icon: '⚡', description: 'Shockwave now deals 25 damage and slows every enemy it hits.',       changes: { damage: 25, statusEffect: { type: 'slow', amount: 0.5, duration: 2.0 } } }
      ]
    },
    {
      id: 'jakes_lament',
      name: "Jake's Lament",
      icon: '🧭',
      description: "A compass needle tracks the densest enemy cluster. Charges a devastating beam in that direction — but only fires while you're moving toward the danger.",
      cooldown: 4.5,
      damage: 55,
      projectileSpeed: 0,
      armorPenetration: 4,
      pierce: 99,
      bounce: 0,
      range: 420,
      targeting: 'jakes',
      chainCount: 0,
      chainRange: 0,
      areaRadius: 0,
      statusEffect: null,
      lifesteal: 0,
      cowardsCurse: false,
      upgrades: [
        { id: 'true_north',      name: 'True North',      icon: '🌐', description: 'Beam range increases dramatically.',                       changes: { rangeMultiplier: 2.0 } },
        { id: 'crimson_bearing', name: 'Crimson Bearing', icon: '🩸', description: 'Beam lifesteals — heals 30% of all damage dealt.',          changes: { lifesteal: 0.3 } },
        { id: 'reckoning_volley', name: 'Reckoning Volley', icon: '🌟', description: "Three beams erupt simultaneously in a forward fan, each at 70% power. Together they blanket an entire zone.", changes: { jakesVolley: true } }
      ]
    },
    {
      id: 'babbage_blast',
      name: 'Babbage Blast',
      icon: '🎇',
      description: 'Lobs a charged orb at the nearest enemy. On impact it detonates into a burst of runes that fire outward in all directions.',
      cooldown: 2.8,
      damage: 18,
      projectileSpeed: 6,
      armorPenetration: 1,
      pierce: 0,
      bounce: 0,
      range: 560,
      targeting: 'nearest',
      chainCount: 0,
      chainRange: 0,
      areaRadius: 0,
      runeBlastCount: 6,
      runeBlastDamage: 10,
      runeBlastRange: 320,
      runeBlastSpeed: 5.5,
      statusEffect: null,
      upgrades: [
        { id: 'babbage_barrage',  name: 'Babbage Barrage',  icon: '🎆', description: 'Detonation fires 4 additional runes.',                      changes: { runeBlastCount: 4 } },
        { id: 'babbage_power',    name: 'Babbage Power',    icon: '💠', description: 'Runes hit harder and travel further.',                       changes: { runeBlastDamageMultiplier: 1.8, runeBlastRangeMultiplier: 1.5 } },
        { id: 'babbage_chain',    name: 'Babbage Chain',    icon: '🔗', description: 'Each rune pierces one additional enemy.',                    changes: { runeBlastPierce: 1 } }
      ]
    },
    {
      id: 'thunder_clap',
      name: 'Thunder Clap',
      icon: '💥',
      description: 'Releases a thunderous concussive burst that instantly stuns and damages every enemy in range.',
      cooldown: 6.0,
      damage: 22,
      projectileSpeed: 0,
      armorPenetration: 2,
      pierce: 99,
      bounce: 0,
      range: 155,
      targeting: 'nova',
      chainCount: 0,
      chainRange: 0,
      areaRadius: 0,
      statusEffect: { type: 'stun', duration: 1.2 },
      upgrades: [
        { id: 'wider_clap',        name: 'Wider Clap',        icon: '🔊', description: 'Blast radius extends 60% further.',                      changes: { rangeMultiplier: 1.6 } },
        { id: 'concussive_force',  name: 'Concussive Force',  icon: '😵', description: 'Stun lasts twice as long.',                              changes: { statusEffect: { type: 'stun', duration: 2.4 } } },
        { id: 'thunder_strike',    name: 'Thunder Strike',    icon: '⚡', description: 'Massive damage increase and shorter cooldown.',           changes: { damageMultiplier: 2.2, cooldownMultiplier: 0.7 } }
      ]
    },
    {
      id: 'phantom_double',
      name: 'Phantom Double',
      icon: '👤',
      description: 'Conjures a phantom that looks just like you. Enemies abandon you and swarm it instead. Lasts until destroyed or time runs out.',
      cooldown: 14.0,
      damage: 0,
      projectileSpeed: 0,
      armorPenetration: 0,
      pierce: 0,
      bounce: 0,
      range: 0,
      targeting: 'decoy',
      decoyHp: 70,
      decoyDuration: 10.0,
      chainCount: 0,
      chainRange: 0,
      areaRadius: 0,
      statusEffect: null,
      projectileCount: 1,
      upgrades: [
        { id: 'tougher_double',   name: 'Tougher Double',   icon: '🛡️', description: 'Decoy has 80 more HP and lasts 5 seconds longer.',        changes: { decoyHpBonus: 80, decoyDurationBonus: 5.0 } },
        { id: 'twin_decoys',      name: 'Twin Decoys',      icon: '👥', description: 'Conjures two phantoms simultaneously.',                  changes: { projectileCount: 1 } },
        { id: 'volatile_double',  name: 'Volatile Double',  icon: '💥', description: 'Phantom explodes on death, dealing 60 damage nearby.',   changes: { decoyExplosion: true } }
      ]
    },
    {
      id: 'dazzling_lights',
      name: 'Dazzling Lights',
      icon: '✦',
      description: 'Fires four brilliant bolts simultaneously along the diagonals — northeast, northwest, southeast, and southwest.',
      cooldown: 1.8,
      damage: 14,
      projectileSpeed: 9,
      armorPenetration: 0,
      pierce: 0,
      bounce: 0,
      range: 480,
      targeting: 'radial',
      radialCount: 4,
      angleOffset: Math.PI / 4,
      chainCount: 0,
      chainRange: 0,
      areaRadius: 0,
      statusEffect: null,
      upgrades: [
        { id: 'prismatic_split',  name: 'Prismatic Split',  icon: '🔷', description: 'Each bolt splits into two on impact, firing perpendicular.',  changes: { splitProjectiles: 2, splitDamageMultiplier: 0.6 } },
        { id: 'blinding_flash',   name: 'Blinding Flash',   icon: '💥', description: 'Bolts stun enemies briefly on hit.',                          changes: { statusEffect: { type: 'stun', duration: 0.6 } } },
        { id: 'radiant_cross',    name: 'Radiant Cross',    icon: '✨', description: 'Fires 4 additional bolts filling the gaps — 8 directions total.', changes: { radialCount: 4 } }
      ]
    },
    {
      id: 'phantom_gyre',
      name: 'Phantom Gyre',
      icon: '🌀',
      description: 'Three phantom orbs orbit the caster, cycling between solid and ethereal states. Only damage enemies while solid — plan your positioning.',
      cooldown: 7.5,
      damage: 26,
      projectileSpeed: 0,
      armorPenetration: 2,
      pierce: 99,
      bounce: 0,
      range: 88,
      targeting: 'orbit',
      orbitSpeed: 0.065,
      orbitDuration: 7.5,
      phasing: true,
      phaseDuration: 1.6,
      chainCount: 0,
      chainRange: 0,
      areaRadius: 0,
      projectileCount: 3,
      statusEffect: null,
      upgrades: [
        { id: 'spectral_surge',  name: 'Spectral Surge',  icon: '👻', description: 'Orbs deal 60% more damage while solid.',                   changes: { damageMultiplier: 1.6 } },
        { id: 'rapid_phase',     name: 'Rapid Phase',     icon: '🔄', description: 'Adds a fourth orb and orbs orbit faster.',                  changes: { projectileCount: 1, orbitSpeedMultiplier: 1.4 } },
        { id: 'ghost_surge',     name: 'Ghost Surge',     icon: '💀', description: 'Orbs now also damage and slow enemies while ethereal.',     changes: { statusEffect: { type: 'slow', amount: 0.35, duration: 1.0 } } }
      ]
    },
    {
      id: 'soul_whirl',
      name: 'Soul Whirl',
      icon: '💫',
      description: 'Fires bolts that curve in wide arcs, sweeping around the caster in spiral patterns. Half curve left, half curve right.',
      cooldown: 1.4,
      damage: 18,
      projectileSpeed: 8,
      armorPenetration: 1,
      pierce: 1,
      bounce: 0,
      range: 700,
      targeting: 'whirl',
      curveRate: 0.052,
      chainCount: 0,
      chainRange: 0,
      areaRadius: 0,
      projectileCount: 2,
      statusEffect: null,
      upgrades: [
        { id: 'tighter_spiral',  name: 'Tighter Spiral',  icon: '🌀', description: 'Bolts curve more sharply, covering a wider sweep.',        changes: { curveRateMultiplier: 1.5 } },
        { id: 'soul_barrage',    name: 'Soul Barrage',    icon: '💥', description: 'Two additional bolts arc from each side.',                  changes: { projectileCount: 2 } },
        { id: 'void_curve',      name: 'Void Curve',      icon: '🌑', description: 'Bolts hit much harder and shred armor.',                    changes: { damageMultiplier: 1.7, armorPenetration: 3 } }
      ]
    },
    {
      id: 'chrono_needle',
      name: 'Chrono Needle',
      icon: '🕰️',
      description: 'Fires a needle that marks an enemy. After 2 seconds, it detonates — dealing damage based on how far the target moved while marked. Punishes fast enemies.',
      cooldown: 2.2,
      damage: 8,
      projectileSpeed: 14,
      armorPenetration: 1,
      pierce: 0,
      bounce: 0,
      range: 520,
      targeting: 'nearest',
      isChrono: true,
      chronoDelay: 2.0,
      chronoBaseDamage: 12,
      chainCount: 0,
      chainRange: 0,
      areaRadius: 0,
      statusEffect: null,
      upgrades: [
        { id: 'temporal_rupture', name: 'Temporal Rupture', icon: '⏳', description: 'Marked enemies are slowed before detonation.',            changes: { statusEffect: { type: 'slow', amount: 0.45, duration: 2.0 } } },
        { id: 'time_debt',        name: 'Time Debt',        icon: '💸', description: 'Detonation damage multiplier increases 50% more.',        changes: { chronoMultiplierBonus: 0.5 } },
        { id: 'paradox_chain',    name: 'Paradox Chain',    icon: '🔗', description: 'Detonation marks all nearby enemies.',                    changes: { chronoChain: true } }
      ]
    },
    {
      id: 'leyline_harp',
      name: 'Leyline Harp',
      icon: '🎵',
      description: 'Places two magical notes on either side of you. A damaging beam connects them, slicing through any enemy that crosses the line.',
      cooldown: 3.5,
      damage: 18,
      projectileSpeed: 0,
      armorPenetration: 1,
      pierce: 99,
      bounce: 0,
      range: 110,
      targeting: 'harp',
      harpDuration: 3.5,
      chainCount: 0,
      chainRange: 0,
      areaRadius: 0,
      statusEffect: null,
      upgrades: [
        { id: 'third_note',       name: 'Third Note',       icon: '🎶', description: 'Creates a triangle — three beams instead of one.',        changes: { harpThird: true } },
        { id: 'resonant_strings', name: 'Resonant Strings', icon: '😵', description: 'Enemies hit by beams are briefly stunned.',               changes: { statusEffect: { type: 'stun', duration: 0.5 } } },
        { id: 'harmonic_surge',   name: 'Harmonic Surge',   icon: '💥', description: 'Beams pulse extra damage every second.',                  changes: { harpPulse: true } }
      ]
    },
    {
      id: 'hungry_grimoire',
      name: 'Hungry Grimoire',
      icon: '📖',
      description: 'A flying spellbook orbits loosely and absorbs enemy projectiles. After devouring enough, it spits out a massive arcane blast.',
      cooldown: 8.0,
      damage: 60,
      projectileSpeed: 0,
      armorPenetration: 3,
      pierce: 99,
      bounce: 0,
      range: 90,
      targeting: 'grimoire',
      grimoireCharges: 0,
      grimoireMaxCharges: 5,
      chainCount: 0,
      chainRange: 0,
      areaRadius: 50,
      areaDamageMultiplier: 0.8,
      statusEffect: null,
      upgrades: [
        { id: 'voracious_pages',  name: 'Voracious Pages',  icon: '📚', description: 'Charges faster — kills also count toward the blast.',     changes: { grimoireFeedOnKill: true } },
        { id: 'forbidden_chapter',name: 'Forbidden Chapter', icon: '☠️', description: 'Blast poisons every enemy hit.',                          changes: { statusEffect: { type: 'poison', amount: 8, duration: 3.0 } } },
        { id: 'library_swarm',    name: 'Library Swarm',    icon: '📕', description: 'Summons a second smaller book that orbits alongside.',    changes: { projectileCount: 1 } }
      ]
    },
    {
      id: 'mirror_glyph',
      name: 'Mirror Glyph',
      icon: '🪞',
      description: 'A floating mirror orbits you and echoes your last spell at 55% power from its own position — positioning your mirror becomes a second form of aim.',
      cooldown: 1.2,
      damage: 0,
      projectileSpeed: 0,
      armorPenetration: 0,
      pierce: 0,
      bounce: 0,
      range: 115,
      targeting: 'mirror',
      mirrorCount: 1,
      mirrorPower: 0.55,
      mirrorExplosion: false,
      chainCount: 0,
      chainRange: 0,
      areaRadius: 0,
      areaDamageMultiplier: 0,
      statusEffect: null,
      upgrades: [
        { id: 'twin_reflection',  name: 'Twin Reflection',  icon: '🔀', description: 'Summons two mirrors.',                                        changes: { mirrorCount: 1 } },
        { id: 'perfect_echo',     name: 'Perfect Echo',     icon: '✨', description: 'Reflected spells deal 85% power instead of 55%.',             changes: { mirrorPower: 0.85 } },
        { id: 'shattered_mirror', name: 'Shattered Mirror', icon: '💥', description: 'Mirror explodes when it expires, dealing 50 damage nearby.', changes: { mirrorExplosion: true } }
      ]
    },
    {
      id: 'magma_orb',
      name: 'Magma Orb',
      icon: '🌋',
      description: 'Conjures a massive, slow-moving sphere of magma that homes in on the nearest enemy. Hits like a falling mountain and scorches everything nearby.',
      cooldown: 4.5,
      damage: 68,
      projectileSpeed: 2.5,
      projectileCount: 1,
      spreadAngle: 0,
      armorPenetration: 2,
      pierce: 0,
      bounce: 0,
      range: 700,
      areaRadius: 90,
      areaDamageMultiplier: 0.65,
      targeting: 'highestThreat',
      chainCount: 0,
      chainRange: 0,
      statusEffect: null,
      upgrades: [
        { id: 'pyroclasm',      name: 'Pyroclasm',      icon: '💥', description: 'Explosion radius grows 60% wider — nothing nearby walks away.',           changes: { areaRadiusMultiplier: 1.6 } },
        { id: 'scorched_earth', name: 'Scorched Earth', icon: '🔥', description: 'Leaves a burning ground patch on detonation.',                            changes: { groundEffect: { type: 'burn', duration: 4.0, dps: 14 } } },
        { id: 'twin_magma',     name: 'Twin Magma',     icon: '🌋', description: 'Fires two orbs simultaneously.',                                           changes: { projectileCount: 1, spreadAngle: 0.18 } }
      ]
    },
    {
      id: 'fault_lines',
      name: 'Fault Lines',
      icon: '💠',
      description: 'Tears open glowing arcane rifts in the ground nearby. Any enemy that walks through one detonates it for massive area damage.',
      cooldown: 3.5,
      damage: 58,
      projectileSpeed: 0,
      armorPenetration: 3,
      pierce: 0,
      bounce: 0,
      range: 200,
      areaRadius: 78,
      areaDamageMultiplier: 1,
      targeting: 'rift',
      riftCount: 2,
      riftDuration: 8.0,
      riftChain: false,
      chainCount: 0,
      chainRange: 0,
      statusEffect: null,
      upgrades: [
        { id: 'deeper_cracks',   name: 'Deeper Cracks',   icon: '🌐', description: 'Places 2 additional rifts per cast.',                                      changes: { riftCount: 2 } },
        { id: 'shockwave_burst', name: 'Shockwave Burst', icon: '⚡', description: 'Detonation stuns every enemy in the blast for 1 second.',                  changes: { statusEffect: { type: 'stun', duration: 1.0 } } },
        { id: 'cascade',         name: 'Cascade',         icon: '🔗', description: 'Detonating a rift instantly detonates all nearby rifts in a chain.',       changes: { riftChain: true } }
      ]
    },
    {
      id: 'viceroy_missile',
      name: "Viceroy's Cringe Missile",
      icon: '🤡',
      description: 'Launches a chaotic, wildly wobbling missile with an embarrassing sound effect. Its unpredictable path makes it surprisingly hard to dodge.',
      cooldown: 2.2,
      damage: 38,
      projectileSpeed: 6.5,
      projectileCount: 1,
      spreadAngle: 0,
      armorPenetration: 1,
      pierce: 0,
      bounce: 2,
      range: 750,
      areaRadius: 0,
      areaDamageMultiplier: 0,
      targeting: 'nearest',
      chainCount: 0,
      chainRange: 0,
      statusEffect: null,
      upgrades: [
        { id: 'maximum_cringe',  name: 'Maximum Cringe',  icon: '😬', description: 'Fires 3 chaotic missiles simultaneously.',                               changes: { projectileCount: 2, spreadAngle: 0.3 } },
        { id: 'extra_bouncy',    name: 'Extra Bouncy',    icon: '🎾', description: 'Bounces 3 additional times and gains armor penetration.',                 changes: { bounce: 3, armorPenetration: 3 } },
        { id: 'critical_cringe', name: 'Critical Cringe', icon: '💥', description: 'Damage nearly doubled. The sound is louder.',                            changes: { damageMultiplier: 1.9 } }
      ]
    },
    {
      id: 'stax_black_sauce',
      name: "Stax's Black Sauce",
      icon: '🖤',
      description: 'Spews a gushing torrent of thick black arcane goo in the direction you\'re moving. Enemies caught in the spray are poisoned and slowed.',
      cooldown: 0.4,
      damage: 8,
      projectileSpeed: 5.5,
      projectileCount: 3,
      spreadAngle: 0.35,
      armorPenetration: 0,
      pierce: 0,
      bounce: 0,
      range: 430,
      areaRadius: 0,
      areaDamageMultiplier: 0,
      targeting: 'sauce',
      chainCount: 0,
      chainRange: 0,
      statusEffect: { type: 'poison', amount: 6, duration: 2.5 },
      upgrades: [
        { id: 'viscous_blend',   name: 'Viscous Blend',   icon: '🌊', description: 'Sauce becomes a thick sludge that slows enemies by 45% for 2 seconds.',  changes: { statusEffect: { type: 'slow', amount: 0.45, duration: 2.0 } } },
        { id: 'extra_pressure',  name: 'Extra Pressure',  icon: '💪', description: 'More projectiles, wider spray.',                                         changes: { projectileCount: 2, spreadAngle: 0.15 } },
        { id: 'toxic_deluge',    name: 'Toxic Deluge',    icon: '☠️',  description: 'Poison deals 60% more damage per tick.',                                changes: { damageMultiplier: 1.6 } }
      ]
    },
    {
      id: 'afro_samurai_blade',
      name: "Afro Samurai's Final Blade",
      icon: '🗡️',
      description: 'A single devastating blade flies toward the nearest enemy, cuts through everything in its path, then returns to you — slicing again on the way back.',
      cooldown: 3.2,
      damage: 95,
      projectileSpeed: 13,
      projectileCount: 1,
      spreadAngle: 0,
      armorPenetration: 5,
      pierce: 99,
      bounce: 0,
      range: 550,
      areaRadius: 0,
      areaDamageMultiplier: 0,
      targeting: 'highestThreat',
      chainCount: 0,
      chainRange: 0,
      statusEffect: null,
      upgrades: [
        { id: 'phantom_strike', name: 'Phantom Strike', icon: '👻', description: 'Two additional phantom slashes follow each strike, dealing 70% damage.',        changes: { projectileCount: 2, splitProjectiles: 1, splitDamageMultiplier: 0.7 } },
        { id: 'blood_price',    name: 'Blood Price',    icon: '🩸', description: 'Each slash lifesteals — heals 25% of all cutting damage dealt.',               changes: { lifesteal: 0.25 } },
        { id: 'final_form',     name: 'Final Form',     icon: '⚡', description: 'Slashes deal nearly double damage and shred through any armor.',               changes: { damageMultiplier: 1.9, armorPenetration: 8 } }
      ]
    },
    {
      id: 'ward_shell',
      name: 'Ward Shell',
      icon: '🫧',
      description: 'Conjures a tiny arcane shell that clings right around you. Destroys incoming projectiles on contact and violently repels any enemy that touches it.',
      cooldown: 3.5,
      damage: 18,
      projectileSpeed: 0,
      projectileCount: 0,
      spreadAngle: 0,
      armorPenetration: 2,
      pierce: 0,
      bounce: 0,
      range: 88,
      areaRadius: 0,
      areaDamageMultiplier: 0,
      targeting: 'shell',
      chainCount: 0,
      chainRange: 0,
      statusEffect: null,
      shellDuration: 2.3,
      upgrades: [
        { id: 'fortified_shell', name: 'Fortified Shell', icon: '🛡️', description: 'Shell damage doubled and lasts 1.5 seconds longer.',               changes: { damageMultiplier: 2.0, shellDurationBonus: 1.5 } },
        { id: 'spiked_shell',    name: 'Spiked Shell',    icon: '🔺', description: 'Enemies repelled by the shell are slowed for 1.5 seconds.',         changes: { statusEffect: { type: 'slow', amount: 0.4, duration: 1.5 } } },
        { id: 'resonant_ward',   name: 'Resonant Ward',   icon: '✨', description: 'Shell activates 40% more often and grows 30% larger.',              changes: { cooldownMultiplier: 0.6, rangeMultiplier: 1.3 } }
      ]
    },
    {
      id: 'arcane_spikes',
      name: 'Arcane Spikes',
      icon: '🔺',
      description: 'Plants 3 small arcane spike traps at distant positions. Any enemy that walks through one takes damage — small, static, and easy to miss in the chaos.',
      cooldown: 5.5,
      damage: 42,
      projectileSpeed: 0,
      projectileCount: 0,
      spreadAngle: 0,
      armorPenetration: 3,
      pierce: 0,
      bounce: 0,
      range: 340,
      areaRadius: 0,
      areaDamageMultiplier: 0,
      targeting: 'spikes',
      chainCount: 0,
      chainRange: 0,
      statusEffect: { type: 'slow', amount: 0.3, duration: 1.2 },
      spikeCount: 3,
      spikeRadius: 26,
      spikeDuration: 8.0,
      upgrades: [
        { id: 'more_spikes',    name: 'More Spikes',    icon: '⬆️', description: 'Plants 3 additional spikes per cast.',                              changes: { spikeCount: 3 } },
        { id: 'venomous_tips',  name: 'Venomous Tips',  icon: '☠️', description: 'Spikes now poison enemies for 3 seconds instead of slowing.',       changes: { statusEffect: { type: 'poison', amount: 8, duration: 3.0 } } },
        { id: 'iron_spikes',    name: 'Iron Spikes',    icon: '⚙️', description: 'Spike damage doubled and armor penetration greatly increased.',      changes: { damageMultiplier: 2.0, armorPenetration: 6 } }
      ]
    },
    {
      id: 'hammer_toss',
      name: 'Hammer Toss',
      icon: '🔨',
      description: 'Hurls a massive war hammer that crashes into the nearest enemy with a shockwave, then ricochets to the next closest target. Slow, heavy, and devastating.',
      cooldown: 2.5,
      damage: 82,
      projectileSpeed: 5.5,
      projectileCount: 1,
      spreadAngle: 0,
      armorPenetration: 5,
      pierce: 0,
      bounce: 0,
      range: 680,
      areaRadius: 55,
      areaDamageMultiplier: 0.5,
      targeting: 'highestThreat',
      chainCount: 2,
      chainRange: 220,
      statusEffect: { type: 'stun', duration: 0.65 },
      upgrades: [
        { id: 'shockwave_slam', name: 'Shockwave Slam', icon: '💥', description: 'Impact shockwave grows 60% wider, stunning all nearby foes.',           changes: { areaRadius: 40 } },
        { id: 'ricochet_fury',  name: 'Ricochet Fury',  icon: '🔁', description: 'Hammer ricochets to 3 more enemies and fires 20% faster.',             changes: { chainCount: 3, cooldownMultiplier: 0.8 } },
        { id: 'mjolnir',        name: 'Mjolnir',        icon: '⚡', description: 'Damage nearly doubled and armor shredding greatly increased.',          changes: { damageMultiplier: 1.9, armorPenetration: 7 } }
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
  ],

  // ── WEAPON COMBOS ─────────────────────────────────────────────
  // Each combo requires owning both listed weapons.
  // Once both are owned, the combo appears as a SYNERGY choice on level-up.
  // Every weapon appears in exactly 2 combos.
  combos: [
    // ─── CYCLE 1: FIRE ──────────────────────────────────────────
    {
      id: 'blazing_phoenix', name: 'Blazing Phoenix', icon: '🦅',
      requires: ['firebolt', 'phoenix_wings'],
      description: 'Firebolt splits into 3 bolts on impact. Phoenix Wings bolts deal 80% more damage and pierce one extra enemy.',
      weaponBoosts: [
        { weaponId: 'firebolt',      splitProjectiles: 2, splitDamageMultiplier: 0.75, damageMultiplier: 1.5 },
        { weaponId: 'phoenix_wings', damageMultiplier: 1.8, pierce: 1 }
      ]
    },
    {
      id: 'eruption_wings', name: 'Eruption Wings', icon: '🌋',
      requires: ['phoenix_wings', 'magma_orb'],
      description: 'Phoenix Wings bolts scorch the ground on impact. Magma Orb explosion grows 80% wider and fires 35% faster.',
      weaponBoosts: [
        { weaponId: 'phoenix_wings', damageMultiplier: 1.5, groundEffect: { type: 'burn', duration: 2.0, dps: 12 } },
        { weaponId: 'magma_orb',     areaRadiusMultiplier: 1.8, cooldownMultiplier: 0.65 }
      ]
    },
    {
      id: 'volcanic_siege', name: 'Volcanic Siege', icon: '☄️',
      requires: ['magma_orb', 'meteor_sigil'],
      description: 'Each Meteor spawns 2 follow-up impacts. Magma Orb fires twice as fast and deals double damage.',
      weaponBoosts: [
        { weaponId: 'magma_orb',    damageMultiplier: 2.0, cooldownMultiplier: 0.5 },
        { weaponId: 'meteor_sigil', followupMeteors: 2, followupDamageMultiplier: 0.65, damageMultiplier: 1.5 }
      ]
    },
    {
      id: 'extinction_event', name: 'Extinction Event', icon: '🌠',
      requires: ['meteor_sigil', 'starfall'],
      description: 'Starfall rains 3 extra stars and deals 2.5× damage. Meteor hits 80% harder and cooldown shrinks 40%.',
      weaponBoosts: [
        { weaponId: 'meteor_sigil', damageMultiplier: 1.8, cooldownMultiplier: 0.6 },
        { weaponId: 'starfall',     damageMultiplier: 2.5, projectileCount: 3 }
      ]
    },
    {
      id: 'comet_wake', name: 'Comet Wake', icon: '💫',
      requires: ['starfall', 'arcane_trail'],
      description: 'Starfall impacts leave burning ground. Arcane Trail spheres deal triple damage.',
      weaponBoosts: [
        { weaponId: 'starfall',     damageMultiplier: 1.8, groundEffect: { type: 'burn', duration: 3.0, dps: 14 } },
        { weaponId: 'arcane_trail', damageMultiplier: 3.0 }
      ]
    },
    {
      id: 'infernal_march', name: 'Infernal March', icon: '🔥',
      requires: ['arcane_trail', 'firebolt'],
      description: 'Arcane Trail now poisons every enemy it scars. Firebolt deals double damage and pierces 2 additional enemies.',
      weaponBoosts: [
        { weaponId: 'arcane_trail', damageMultiplier: 2.0, statusEffect: { type: 'poison', amount: 10, duration: 3.0 } },
        { weaponId: 'firebolt',     damageMultiplier: 2.0, pierce: 2 }
      ]
    },

    // ─── CYCLE 2: ICE / VOID ───────────────────────────────────
    {
      id: 'null_winter', name: 'Null Winter', icon: '❄️',
      requires: ['frost_shard', 'void_lance'],
      description: 'Void Lance now slows everything it tears through. Frost Shard gains massive armor penetration and fires 40% faster.',
      weaponBoosts: [
        { weaponId: 'frost_shard', damageMultiplier: 1.8, armorPenetration: 5, cooldownMultiplier: 0.6 },
        { weaponId: 'void_lance',  statusEffect: { type: 'slow', amount: 0.55, duration: 3.5 }, damageMultiplier: 1.6 }
      ]
    },
    {
      id: 'void_fissure', name: 'Void Fissure', icon: '🕳️',
      requires: ['void_lance', 'fault_lines'],
      description: 'Fault Lines now pull enemies to their center before detonating. Void Lance pull range doubles and damage increases 80%.',
      weaponBoosts: [
        { weaponId: 'void_lance',  pullRadius: 160, pullStrength: 4.0, damageMultiplier: 1.8 },
        { weaponId: 'fault_lines', damageMultiplier: 2.0, areaRadiusMultiplier: 1.5, riftCount: 1 }
      ]
    },
    {
      id: 'seismic_blast', name: 'Seismic Blast', icon: '💥',
      requires: ['fault_lines', 'force_pulse'],
      description: 'Force Pulse now deals 40 damage and detonates all nearby rifts when it fires. Fault Lines gain instant chain detonation.',
      weaponBoosts: [
        { weaponId: 'fault_lines', damageMultiplier: 1.8, riftChain: true },
        { weaponId: 'force_pulse', damageOverride: 40, areaRadius: 55, areaDamageMultiplier: 1.0, statusEffect: { type: 'stun', duration: 0.8 } }
      ]
    },
    {
      id: 'temporal_shockwave', name: 'Temporal Shockwave', icon: '🕰️',
      requires: ['force_pulse', 'chrono_needle'],
      description: 'Force Pulse marks every enemy it hits with a Chrono Needle. Chrono detonations deal double damage and chain to nearby enemies.',
      weaponBoosts: [
        { weaponId: 'force_pulse',   damageOverride: 25, areaRadius: 45, areaDamageMultiplier: 1.0, statusEffect: { type: 'stun', duration: 1.0 } },
        { weaponId: 'chrono_needle', damageMultiplier: 2.0, chronoMultiplierBonus: 0.5, chronoChain: true }
      ]
    },
    {
      id: 'phase_paradox', name: 'Phase Paradox', icon: '🌀',
      requires: ['chrono_needle', 'phantom_gyre'],
      description: 'Phantom Gyre orbits 50% faster and deals double damage. Chrono Needles chain to nearby enemies on detonation.',
      weaponBoosts: [
        { weaponId: 'chrono_needle', damageMultiplier: 1.8, chronoChain: true },
        { weaponId: 'phantom_gyre',  damageMultiplier: 2.0, orbitSpeedMultiplier: 1.5 }
      ]
    },
    {
      id: 'glacial_orbit', name: 'Glacial Orbit', icon: '🧊',
      requires: ['phantom_gyre', 'frost_shard'],
      description: 'Phantom Gyre orbs slow every enemy they pass through. Frost Shard splits into 4 shards on impact.',
      weaponBoosts: [
        { weaponId: 'phantom_gyre', damageMultiplier: 1.7, statusEffect: { type: 'slow', amount: 0.45, duration: 2.5 } },
        { weaponId: 'frost_shard',  damageMultiplier: 1.8, splitProjectiles: 3, splitDamageMultiplier: 0.65 }
      ]
    },

    // ─── CYCLE 3: LIGHTNING / ARCANE ───────────────────────────
    {
      id: 'electrostatic_field', name: 'Electrostatic Field', icon: '⚡',
      requires: ['spark_chain', 'rune_burst'],
      description: 'Spark Chain gains 6 more chains and fires 30% faster. Rune Burst deals double damage with 4 extra runes per burst.',
      weaponBoosts: [
        { weaponId: 'spark_chain', chainCount: 6, damageMultiplier: 1.8, cooldownMultiplier: 0.7 },
        { weaponId: 'rune_burst',  damageMultiplier: 2.0, radialCount: 4 }
      ]
    },
    {
      id: 'orbiting_runes', name: 'Orbiting Runes', icon: '🔮',
      requires: ['rune_burst', 'arcane_orb'],
      description: 'Arcane Orb detonates a rune burst on every bounce and gains 2 extra bounces. Rune Burst pierces enemies and fires 2 extra runes.',
      weaponBoosts: [
        { weaponId: 'rune_burst',  damageMultiplier: 1.8, pierce: 2, radialCount: 2 },
        { weaponId: 'arcane_orb',  damageMultiplier: 2.5, bounce: 2, runeBlastCount: 6, runeBlastDamage: 14 }
      ]
    },
    {
      id: 'prismatic_lattice', name: 'Prismatic Lattice', icon: '🔷',
      requires: ['arcane_orb', 'arcane_cube'],
      description: 'Arcane Cube walls slow and detonate with area energy at their corners. Arcane Orb pulls enemies on each bounce.',
      weaponBoosts: [
        { weaponId: 'arcane_orb',  damageMultiplier: 2.0, pullRadius: 80, pullStrength: 2.0, bounce: 1 },
        { weaponId: 'arcane_cube', damageMultiplier: 1.8, areaRadius: 65, areaDamageMultiplier: 0.85, statusEffect: { type: 'slow', amount: 0.4, duration: 1.5 } }
      ]
    },
    {
      id: 'resonant_edge', name: 'Resonant Edge', icon: '⚔️',
      requires: ['arcane_cube', 'phase_blade'],
      description: 'Phase Blade orbit radius doubles and damage triples. Arcane Cube walls stun every enemy they sweep through.',
      weaponBoosts: [
        { weaponId: 'arcane_cube', statusEffect: { type: 'stun', duration: 0.7 }, damageMultiplier: 1.5 },
        { weaponId: 'phase_blade', damageMultiplier: 3.0, rangeMultiplier: 2.0 }
      ]
    },
    {
      id: 'thunderblade', name: 'Thunderblade', icon: '🌩️',
      requires: ['phase_blade', 'thunder_clap'],
      description: 'Thunder Clap blasts 60% wider and deals double damage with 40% shorter cooldown. Phase Blade stuns every enemy it slices.',
      weaponBoosts: [
        { weaponId: 'phase_blade',  damageMultiplier: 2.5, statusEffect: { type: 'stun', duration: 0.5 } },
        { weaponId: 'thunder_clap', damageMultiplier: 2.0, areaRadiusMultiplier: 1.6, cooldownMultiplier: 0.6 }
      ]
    },
    {
      id: 'rolling_thunder', name: 'Rolling Thunder', icon: '🌩️',
      requires: ['thunder_clap', 'spark_chain'],
      description: 'Spark Chain gains 8 extra chains and fires twice as fast. Thunder Clap cooldown halved and stun duration doubled.',
      weaponBoosts: [
        { weaponId: 'thunder_clap', cooldownMultiplier: 0.5, damageMultiplier: 1.8, statusEffect: { type: 'stun', duration: 2.4 } },
        { weaponId: 'spark_chain',  chainCount: 8, damageMultiplier: 1.6, cooldownMultiplier: 0.5 }
      ]
    },

    // ─── CYCLE 4: SHADOW / DEATH ────────────────────────────────
    {
      id: 'plague_spine', name: 'Plague Spine', icon: '🦴',
      requires: ['shadow_bolt', 'bone_spear'],
      description: 'Bone Spear poisons every enemy it pierces. Shadow Bolt travels at double speed and deals triple damage.',
      weaponBoosts: [
        { weaponId: 'shadow_bolt', damageMultiplier: 3.0, projectileSpeedMultiplier: 2.0 },
        { weaponId: 'bone_spear',  statusEffect: { type: 'poison', amount: 8, duration: 3.0 }, damageMultiplier: 1.8 }
      ]
    },
    {
      id: 'bone_puppet', name: 'Bone Puppet', icon: '🪆',
      requires: ['bone_spear', 'phantom_double'],
      description: 'Phantom Double gains 150 HP, lasts 5 extra seconds, and explodes on death. Bone Spear pierces 5 additional enemies.',
      weaponBoosts: [
        { weaponId: 'bone_spear',     damageMultiplier: 2.0, pierce: 5 },
        { weaponId: 'phantom_double', decoyHpBonus: 150, decoyDurationBonus: 5, decoyExplosion: true }
      ]
    },
    {
      id: 'haunted_library', name: 'Haunted Library', icon: '📚',
      requires: ['phantom_double', 'hungry_grimoire'],
      description: 'Grimoire charges on every kill and blasts in double the radius at 2.5× damage. Decoy gets extra HP and a longer lease on life.',
      weaponBoosts: [
        { weaponId: 'phantom_double',  decoyHpBonus: 80, decoyDurationBonus: 3 },
        { weaponId: 'hungry_grimoire', damageMultiplier: 2.5, grimoireFeedOnKill: true, areaRadiusMultiplier: 2.0 }
      ]
    },
    {
      id: 'toxic_library', name: 'Toxic Library', icon: '☠️',
      requires: ['hungry_grimoire', 'plague_pool'],
      description: 'Grimoire blast poisons every enemy hit. Plague Pools become massive, highly lethal toxic swamps.',
      weaponBoosts: [
        { weaponId: 'hungry_grimoire', damageMultiplier: 1.8, statusEffect: { type: 'poison', amount: 12, duration: 4.0 } },
        { weaponId: 'plague_pool',     groundEffect: { type: 'toxic', duration: 12.0, dps: 22 }, areaRadius: 95 }
      ]
    },
    {
      id: 'toxic_spiral', name: 'Toxic Spiral', icon: '💫',
      requires: ['plague_pool', 'soul_whirl'],
      description: 'Soul Whirl bolts poison every enemy they arc through. Plague Pools linger far longer and deal triple damage.',
      weaponBoosts: [
        { weaponId: 'plague_pool', groundEffect: { type: 'toxic', duration: 10.0, dps: 20 }, areaRadius: 82 },
        { weaponId: 'soul_whirl',  damageMultiplier: 2.0, statusEffect: { type: 'poison', amount: 10, duration: 3.0 }, pierce: 2 }
      ]
    },
    {
      id: 'venom_vortex', name: 'Venom Vortex', icon: '💜',
      requires: ['soul_whirl', 'shadow_bolt'],
      description: 'Shadow Bolt deals triple damage and arcs like Soul Whirl. Soul Whirl bolts spiral more tightly, shredding everything in their path.',
      weaponBoosts: [
        { weaponId: 'soul_whirl',  damageMultiplier: 2.5, curveRateMultiplier: 1.6, pierce: 2 },
        { weaponId: 'shadow_bolt', damageMultiplier: 3.0, projectileSpeedMultiplier: 1.6 }
      ]
    },

    // ─── CYCLE 5: UTILITY / ARCANE ──────────────────────────────
    {
      id: 'missile_storm', name: 'Missile Storm', icon: '✨',
      requires: ['magic_missiles', 'mirror_glyph'],
      description: 'Mirror echoes full missile barrages at near full power. Magic Missiles gains 5 extra missiles and fires 50% faster.',
      weaponBoosts: [
        { weaponId: 'magic_missiles', projectileCount: 5, damageMultiplier: 1.5, projectileSpeedMultiplier: 1.3 },
        { weaponId: 'mirror_glyph',   mirrorPower: 0.92, mirrorCount: 1 }
      ]
    },
    {
      id: 'hall_of_mirrors', name: 'Hall of Mirrors', icon: '🪞',
      requires: ['mirror_glyph', 'dazzling_lights'],
      description: 'Two extra mirrors orbit you, echoing spells. Dazzling Lights deals 2.5× damage and pierces every enemy it hits.',
      weaponBoosts: [
        { weaponId: 'mirror_glyph',    mirrorCount: 2, mirrorPower: 0.85 },
        { weaponId: 'dazzling_lights', damageMultiplier: 2.5, pierce: 2 }
      ]
    },
    {
      id: 'prismatic_strings', name: 'Prismatic Strings', icon: '🎵',
      requires: ['dazzling_lights', 'leyline_harp'],
      description: 'Dazzling Lights bolts stun every enemy they hit. Leyline Harp beams stun and pulse extra damage every second.',
      weaponBoosts: [
        { weaponId: 'dazzling_lights', damageMultiplier: 1.8, statusEffect: { type: 'stun', duration: 0.6 } },
        { weaponId: 'leyline_harp',    damageMultiplier: 2.0, statusEffect: { type: 'stun', duration: 1.0 }, harpPulse: true }
      ]
    },
    {
      id: 'harmonic_barrage', name: 'Harmonic Barrage', icon: '🎶',
      requires: ['leyline_harp', 'magic_missiles'],
      description: 'Leyline Harp adds a third beam and pulses bonus damage every second. Magic Missiles deals double damage and flies 50% faster.',
      weaponBoosts: [
        { weaponId: 'leyline_harp',    damageMultiplier: 2.0, harpPulse: true, harpThird: true },
        { weaponId: 'magic_missiles',  damageMultiplier: 2.0, projectileSpeedMultiplier: 1.5 }
      ]
    },

    // ─── CYCLE 6: NAMED / UNIQUE ────────────────────────────────
    {
      id: 'bombastic_bearing', name: 'Bombastic Bearing', icon: '🧭',
      requires: ['jakes_lament', 'babbage_blast'],
      description: "Jake's Lament beam extends 50% further and lifesteals 15% of all damage. Babbage Blast detonates twice as many runes at double damage.",
      weaponBoosts: [
        { weaponId: 'jakes_lament',  damageMultiplier: 2.0, rangeMultiplier: 1.5, lifesteal: 0.15 },
        { weaponId: 'babbage_blast', runeBlastCount: 6, damageMultiplier: 2.0, cooldownMultiplier: 0.6 }
      ]
    },
    {
      id: 'cringe_barrage', name: 'Cringe Barrage', icon: '🤡',
      requires: ['babbage_blast', 'viceroy_missile'],
      description: "Viceroy Missiles explode into a full rune burst on impact. Babbage Blast fires 4 extra runes and cooldown halved.",
      weaponBoosts: [
        { weaponId: 'babbage_blast',    damageMultiplier: 1.8, runeBlastCount: 4, cooldownMultiplier: 0.5 },
        { weaponId: 'viceroy_missile',  runeBlastCount: 8, runeBlastDamage: 14, damageMultiplier: 1.6 }
      ]
    },
    {
      id: 'hazmat_missile', name: 'Hazmat Missile', icon: '🖤',
      requires: ['viceroy_missile', 'stax_black_sauce'],
      description: "Viceroy Missiles poison every enemy they hit and bounce 3 more times. Stax's Black Sauce fires 80% further and twice as fast.",
      weaponBoosts: [
        { weaponId: 'viceroy_missile',  statusEffect: { type: 'poison', amount: 10, duration: 3.0 }, damageMultiplier: 1.5, bounce: 3 },
        { weaponId: 'stax_black_sauce', damageMultiplier: 2.0, rangeMultiplier: 1.8, cooldownMultiplier: 0.5 }
      ]
    },
    {
      id: 'trail_blazer', name: 'Trail Blazer', icon: '💨',
      requires: ['stax_black_sauce', 'jakes_lament'],
      description: "Stax's Black Sauce fires 5× faster and deals 50% more damage while charging toward enemies. Jake's beam extends further and lifesteals.",
      weaponBoosts: [
        { weaponId: 'stax_black_sauce', cooldownMultiplier: 0.2, damageMultiplier: 1.5 },
        { weaponId: 'jakes_lament',     damageMultiplier: 2.0, lifesteal: 0.2, rangeMultiplier: 1.4 }
      ]
    },

    // ─── AFRO SAMURAI COMBOS ────────────────────────────────────
    {
      id: 'void_cleave', name: 'Void Cleave', icon: '🌑',
      requires: ['afro_samurai_blade', 'void_lance'],
      description: "The Blade's slashes rend the void — each strike deals area damage and pulls nearby enemies into the cut. Void Lance pierces 4 extra enemies and deals 80% more damage.",
      weaponBoosts: [
        { weaponId: 'afro_samurai_blade', damageMultiplier: 1.8, areaRadius: 45, areaDamageMultiplier: 0.7, pullRadius: 60, pullStrength: 2.0 },
        { weaponId: 'void_lance',         pierce: 4, damageMultiplier: 1.8, armorPenetration: 4 }
      ]
    },
    {
      id: 'dual_blade_mastery', name: 'Dual Blade Mastery', icon: '⚔️',
      requires: ['afro_samurai_blade', 'phase_blade'],
      description: "Two blade weapons, one devastating rhythm. Phase Blade orbit radius triples and deals 3× damage. The Final Blade fires 40% faster with a wider cut.",
      weaponBoosts: [
        { weaponId: 'afro_samurai_blade', cooldownMultiplier: 0.6, spreadAngle: 0.12, damageMultiplier: 1.6 },
        { weaponId: 'phase_blade',        damageMultiplier: 3.0, rangeMultiplier: 3.0 }
      ]
    },

    // ─── WARD SHELL / ARCANE SPIKES COMBOS ──────────────────────
    {
      id: 'thornwall', name: 'Thornwall', icon: '🌵',
      requires: ['ward_shell', 'arcane_spikes'],
      description: "Shell and spikes form a layered defense. Shell radius grows 40%, spikes deal 80% more damage and two extra spikes are planted each cast.",
      weaponBoosts: [
        { weaponId: 'ward_shell',     damageMultiplier: 1.5, rangeMultiplier: 1.4 },
        { weaponId: 'arcane_spikes',  damageMultiplier: 1.8, spikeCount: 2 }
      ]
    },
    {
      id: 'battering_fortress', name: 'Battering Fortress', icon: '🏰',
      requires: ['ward_shell', 'hammer_toss'],
      description: "The shell launches repelled enemies straight into the hammer's path. Shell contact damage doubles. Hammer chains to 3 more targets and hits 70% harder.",
      weaponBoosts: [
        { weaponId: 'ward_shell',   damageMultiplier: 2.0 },
        { weaponId: 'hammer_toss',  damageMultiplier: 1.7, chainCount: 3 }
      ]
    },
    {
      id: 'blade_trap', name: 'Blade Trap', icon: '🗡️',
      requires: ['arcane_spikes', 'afro_samurai_blade'],
      description: "Enemies slowed by spikes meet the returning blade at their worst moment. Blade deals double damage and pierces 3 extra enemies. Spikes shred armor.",
      weaponBoosts: [
        { weaponId: 'arcane_spikes',      damageMultiplier: 1.6, armorPenetration: 6 },
        { weaponId: 'afro_samurai_blade', damageMultiplier: 2.0, pierce: 3 }
      ]
    },

    // ─── HAMMER TOSS COMBOS ─────────────────────────────────────
    {
      id: 'executioners_cadence', name: "Executioner's Cadence", icon: '🪓',
      requires: ['hammer_toss', 'afro_samurai_blade'],
      description: "The Hammer stuns. The Blade finishes. Final Blade deals double damage and pierces 3 extra enemies. Hammer shockwave grows wider and stuns longer.",
      weaponBoosts: [
        { weaponId: 'hammer_toss',        damageMultiplier: 1.7, areaRadius: 40 },
        { weaponId: 'afro_samurai_blade', damageMultiplier: 2.0, pierce: 3 }
      ]
    },
    {
      id: 'iron_whirlwind', name: 'Iron Whirlwind', icon: '🌪️',
      requires: ['hammer_toss', 'phase_blade'],
      description: "Steel meets steel. Phase Blade orbit radius doubles at 2.5× damage. The Hammer ricochets to 3 more targets and hits 60% harder.",
      weaponBoosts: [
        { weaponId: 'hammer_toss',  damageMultiplier: 1.6, chainCount: 3 },
        { weaponId: 'phase_blade',  damageMultiplier: 2.5, rangeMultiplier: 2.0 }
      ]
    }
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
  { id: 'range_up',  name: 'Far Sight',      icon: '🔭', description: '+25% range on all spells.',          apply: p => { p.globalRangeMultiplier = (p.globalRangeMultiplier || 1) * 1.25; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'monkey_paw',   name: 'Shaolin Monkey Paw', icon: '🐾', description: '25% chance to block any hit. Also grants a full shield every 20s that absorbs one hit completely.', apply: p => { p.blockChance = Math.min(0.75, (p.blockChance || 0) + 0.25); if (!p.shieldCooldown) { p.shieldCooldown = 20; p.shieldTimer = 20; } } },
  { id: 'hondas_heals', name: "Honda's Heals",      icon: '💊', description: 'Each enemy kill restores 1 HP.',                                                                  apply: p => { p.killHeal = (p.killHeal || 0) + 1; } },

  // ── Weapon-type passives ──────────────────────────────────
  { id: 'multicast_up',   name: 'Echo Prism',         icon: '🔷', description: '+1 projectile for applicable multi-shot weapons.',
    apply: p => { p.globalProjectileCountBonus = (p.globalProjectileCountBonus || 0) + 1; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'radial_up',      name: 'Star Compass',        icon: '🧭', description: '+2 radial shots for applicable nova and radial weapons.',
    apply: p => { p.globalRadialCountBonus = (p.globalRadialCountBonus || 0) + 2; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'split_up',       name: 'Fracture Lens',       icon: '💎', description: 'Splitting projectiles create +1 extra split.',
    apply: p => { p.globalSplitProjectilesBonus = (p.globalSplitProjectilesBonus || 0) + 1; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'orbit_speed_up', name: 'Gyre Engine',         icon: '🌀', description: '+30% orbit speed for orbiting weapons.',
    apply: p => { p.globalOrbitSpeedMultiplier = (p.globalOrbitSpeedMultiplier || 1) * 1.30; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'curve_up',       name: 'Crescent Geometry',   icon: '🌙', description: '+35% curve rate for arcing and spiral projectiles.',
    apply: p => { p.globalCurveRateMultiplier = (p.globalCurveRateMultiplier || 1) * 1.35; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'chrono_up',      name: 'Time Interest',       icon: '⏳', description: 'Chrono detonations gain +35% bonus scaling.',
    apply: p => { p.globalChronoMultiplierBonus = (p.globalChronoMultiplierBonus || 0) + 0.35; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'rift_up',        name: 'Crackling Fault',     icon: '💠', description: '+1 rift, spike, or trap for applicable ground weapons.',
    apply: p => { p.globalTrapCountBonus = (p.globalTrapCountBonus || 0) + 1; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'ground_effect_up', name: 'Scorched Covenant', icon: '🔥', description: '+25% ground effect duration and damage.',
    apply: p => { p.globalGroundEffectDurationMultiplier = (p.globalGroundEffectDurationMultiplier || 1) * 1.25; p.globalGroundEffectDamageMultiplier = (p.globalGroundEffectDamageMultiplier || 1) * 1.25; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'mirror_power_up', name: 'Silvered Echo',      icon: '🪞', description: '+20% mirror echo power.',
    apply: p => { p.globalMirrorPowerBonus = (p.globalMirrorPowerBonus || 0) + 0.20; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'decoy_mastery',  name: 'False Idol',          icon: '👤', description: '+50 decoy HP and +3 seconds decoy duration.',
    apply: p => { p.globalDecoyHpBonus = (p.globalDecoyHpBonus || 0) + 50; p.globalDecoyDurationBonus = (p.globalDecoyDurationBonus || 0) + 3.0; for (const wi of p.weapons) p.recomputeWeapon(wi); } },

  // ── General stat passives ─────────────────────────────────
  { id: 'damage_up',          name: 'Ember Core',       icon: '🔥', description: '+15% damage on all weapons.',
    apply: p => { p.globalDamageMultiplier = (p.globalDamageMultiplier || 1) * 1.15; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'projectile_speed_up',name: 'Wind Etching',     icon: '🍃', description: '+20% projectile speed.',
    apply: p => { p.globalProjectileSpeedMultiplier = (p.globalProjectileSpeedMultiplier || 1) * 1.20; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'area_up',            name: 'Titan Glyph',      icon: '🌐', description: '+20% area size for applicable weapons.',
    apply: p => { p.globalAreaMultiplier = (p.globalAreaMultiplier || 1) * 1.20; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'duration_up',        name: 'Lingering Hex',    icon: '🕯️', description: '+25% duration for applicable weapon effects.',
    apply: p => { p.globalDurationMultiplier = (p.globalDurationMultiplier || 1) * 1.25; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'pierce_up',          name: 'Needle Threader',  icon: '🪡', description: '+1 pierce for applicable projectiles.',
    apply: p => { p.globalPierceBonus = (p.globalPierceBonus || 0) + 1; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'chain_up',           name: 'Storm Link',       icon: '🔗', description: '+1 chain for applicable weapons.',
    apply: p => { p.globalChainBonus = (p.globalChainBonus || 0) + 1; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'armor_pierce_up',    name: 'Void Needle',      icon: '🕳️', description: '+2 armor penetration on applicable weapons.',
    apply: p => { p.globalArmorPenetrationBonus = (p.globalArmorPenetrationBonus || 0) + 2; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'pull_force_up',      name: 'Gravity Knot',     icon: '🪢', description: 'Pull effects gain +35% pull strength.',
    apply: p => { p.globalPullStrengthMultiplier = (p.globalPullStrengthMultiplier || 1) * 1.35; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'status_duration_up', name: 'Hex Resin',        icon: '🧪', description: '+20% duration for stun, poison, slow, and other status effects.',
    apply: p => { p.globalStatusDurationMultiplier = (p.globalStatusDurationMultiplier || 1) * 1.20; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'knockback_up',       name: 'Thunder Palm',     icon: '✋', description: '+30% knockback force.',
    apply: p => { p.globalKnockbackMultiplier = (p.globalKnockbackMultiplier || 1) * 1.30; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
];
