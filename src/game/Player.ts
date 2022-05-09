import { Game } from "./Game";
import { UnitInstance, UNITS, UnitTemplate } from "./Unit";
import units from "./units";

/**
 * A Player contains all data related to an active Player, like spawned monsters, resources, etc
 */
export class Player
{
  money : number = 0;
  income : number = 0; // money per second
  deck:UnitTemplate[] = [...Object.values(units)];

  constructor()
  {
  }

  /**
   * Called every frame
   * @param delta Time since last update in ms
   */
  update(delta:number)
  {
    delta /= 1000; // to seconds
    this.money += this.income * delta;
  }
}
