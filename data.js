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
      name: 'Voltaic Orb',
      icon: '⚡',
      description: 'Fires a crackling sphere of electrical energy at a random enemy. Bounces off world edges, growing more dangerous with every ricochet.',
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
        { id: 'unstable_orb',      name: 'Unstable Charge',   icon: '⚡', description: 'Orb grows stronger after each bounce.',         changes: { damagePerBounce: 1.3 } },
        { id: 'gravity_well',      name: 'Gravity Well',      icon: '🌀', description: 'Orb pulls nearby enemies inward.',              changes: { pullRadius: 100, pullStrength: 0.55 } },
        { id: 'twin_orbs',         name: 'Twin Orbs',         icon: '⚡', description: 'Fires an additional orb.',                     changes: { projectileCount: 1 } }
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
      name: 'Arc Burst',
      icon: '⚡',
      description: 'Releases a crackling ring of electrical arcs in all directions simultaneously. Ignores aim mode.',
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
        { id: 'rune_cascade',      name: 'Arc Cascade',       icon: '⚡', description: 'Fires 4 additional arcs per burst.',                changes: { radialCount: 4 } },
        { id: 'runic_empowerment', name: 'Overcharge',        icon: '⚡', description: 'Each arc deals much more damage.',                   changes: { damageMultiplier: 1.6 } },
        { id: 'arcane_ricochet',   name: 'Static Ricochet',   icon: '🔄', description: 'Each arc bounces once off world edges.',             changes: { bounce: 1 } }
      ]
    },
    {
      id: 'void_lance',
      name: 'Glacial Lance',
      icon: '🧊',
      description: 'A slow, devastating lance of crystallized ice with extreme armor penetration. Flash-freezes the air around it, pulling nearby enemies into the kill zone.',
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
        { id: 'annihilator',       name: 'Absolute Zero',     icon: '🧊', description: 'Lance deals nearly double damage.',                 changes: { damageMultiplier: 1.9 } },
        { id: 'phase_strike',      name: 'Ice Bore',          icon: '❄️', description: 'Lance bores through 3 enemies.',                    changes: { pierce: 3 } },
        { id: 'void_implosion',    name: 'Glacial Implosion', icon: '💥', description: 'Lance detonates on impact for area damage.',         changes: { areaRadius: 60, areaDamageMultiplier: 0.8 } }
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
      name: 'Volt Cage',
      icon: '⚡',
      description: 'Conjures 4 crackling walls of electricity that sweep around the player simultaneously, shocking every enemy they pass through.',
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
        { id: 'larger_cube',      name: 'Wider Cage',       icon: '⚡', description: 'The cage extends 50% further from the caster.',                  changes: { rangeMultiplier: 1.5 } },
        { id: 'shock_walls',      name: 'Shock Walls',      icon: '⚡', description: 'Each wall slows every enemy it passes through.',                   changes: { statusEffect: { type: 'slow', amount: 0.45, duration: 2.0 } } },
        { id: 'volatile_corners', name: 'Volatile Corners', icon: '💥', description: 'Walls explode at their endpoints, dealing area damage at each corner.', changes: { areaRadius: 55, areaDamageMultiplier: 0.7 } }
      ]
    },
    {
      id: 'phase_blade',
      name: 'Lightning Edge',
      icon: '⚡',
      description: 'Conjures a crackling blade of electrical force that orbits the caster continuously, slicing through every enemy it contacts.',
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
        { id: 'twin_blades',    name: 'Twin Blades',    icon: '⚡', description: 'A second edge orbits counter-clockwise simultaneously.',  changes: { projectileCount: 1 } },
        { id: 'phantom_edge',   name: 'Storm Edge',     icon: '⚡', description: 'Blade crackles with venom, applying poison to every enemy it cuts.', changes: { statusEffect: { type: 'poison', amount: 6, duration: 2.0 } } },
        { id: 'expanded_orbit', name: 'Expanded Orbit', icon: '🔄', description: 'Edge orbits at a 60% greater radius.',                   changes: { rangeMultiplier: 1.6 } }
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
      name: 'Ember Wake',
      icon: '🔥',
      description: 'Leaves a smoldering trail of embers as you move. Enemies that step through are scorched.',
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
        { id: 'volatile_residue', name: 'Volatile Embers',  icon: '💥', description: 'Embers appear more often and scorch a wider area.',           changes: { cooldownMultiplier: 0.6, areaRadiusMultiplier: 1.4 } },
        { id: 'toxic_residue',    name: 'Ashen Residue',    icon: '☠️', description: 'Embers release toxic ash that poisons enemies who linger.',   changes: { groundEffect: { type: 'poison', duration: 2.5, dps: 6 } } },
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
      name: 'Cryo Blast',
      icon: '❄️',
      description: 'Releases a burst of super-cooled air that flash-freezes everything nearby and hurls it outward. Deals no damage — pure glacial force.',
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
        { id: 'wider_pulse',       name: 'Wider Blast',       icon: '❄️', description: 'Cryo blast extends 60% further.',                                  changes: { rangeMultiplier: 1.6 } },
        { id: 'violent_repulsion', name: 'Violent Repulsion', icon: '🌪️', description: 'Enemies are hurled twice as far.',                                  changes: { knockbackMultiplier: 2.0 } },
        { id: 'arcane_trauma',     name: 'Frost Trauma',      icon: '🧊', description: 'Blast now deals 25 damage and slows every enemy it hits.',          changes: { damage: 25, statusEffect: { type: 'slow', amount: 0.5, duration: 2.0 } } }
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
      name: 'Frost Gyre',
      icon: '🌀',
      description: 'Three orbs of crystallized frost orbit the caster, cycling between solid ice and freezing mist. Only solid orbs deal damage — position yourself so enemies walk through them.',
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
        { id: 'spectral_surge',  name: 'Crystal Surge',   icon: '🧊', description: 'Orbs deal 60% more damage while solid.',                   changes: { damageMultiplier: 1.6 } },
        { id: 'rapid_phase',     name: 'Rapid Freeze',    icon: '🔄', description: 'Adds a fourth orb and all orbs orbit faster.',              changes: { projectileCount: 1, orbitSpeedMultiplier: 1.4 } },
        { id: 'ghost_surge',     name: 'Mist Surge',      icon: '❄️', description: 'Frost mist orbs now damage and slow enemies they drift through.', changes: { statusEffect: { type: 'slow', amount: 0.35, duration: 1.0 } } }
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
      name: 'Frost Needle',
      icon: '❄️',
      description: 'Fires a sliver of crystallized frost into an enemy, marking them. After 2 seconds it shatters — dealing damage based on how far the target fled while marked. Punishes fast enemies.',
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
        { id: 'temporal_rupture', name: 'Frozen Moment',    icon: '❄️', description: 'Marked enemies are slowed before the shard shatters.',   changes: { statusEffect: { type: 'slow', amount: 0.45, duration: 2.0 } } },
        { id: 'time_debt',        name: 'Frost Debt',       icon: '🌡️', description: 'Shatter damage multiplier increases 50% more.',          changes: { chronoMultiplierBonus: 0.5 } },
        { id: 'paradox_chain',    name: 'Cryo Chain',       icon: '🔗', description: 'Shatter marks all nearby enemies with fresh needles.',   changes: { chronoChain: true } }
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
      id: 'void_stride',
      name: 'Void Stride',
      icon: '💠',
      description: 'Launches the mage into a burst of speed while arcane blades sweep both sides. Deals damage to anything caught in the sweep.',
      cooldown: 2.2,
      damage: 28,
      projectileSpeed: 9,
      armorPenetration: 2,
      pierce: 1,
      bounce: 0,
      range: 200,
      targeting: 'dash',
      spreadAngle: 0.28,
      projectileCount: 2,
      dashSpeedBoost: 4.5,
      dashDuration: 0.35,
      chainCount: 0,
      chainRange: 0,
      areaRadius: 0,
      statusEffect: null,
      upgrades: [
        { id: 'wider_sweep', name: 'Wider Sweep', icon: '↔️', description: 'Three blades sweep each side instead of two. Damage up 30%.', changes: { projectileCount: 1, damageMultiplier: 1.3 } },
        { id: 'afterimage',  name: 'Afterimage',  icon: '👻', description: 'Blades slow every enemy they cut through.',                   changes: { statusEffect: { type: 'slow', amount: 0.4, duration: 1.0 } } },
        { id: 'surge_step',  name: 'Surge Step',  icon: '⚡', description: 'Speed boost lasts twice as long. Blades deal 50% more damage.', changes: { dashDurationMult: 2.0, damageMultiplier: 1.5 } }
      ]
    },
    {
      id: 'astral_triad',
      name: 'Astral Triad',
      icon: '⚛️',
      description: 'Three arcane orbs orbit the caster, each with two smaller satellites circling it. A gravitational nightmare for anything that gets close.',
      cooldown: 8.0,
      damage: 22,
      projectileSpeed: 0,
      armorPenetration: 1,
      pierce: 99,
      bounce: 0,
      range: 110,
      targeting: 'triad',
      triadDuration: 8.0,
      triadPrimaryRadius: 85,
      triadSubRadius: 28,
      triadPrimarySpeed: 0.048,
      triadSubSpeed: 0.17,
      triadCount: 3,
      subDamage: 11,
      chainCount: 0,
      chainRange: 0,
      areaRadius: 0,
      statusEffect: null,
      upgrades: [
        { id: 'wider_orbit',    name: 'Wider Orbit',    icon: '🌌', description: 'Primary orbs orbit 40% further from the caster.',                              changes: { triadPrimaryRadiusMult: 1.4 } },
        { id: 'fourth_body',    name: 'Fourth Body',    icon: '✦',  description: 'A fourth primary orb joins the formation.',                                    changes: { triadCount: 1 } },
        { id: 'resonant_field', name: 'Resonant Field', icon: '💫', description: 'All orbs deal 70% more damage and slow every enemy they pass through.',        changes: { damageMultiplier: 1.7, statusEffect: { type: 'slow', amount: 0.35, duration: 1.2 } } }
      ]
    },
    {
      id: 'entropy_catalyst',
      name: 'Entropy Catalyst',
      icon: '⚗️',
      description: 'Seizes a fallen enemy\'s residual energy and detonates them. The blast deals 35% of that enemy\'s max HP to all nearby foes.',
      cooldown: 3.5,
      damage: 0,
      projectileSpeed: 8,
      armorPenetration: 0,
      pierce: 0,
      bounce: 0,
      range: 320,
      targeting: 'corpseblast',
      corpseBlastPercent: 0.35,
      corpseBlastRadius: 110,
      chainCount: 0,
      chainRange: 0,
      areaRadius: 110,
      areaDamageMultiplier: 1,
      statusEffect: null,
      upgrades: [
        { id: 'critical_mass',  name: 'Critical Mass',  icon: '💥', description: 'Explosion deals 55% of max HP instead of 35%.',                                changes: { corpseBlastPercentBonus: 0.20 } },
        { id: 'chain_reaction', name: 'Chain Reaction', icon: '🔗', description: 'Killing a corpse-blasted enemy can trigger secondary explosions on nearby foes.', changes: { corpseChain: true } },
        { id: 'lingering_void', name: 'Lingering Void', icon: '🌑', description: 'The explosion leaves an arcane void zone that deals damage for 3 seconds.',    changes: { groundEffect: { type: 'arcane', duration: 3.0, dps: 14 } } }
      ]
    },
    {
      id: 'arcane_recall',
      name: 'Arcane Recall',
      icon: '🪃',
      description: 'A crackling bolt materializes at max range and hurtles back toward the caster, piercing through every enemy it passes.',
      cooldown: 1.6,
      damage: 24,
      projectileSpeed: 10,
      armorPenetration: 1,
      pierce: 3,
      bounce: 0,
      range: 380,
      targeting: 'recall',
      chainCount: 0,
      chainRange: 0,
      areaRadius: 0,
      statusEffect: null,
      upgrades: [
        { id: 'full_pierce',   name: 'Full Pierce',   icon: '➡️', description: 'Recall bolt pierces every enemy — no limit.',                    changes: { pierce: 96 } },
        { id: 'double_recall', name: 'Double Recall', icon: '↩️', description: 'Fires two recall bolts simultaneously from slightly offset angles.', changes: { projectileCount: 1 } },
        { id: 'thunderhead',   name: 'Thunderhead',   icon: '⚡', description: 'Each hit chains lightning to 3 nearby enemies.',                  changes: { chainCount: 3, chainRange: 150 } }
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
      name: 'Frost Rifts',
      icon: '💠',
      description: 'Splits the frozen ground open nearby, leaving jagged rifts. Any enemy that walks through one triggers a shattering ice explosion.',
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
        { id: 'shockwave_burst', name: 'Frozen Burst',    icon: '❄️', description: 'Detonation flash-freezes every enemy in the blast for 1 second.',          changes: { statusEffect: { type: 'stun', duration: 1.0 } } },
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
      id: 'alexs_hax',
      name: "Alex's Hax",
      icon: '💻',
      description: "Summons glitching demonic sigils that lock onto random enemy mobs and scorch the ground beneath them with cursed circles of hellfire. Enemies caught inside burn continuously.",
      cooldown: 3.5,
      damage: 0,
      projectileSpeed: 0,
      armorPenetration: 0,
      pierce: 0,
      bounce: 0,
      range: 0,
      areaRadius: 90,
      areaDamageMultiplier: 0,
      targeting: 'hackcircle',
      riftCount: 3,
      riftDuration: 0,
      riftChain: false,
      chainCount: 0,
      chainRange: 0,
      groundEffect: { type: 'burn', duration: 4.0, dps: 14 },
      statusEffect: null,
      upgrades: [
        { id: 'mass_hack',     name: 'Mass Hack',     icon: '💻', description: 'Summons 2 additional cursed circles per cast.',                           changes: { riftCount: 2 } },
        { id: 'rootkit',       name: 'Rootkit',        icon: '🔴', description: 'Circles linger 60% longer and burn enemies for more damage per second.',  changes: { groundEffect: { type: 'burn', duration: 6.4, dps: 20 } } },
        { id: 'daemon_thread', name: 'Daemon Thread',  icon: '😈', description: 'Circles now also poison every enemy that steps inside them.',             changes: { groundEffect: { type: 'toxic', duration: 4.0, dps: 22 } } }
      ]
    },
    {
      id: 'gravebomb',
      name: 'Gravebomb',
      icon: '💣',
      description: 'Rapidly detonates all fresh corpses in range, triggering explosions that each deal a percentage of that enemy\'s maximum HP to everything nearby.',
      cooldown: 0.9,
      damage: 0,
      projectileSpeed: 0,
      armorPenetration: 0,
      pierce: 0,
      bounce: 0,
      range: 350,
      targeting: 'gravebomb',
      gravebombPercent: 0.25,
      gravebombRadius: 100,
      gravebombMaxCount: 5,
      chainCount: 0,
      chainRange: 0,
      areaRadius: 0,
      statusEffect: null,
      upgrades: [
        { id: 'mass_grave',     name: 'Mass Grave',     icon: '🪦', description: 'Detonates up to 4 additional corpses per cast.',              changes: { gravebombMaxCount: 4 } },
        { id: 'infernal_yield', name: 'Infernal Yield', icon: '💥', description: 'Each explosion deals 40% of max HP instead of 25%.',          changes: { gravebombPercentBonus: 0.15 } },
        { id: 'corpse_rot',     name: 'Corpse Rot',     icon: '☠️', description: 'Survivors of each blast are briefly poisoned.',                changes: { statusEffect: { type: 'poison', amount: 10, duration: 2.5 } } }
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
      name: 'Battle Shell',
      icon: '🫧',
      description: 'Conjures a hardened combat shell right around you. Destroys incoming projectiles on contact and violently repels any enemy that touches it.',
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
      name: 'Field Caltrops',
      icon: '🔺',
      description: 'Hurls razor-edged caltrops at distant positions. Any enemy that walks through one is stabbed and slowed — easy to miss in the chaos, deadly in the right lane.',
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
        { id: 'more_spikes',    name: 'Extra Caltrops', icon: '⬆️', description: 'Hurls 3 additional caltrops per cast.',                           changes: { spikeCount: 3 } },
        { id: 'venomous_tips',  name: 'Venomous Tips',  icon: '☠️', description: 'Caltrops now poison enemies for 3 seconds instead of slowing.',     changes: { statusEffect: { type: 'poison', amount: 8, duration: 3.0 } } },
        { id: 'iron_spikes',    name: 'Serrated Steel', icon: '⚙️', description: 'Caltrop damage doubled and armor penetration greatly increased.',    changes: { damageMultiplier: 2.0, armorPenetration: 6 } }
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
    },

    // ── SPAGHETTI'S BLADE ──────────────────────────────────────
    {
      id: 'spaghettis_blade',
      name: "Spaghetti's Blade",
      icon: '🍝',
      description: "A writhing length of enchanted pasta lashed from the wrist like a whip. Threads through every enemy in a wide spiraling arc and entangles them, then snaps back to your hand.",
      cooldown: 2.2,
      damage: 18,
      projectileSpeed: 7,
      armorPenetration: 1,
      pierce: 99,
      bounce: 0,
      range: 900,
      areaRadius: 0,
      areaDamageMultiplier: 0,
      targeting: 'whirl',
      curveRate: 0.06,
      projectileCount: 1,
      returnsToPlayer: true,
      chainCount: 0,
      chainRange: 0,
      statusEffect: { type: 'slow', amount: 0.3, duration: 1.5 },
      upgrades: [
        { id: 'al_dente',         name: 'Al Dente',         icon: '🍝', description: 'Pasta hardens — deals 75% more damage.',                               changes: { damageMultiplier: 1.75 } },
        { id: 'extra_long',       name: 'Extra Long',       icon: '🌀', description: 'Range extends 50% further and curves more aggressively.',               changes: { rangeMultiplier: 1.5, curveRateMultiplier: 1.35 } },
        { id: 'carbonara_curse',  name: 'Carbonara Curse',  icon: '☠️', description: 'Pasta poisons every enemy it wraps around.',                           changes: { statusEffect: { type: 'poison', amount: 8, duration: 3.0 } } }
      ]
    },

    // ── LIFE CYCLE ─────────────────────────────────────────────
    {
      id: 'lotus_rift',
      name: 'Lotus Rift',
      icon: '🪷',
      description: 'Opens a blooming lotus-shaped rift under a distant enemy. Each petal that unfolds damages nearby enemies. When the final petal opens, the lotus collapses into a healing mote that drifts back to you.',
      cooldown: 6.0,
      damage: 25,
      projectileSpeed: 0,
      projectileCount: 0,
      spreadAngle: 0,
      armorPenetration: 2,
      pierce: 0,
      bounce: 0,
      range: 350,
      areaRadius: 70,
      areaDamageMultiplier: 1,
      targeting: 'rift',
      riftCount: 1,
      riftDuration: 5.0,
      riftChain: false,
      healOnExpire: 15,
      chainCount: 0,
      chainRange: 0,
      statusEffect: null,
      upgrades: [
        { id: 'more_petals',   name: 'More Petals',   icon: '🌸', description: 'Lotus opens 2 additional rifts, each dealing damage.',  changes: { riftCount: 2 } },
        { id: 'deep_roots',    name: 'Deep Roots',    icon: '🌿', description: 'Rift lasts 3 seconds longer and slows enemies inside.', changes: { riftDuration: 3.0, statusEffect: { type: 'slow', amount: 0.35, duration: 1.5 } } },
        { id: 'nectar_return', name: 'Nectar Return', icon: '💚', description: 'Healing mote restores 20 additional HP on return.',     changes: { healOnExpire: 20 } }
      ]
    },
    {
      id: 'scarab_halo',
      name: 'Scarab Halo',
      icon: '🪲',
      description: 'Summons three golden scarabs that orbit the player. Each scarab charges up while avoiding enemies — the longer it goes without striking, the more damage it deals on impact.',
      cooldown: 8.0,
      damage: 18,
      projectileSpeed: 0,
      projectileCount: 3,
      spreadAngle: 0,
      armorPenetration: 2,
      pierce: 99,
      bounce: 0,
      range: 92,
      areaRadius: 0,
      areaDamageMultiplier: 0,
      targeting: 'orbit',
      orbitSpeed: 0.07,
      orbitDuration: 9.0,
      chargesUp: true,
      chargeRate: 0.12,
      chainCount: 0,
      chainRange: 0,
      statusEffect: null,
      upgrades: [
        { id: 'wider_halo',     name: 'Wider Halo',     icon: '⭕', description: 'Scarabs orbit at a 50% greater radius.',                 changes: { rangeMultiplier: 1.5 } },
        { id: 'patient_swarm',  name: 'Patient Swarm',  icon: '⏳', description: 'Scarabs charge up significantly faster while orbiting.', changes: { chargeRate: 0.22 } },
        { id: 'carapace_swarm', name: 'Carapace Swarm', icon: '🪲', description: 'Summons 2 additional scarabs.',                          changes: { projectileCount: 2 } }
      ]
    },
    {
      id: 'pollen_nova',
      name: 'Pollen Nova',
      icon: '🌸',
      description: 'Releases a radial burst of glowing pollen spores. Spores deal light damage and slow any enemy they hit.',
      cooldown: 3.5,
      damage: 10,
      projectileSpeed: 6,
      armorPenetration: 0,
      pierce: 0,
      bounce: 0,
      range: 500,
      areaRadius: 0,
      areaDamageMultiplier: 0,
      targeting: 'radial',
      radialCount: 10,
      angleOffset: 0,
      chainCount: 0,
      chainRange: 0,
      statusEffect: { type: 'slow', amount: 0.35, duration: 1.8 },
      upgrades: [
        { id: 'thicker_pollen', name: 'Thicker Pollen', icon: '🌼', description: 'Fires 6 additional spores in the radial burst.',  changes: { radialCount: 6 } },
        { id: 'fertile_ground', name: 'Fertile Ground', icon: '🌱', description: 'Spores deal 60% more damage per hit.',            changes: { damageMultiplier: 1.6 } },
        { id: 'spring_fever',   name: 'Spring Fever',   icon: '🌡️', description: 'Slow is stronger and lasts longer.',              changes: { statusEffect: { type: 'slow', amount: 0.50, duration: 2.5 } } }
      ]
    },
    {
      id: 'frizzos_hourglass',
      name: "Frizzo's Hourglass",
      icon: '⌛',
      description: 'Fires at the furthest visible enemy and marks them with a glowing seed of time. After a short delay it blooms — dealing damage based on how far the enemy moved since being marked.',
      cooldown: 3.5,
      damage: 10,
      projectileSpeed: 13,
      armorPenetration: 1,
      pierce: 0,
      bounce: 0,
      range: 1100,
      areaRadius: 0,
      areaDamageMultiplier: 0,
      targeting: 'furthest',
      isChrono: true,
      chronoDelay: 2.5,
      chronoBaseDamage: 20,
      chronoMultiplierBonus: 0,
      chronoChain: false,
      chainCount: 0,
      chainRange: 0,
      statusEffect: null,
      upgrades: [
        { id: 'early_spring', name: 'Early Spring', icon: '🌤️', description: 'Fires 25% faster — more seeds, more blooms.',      changes: { cooldownMultiplier: 0.75 } },
        { id: 'aging_bloom',  name: 'Aging Bloom',  icon: '📈',  description: 'Bloom damage scales harder with elapsed time.',   changes: { chronoMultiplierBonus: 0.35 } },
        { id: 'full_season',  name: 'Full Season',  icon: '🌻',  description: 'Bloom spreads to two additional nearby enemies.', changes: { chronoChain: true } }
      ]
    },
    {
      id: 'molting_mirror',
      name: 'Molting Mirror',
      icon: '🪞',
      description: 'A living mirror slides slowly back and forth behind the player. It periodically echoes your last fired spell from its current position at reduced power.',
      cooldown: 1.2,
      damage: 0,
      projectileSpeed: 0,
      armorPenetration: 0,
      pierce: 0,
      bounce: 0,
      range: 130,
      targeting: 'mirror',
      mirrorCount: 1,
      mirrorPower: 0.65,
      mirrorExplosion: false,
      chainCount: 0,
      chainRange: 0,
      areaRadius: 0,
      areaDamageMultiplier: 0,
      statusEffect: null,
      upgrades: [
        { id: 'longer_swing',      name: 'Longer Swing',      icon: '↔️', description: 'Mirror travels 50% farther from the caster.',       changes: { rangeMultiplier: 1.5 } },
        { id: 'polished_carapace', name: 'Polished Carapace', icon: '✨', description: 'Reflected spells deal 88% power instead of 65%.', changes: { mirrorPower: 0.88 } },
        { id: 'twin_molt',         name: 'Twin Molt',         icon: '🔀', description: 'Creates a second mirror.',                          changes: { mirrorCount: 1 } }
      ]
    },
    {
      id: 'brood_husk',
      name: 'Brood Husk',
      icon: '🐣',
      description: 'Drops a fragile egg-like decoy that attracts nearby enemies. When destroyed or expired, it hatches into a burst of damaging life spores erupting in all directions.',
      cooldown: 9.0,
      damage: 55,
      projectileSpeed: 0,
      armorPenetration: 2,
      pierce: 0,
      bounce: 0,
      range: 0,
      targeting: 'decoy',
      decoyHp: 80,
      decoyDuration: 7.0,
      decoyExplosion: true,
      chainCount: 0,
      chainRange: 0,
      areaRadius: 80,
      areaDamageMultiplier: 1,
      statusEffect: null,
      projectileCount: 1,
      upgrades: [
        { id: 'thicker_shell',    name: 'Thicker Shell',    icon: '🛡️', description: 'Husk has 80 more HP and lasts 3 seconds longer.', changes: { decoyHpBonus: 80, decoyDurationBonus: 3.0 } },
        { id: 'clutch_spawn',     name: 'Clutch Spawn',     icon: '🥚', description: 'Drops two husks at once.',                         changes: { projectileCount: 1 } },
        { id: 'violent_hatching', name: 'Violent Hatching', icon: '💥', description: 'Hatch burst deals more than double damage.',        changes: { damageMultiplier: 2.2 } }
      ]
    },
    {
      id: 'crescent_moon',
      name: 'Crescent Moon',
      icon: '🌙',
      description: 'Fires pale crescent-moon blades that arc outward and curve inward like lunar scythes, hooking sharply around enemies before cutting through them.',
      cooldown: 1.8,
      damage: 22,
      projectileSpeed: 7,
      armorPenetration: 1,
      pierce: 0,
      bounce: 0,
      range: 600,
      areaRadius: 0,
      areaDamageMultiplier: 0,
      targeting: 'whirl',
      curveRate: 0.065,
      projectileCount: 2,
      chainCount: 0,
      chainRange: 0,
      statusEffect: null,
      upgrades: [
        { id: 'waxing_arc',     name: 'Waxing Arc',     icon: '🌛', description: 'Moons curve harder and travel 30% farther.',      changes: { curveRateMultiplier: 1.45, rangeMultiplier: 1.3 } },
        { id: 'twin_crescents', name: 'Twin Crescents', icon: '🌙', description: 'Fires 2 additional moon blades.',                 changes: { projectileCount: 2 } },
        { id: 'harvest_moon',   name: 'Harvest Moon',   icon: '🍂', description: 'Moon blades pierce 2 enemies and apply poison.', changes: { pierce: 2, statusEffect: { type: 'poison', amount: 7, duration: 2.5 } } }
      ]
    },
    {
      id: 'ouroboros_vine',
      name: 'Ouroboros Vine',
      icon: '🐍',
      description: 'Launches a living vine that arcs outward in a looping path, then curves back toward the caster. Hits enemies both on the way out and on the return.',
      cooldown: 2.5,
      damage: 16,
      projectileSpeed: 6,
      armorPenetration: 1,
      pierce: 1,
      bounce: 0,
      range: 1400,
      areaRadius: 0,
      areaDamageMultiplier: 0,
      targeting: 'whirl',
      curveRate: 0.08,
      projectileCount: 1,
      returnsToPlayer: true,
      chainCount: 0,
      chainRange: 0,
      statusEffect: null,
      upgrades: [
        { id: 'tighter_coil',  name: 'Tighter Coil',  icon: '🌀', description: 'Vine curves more aggressively, tightening its loop.',   changes: { curveRateMultiplier: 1.5 } },
        { id: 'regrowth_loop', name: 'Regrowth Loop', icon: '💚', description: 'Vine lifesteals — heals 12% of all damage dealt.',      changes: { lifesteal: 0.12 } },
        { id: 'endless_ring',  name: 'Endless Ring',  icon: '♾️', description: 'Vine travels farther and pierces 2 additional enemies.', changes: { rangeMultiplier: 1.4, pierce: 2 } }
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
    { wave: 14, monstersTotal: 210, miniBosses: ['troll'] },
    { wave: 15, monstersTotal: 245, miniBosses: ['troll', 'beholderkin'] },
    { wave: 16, monstersTotal: 280, miniBosses: ['troll', 'troll'] },
    { wave: 17, monstersTotal: 320, miniBosses: ['beholderkin', 'troll', 'beholderkin'] },
    { wave: 18, monstersTotal: 360, miniBosses: ['troll', 'troll', 'beholderkin'] },
    { wave: 19, monstersTotal: 405, miniBosses: ['beholderkin', 'troll', 'troll', 'beholderkin'] },
    { wave: 20, monstersTotal: 455, boss: 'dragon_boss', miniBosses: ['troll', 'troll'] }
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
      description: 'Starfall impacts leave burning ground. Ember Wake deals triple damage.',
      weaponBoosts: [
        { weaponId: 'starfall',     damageMultiplier: 1.8, groundEffect: { type: 'burn', duration: 3.0, dps: 14 } },
        { weaponId: 'arcane_trail', damageMultiplier: 3.0 }
      ]
    },
    {
      id: 'infernal_march', name: 'Infernal March', icon: '🔥',
      requires: ['arcane_trail', 'firebolt'],
      description: 'Ember Wake now poisons every enemy it scars. Firebolt deals double damage and pierces 2 additional enemies.',
      weaponBoosts: [
        { weaponId: 'arcane_trail', damageMultiplier: 2.0, statusEffect: { type: 'poison', amount: 10, duration: 3.0 } },
        { weaponId: 'firebolt',     damageMultiplier: 2.0, pierce: 2 }
      ]
    },

    // ─── CYCLE 2: ICE / VOID ───────────────────────────────────
    {
      id: 'null_winter', name: 'Null Winter', icon: '❄️',
      requires: ['frost_shard', 'void_lance'],
      description: 'Glacial Lance now freezes everything it tears through. Frost Shard gains massive armor penetration and fires 40% faster.',
      weaponBoosts: [
        { weaponId: 'frost_shard', damageMultiplier: 1.8, armorPenetration: 5, cooldownMultiplier: 0.6 },
        { weaponId: 'void_lance',  statusEffect: { type: 'slow', amount: 0.55, duration: 3.5 }, damageMultiplier: 1.6 }
      ]
    },
    {
      id: 'void_fissure', name: 'Frost Fissure', icon: '🧊',
      requires: ['void_lance', 'fault_lines'],
      description: 'Frost Rifts now pull enemies to their center before detonating. Glacial Lance pull range doubles and damage increases 80%.',
      weaponBoosts: [
        { weaponId: 'void_lance',  pullRadius: 160, pullStrength: 4.0, damageMultiplier: 1.8 },
        { weaponId: 'fault_lines', damageMultiplier: 2.0, areaRadiusMultiplier: 1.5, riftCount: 1 }
      ]
    },
    {
      id: 'seismic_blast', name: 'Glacial Rupture', icon: '💥',
      requires: ['fault_lines', 'force_pulse'],
      description: 'Cryo Blast now deals 40 damage and shatters all nearby frost rifts when it fires. Frost Rifts gain instant chain detonation.',
      weaponBoosts: [
        { weaponId: 'fault_lines', damageMultiplier: 1.8, riftChain: true },
        { weaponId: 'force_pulse', damageOverride: 40, areaRadius: 55, areaDamageMultiplier: 1.0, statusEffect: { type: 'stun', duration: 0.8 } }
      ]
    },
    {
      id: 'temporal_shockwave', name: 'Glacial Shockwave', icon: '❄️',
      requires: ['force_pulse', 'chrono_needle'],
      description: 'Cryo Blast marks every enemy it hits with a Frost Needle. Frost Needle shatter deals double damage and chains to nearby enemies.',
      weaponBoosts: [
        { weaponId: 'force_pulse',   damageOverride: 25, areaRadius: 45, areaDamageMultiplier: 1.0, statusEffect: { type: 'stun', duration: 1.0 } },
        { weaponId: 'chrono_needle', damageMultiplier: 2.0, chronoMultiplierBonus: 0.5, chronoChain: true }
      ]
    },
    {
      id: 'phase_paradox', name: 'Frozen Paradox', icon: '🌀',
      requires: ['chrono_needle', 'phantom_gyre'],
      description: 'Frost Gyre orbits 50% faster and deals double damage. Frost Needles chain to nearby enemies on shatter.',
      weaponBoosts: [
        { weaponId: 'chrono_needle', damageMultiplier: 1.8, chronoChain: true },
        { weaponId: 'phantom_gyre',  damageMultiplier: 2.0, orbitSpeedMultiplier: 1.5 }
      ]
    },
    {
      id: 'glacial_orbit', name: 'Glacial Orbit', icon: '🧊',
      requires: ['phantom_gyre', 'frost_shard'],
      description: 'Frost Gyre orbs slow every enemy they pass through. Frost Shard splits into 4 shards on impact.',
      weaponBoosts: [
        { weaponId: 'phantom_gyre', damageMultiplier: 1.7, statusEffect: { type: 'slow', amount: 0.45, duration: 2.5 } },
        { weaponId: 'frost_shard',  damageMultiplier: 1.8, splitProjectiles: 3, splitDamageMultiplier: 0.65 }
      ]
    },

    // ─── CYCLE 3: LIGHTNING / ARCANE ───────────────────────────
    {
      id: 'electrostatic_field', name: 'Electrostatic Field', icon: '⚡',
      requires: ['spark_chain', 'rune_burst'],
      description: 'Spark Chain gains 6 more chains and fires 30% faster. Arc Burst deals double damage with 4 extra arcs per burst.',
      weaponBoosts: [
        { weaponId: 'spark_chain', chainCount: 6, damageMultiplier: 1.8, cooldownMultiplier: 0.7 },
        { weaponId: 'rune_burst',  damageMultiplier: 2.0, radialCount: 4 }
      ]
    },
    {
      id: 'orbiting_runes', name: 'Arc Storm', icon: '⚡',
      requires: ['rune_burst', 'arcane_orb'],
      description: 'Voltaic Orb detonates an arc burst on every bounce and gains 2 extra bounces. Arc Burst pierces enemies and fires 2 extra arcs.',
      weaponBoosts: [
        { weaponId: 'rune_burst',  damageMultiplier: 1.8, pierce: 2, radialCount: 2 },
        { weaponId: 'arcane_orb',  damageMultiplier: 2.5, bounce: 2, runeBlastCount: 6, runeBlastDamage: 14 }
      ]
    },
    {
      id: 'prismatic_lattice', name: 'Prismatic Lattice', icon: '🔷',
      requires: ['arcane_orb', 'arcane_cube'],
      description: 'Volt Cage walls slow and detonate with electrical energy at their corners. Voltaic Orb pulls enemies on each bounce.',
      weaponBoosts: [
        { weaponId: 'arcane_orb',  damageMultiplier: 2.0, pullRadius: 80, pullStrength: 2.0, bounce: 1 },
        { weaponId: 'arcane_cube', damageMultiplier: 1.8, areaRadius: 65, areaDamageMultiplier: 0.85, statusEffect: { type: 'slow', amount: 0.4, duration: 1.5 } }
      ]
    },
    {
      id: 'resonant_edge', name: 'Resonant Edge', icon: '⚡',
      requires: ['arcane_cube', 'phase_blade'],
      description: 'Lightning Edge orbit radius doubles and damage triples. Volt Cage walls stun every enemy they sweep through.',
      weaponBoosts: [
        { weaponId: 'arcane_cube', statusEffect: { type: 'stun', duration: 0.7 }, damageMultiplier: 1.5 },
        { weaponId: 'phase_blade', damageMultiplier: 3.0, rangeMultiplier: 2.0 }
      ]
    },
    {
      id: 'thunderblade', name: 'Thunderblade', icon: '🌩️',
      requires: ['phase_blade', 'thunder_clap'],
      description: 'Thunder Clap blasts 60% wider and deals double damage with 40% shorter cooldown. Lightning Edge stuns every enemy it slices.',
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

    // ─── ALEX'S HAX COMBOS ──────────────────────────────────────
    {
      id: 'hex_protocol', name: 'Hex Protocol', icon: '🔥',
      requires: ['alexs_hax', 'jakes_lament'],
      description: "Jake's beam brands every enemy it touches. Alex's Hax locks onto branded enemies first, and cursed circles burn twice as hot. Jake's beam extends 40% further with 15% lifesteal.",
      weaponBoosts: [
        { weaponId: 'alexs_hax',    riftCount: 2, groundEffect: { type: 'burn', duration: 5.0, dps: 26 } },
        { weaponId: 'jakes_lament', damageMultiplier: 1.8, rangeMultiplier: 1.4, lifesteal: 0.15 }
      ]
    },
    {
      id: 'hex_burial', name: 'Hex Burial', icon: '🪦',
      requires: ['alexs_hax', 'gravebomb'],
      description: "When Hax circles burn an enemy to death, Gravebomb instantly detonates the corpse in place. Gravebomb deals 45% of max HP per explosion. Hax fires 40% faster.",
      weaponBoosts: [
        { weaponId: 'alexs_hax',  cooldownMultiplier: 0.6, groundEffect: { type: 'burn', duration: 5.0, dps: 22 } },
        { weaponId: 'gravebomb',  gravebombPercentBonus: 0.20, gravebombRadius: 20 }
      ]
    },
    {
      id: 'death_toll', name: 'Death Toll', icon: '🔔',
      requires: ['gravebomb', 'jakes_lament'],
      description: "Each kill from Jake's beam triggers a small Gravebomb explosion at that target. Gravebomb blast radius grows 50% and deals 45% of max HP. Jake's beam deals double damage.",
      weaponBoosts: [
        { weaponId: 'gravebomb',   gravebombPercentBonus: 0.20, gravebombRadius: 50 },
        { weaponId: 'jakes_lament', damageMultiplier: 2.0 }
      ]
    },
    {
      id: 'sauce_ring', name: 'Sauce Ring', icon: '🖤',
      requires: ['alexs_hax', 'stax_black_sauce'],
      description: "Black Sauce pools that soak an enemy trigger a cursed hax circle at that spot. Alex's Hax summons 2 more circles per cast and fires 30% faster. Sauce deals 70% more damage.",
      weaponBoosts: [
        { weaponId: 'alexs_hax',      riftCount: 2, cooldownMultiplier: 0.7 },
        { weaponId: 'stax_black_sauce', damageMultiplier: 1.7, projectileCount: 2 }
      ]
    },

    // ─── AFRO SAMURAI COMBOS ────────────────────────────────────
    {
      id: 'void_cleave', name: 'Glacial Cleave', icon: '🧊',
      requires: ['afro_samurai_blade', 'void_lance'],
      description: "The Blade's slashes shatter ice — each strike deals area damage and pulls nearby enemies into the cut. Glacial Lance pierces 4 extra enemies and deals 80% more damage.",
      weaponBoosts: [
        { weaponId: 'afro_samurai_blade', damageMultiplier: 1.8, areaRadius: 45, areaDamageMultiplier: 0.7, pullRadius: 60, pullStrength: 2.0 },
        { weaponId: 'void_lance',         pierce: 4, damageMultiplier: 1.8, armorPenetration: 4 }
      ]
    },
    {
      id: 'dual_blade_mastery', name: 'Dual Blade Mastery', icon: '⚔️',
      requires: ['afro_samurai_blade', 'phase_blade'],
      description: "Two blade weapons, one devastating rhythm. Lightning Edge orbit radius triples and deals 3× damage. The Final Blade fires 40% faster with a wider cut.",
      weaponBoosts: [
        { weaponId: 'afro_samurai_blade', cooldownMultiplier: 0.6, spreadAngle: 0.12, damageMultiplier: 1.6 },
        { weaponId: 'phase_blade',        damageMultiplier: 3.0, rangeMultiplier: 3.0 }
      ]
    },

    // ─── WARD SHELL / ARCANE SPIKES COMBOS ──────────────────────
    {
      id: 'thornwall', name: 'Thornwall', icon: '🌵',
      requires: ['ward_shell', 'arcane_spikes'],
      description: "Shell and caltrops form a layered defense. Shell radius grows 40%, caltrops deal 80% more damage and two extra caltrops are hurled each cast.",
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
      description: "Enemies slowed by caltrops meet the returning blade at their worst moment. Blade deals double damage and pierces 3 extra enemies. Caltrops shred armor.",
      weaponBoosts: [
        { weaponId: 'arcane_spikes',      damageMultiplier: 1.6, armorPenetration: 6 },
        { weaponId: 'afro_samurai_blade', damageMultiplier: 2.0, pierce: 3 }
      ]
    },

    // ─── SPAGHETTI'S BLADE COMBOS ───────────────────────────────
    {
      id: 'full_spread', name: 'Full Spread', icon: '🍝',
      requires: ['spaghettis_blade', 'afro_samurai_blade'],
      description: "Spaghetti marks every enemy it threads through. The Final Blade follows the same arc immediately after, dealing double damage to each marked target. Spaghetti fires 40% faster.",
      weaponBoosts: [
        { weaponId: 'spaghettis_blade',   cooldownMultiplier: 0.6, damageMultiplier: 1.5 },
        { weaponId: 'afro_samurai_blade', damageMultiplier: 2.0, pierce: 2 }
      ]
    },
    {
      id: 'hammer_and_noodle', name: 'Hammer & Noodle', icon: '🔨',
      requires: ['spaghettis_blade', 'hammer_toss'],
      description: "Stunned enemies are automatically targeted by spaghetti and take double damage from it. Hammer ricochets to 2 more targets and fires 30% faster.",
      weaponBoosts: [
        { weaponId: 'spaghettis_blade', damageMultiplier: 2.0, rangeMultiplier: 1.3 },
        { weaponId: 'hammer_toss',      cooldownMultiplier: 0.7, chainCount: 2 }
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
      description: "Steel meets lightning. Lightning Edge orbit radius doubles at 2.5× damage. The Hammer ricochets to 3 more targets and hits 60% harder.",
      weaponBoosts: [
        { weaponId: 'hammer_toss',  damageMultiplier: 1.6, chainCount: 3 },
        { weaponId: 'phase_blade',  damageMultiplier: 2.5, rangeMultiplier: 2.0 }
      ]
    },

    // ─── LIFE CYCLE ─────────────────────────────────────────────
    {
      id: 'the_wheel_turns', name: 'The Wheel Turns', icon: '🐍',
      requires: ['ouroboros_vine', 'lotus_rift'],
      description: 'Ouroboros Vine plants Lotus Rifts at each enemy it strikes. Lotus petals launch returning vines when they bloom.',
      weaponBoosts: [
        { weaponId: 'ouroboros_vine', damageMultiplier: 1.5, pierce: 1 },
        { weaponId: 'lotus_rift',     riftCount: 1, statusEffect: { type: 'slow', amount: 0.40, duration: 2.0 } }
      ]
    },
    {
      id: 'golden_bloom', name: 'Golden Bloom', icon: '🪷',
      requires: ['lotus_rift', 'scarab_halo'],
      description: 'Scarabs that pass over Lotus Rifts become empowered. Lotus Rift releases scarabs outward when it collapses.',
      weaponBoosts: [
        { weaponId: 'lotus_rift',  riftDuration: 2.0, healOnExpire: 10 },
        { weaponId: 'scarab_halo', damageMultiplier: 1.6, chargeRate: 0.20 }
      ]
    },
    {
      id: 'swarm_season', name: 'Swarm Season', icon: '🪲',
      requires: ['scarab_halo', 'pollen_nova'],
      description: 'Pollen doubles the scarab charge rate for 5 seconds. Scarabs release mini pollen bursts when they strike.',
      weaponBoosts: [
        { weaponId: 'scarab_halo', projectileCount: 2, orbitSpeedMultiplier: 1.2 },
        { weaponId: 'pollen_nova', damageMultiplier: 1.5, radialCount: 4 }
      ]
    },
    {
      id: 'fertile_reflection', name: 'Fertile Reflection', icon: '🌸',
      requires: ['pollen_nova', 'frizzos_hourglass'],
      description: "Frizzo's Hourglass blooms trigger extra secondary pollen blooms. Pollen slows fertile enemies harder.",
      weaponBoosts: [
        { weaponId: 'pollen_nova',       damageMultiplier: 1.5, statusEffect: { type: 'slow', amount: 0.55, duration: 2.0 } },
        { weaponId: 'frizzos_hourglass', chronoChain: true, chronoMultiplierBonus: 0.20 }
      ]
    },
    {
      id: 'seasonal_reflection', name: 'Seasonal Reflection', icon: '🕰️',
      requires: ['frizzos_hourglass', 'molting_mirror'],
      description: 'Molting Mirror echoes Frizzo blooms from behind the player. Frizzo always marks the furthest enemy for long-range detonations.',
      weaponBoosts: [
        { weaponId: 'frizzos_hourglass', chronoMultiplierBonus: 0.30, rangeMultiplier: 1.25 },
        { weaponId: 'molting_mirror',    mirrorPower: 0.85, mirrorCount: 1 }
      ]
    },
    {
      id: 'false_hatchling', name: 'False Hatchling', icon: '🪞',
      requires: ['molting_mirror', 'brood_husk'],
      description: 'Molting Mirror echoes Brood Husk explosions from its current position. Brood Husks last longer and hit harder.',
      weaponBoosts: [
        { weaponId: 'molting_mirror', mirrorPower: 0.80, mirrorCount: 1 },
        { weaponId: 'brood_husk',     decoyHpBonus: 80, damageMultiplier: 1.6 }
      ]
    },
    {
      id: 'moonlit_brood', name: 'Moonlit Brood', icon: '🐣',
      requires: ['brood_husk', 'crescent_moon'],
      description: 'Husks release Crescent Moon blades when they hatch. Crescent Moon blades curve toward nearby husks.',
      weaponBoosts: [
        { weaponId: 'brood_husk',    decoyHpBonus: 60, statusEffect: { type: 'slow', amount: 0.40, duration: 1.5 } },
        { weaponId: 'crescent_moon', curveRateMultiplier: 1.4, damageMultiplier: 1.5 }
      ]
    },
    {
      id: 'lunar_ouroboros', name: 'Lunar Ouroboros', icon: '🌙',
      requires: ['crescent_moon', 'ouroboros_vine'],
      description: 'Crescent Moon blades orbit briefly before launching. Ouroboros Vine sheds extra moon blades along its curved path.',
      weaponBoosts: [
        { weaponId: 'crescent_moon',  projectileCount: 2, damageMultiplier: 1.5 },
        { weaponId: 'ouroboros_vine', curveRateMultiplier: 1.4, pierce: 2 }
      ]
    },
    {
      id: 'seed_and_serpent', name: 'Seed and Serpent', icon: '🐍',
      requires: ['ouroboros_vine', 'frizzos_hourglass'],
      description: 'Ouroboros Vine applies Frizzo marks to every enemy it hits. Frizzo blooms send a returning vine toward you.',
      weaponBoosts: [
        { weaponId: 'ouroboros_vine',    pierce: 3, damageMultiplier: 1.4 },
        { weaponId: 'frizzos_hourglass', chronoChain: true, chronoMultiplierBonus: 0.25 }
      ]
    },

    // ─── ARCANE CYCLE (NEW WEAPONS) ─────────────────────────────
    {
      id: 'resonant_surge', name: 'Resonant Surge', icon: '🎼',
      requires: ['leyline_harp', 'void_stride'],
      description: 'Harp beams vibrate every enemy they slice through. Void Stride blades arc through vibrating enemies at double speed. Harp deals 80% more damage. Stride blades pierce 2 extra enemies.',
      weaponBoosts: [
        { weaponId: 'leyline_harp',  damageMultiplier: 1.8, statusEffect: { type: 'slow', amount: 0.3, duration: 1.2 } },
        { weaponId: 'void_stride',   pierce: 2, projectileSpeedMultiplier: 2.0, damageMultiplier: 1.4 }
      ]
    },
    {
      id: 'orbital_onslaught', name: 'Orbital Onslaught', icon: '🌀',
      requires: ['void_stride', 'astral_triad'],
      description: 'Dashing through the orbital field energizes the triad — each dash fires extra orbs outward. Astral Triad deals 80% more damage. Void Stride grants a longer speed boost.',
      weaponBoosts: [
        { weaponId: 'void_stride',   damageMultiplier: 1.5, dashDurationMult: 2.0 },
        { weaponId: 'astral_triad',  damageMultiplier: 1.8, triadCount: 1 }
      ]
    },
    {
      id: 'gravity_collapse', name: 'Gravity Collapse', icon: '⚫',
      requires: ['astral_triad', 'entropy_catalyst'],
      description: 'Triad orbs pull nearby dead enemies toward the caster, making them easier targets. Entropy Catalyst detonates at 60% max HP. Triad orbs deal 60% more damage.',
      weaponBoosts: [
        { weaponId: 'astral_triad',      damageMultiplier: 1.6, statusEffect: { type: 'slow', amount: 0.45, duration: 1.5 } },
        { weaponId: 'entropy_catalyst',  corpseBlastPercentBonus: 0.25, groundEffect: { type: 'arcane', duration: 2.5, dps: 10 } }
      ]
    },
    {
      id: 'dead_star', name: 'Dead Star', icon: '💫',
      requires: ['entropy_catalyst', 'arcane_recall'],
      description: 'Recall bolts are drawn toward recent explosion sites. Entropy Catalyst blasts at 50% max HP and leaves a void zone. Arcane Recall fires 40% faster and pierces all enemies.',
      weaponBoosts: [
        { weaponId: 'entropy_catalyst', corpseBlastPercentBonus: 0.15, groundEffect: { type: 'arcane', duration: 3.5, dps: 12 } },
        { weaponId: 'arcane_recall',    pierce: 96, cooldownMultiplier: 0.6 }
      ]
    },
    {
      id: 'homing_cascade', name: 'Homing Cascade', icon: '🌠',
      requires: ['arcane_recall', 'magic_missiles'],
      description: 'Each Recall bolt that reaches the caster fragments into a magic missile burst. Magic Missiles fires 50% faster and deals 80% more damage. Arcane Recall gains 3 extra pierce.',
      weaponBoosts: [
        { weaponId: 'arcane_recall',   pierce: 3, damageMultiplier: 1.5 },
        { weaponId: 'magic_missiles',  cooldownMultiplier: 0.65, damageMultiplier: 1.8 }
      ]
    }
  ],

  // ── CYCLES ─────────────────────────────────────────────────
  // Each cycle is a thematic ring of related weapons.
  cycles: {
    fire:      { name: 'Fire Cycle',      icon: '🔥', color: '#ff7733', weapons: ['firebolt','phoenix_wings','magma_orb','meteor_sigil','starfall','arcane_trail'] },
    ice:       { name: 'Ice Cycle',       icon: '❄️', color: '#66ddff', weapons: ['frost_shard','void_lance','fault_lines','force_pulse','chrono_needle','phantom_gyre'] },
    lightning: { name: 'Lightning Cycle', icon: '⚡', color: '#ffee44', weapons: ['spark_chain','rune_burst','arcane_orb','arcane_cube','phase_blade','thunder_clap'] },
    death:     { name: 'Death Cycle',     icon: '💀', color: '#cc66ff', weapons: ['shadow_bolt','bone_spear','phantom_double','hungry_grimoire','plague_pool','soul_whirl'] },
    arcane:    { name: 'Arcane Cycle',    icon: '✨', color: '#44ffbb', weapons: ['magic_missiles','mirror_glyph','dazzling_lights','leyline_harp','void_stride','astral_triad','entropy_catalyst','arcane_recall'] },
    demon:     { name: 'Demon Cycle',     icon: '😈', color: '#ff4466', weapons: ['jakes_lament','babbage_blast','viceroy_missile','stax_black_sauce','alexs_hax','gravebomb'] },
    blade:     { name: 'Blade Cycle',     icon: '⚔️', color: '#cccccc', weapons: ['afro_samurai_blade','ward_shell','arcane_spikes','hammer_toss','spaghettis_blade'] },
    life:      { name: 'Life Cycle',      icon: '🌿', color: '#66ff99', weapons: ['lotus_rift','scarab_halo','pollen_nova','frizzos_hourglass','molting_mirror','brood_husk','crescent_moon','ouroboros_vine'] }
  }
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
    condition: p => p.weapons.some(wi => { const wc = CONFIG.weapons.find(w => w.id === wi.weaponId); return wc && !['orbit','triad','gravebomb','decoy','mirror'].includes(wc.targeting); }),
    apply: p => { p.globalProjectileCountBonus = (p.globalProjectileCountBonus || 0) + 1; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'radial_up',      name: 'Star Compass',        icon: '🧭', description: '+2 radial shots for applicable nova and radial weapons.',
    condition: p => p.weapons.some(wi => { const wc = CONFIG.weapons.find(w => w.id === wi.weaponId); return wc && ['radial','nova'].includes(wc.targeting); }),
    apply: p => { p.globalRadialCountBonus = (p.globalRadialCountBonus || 0) + 2; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'split_up',       name: 'Fracture Lens',       icon: '💎', description: 'Splitting projectiles create +1 extra split.',
    condition: p => p.weapons.some(wi => { const wc = CONFIG.weapons.find(w => w.id === wi.weaponId); return wc && (wc.splitProjectiles > 0 || wi.appliedUpgrades.some(uid => wc.upgrades?.some(u => u.id === uid && u.changes?.splitProjectiles))); }),
    apply: p => { p.globalSplitProjectilesBonus = (p.globalSplitProjectilesBonus || 0) + 1; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'orbit_speed_up', name: 'Gyre Engine',         icon: '🌀', description: '+30% orbit speed for orbiting weapons.',
    condition: p => p.weapons.some(wi => { const wc = CONFIG.weapons.find(w => w.id === wi.weaponId); return wc && ['orbit','triad'].includes(wc.targeting); }),
    apply: p => { p.globalOrbitSpeedMultiplier = (p.globalOrbitSpeedMultiplier || 1) * 1.30; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'curve_up',       name: 'Crescent Geometry',   icon: '🌙', description: '+35% curve rate for arcing and spiral projectiles.',
    condition: p => p.weapons.some(wi => { const wc = CONFIG.weapons.find(w => w.id === wi.weaponId); return wc && (wc.curveRate > 0 || wc.targeting === 'whirl'); }),
    apply: p => { p.globalCurveRateMultiplier = (p.globalCurveRateMultiplier || 1) * 1.35; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'chrono_up',      name: 'Time Interest',       icon: '⏳', description: 'Chrono detonations gain +35% bonus scaling.',
    condition: p => p.weapons.some(wi => { const wc = CONFIG.weapons.find(w => w.id === wi.weaponId); return wc && wc.isChrono; }),
    apply: p => { p.globalChronoMultiplierBonus = (p.globalChronoMultiplierBonus || 0) + 0.35; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'rift_up',        name: 'Crackling Fault',     icon: '💠', description: '+1 rift, spike, or trap for applicable ground weapons.',
    condition: p => p.weapons.some(wi => { const wc = CONFIG.weapons.find(w => w.id === wi.weaponId); return wc && ['rift','spikes'].includes(wc.targeting); }),
    apply: p => { p.globalTrapCountBonus = (p.globalTrapCountBonus || 0) + 1; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'ground_effect_up', name: 'Scorched Covenant', icon: '🔥', description: '+25% ground effect duration and damage.',
    condition: p => p.weapons.some(wi => { const wc = CONFIG.weapons.find(w => w.id === wi.weaponId); return wc && (wc.groundEffect || wi.appliedUpgrades.some(uid => wc.upgrades?.some(u => u.id === uid && u.changes?.groundEffect))); }),
    apply: p => { p.globalGroundEffectDurationMultiplier = (p.globalGroundEffectDurationMultiplier || 1) * 1.25; p.globalGroundEffectDamageMultiplier = (p.globalGroundEffectDamageMultiplier || 1) * 1.25; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'mirror_power_up', name: 'Silvered Echo',      icon: '🪞', description: '+20% mirror echo power.',
    condition: p => p.weapons.some(wi => { const wc = CONFIG.weapons.find(w => w.id === wi.weaponId); return wc && wc.targeting === 'mirror'; }),
    apply: p => { p.globalMirrorPowerBonus = (p.globalMirrorPowerBonus || 0) + 0.20; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'decoy_mastery',  name: 'False Idol',          icon: '👤', description: '+50 decoy HP and +3 seconds decoy duration.',
    condition: p => p.weapons.some(wi => { const wc = CONFIG.weapons.find(w => w.id === wi.weaponId); return wc && wc.targeting === 'decoy'; }),
    apply: p => { p.globalDecoyHpBonus = (p.globalDecoyHpBonus || 0) + 50; p.globalDecoyDurationBonus = (p.globalDecoyDurationBonus || 0) + 3.0; for (const wi of p.weapons) p.recomputeWeapon(wi); } },

  // ── General stat passives ─────────────────────────────────
  { id: 'damage_up',          name: 'Ember Core',       icon: '🔥', description: '+15% damage on all weapons.',
    apply: p => { p.globalDamageMultiplier = (p.globalDamageMultiplier || 1) * 1.15; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'projectile_speed_up',name: 'Wind Etching',     icon: '🍃', description: '+20% projectile speed.',
    apply: p => { p.globalProjectileSpeedMultiplier = (p.globalProjectileSpeedMultiplier || 1) * 1.20; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'area_up',            name: 'Titan Glyph',      icon: '🌐', description: '+20% area size for applicable weapons.',
    condition: p => p.weapons.some(wi => { const wc = CONFIG.weapons.find(w => w.id === wi.weaponId); return wc && (wc.areaRadius > 0 || ['gravebomb','corpseblast'].includes(wc.targeting)); }),
    apply: p => { p.globalAreaMultiplier = (p.globalAreaMultiplier || 1) * 1.20; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'duration_up',        name: 'Lingering Hex',    icon: '🕯️', description: '+25% duration for applicable weapon effects.',
    condition: p => p.weapons.some(wi => { const wc = CONFIG.weapons.find(w => w.id === wi.weaponId); return wc && (wc.groundEffect || wc.orbitDuration || wc.targeting === 'triad' || ['pool','trail','pulse','decoy'].includes(wc.targeting)); }),
    apply: p => { p.globalDurationMultiplier = (p.globalDurationMultiplier || 1) * 1.25; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'pierce_up',          name: 'Needle Threader',  icon: '🪡', description: '+1 pierce for applicable projectiles.',
    condition: p => p.weapons.some(wi => { const wc = CONFIG.weapons.find(w => w.id === wi.weaponId); return wc && !['gravebomb','decoy','orbit','triad'].includes(wc.targeting); }),
    apply: p => { p.globalPierceBonus = (p.globalPierceBonus || 0) + 1; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'chain_up',           name: 'Storm Link',       icon: '🔗', description: '+1 chain for applicable weapons.',
    condition: p => p.weapons.some(wi => { const wc = CONFIG.weapons.find(w => w.id === wi.weaponId); return wc && wc.chainCount > 0; }),
    apply: p => { p.globalChainBonus = (p.globalChainBonus || 0) + 1; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'armor_pierce_up',    name: 'Void Needle',      icon: '🕳️', description: '+2 armor penetration on applicable weapons.',
    apply: p => { p.globalArmorPenetrationBonus = (p.globalArmorPenetrationBonus || 0) + 2; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'pull_force_up',      name: 'Gravity Knot',     icon: '🪢', description: 'Pull effects gain +35% pull strength.',
    condition: p => p.weapons.some(wi => { const wc = CONFIG.weapons.find(w => w.id === wi.weaponId); return wc && wc.targeting === 'jakes'; }),
    apply: p => { p.globalPullStrengthMultiplier = (p.globalPullStrengthMultiplier || 1) * 1.35; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'status_duration_up', name: 'Hex Resin',        icon: '🧪', description: '+20% duration for stun, poison, slow, and other status effects.',
    condition: p => p.weapons.some(wi => { const wc = CONFIG.weapons.find(w => w.id === wi.weaponId); return wc && (wc.statusEffect || wc.groundEffect || wi.appliedUpgrades.some(uid => wc.upgrades?.some(u => u.id === uid && (u.changes?.statusEffect || u.changes?.groundEffect)))); }),
    apply: p => { p.globalStatusDurationMultiplier = (p.globalStatusDurationMultiplier || 1) * 1.20; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
  { id: 'knockback_up',       name: 'Thunder Palm',     icon: '✋', description: '+30% knockback force.',
    condition: p => p.weapons.some(wi => { const wc = CONFIG.weapons.find(w => w.id === wi.weaponId); return wc && wc.knockback > 0; }),
    apply: p => { p.globalKnockbackMultiplier = (p.globalKnockbackMultiplier || 1) * 1.30; for (const wi of p.weapons) p.recomputeWeapon(wi); } },
];
