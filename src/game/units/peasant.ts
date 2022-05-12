import { ResourceLoader } from "../ResourceLoader";
import { UNITS, UnitTemplate } from "../Unit";

ResourceLoader.add_texture("assets/images/pesant_attacc.png");
ResourceLoader.add_texture("assets/images/pesant_walk.png");

export const Peasant: UnitTemplate = {
  label:"Peasant",
  description:"Pheasant",
  cost: 10,
  income: 0.1,
  income_alive: 0.5,
  loot: 10,
  spawn_cooldown: 1000,
  speed: 32,
  range: 32,
  health: 3,
  damage: 1,
  damage_trigger_delay: 900,
  splash: 0,
  upgrades: [
    [
      {
        label: "Attack",
        description: "Offense is the best defense.",
        xp:10,
        add: { damage: 1 }
      },
      {
        label: "Spam",
        description: "Quantity is its own quality.",
        xp:20,
        add: { spawn_cooldown: -500 }
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
        description: "Focus on damage. +1 Attack",
        xp:50,
        add: { damage: 1 }
      },
    ]

  ],
  size:[128,128],
  animations: {
    idle: { url: "assets/images/pesant_walk.png", duration: 1000 },
    walk: { url: "assets/images/pesant_walk.png", duration: 1000 },
    attack: { url: "assets/images/pesant_attacc.png", duration: 1000 }
  }
}
