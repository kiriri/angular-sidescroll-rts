import { Damageable } from "./Damageable";
import { Level } from "./Level";
import { Spriteful } from "./Spriteful";
import { Vector2 } from "./TypeDefinitions";

export interface BuildingTemplate
{
  sprite:string;
  health:number;
}

/**
 *
 */
export class Building extends Spriteful implements Damageable
{
  health: number;
  template:BuildingTemplate;

  constructor(level: Level, position: Vector2, template:BuildingTemplate)
  {
    super(level, position, {url:template.sprite});
    this.health = template.health;
  }

  die(): void
  {
    this.destroy();
  }

  take_damage(v: number)
  {
    this.health -= v;
    if (this.health <= 0)
      this.die();
  }
}
