import { Game } from "./Game";
import { UnitInstance } from "./Unit";
import * as PIXI from "pixi.js"

/**
 * A Player contains all data related to an active Player, like spawned monsters, resources, etc
 */
export class Player
{
  money : number = 0;
  income : number = 0; // money per second

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
