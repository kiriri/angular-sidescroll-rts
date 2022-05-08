import { Building } from "./Building";
import { Level } from "./Level";
import { Vector2 } from "./TypeDefinitions";
import { UnitInstance, UnitTemplate } from "./Unit";


export const BaseTemplate:UnitTemplate = {
  health:100,
  speed:0,
  cost:0,
  damage:0,
  income_alive:5,
  income:0,
  attack_cooldown:Infinity,
  damage_trigger_delay:0,
  label:"Base",
  loot:0,
  range:0,
  size:[128,256],
  animations:{
    idle:{duration:Infinity,url:"assets/images/base.png"},
    attack:{duration:Infinity,url:"assets/images/base.png"},
    walk:{duration:Infinity,url:"assets/images/base.png"}
  },
  spawn_cooldown:Infinity,
  splash:0,
  upgrades:[[],[],[]]
}

/**
 * Each player has 1 base and loses when the base gets destroyed.
 * Unit spawns usually appear at the base.
 */
export class Base extends UnitInstance
{
  constructor(player:number, level:Level, position:Vector2)
  {
    super(player,level,BaseTemplate,position);

    // this.sprite.anchor.y += 0.5
  }
}
