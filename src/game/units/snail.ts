import { ResourceLoader } from "../ResourceLoader";
import { UNITS, UnitTemplate } from "../Unit";

ResourceLoader.add_texture("assets/images/Chess_plt45.svg");
ResourceLoader.add_texture("assets/images/pesant_walkcycle.png");

export const Horse: UnitTemplate = {
  label:"Snail",
  description:"Consumed a hoverboard as a child",
  cost: 500,
  income: 5,
  income_alive: 25,
  loot: 100,
  spawn_cooldown: 10000,
  speed: 50,
  range: 100,
  health: 10,
  damage: 5,
  attack_cooldown: 500,
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
    idle: { url: "assets/images/snail_walk.png", duration: 1000 },
    walk: { url: "assets/images/snail_walk.png", duration: 1000 },
    attack: { url: "assets/images/snail_attacc.png", duration: 2000 }
  }
}
