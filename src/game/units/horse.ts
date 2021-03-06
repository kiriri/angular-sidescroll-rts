import { ResourceLoader } from "../ResourceLoader";
import { UNITS, UnitTemplate } from "../Unit";

ResourceLoader.add_texture("assets/images/Horse_Attacc.png");
ResourceLoader.add_texture("assets/images/Horse_walk.png");

export const Horse: UnitTemplate = {
  label:"Horse",
  description:"",
  cost: 100,
  income: 1,
  income_alive: 5,
  loot: 100,
  spawn_cooldown: 10000,
  speed: 100,
  range: 40,
  health: 10,
  damage: 2,
  damage_trigger_delay: 500,
  splash: 0,
  upgrades: [
    [
      {
        label: "Attack",
        description: "Focus on damage. +1 Attack",
        xp:10,
        add: { damage: 1 }
      },
    ],
    [
      {
        label: "Attack",
        description: "Focus on damage. +1 Attack",
        xp:25,
        add: { damage: 1 }
      },
    ],
    [
      {
        label: "Attack",
        xp:50,
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
