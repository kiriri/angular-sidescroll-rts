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
  ],
  on_spawn?:(this:UnitInstance)=>void,
  on_death?:(this:UnitInstance)=>void,
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
import { ResourceLoader } from "./ResourceLoader";
import { Spriteful } from "./Spriteful";
import { Vector2 } from "./TypeDefinitions";

export const UNITS : Record<string,UnitTemplate> = {};

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

  animation_frame:number = 0;



  constructor(player: number, level: Level, template: UnitTemplate, position: Vector2)
  {
    super(level, position, {url:template.animations.idle.url,size:template.size});
    this.player = player;
    this.template = template;
    this.health = template.health;

    this.level.players[player].income += template.income;

    this.level.add_unit(this);

    this.set_animation("idle");

    this.template.on_spawn?.apply(this);
  }

  die(): void
  {
    this.dead = true;
    this.template.on_death?.apply(this);
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

  override current_animation ?: {name:keyof UnitTemplate["animations"], frame:number, frame_size:Vector2, length:number, duration:number, start_time:number};
  set_animation(name:keyof UnitTemplate["animations"])
  {
    let anim = this.template.animations[name];

    ResourceLoader.load_texture(anim.url).then(texture=>
    {
      this.set_texture(texture);
      let frame_count = texture.baseTexture.width / this.template.size[0]; // how many frames?

      this.current_animation = {name,frame:0,length:frame_count,duration:anim.duration,start_time:Date.now(), frame_size:this.template.size};
      // console.log(frame_count)
    });
  }

  update_animation()
  {
    if(this.current_animation)
    {
      let frame = Math.floor((Date.now() - this.current_animation.start_time) * this.current_animation.length / this.current_animation.duration)
      this.current_animation.frame = frame;
      this.set_animation_frame(frame);
    }
  }



  has_attacked = false; // resets when a new animation starts, set to true after attack_delay
  update(delta: number)
  {
    this.level.players[this.player].money += this.template.income_alive * delta;

    this.update_animation();

    let cooldown = Date.now() - this.last_attack;
    if(cooldown < this.template.attack_cooldown)
    {
      if(!this.has_attacked && (cooldown > this.template.damage_trigger_delay) )
      {
        let enemy = this.find_enemy();
        this.has_attacked = true;
        enemy?.take_damage(this.get_damage());
      }
      return;
    }

    let enemy = this.find_enemy();
    if(enemy !== undefined)
    {
        this.last_attack = Date.now();
        this.set_animation("attack");
        this.has_attacked = false;
    }
    else
    {
      if(this.current_animation?.name != "walk")
        this.set_animation("walk");
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
