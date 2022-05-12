import { ResourceLoader } from "../ResourceLoader";
import { UNITS, UnitTemplate } from "../Unit";

ResourceLoader.add_texture("assets/images/snail_attacc.svg");
ResourceLoader.add_texture("assets/images/snail_walk.png");

export const Snail: UnitTemplate = {
  label:"Snail",
  description:"Had a trauma after visiting france and consumed a hoverboard as a child",
  cost: 50,
  income: 5,
  income_alive: 25,
  loot: 100,
  spawn_cooldown: 10000,
  speed: 50,
  range: 150,
  health: 10,
  damage: 5,
  damage_trigger_delay: 900,
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
  size:[256,128],
  animations: {
    idle: { url: "assets/images/snail_walk.png", duration: 1000 },
    walk: { url: "assets/images/snail_walk.png", duration: 1000 },
    attack: { url: "assets/images/snail_attacc.png", duration: 1000 }
  }
}
