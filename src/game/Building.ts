import { Damageable } from "./Damageable";
import { Level } from "./Level";
import { Spriteful } from "./Spriteful";
import { Vector2 } from "./TypeDefinitions";

/**
 *
 */
export class Building extends Spriteful implements Damageable
{
  health: number;

  constructor(level: Level, position: Vector2)
  {
    super(level, position);
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
