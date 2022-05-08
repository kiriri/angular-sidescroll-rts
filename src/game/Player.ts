import { Game } from "./Game";
import { UnitInstance, UnitTemplate } from "./Unit";
import * as PIXI from "pixi.js"
import { Peasant } from "./units/peasant";

/**
 * A Player contains all data related to an active Player, like spawned monsters, resources, etc
 */
export class Player
{
  money : number = 0;
  income : number = 0; // money per second
  deck:UnitTemplate[] = [Peasant];

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
