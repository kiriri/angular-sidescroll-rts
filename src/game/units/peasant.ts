import { UnitTemplate } from "../Unit";

export const Peasant: UnitTemplate = {
  cost: 10,
  income: 0.1,
  income_alive: 0.5,
  loot: 10,
  spawn_cooldown: 1000,
  speed: 0.3,
  range: 1,
  health: 3,
  damage: 1,
  attack_cooldown: 1000,
  damage_trigger_delay: 300,
  splash: 0,
  upgrades: [
    [
      {
        label: "Attack",
        description: "Focus on damage. +1 Attack",
        add: { damage: 1 }
      },
    ],
    [
      {
        label: "Attack",
        description: "Focus on damage. +1 Attack",
        add: { damage: 1 }
      },
    ],
    [
      {
        label: "Attack",
        description: "Focus on damage. +1 Attack",
        add: { damage: 1 }
      },
    ]

  ],
  size:[64,64],
  animations: {
    idle: { url: "assets/images/Chess_blt45.svg", duration: 1000 },
    walk: { url: "assets/images/Chess_blt45.svg", duration: 1000 },
    attack: { url: "assets/images/Chess_blt45.svg", duration: 1000 }
  }
}
