/**
 * A unit
 */

export interface UnitAnimation
{
  url: string; // path to spritesheet, should be in "assets/..."
  duration: number; // in ms
}

export interface UnitDescriptor
{
  label: string;
  cost: number;
  income: number; // awarded permanently
  income_alive: number; // awarded per second while alive
  loot: number; // rewarded to opponent on destruction
  spawn_cooldown: number; // in ms
  range: number;
  speed: number;
  health: number;
  damage: number;
  attack_cooldown: number; // in ms
  damage_trigger_delay: number; // how many ms to wait after attack animation has started, before damage is applied?
  splash: number; // if 0, don't splash at all
  size: Vector2; // in pixels
  animations: { idle: UnitAnimation, walk: UnitAnimation, attack: UnitAnimation }; // path to animation sprite sheets
}

export interface UnitTemplate extends UnitDescriptor
{
  upgrades: [
    UnitUpgrade[],
    UnitUpgrade[],
    UnitUpgrade[]
  ]
}

export interface UnitUpgrade
{
  label: string;
  description: string;
  add?: Partial<UnitDescriptor>;
  multiply?: Partial<UnitDescriptor>;
}

import * as PIXI from "pixi.js";
import { Building } from "./Building";
import { Damageable } from "./Damageable";
import { Level } from "./Level";
import { Spriteful } from "./Spriteful";
import { Vector2 } from "./TypeDefinitions";

export class UnitInstance extends Spriteful implements Damageable
{
  /**
   * The template that describes this unit.
   */
  template: UnitTemplate;
  /**
   * The current health of the unit.
   */
  health: number;
  /**
   * The timestamp of the last attack.
   */
  last_attack: number = 0;

  /**
   * Index of the player that owns this unit.
   */
  player: number;

  /**
   * Units can remain dead until the end of the frame to make sure their attack goes off.
   * (Think mirror matchup, both should die, instead of only the one who's update loop is processed last)
   */
  dead:boolean;



  constructor(player: number, level: Level, template: UnitTemplate, position: Vector2)
  {
    super(level, position, template.animations.idle.url);
    this.player = player;
    this.template = template;
    this.health = template.health;

    this.level.players[player].income += template.income;

    this.level.add_unit(this);
  }

  die(): void
  {
    this.dead = true;

  }

  take_damage(v: number): void
  {
    this.health -= v;
    console.log(this.health);
    if(this.health <= 0) // TODO : Make it so the dead target can still get a hit off
    {
      this.die();
    }
  }

  get_damage()
  {
    return this.template.damage;
  }



  update(delta: number)
  {
    // console.log(this.template.income_alive * delta);
    // console.log(this.template.income_alive)
    this.level.players[this.player].money += this.template.income_alive * delta;

    let enemy = this.find_enemy();
    if(enemy !== undefined)
    {
      let cooldown = Date.now() - this.last_attack;

      if(cooldown >= this.template.attack_cooldown)
      {
        this.last_attack = Date.now();
        enemy.take_damage(this.get_damage());
      }
    }
    else
    {
      this.set_position(this._position[0] + (this.player ? -1 : 1) * this.template.speed * delta);
    }
  }

  /**
   * Return a unit if one is in range, or undefined otherwise
   */
  find_enemy(): UnitInstance | Building | undefined
  {
    let enemies = this.level.units[this.player === 0 ? 1 : 0];
    let closest_target:UnitInstance;
    let closest_distance = Infinity;
    enemies.forEach(v=>{
      let dist = Math.abs(v._position[0] - this._position[0]);
      if(dist < closest_distance)
      {
        closest_target = v;
        closest_distance = dist;
      }
    })
    if(closest_distance < this.template.range)
    {
      return closest_target;
    }
    return undefined;
  }

  override destroy(): void
  {
    this.level.remove_unit(this);
    super.destroy();
  }


}
