import { ResourceLoader } from "../ResourceLoader";
import { UNITS, UnitTemplate } from "../Unit";

ResourceLoader.add_texture("assets/images/Chess_plt45.svg");
ResourceLoader.add_texture("assets/images/pesant_walkcycle.png");

export const Horse: UnitTemplate = {
  label:"Horse",
  description:"Horse",
  cost: 100,
  income: 1,
  income_alive: 5,
  loot: 100,
  spawn_cooldown: 10000,
  speed: 100,
  range: 40,
  health: 10,
  damage: 2,
  attack_cooldown: 1000,
  damage_trigger_delay: 500,
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
    idle: { url: "assets/images/Horse_walk.png", duration: 1000 },
    walk: { url: "assets/images/Horse_walk.png", duration: 1000 },
    attack: { url: "assets/images/Horse_Attacc.png", duration: 1000 }
  }
}
