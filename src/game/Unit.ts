/**
 * A unit
 */

export interface UnitAnimation
{
  url:string; // path to spritesheet, should be in "assets/..."
  duration:number; // in ms
}

export interface UnitDescriptor
{
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
  size : Vector2; // in pixels
  animations: {idle:UnitAnimation,walk:UnitAnimation,attack:UnitAnimation}; // path to animation sprite sheets
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
  add?:Partial<UnitDescriptor>;
  multiply?:Partial<UnitDescriptor>;
}

import * as PIXI from "pixi.js";
import { Level } from "./Level";
import { Vector2 } from "./TypeDefinitions";

export class UnitInstance
{
  /**
   * The template that describes this unit.
   */
  template:UnitTemplate;
  /**
   * The current health of the unit.
   */
  health:number;
  /**
   * The timestamp of the last attack.
   */
  last_attack:number = 0;

  /**
   * Index of the player that owns this unit.
   */
  player:number;

  level : Level;
  sprite:PIXI.Sprite;

  constructor(player:number, level : Level, template:UnitTemplate, position : Vector2)
  {
    this.player = player;
    this.level = level;
    this.template = template;
    this.health = template.health;

    this._create_sprite(position);

    this.level.units[player].add(this);



  }

  _create_sprite(position : Vector2)
  {
    const sprite = this.sprite = PIXI.Sprite.from('assets/images/Chess_blt45.svg');

    // center the sprite's anchor point
    sprite.anchor.set(0.5);

    // // set the sprite to the center of the screen
    sprite.x = position[0];
    sprite.y = position[1];

    this.level.container.addChild(sprite);
  }

  update(delta:number)
  {
    this.sprite.position.x += (this.player ? -1 : 1) * this.template.speed * delta;
  }


}
