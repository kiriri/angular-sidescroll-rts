import { ResourceLoader } from "../ResourceLoader";
import { UNITS, UnitTemplate } from "../Unit";

ResourceLoader.add_texture("assets/images/Chess_plt45.svg");
ResourceLoader.add_texture("assets/images/pesant_walkcycle.png");

export const Horse: UnitTemplate = {
  label:"Horse",
  cost: 10,
  income: 0.1,
  income_alive: 0.5,
  loot: 10,
  spawn_cooldown: 1000,
  speed: 32,
  range: 32,
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
    idle: { url: "assets/images/pesant_walkcycle.png", duration: 1000 },
    walk: { url: "assets/images/pesant_walkcycle.png", duration: 1000 },
    attack: { url: "assets/images/Chess_plt45.svg", duration: 1000 }
  }
}
